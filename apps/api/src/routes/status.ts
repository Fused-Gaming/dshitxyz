import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { ProjectStatusTool } from '@dshit/h4shed-syncpulse-skill';

export async function statusRoutes(fastify: FastifyInstance) {
  const statusTool = new ProjectStatusTool();

  fastify.get('/status', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const status = await statusTool.getProjectStatus();
      return reply.code(200).send({
        success: true,
        data: status,
      });
    } catch (error) {
      fastify.log.error(error);
      return reply.code(500).send({
        success: false,
        error: 'Failed to fetch project status',
      });
    }
  });

  fastify.get('/status/health', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const status = await statusTool.getProjectStatus();
      const isHealthy =
        status.buildStatus === 'success' &&
        status.testStatus === 'passing' &&
        status.deploymentStatus !== 'failed';

      return reply.code(isHealthy ? 200 : 503).send({
        healthy: isHealthy,
        status: status.summary,
        timestamp: status.timestamp,
      });
    } catch (error) {
      fastify.log.error(error);
      return reply.code(503).send({
        healthy: false,
        error: 'Health check failed',
      });
    }
  });

  fastify.get('/status/swarm', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const status = await statusTool.getProjectStatus();
      return reply.code(200).send({
        agents: status.swarmStatus.agents,
        tasks: status.swarmStatus.tasks,
        queueLength: status.swarmStatus.queLength,
        timestamp: status.timestamp,
      });
    } catch (error) {
      fastify.log.error(error);
      return reply.code(500).send({
        error: 'Failed to fetch swarm status',
      });
    }
  });

  fastify.get('/status/metrics', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const status = await statusTool.getProjectStatus();
      return reply.code(200).send({
        buildStatus: status.buildStatus,
        testStatus: status.testStatus,
        deploymentStatus: status.deploymentStatus,
        metrics: {
          failureRate: `${status.metrics.failureRate.toFixed(2)}%`,
          uptime: `${(status.metrics.uptime / 3600).toFixed(2)} hours`,
          lastDeployment: status.metrics.lastDeployment,
        },
        environment: status.environment,
        timestamp: status.timestamp,
      });
    } catch (error) {
      fastify.log.error(error);
      return reply.code(500).send({
        error: 'Failed to fetch metrics',
      });
    }
  });
}
