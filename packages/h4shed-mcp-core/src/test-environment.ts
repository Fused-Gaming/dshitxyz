export type EnvironmentType = 'dev' | 'staging' | 'prod';

export interface EnvironmentConfig {
  name: EnvironmentType;
  apiUrl: string;
  webUrl: string;
  parallelWorkers: number;
  retries: number;
  timeout: number;
  skipTests?: string[];
}

export class TestEnvironment {
  private configs: Map<EnvironmentType, EnvironmentConfig> = new Map();

  constructor() {
    this.initializeDefaults();
  }

  private initializeDefaults(): void {
    this.configs.set('dev', {
      name: 'dev',
      apiUrl: 'http://localhost:3001',
      webUrl: 'http://localhost:3000',
      parallelWorkers: 4,
      retries: 0,
      timeout: 30000,
    });

    this.configs.set('staging', {
      name: 'staging',
      apiUrl: process.env.STAGING_API_URL || 'https://staging-api.dshit.xyz',
      webUrl: process.env.STAGING_WEB_URL || 'https://staging.dshit.xyz',
      parallelWorkers: 2,
      retries: 1,
      timeout: 45000,
    });

    this.configs.set('prod', {
      name: 'prod',
      apiUrl: 'https://api.dshit.xyz',
      webUrl: 'https://dshit.xyz',
      parallelWorkers: 1,
      retries: 2,
      timeout: 60000,
      skipTests: ['destructive', 'heavy-load'],
    });
  }

  getConfig(env: EnvironmentType): EnvironmentConfig {
    const config = this.configs.get(env);
    if (!config) {
      throw new Error(`Unknown environment: ${env}`);
    }
    return config;
  }

  getAllConfigs(): EnvironmentConfig[] {
    return Array.from(this.configs.values());
  }

  setConfig(env: EnvironmentType, config: EnvironmentConfig): void {
    this.configs.set(env, config);
  }
}
