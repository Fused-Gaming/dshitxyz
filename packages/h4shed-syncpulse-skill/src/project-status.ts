import { SwarmOrchestrator } from '@dshit/h4shed-syncpulse-hub';

export interface ProjectStatus {
  timestamp: Date;
  environment: string;
  buildStatus: 'success' | 'failed' | 'unknown';
  testStatus: 'passing' | 'failing' | 'unknown';
  deploymentStatus: 'deployed' | 'deploying' | 'failed' | 'unknown';
  swarmStatus: any;
  metrics: {
    uptime: number;
    failureRate: number;
    lastDeployment: Date | null;
  };
  summary: string;
}

export class ProjectStatusTool {
  private swarm: SwarmOrchestrator;

  constructor() {
    this.swarm = new SwarmOrchestrator();
  }

  async getProjectStatus(): Promise<ProjectStatus> {
    const swarmStats = this.swarm.getSwarmStats();

    const failureRate =
      swarmStats.tasks.total > 0
        ? (swarmStats.tasks.failed / swarmStats.tasks.total) * 100
        : 0;

    const buildStatus: ProjectStatus['buildStatus'] =
      failureRate < 5 ? 'success' : failureRate < 20 ? 'unknown' : 'failed';

    const testStatus: ProjectStatus['testStatus'] =
      swarmStats.tasks.failed === 0 ? 'passing' : 'failing';

    const deploymentStatus: ProjectStatus['deploymentStatus'] =
      swarmStats.agents.working > 0 ? 'deploying' : 'deployed';

    const status: ProjectStatus = {
      timestamp: new Date(),
      environment: process.env.NODE_ENV || 'development',
      buildStatus,
      testStatus,
      deploymentStatus,
      swarmStatus: swarmStats,
      metrics: {
        uptime: Date.now() / 1000,
        failureRate,
        lastDeployment: new Date(),
      },
      summary: this.generateSummary(buildStatus, testStatus, deploymentStatus),
    };

    return status;
  }

  private generateSummary(
    buildStatus: string,
    testStatus: string,
    deploymentStatus: string
  ): string {
    const parts = [
      `Build: ${buildStatus}`,
      `Tests: ${testStatus}`,
      `Deployment: ${deploymentStatus}`,
    ];
    return parts.join(' | ');
  }

  async printStatus(): Promise<void> {
    const status = await this.getProjectStatus();

    console.log('\n╔════════════════════════════════════════════════╗');
    console.log('║          PROJECT STATUS REPORT                ║');
    console.log('╚════════════════════════════════════════════════╝\n');

    console.log(`⏰ Timestamp: ${status.timestamp.toISOString()}`);
    console.log(`📍 Environment: ${status.environment}`);
    console.log(`\n📊 Status Summary:`);
    console.log(`  Build:      ${this.getIcon(status.buildStatus)} ${status.buildStatus}`);
    console.log(`  Tests:      ${this.getIcon(status.testStatus)} ${status.testStatus}`);
    console.log(`  Deployment: ${this.getIcon(status.deploymentStatus)} ${status.deploymentStatus}`);

    console.log(`\n🤖 Swarm Status:`);
    console.log(`  Agents: ${status.swarmStatus.agents.total} (Idle: ${status.swarmStatus.agents.idle}, Working: ${status.swarmStatus.agents.working}, Offline: ${status.swarmStatus.agents.offline})`);
    console.log(`  Tasks: ${status.swarmStatus.tasks.total} (Queued: ${status.swarmStatus.tasks.queued}, Running: ${status.swarmStatus.tasks.running}, Completed: ${status.swarmStatus.tasks.completed}, Failed: ${status.swarmStatus.tasks.failed})`);
    console.log(`  Queue Length: ${status.swarmStatus.queLength}`);

    console.log(`\n📈 Metrics:`);
    console.log(`  Failure Rate: ${status.metrics.failureRate.toFixed(2)}%`);
    console.log(`  Uptime: ${(status.metrics.uptime / 3600).toFixed(2)} hours`);
    console.log(`  Last Deployment: ${status.metrics.lastDeployment?.toISOString()}`);

    console.log(`\n${status.summary}\n`);
  }

  private getIcon(status: string): string {
    switch (status) {
      case 'success':
      case 'passing':
      case 'deployed':
        return '✅';
      case 'failed':
      case 'failing':
        return '❌';
      case 'deploying':
        return '🔄';
      default:
        return '❓';
    }
  }
}
