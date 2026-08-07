import { SyncPulseHub, SwarmOrchestrator } from '@dshit/h4shed-syncpulse-hub';
import { TestingSkill } from './skills/testing-skill';
import { DeploymentSkill } from './skills/deployment-skill';
import { ValidationSkill } from './skills/validation-skill';
import { EnvironmentType } from '@dshit/h4shed-mcp-core';

export interface SkillWorkflow {
  name: string;
  description: string;
  steps: Array<{
    skill: 'testing' | 'deployment' | 'validation';
    environment: EnvironmentType;
    config: unknown;
  }>;
}

export class SkillOrchestrator {
  private hub: SyncPulseHub;
  private swarm: SwarmOrchestrator;
  private testingSkill: TestingSkill;
  private deploymentSkill: DeploymentSkill;
  private validationSkill: ValidationSkill;
  private workflows: Map<string, SkillWorkflow> = new Map();

  constructor() {
    this.hub = new SyncPulseHub({
      environment: 'dev',
      maxConcurrentJobs: 10,
    });

    this.swarm = new SwarmOrchestrator();

    this.testingSkill = new TestingSkill(this.hub, this.swarm);
    this.deploymentSkill = new DeploymentSkill(this.hub, this.swarm);
    this.validationSkill = new ValidationSkill(this.hub, this.swarm);

    this.initializeDefaultWorkflows();
  }

  private initializeDefaultWorkflows(): void {
    this.workflows.set('full-pipeline', {
      name: 'Full Pipeline',
      description: 'Test → Deploy → Validate across all environments',
      steps: [
        { skill: 'testing', environment: 'dev', config: { suites: ['unit', 'integration'] } },
        { skill: 'testing', environment: 'staging', config: { suites: ['e2e'] } },
        { skill: 'deployment', environment: 'staging', config: { rollback: true } },
        { skill: 'validation', environment: 'staging', config: { critical: true } },
        { skill: 'deployment', environment: 'prod', config: { rollback: true } },
        { skill: 'validation', environment: 'prod', config: { critical: true } },
      ],
    });

    this.workflows.set('dev-test', {
      name: 'Dev Testing',
      description: 'Quick test suite for development',
      steps: [
        { skill: 'testing', environment: 'dev', config: { suites: ['unit', 'integration'] } },
      ],
    });

    this.workflows.set('staging-deploy', {
      name: 'Staging Deployment',
      description: 'Deploy to staging and validate',
      steps: [
        { skill: 'deployment', environment: 'staging', config: { rollback: true } },
        { skill: 'validation', environment: 'staging', config: { critical: false } },
      ],
    });

    this.workflows.set('prod-release', {
      name: 'Production Release',
      description: 'Full production deployment with validation',
      steps: [
        { skill: 'deployment', environment: 'prod', config: { rollback: true } },
        { skill: 'validation', environment: 'prod', config: { critical: true } },
      ],
    });
  }

  async executeWorkflow(workflowName: string): Promise<{ success: boolean; results: unknown[] }> {
    const workflow = this.workflows.get(workflowName);
    if (!workflow) {
      throw new Error(`Workflow not found: ${workflowName}`);
    }

    console.log(`\n=== Executing Workflow: ${workflow.name} ===`);
    console.log(`Description: ${workflow.description}`);
    console.log(`Steps: ${workflow.steps.length}\n`);

    await this.hub.start();

    const results: unknown[] = [];
    let success = true;

    for (const step of workflow.steps) {
      try {
        console.log(`\n► Step: ${step.skill} on ${step.environment}`);

        let result;
        switch (step.skill) {
          case 'testing':
            result = await this.testingSkill.execute(step.environment, step.config);
            break;
          case 'deployment':
            result = await this.deploymentSkill.execute(step.environment, step.config);
            break;
          case 'validation':
            result = await this.validationSkill.execute(step.environment, step.config);
            break;
        }

        results.push(result);
      } catch (error) {
        console.error(`✗ Step failed: ${step.skill}`);
        console.error(error);
        success = false;

        if (step.skill === 'testing' || step.skill === 'validation') {
          break;
        }
      }
    }

    await this.hub.stop();

    console.log(`\n=== Workflow Complete: ${success ? 'SUCCESS' : 'FAILED'} ===`);
    console.log(`Swarm Stats:`, this.swarm.getSwarmStats());

    return { success, results };
  }

  getWorkflow(name: string): SkillWorkflow | undefined {
    return this.workflows.get(name);
  }

  getAllWorkflows(): SkillWorkflow[] {
    return Array.from(this.workflows.values());
  }

  getSwarmStatus() {
    return this.swarm.getSwarmStats();
  }

  shutdown(): void {
    this.swarm.shutdown();
  }
}
