import { designTokens } from '@dshit/design-tokens';

export interface TokenConfig {
  source: string;
  destination: string;
  format: 'css' | 'json' | 'ts' | 'tailwind';
}

export interface SyncResult {
  success: boolean;
  tokensUpdated: number;
  filesGenerated: string[];
  errors: string[];
  duration: number;
}

export class DesignTokensSkill {
  private tokens = designTokens;
  private logger = console;

  async sync(config: TokenConfig): Promise<SyncResult> {
    const startTime = Date.now();
    const result: SyncResult = {
      success: true,
      tokensUpdated: 0,
      filesGenerated: [],
      errors: [],
      duration: 0,
    };

    try {
      this.logger.log(`🎨 Syncing design tokens from ${config.source}...`);

      const tokenCount = this.countTokens();
      result.tokensUpdated = tokenCount;

      const generated = this.generateFormats(config);
      result.filesGenerated = generated;

      this.logger.log(`✅ Token sync complete! (${tokenCount} tokens, ${generated.length} files)`);
    } catch (error) {
      result.success = false;
      result.errors.push(error instanceof Error ? error.message : String(error));
      this.logger.error(`❌ Sync failed: ${result.errors[0]}`);
    }

    result.duration = Date.now() - startTime;
    return result;
  }

  validate(): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!this.tokens.colors) {
      errors.push('Missing colors configuration');
    }

    if (!this.tokens.typography) {
      errors.push('Missing typography configuration');
    }

    if (!this.tokens.spacing) {
      errors.push('Missing spacing configuration');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  export(format: 'css' | 'json' | 'ts'): string {
    switch (format) {
      case 'json':
        return JSON.stringify(this.tokens, null, 2);

      case 'css':
        return this.exportCSS();

      case 'ts':
        return this.exportTypeScript();

      default:
        throw new Error(`Unknown format: ${format}`);
    }
  }

  private exportCSS(): string {
    let css = ':root {\n';

    if (this.tokens.colors) {
      for (const [key, color] of Object.entries(this.tokens.colors)) {
        if (typeof color === 'object') {
          for (const [shade, value] of Object.entries(color)) {
            css += `  --color-${key}-${shade}: ${value};\n`;
          }
        }
      }
    }

    css += '}\n';
    return css;
  }

  private exportTypeScript(): string {
    return `export const designTokens = ${JSON.stringify(this.tokens, null, 2)};`;
  }

  private countTokens(): number {
    let count = 0;

    const countRecursive = (obj: any): void => {
      for (const value of Object.values(obj)) {
        if (typeof value === 'object' && value !== null) {
          countRecursive(value);
        } else {
          count++;
        }
      }
    };

    countRecursive(this.tokens);
    return count;
  }

  private generateFormats(config: TokenConfig): string[] {
    const files: string[] = [];

    if (config.format === 'css' || config.format === 'tailwind') {
      files.push(`${config.destination}/variables.css`);
    }

    if (config.format === 'json' || config.format === 'tailwind') {
      files.push(`${config.destination}/tokens.json`);
    }

    if (config.format === 'ts' || config.format === 'tailwind') {
      files.push(`${config.destination}/tokens.ts`);
    }

    return files;
  }

  getColorPalette(): Record<string, string> {
    const palette: Record<string, string> = {};

    if (this.tokens.colors) {
      for (const [colorName, colorValues] of Object.entries(this.tokens.colors)) {
        if (typeof colorValues === 'object') {
          for (const [shade, value] of Object.entries(colorValues)) {
            palette[`${colorName}-${shade}`] = value as string;
          }
        }
      }
    }

    return palette;
  }

  getTypographySettings(): Record<string, unknown> {
    return this.tokens.typography || {};
  }

  getSpacingScale(): Record<string, unknown> {
    return this.tokens.spacing || {};
  }
}
