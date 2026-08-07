export class TokenValidator {
  validateColorContrast(foreground: string, background: string): boolean {
    const fg = this.hexToRgb(foreground);
    const bg = this.hexToRgb(background);

    if (!fg || !bg) return false;

    const luminance1 = this.getLuminance(fg);
    const luminance2 = this.getLuminance(bg);

    const contrast =
      (Math.max(luminance1, luminance2) + 0.05) / (Math.min(luminance1, luminance2) + 0.05);

    return contrast >= 4.5;
  }

  validateColorFormat(color: string): boolean {
    return /^#[0-9A-F]{6}$/i.test(color);
  }

  validateTokenNaming(name: string): boolean {
    return /^[a-z][a-z0-9-]*$/.test(name);
  }

  validateTokenStructure(tokens: unknown): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!tokens || typeof tokens !== 'object') {
      errors.push('Tokens must be an object');
      return { valid: false, errors };
    }

    return { valid: errors.length === 0, errors };
  }

  private hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  }

  private getLuminance(rgb: { r: number; g: number; b: number }): number {
    const [r, g, b] = [rgb.r, rgb.g, rgb.b].map((x) => {
      x = x / 255;
      return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
    });

    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }
}
