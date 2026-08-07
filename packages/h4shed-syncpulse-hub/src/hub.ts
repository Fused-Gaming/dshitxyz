import { SyncPulseCoordinator, EnvironmentType } from '@dshit/h4shed-mcp-core';

export interface HubConfig {
  port: number;
  environment: EnvironmentType;
  maxConcurrentJobs: number;
  retentionDays: number;
}

export interface JobNotification {
  jobId: string;
  type: 'created' | 'started' | 'completed' | 'failed';
  timestamp: Date;
  payload: unknown;
}

export class SyncPulseHub {
  private config: HubConfig;
  private coordinator: SyncPulseCoordinator;
  private listeners: Set<(notification: JobNotification) => void> = new Set();
  private jobTimers: Map<string, NodeJS.Timeout> = new Map();

  constructor(config: Partial<HubConfig> = {}) {
    this.config = {
      port: 3000,
      environment: 'dev',
      maxConcurrentJobs: 5,
      retentionDays: 7,
      ...config,
    };

    this.coordinator = new SyncPulseCoordinator();
  }

  async start(): Promise<void> {
    console.log(`Starting SyncPulse Hub on port ${this.config.port}`);
    console.log(`Environment: ${this.config.environment}`);
    console.log(`Max concurrent jobs: ${this.config.maxConcurrentJobs}`);

    this.startCleanupTimer();
  }

  async stop(): Promise<void> {
    console.log('Stopping SyncPulse Hub...');
    this.jobTimers.forEach((timer) => clearTimeout(timer));
    this.listeners.clear();
  }

  createJob(type: 'test' | 'deploy' | 'validate', env: EnvironmentType): string {
    const jobId = this.coordinator.createJob(type, env);
    this.notifyListeners({
      jobId,
      type: 'created',
      timestamp: new Date(),
      payload: { type, env },
    });
    return jobId;
  }

  updateJobStatus(
    jobId: string,
    status: 'pending' | 'running' | 'completed' | 'failed',
    result?: unknown,
    error?: string
  ): void {
    this.coordinator.updateJobStatus(jobId, status, result, error);

    const notificationType =
      status === 'completed' || status === 'failed' ? status : 'started';

    this.notifyListeners({
      jobId,
      type: notificationType as any,
      timestamp: new Date(),
      payload: { status, result, error },
    });
  }

  getJobStatus(jobId: string) {
    return this.coordinator.getJob(jobId);
  }

  getStats() {
    return this.coordinator.getStats();
  }

  subscribe(listener: (notification: JobNotification) => void): () => void {
    this.listeners.add(listener);

    return () => {
      this.listeners.delete(listener);
    };
  }

  private notifyListeners(notification: JobNotification): void {
    this.listeners.forEach((listener) => {
      try {
        listener(notification);
      } catch (error) {
        console.error('Notification listener error:', error);
      }
    });
  }

  private startCleanupTimer(): void {
    const cleanupInterval = 60 * 60 * 1000; // 1 hour

    const timer = setInterval(() => {
      this.cleanupOldJobs();
    }, cleanupInterval);

    this.jobTimers.set('cleanup', timer);
  }

  private cleanupOldJobs(): void {
    const now = new Date();
    const jobs = this.coordinator.getAllJobs();

    jobs.forEach((job) => {
      if (job.completedAt) {
        const ageInDays = (now.getTime() - job.completedAt.getTime()) / (1000 * 60 * 60 * 24);
        if (ageInDays > this.config.retentionDays) {
          console.log(`Cleaning up old job: ${job.id}`);
        }
      }
    });
  }
}
