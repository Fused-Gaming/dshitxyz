import { EnvironmentType } from './test-environment';

export interface DeploymentStep {
  name: string;
  command: string;
  timeout: number;
  critical: boolean;
}

export interface DeploymentPipeline {
  name: string;
  targetEnv: EnvironmentType;
  steps: DeploymentStep[];
  rollbackSteps?: DeploymentStep[];
}

export interface DeploymentResult {
  pipeline: string;
  environment: EnvironmentType;
  status: 'success' | 'failed' | 'rolled-back';
  duration: number;
  steps: Array<{
    name: string;
    status: 'success' | 'failed';
    duration: number;
    error?: string;
  }>;
}

export class DeploymentOrchestrator {
  private pipelines: Map<string, DeploymentPipeline> = new Map();
  private results: DeploymentResult[] = [];

  constructor() {
    this.initializeDefaultPipelines();
  }

  private initializeDefaultPipelines(): void {
    this.pipelines.set('web-dev', {
      name: 'web-dev',
      targetEnv: 'dev',
      steps: [
        {
          name: 'Install dependencies',
          command: 'pnpm install',
          timeout: 60000,
          critical: true,
        },
        {
          name: 'Build web app',
          command: 'pnpm -C apps/web build',
          timeout: 120000,
          critical: true,
        },
        {
          name: 'Run type check',
          command: 'pnpm type-check',
          timeout: 60000,
          critical: false,
        },
        {
          name: 'Start dev server',
          command: 'pnpm -C apps/web dev',
          timeout: 30000,
          critical: true,
        },
      ],
    });

    this.pipelines.set('api-staging', {
      name: 'api-staging',
      targetEnv: 'staging',
      steps: [
        {
          name: 'Build API',
          command: 'pnpm -C apps/api build',
          timeout: 90000,
          critical: true,
        },
        {
          name: 'Run migrations',
          command: 'pnpm -C apps/api run migrate',
          timeout: 60000,
          critical: true,
        },
        {
          name: 'Deploy to staging',
          command: 'vercel deploy --prod --scope @dshit',
          timeout: 300000,
          critical: true,
        },
        {
          name: 'Verify deployment',
          command: 'curl -f https://staging-api.dshit.xyz/health',
          timeout: 30000,
          critical: true,
        },
      ],
      rollbackSteps: [
        {
          name: 'Rollback to previous version',
          command: 'vercel rollback --prod --scope @dshit',
          timeout: 120000,
          critical: true,
        },
      ],
    });

    this.pipelines.set('web-prod', {
      name: 'web-prod',
      targetEnv: 'prod',
      steps: [
        {
          name: 'Pre-deployment validation',
          command: 'pnpm test:e2e',
          timeout: 300000,
          critical: true,
        },
        {
          name: 'Build production app',
          command: 'pnpm -C apps/web build',
          timeout: 120000,
          critical: true,
        },
        {
          name: 'Deploy to production',
          command: 'vercel deploy --prod --scope @dshit',
          timeout: 300000,
          critical: true,
        },
        {
          name: 'Smoke tests',
          command: 'pnpm test:smoke',
          timeout: 180000,
          critical: true,
        },
      ],
      rollbackSteps: [
        {
          name: 'Rollback production',
          command: 'vercel rollback --prod --scope @dshit',
          timeout: 120000,
          critical: true,
        },
      ],
    });
  }

  async deployPipeline(pipelineName: string): Promise<DeploymentResult> {
    const pipeline = this.pipelines.get(pipelineName);
    if (!pipeline) {
      throw new Error(`Pipeline not found: ${pipelineName}`);
    }

    console.log(`Starting deployment: ${pipelineName} → ${pipeline.targetEnv}`);

    const startTime = Date.now();
    const stepResults: DeploymentResult['steps'] = [];
    let failed = false;

    for (const step of pipeline.steps) {
      try {
        const stepStart = Date.now();
        await this.executeStep(step);
        const stepDuration = Date.now() - stepStart;

        stepResults.push({
          name: step.name,
          status: 'success',
          duration: stepDuration,
        });

        console.log(`✓ ${step.name} (${stepDuration}ms)`);
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : String(error);

        stepResults.push({
          name: step.name,
          status: 'failed',
          duration: 0,
          error: errorMsg,
        });

        console.error(`✗ ${step.name}: ${errorMsg}`);

        if (step.critical) {
          failed = true;
          break;
        }
      }
    }

    let status: DeploymentResult['status'] = failed ? 'failed' : 'success';

    if (failed && pipeline.rollbackSteps) {
      console.log('Running rollback steps...');
      for (const step of pipeline.rollbackSteps) {
        try {
          await this.executeStep(step);
          status = 'rolled-back';
        } catch (error) {
          console.error(`Rollback failed: ${step.name}`);
        }
      }
    }

    const duration = Date.now() - startTime;

    const result: DeploymentResult = {
      pipeline: pipelineName,
      environment: pipeline.targetEnv,
      status,
      duration,
      steps: stepResults,
    };

    this.results.push(result);
    return result;
  }

  private async executeStep(step: DeploymentStep): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, Math.random() * 1000);
    });
  }

  getPipeline(name: string): DeploymentPipeline | undefined {
    return this.pipelines.get(name);
  }

  getAllPipelines(): DeploymentPipeline[] {
    return Array.from(this.pipelines.values());
  }

  getResults(): DeploymentResult[] {
    return this.results;
  }
}
