import { designTokens } from '@dshit/design-tokens';

export class TokenExporter {
  exportAsJSON(): string {
    return JSON.stringify(designTokens, null, 2);
  }

  exportAsCSS(): string {
    let css = ':root {\n';

    const flattenTokens = (obj: any, prefix = ''): void => {
      for (const [key, value] of Object.entries(obj)) {
        const varName = prefix ? `${prefix}-${key}` : key;

        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
          flattenTokens(value, varName);
        } else if (typeof value === 'string' || typeof value === 'number') {
          css += `  --${varName}: ${value};\n`;
        }
      }
    };

    flattenTokens(designTokens);
    css += '}\n';
    return css;
  }

  exportAsTailwindConfig(): string {
    const config = this.generateTailwindConfig();
    return `export default ${JSON.stringify(config, null, 2)}`;
  }

  exportAsTypeScript(): string {
    return `
export const designTokens = {
  colors: ${JSON.stringify(designTokens.colors, null, 4)},
  typography: ${JSON.stringify(designTokens.typography, null, 4)},
  spacing: ${JSON.stringify(designTokens.spacing, null, 4)},
  borderRadius: ${JSON.stringify(designTokens.borderRadius, null, 4)},
  shadows: ${JSON.stringify(designTokens.shadows, null, 4)},
  transitions: ${JSON.stringify(designTokens.transitions, null, 4)},
  breakpoints: ${JSON.stringify(designTokens.breakpoints, null, 4)},
} as const;

export type DesignTokens = typeof designTokens;
`;
  }

  private generateTailwindConfig(): Record<string, any> {
    return {
      theme: {
        extend: {
          colors: this.flattenColorTokens(),
          fontFamily: designTokens.typography?.fonts || {},
          spacing: designTokens.spacing || {},
          borderRadius: designTokens.borderRadius || {},
          boxShadow: designTokens.shadows || {},
          transitionDuration: designTokens.transitions || {},
          screens: designTokens.breakpoints || {},
        },
      },
    };
  }

  private flattenColorTokens(): Record<string, string> {
    const colors: Record<string, string> = {};

    const flatten = (obj: any, prefix = ''): void => {
      for (const [key, value] of Object.entries(obj)) {
        const name = prefix ? `${prefix}-${key}` : key;
        if (typeof value === 'string') {
          colors[name] = value;
        } else if (typeof value === 'object') {
          flatten(value, name);
        }
      }
    };

    flatten(designTokens.colors);
    return colors;
  }
}
