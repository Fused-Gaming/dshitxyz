import { EnvironmentType } from './test-environment';

export interface SyncPulseJob {
  id: string;
  type: 'test' | 'deploy' | 'validate';
  environment: EnvironmentType;
  status: 'pending' | 'running' | 'completed' | 'failed';
  createdAt: Date;
  completedAt?: Date;
  result?: unknown;
  error?: string;
}

export class SyncPulseCoordinator {
  private jobs: Map<string, SyncPulseJob> = new Map();
  private jobQueue: string[] = [];

  createJob(
    type: 'test' | 'deploy' | 'validate',
    environment: EnvironmentType
  ): string {
    const id = `${type}-${environment}-${Date.now()}`;
    const job: SyncPulseJob = {
      id,
      type,
      environment,
      status: 'pending',
      createdAt: new Date(),
    };

    this.jobs.set(id, job);
    this.jobQueue.push(id);

    console.log(`Created job: ${id}`);
    return id;
  }

  getJob(id: string): SyncPulseJob | undefined {
    return this.jobs.get(id);
  }

  updateJobStatus(
    id: string,
    status: SyncPulseJob['status'],
    result?: unknown,
    error?: string
  ): void {
    const job = this.jobs.get(id);
    if (!job) {
      throw new Error(`Job not found: ${id}`);
    }

    job.status = status;
    job.result = result;
    job.error = error;

    if (status === 'completed' || status === 'failed') {
      job.completedAt = new Date();
    }

    console.log(`Updated job ${id}: ${status}`);
  }

  getJobsByEnvironment(env: EnvironmentType): SyncPulseJob[] {
    return Array.from(this.jobs.values()).filter((j) => j.environment === env);
  }

  getAllJobs(): SyncPulseJob[] {
    return Array.from(this.jobs.values());
  }

  getNextPendingJob(): SyncPulseJob | undefined {
    const id = this.jobQueue.find((jobId) => {
      const job = this.jobs.get(jobId);
      return job && job.status === 'pending';
    });

    return id ? this.jobs.get(id) : undefined;
  }

  cancelJob(id: string): void {
    const job = this.jobs.get(id);
    if (job && job.status === 'pending') {
      job.status = 'failed';
      job.error = 'Cancelled by user';
      job.completedAt = new Date();
    }
  }

  getStats(): {
    total: number;
    pending: number;
    running: number;
    completed: number;
    failed: number;
  } {
    const jobs = Array.from(this.jobs.values());
    return {
      total: jobs.length,
      pending: jobs.filter((j) => j.status === 'pending').length,
      running: jobs.filter((j) => j.status === 'running').length,
      completed: jobs.filter((j) => j.status === 'completed').length,
      failed: jobs.filter((j) => j.status === 'failed').length,
    };
  }
}
