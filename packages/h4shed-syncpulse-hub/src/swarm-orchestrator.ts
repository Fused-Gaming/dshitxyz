import { EnvironmentType } from '@dshit/h4shed-mcp-core';

export interface SwarmAgent {
  id: string;
  name: string;
  role: 'tester' | 'deployer' | 'validator';
  environment: EnvironmentType;
  status: 'idle' | 'working' | 'offline';
  tasksCompleted: number;
  currentTask?: string;
}

export interface SwarmTask {
  id: string;
  type: 'test' | 'deploy' | 'validate';
  environment: EnvironmentType;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'queued' | 'assigned' | 'running' | 'completed' | 'failed';
  assignedAgent?: string;
  createdAt: Date;
  startedAt?: Date;
  completedAt?: Date;
  result?: unknown;
  error?: string;
}

export class SwarmOrchestrator {
  private agents: Map<string, SwarmAgent> = new Map();
  private tasks: Map<string, SwarmTask> = new Map();
  private taskQueue: string[] = [];
  private agentHeartbeatInterval: Map<string, NodeJS.Timeout> = new Map();

  constructor() {
    this.initializeDefaultAgents();
  }

  private initializeDefaultAgents(): void {
    const testers = ['tester-1', 'tester-2', 'tester-3'];
    const deployers = ['deployer-1', 'deployer-2'];
    const validators = ['validator-1'];

    testers.forEach((id) => {
      this.registerAgent({
        id,
        name: `Tester Agent ${id.split('-')[1]}`,
        role: 'tester',
        environment: 'dev',
        status: 'idle',
        tasksCompleted: 0,
      });
    });

    deployers.forEach((id) => {
      this.registerAgent({
        id,
        name: `Deployer Agent ${id.split('-')[1]}`,
        role: 'deployer',
        environment: 'staging',
        status: 'idle',
        tasksCompleted: 0,
      });
    });

    validators.forEach((id) => {
      this.registerAgent({
        id,
        name: `Validator Agent ${id.split('-')[1]}`,
        role: 'validator',
        environment: 'prod',
        status: 'idle',
        tasksCompleted: 0,
      });
    });
  }

  registerAgent(agent: SwarmAgent): void {
    this.agents.set(agent.id, agent);
    console.log(`Registered agent: ${agent.name} (${agent.role})`);

    this.startHeartbeat(agent.id);
  }

  createTask(type: 'test' | 'deploy' | 'validate', env: EnvironmentType, priority: 'low' | 'medium' | 'high' | 'critical' = 'medium'): string {
    const taskId = `task-${type}-${env}-${Date.now()}`;
    const task: SwarmTask = {
      id: taskId,
      type,
      environment: env,
      priority,
      status: 'queued',
      createdAt: new Date(),
    };

    this.tasks.set(taskId, task);
    this.taskQueue.push(taskId);

    console.log(`Created task: ${taskId} (priority: ${priority})`);
    this.assignPendingTasks();

    return taskId;
  }

  getTask(taskId: string): SwarmTask | undefined {
    return this.tasks.get(taskId);
  }

  getAgent(agentId: string): SwarmAgent | undefined {
    return this.agents.get(agentId);
  }

  getAllAgents(): SwarmAgent[] {
    return Array.from(this.agents.values());
  }

  getAgentsByRole(role: 'tester' | 'deployer' | 'validator'): SwarmAgent[] {
    return Array.from(this.agents.values()).filter((a) => a.role === role);
  }

  getAgentsByEnvironment(env: EnvironmentType): SwarmAgent[] {
    return Array.from(this.agents.values()).filter((a) => a.environment === env);
  }

  completeTask(taskId: string, result?: unknown, error?: string): void {
    const task = this.tasks.get(taskId);
    if (!task) {
      throw new Error(`Task not found: ${taskId}`);
    }

    task.status = error ? 'failed' : 'completed';
    task.completedAt = new Date();
    task.result = result;
    task.error = error;

    if (task.assignedAgent) {
      const agent = this.agents.get(task.assignedAgent);
      if (agent) {
        agent.tasksCompleted++;
        agent.status = 'idle';
        agent.currentTask = undefined;

        console.log(`Agent ${agent.name} completed task ${taskId}`);
        this.assignPendingTasks();
      }
    }
  }

  private assignPendingTasks(): void {
    const idleAgents = Array.from(this.agents.values()).filter((a) => a.status === 'idle');

    for (const taskId of this.taskQueue) {
      const task = this.tasks.get(taskId);
      if (!task || task.status !== 'queued') {
        continue;
      }

      const agent = this.findBestAgent(task, idleAgents);
      if (!agent) {
        continue;
      }

      this.assignTaskToAgent(task, agent);
      idleAgents.splice(idleAgents.indexOf(agent), 1);
    }
  }

  private findBestAgent(task: SwarmTask, availableAgents: SwarmAgent[]): SwarmAgent | null {
    const roleMap: Record<string, SwarmAgent['role']> = {
      test: 'tester',
      deploy: 'deployer',
      validate: 'validator',
    };

    const requiredRole = roleMap[task.type];

    let candidates = availableAgents
      .filter((a) => a.role === requiredRole)
      .filter((a) => a.environment === task.environment || task.type === 'test');

    if (candidates.length === 0) {
      candidates = availableAgents.filter((a) => a.role === requiredRole);
    }

    if (candidates.length === 0) {
      return null;
    }

    candidates.sort((a, b) => b.tasksCompleted - a.tasksCompleted);

    return candidates[0];
  }

  private assignTaskToAgent(task: SwarmTask, agent: SwarmAgent): void {
    task.status = 'assigned';
    task.assignedAgent = agent.id;
    task.startedAt = new Date();

    agent.status = 'working';
    agent.currentTask = task.id;

    console.log(`Assigned task ${task.id} to agent ${agent.name}`);

    const processTimer = setTimeout(() => {
      task.status = 'running';
      console.log(`Task ${task.id} is now running on ${agent.name}`);
    }, 500);

    setTimeout(() => {
      clearTimeout(processTimer);
    }, 30000);
  }

  private startHeartbeat(agentId: string): void {
    const interval = setInterval(() => {
      const agent = this.agents.get(agentId);
      if (agent && Math.random() < 0.95) {
        agent.status = agent.status === 'offline' ? 'idle' : agent.status;
      }
    }, 5000);

    this.agentHeartbeatInterval.set(agentId, interval);
  }

  getSwarmStats() {
    const agents = Array.from(this.agents.values());
    const tasks = Array.from(this.tasks.values());

    return {
      agents: {
        total: agents.length,
        idle: agents.filter((a) => a.status === 'idle').length,
        working: agents.filter((a) => a.status === 'working').length,
        offline: agents.filter((a) => a.status === 'offline').length,
      },
      tasks: {
        total: tasks.length,
        queued: tasks.filter((t) => t.status === 'queued').length,
        assigned: tasks.filter((t) => t.status === 'assigned').length,
        running: tasks.filter((t) => t.status === 'running').length,
        completed: tasks.filter((t) => t.status === 'completed').length,
        failed: tasks.filter((t) => t.status === 'failed').length,
      },
      queLength: this.taskQueue.length,
    };
  }

  shutdown(): void {
    console.log('Shutting down swarm orchestrator...');
    this.agentHeartbeatInterval.forEach((interval) => clearInterval(interval));
    this.agents.clear();
    this.tasks.clear();
    this.taskQueue = [];
  }
}
