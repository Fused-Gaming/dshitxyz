#!/usr/bin/env node
import { TestRunner, DeploymentOrchestrator, SyncPulseCoordinator } from '@dshit/h4shed-mcp-core';

const args = process.argv.slice(2);
const command = args[0];
const subcommand = args[1];
const env = args[2] || 'dev';

async function main() {
  try {
    switch (command) {
      case 'test':
        await handleTest(subcommand, env);
        break;
      case 'deploy':
        await handleDeploy(subcommand, env);
        break;
      case 'status':
        await handleStatus(subcommand);
        break;
      case 'help':
        printHelp();
        break;
      default:
        console.error(`Unknown command: ${command}`);
        printHelp();
        process.exit(1);
    }
  } catch (error) {
    console.error('Error:', error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}

async function handleTest(suite?: string, env?: string) {
  console.log(`Running tests${suite ? ` (${suite})` : ''} in ${env || 'dev'} environment...`);

  const testRunner = new TestRunner();
  const results = await testRunner.runTests(env as any, suite ? [suite] : undefined);
  const summary = testRunner.getSummary();

  console.log('\n=== Test Summary ===');
  console.log(`Total: ${summary.total}`);
  console.log(`Passed: ${summary.passed}`);
  console.log(`Failed: ${summary.failed}`);
  console.log(`Skipped: ${summary.skipped}`);

  if (summary.failed > 0) {
    console.error('\n=== Failed Tests ===');
    results.forEach((r) => {
      if (r.status === 'failed') {
        console.error(`- ${r.name}: ${r.error}`);
      }
    });
    process.exit(1);
  }
}

async function handleDeploy(pipeline?: string, env?: string) {
  if (!pipeline) {
    console.error('Please specify a pipeline name');
    console.error('Example: h4shed deploy web-prod');
    process.exit(1);
  }

  console.log(`Deploying ${pipeline} to ${env || 'prod'} environment...`);

  const orchestrator = new DeploymentOrchestrator();
  const result = await orchestrator.deployPipeline(pipeline);

  console.log('\n=== Deployment Result ===');
  console.log(`Status: ${result.status}`);
  console.log(`Duration: ${result.duration}ms`);
  console.log(`\nSteps:`);

  result.steps.forEach((step) => {
    const icon = step.status === 'success' ? '✓' : '✗';
    console.log(`${icon} ${step.name} (${step.duration}ms)`);
    if (step.error) {
      console.log(`  Error: ${step.error}`);
    }
  });

  if (result.status === 'failed') {
    process.exit(1);
  }
}

async function handleStatus(jobId?: string) {
  const coordinator = new SyncPulseCoordinator();

  if (jobId) {
    const job = coordinator.getJob(jobId);
    if (!job) {
      console.error(`Job not found: ${jobId}`);
      process.exit(1);
    }

    console.log(`Job: ${job.id}`);
    console.log(`Type: ${job.type}`);
    console.log(`Environment: ${job.environment}`);
    console.log(`Status: ${job.status}`);
    console.log(`Created: ${job.createdAt}`);
    if (job.completedAt) {
      console.log(`Completed: ${job.completedAt}`);
    }
  } else {
    const stats = coordinator.getStats();
    console.log('=== H4SH Status ===');
    console.log(`Total Jobs: ${stats.total}`);
    console.log(`Pending: ${stats.pending}`);
    console.log(`Running: ${stats.running}`);
    console.log(`Completed: ${stats.completed}`);
    console.log(`Failed: ${stats.failed}`);
  }
}

function printHelp() {
  console.log(`
H4SH MCP CLI - Testing and Deployment Orchestration

Usage:
  h4shed <command> [options]

Commands:
  test [suite] [env]      Run tests (suite: e2e, unit, integration, contract)
  deploy <pipeline> [env] Deploy using a pipeline
  status [jobId]          Show job or system status
  help                    Show this help message

Examples:
  h4shed test e2e dev
  h4shed test unit staging
  h4shed deploy web-prod prod
  h4shed deploy api-staging staging
  h4shed status
  h4shed status job-123-456

Environments:
  dev      - Local development (localhost)
  staging  - Staging environment
  prod     - Production environment
  `);
}

main();
