import { EnvironmentType, TestEnvironment } from './test-environment';

export interface TestResult {
  name: string;
  status: 'passed' | 'failed' | 'skipped';
  duration: number;
  error?: string;
}

export interface TestSuite {
  name: string;
  tests: string[];
  type: 'e2e' | 'unit' | 'integration' | 'contract';
}

export class TestRunner {
  private testEnvironment: TestEnvironment;
  private results: TestResult[] = [];

  constructor() {
    this.testEnvironment = new TestEnvironment();
  }

  async runTests(env: EnvironmentType, suites?: string[]): Promise<TestResult[]> {
    const config = this.testEnvironment.getConfig(env);
    console.log(`Starting tests in ${env} environment`);
    console.log(`API URL: ${config.apiUrl}`);
    console.log(`Web URL: ${config.webUrl}`);
    console.log(`Parallel workers: ${config.parallelWorkers}`);

    this.results = [];

    const testSuites = this.getTestSuites(suites);

    for (const suite of testSuites) {
      if (config.skipTests?.includes(suite.name)) {
        console.log(`Skipping ${suite.name} tests`);
        continue;
      }

      await this.runTestSuite(suite, config.retries);
    }

    return this.results;
  }

  private getTestSuites(filter?: string[]): TestSuite[] {
    const allSuites: TestSuite[] = [
      {
        name: 'e2e',
        tests: ['homepage', 'navigation', 'wallet-connect', 'collections'],
        type: 'e2e',
      },
      {
        name: 'unit',
        tests: ['components', 'utils', 'hooks'],
        type: 'unit',
      },
      {
        name: 'integration',
        tests: ['api-auth', 'database', 'payments'],
        type: 'integration',
      },
      {
        name: 'contract',
        tests: ['token-transfer', 'tax-mechanics', 'governance'],
        type: 'contract',
      },
    ];

    if (filter && filter.length > 0) {
      return allSuites.filter((s) => filter.includes(s.name));
    }

    return allSuites;
  }

  private async runTestSuite(suite: TestSuite, retries: number): Promise<void> {
    console.log(`Running ${suite.type} tests: ${suite.name}`);

    for (const test of suite.tests) {
      let passed = false;
      let lastError: string | undefined;

      for (let attempt = 0; attempt <= retries; attempt++) {
        try {
          const startTime = Date.now();
          await this.executeTest(test, suite.type);
          const duration = Date.now() - startTime;

          this.results.push({
            name: `${suite.name}/${test}`,
            status: 'passed',
            duration,
          });

          passed = true;
          break;
        } catch (error) {
          lastError = error instanceof Error ? error.message : String(error);

          if (attempt < retries) {
            console.log(`Retry ${attempt + 1}/${retries} for ${test}`);
          }
        }
      }

      if (!passed) {
        this.results.push({
          name: `${suite.name}/${test}`,
          status: 'failed',
          duration: 0,
          error: lastError,
        });
      }
    }
  }

  private async executeTest(testName: string, type: string): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, Math.random() * 1000);
    });
  }

  getResults(): TestResult[] {
    return this.results;
  }

  getSummary(): {
    total: number;
    passed: number;
    failed: number;
    skipped: number;
  } {
    return {
      total: this.results.length,
      passed: this.results.filter((r) => r.status === 'passed').length,
      failed: this.results.filter((r) => r.status === 'failed').length,
      skipped: this.results.filter((r) => r.status === 'skipped').length,
    };
  }
}
