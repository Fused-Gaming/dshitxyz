export interface GenerativeArtConfig {
  width: number;
  height: number;
  seed: string;
  style: string;
  complexity: 'simple' | 'medium' | 'complex';
}

export interface GeneratedArt {
  id: string;
  seed: string;
  style: string;
  imageBuffer: Buffer;
  metadata: {
    width: number;
    height: number;
    complexity: string;
    generatedAt: Date;
    traits: Record<string, string | number>;
  };
}

export class GenerativeArtEngine {
  private seed: string = '';
  private random: Math['random'];

  constructor() {
    this.random = this.createSeededRandom();
  }

  generate(config: GenerativeArtConfig): GeneratedArt {
    this.seed = config.seed;
    this.random = this.createSeededRandom();

    const traits = this.generateTraits(config);
    const imageBuffer = this.renderArt(config, traits);

    return {
      id: `art-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      seed: config.seed,
      style: config.style,
      imageBuffer,
      metadata: {
        width: config.width,
        height: config.height,
        complexity: config.complexity,
        generatedAt: new Date(),
        traits,
      },
    };
  }

  private generateTraits(config: GenerativeArtConfig): Record<string, string | number> {
    return {
      primaryColor: this.randomColor(),
      secondaryColor: this.randomColor(),
      pattern: this.randomPattern(),
      texture: this.randomTexture(),
      layers: Math.floor(this.random() * 10) + 1,
      rotation: Math.floor(this.random() * 360),
      scale: this.random() * 0.5 + 0.75,
      complexity: config.complexity,
    };
  }

  private renderArt(config: GenerativeArtConfig, traits: Record<string, string | number>): Buffer {
    console.log(
      `Generating ${config.complexity} art: ${config.width}x${config.height} (${config.style})`
    );

    const canvas = Buffer.alloc(config.width * config.height * 4);

    for (let i = 0; i < canvas.length; i += 4) {
      const value = Math.floor(this.random() * 256);
      canvas[i] = value;
      canvas[i + 1] = value;
      canvas[i + 2] = value;
      canvas[i + 3] = 255;
    }

    return canvas;
  }

  private randomColor(): string {
    const colors = [
      '#FF6B6B',
      '#4ECDC4',
      '#45B7D1',
      '#FFA07A',
      '#98D8C8',
      '#F7DC6F',
      '#BB8FCE',
      '#85C1E2',
    ];
    return colors[Math.floor(this.random() * colors.length)];
  }

  private randomPattern(): string {
    const patterns = ['dots', 'lines', 'waves', 'spirals', 'grids', 'fractals'];
    return patterns[Math.floor(this.random() * patterns.length)];
  }

  private randomTexture(): string {
    const textures = ['smooth', 'rough', 'glitchy', 'organic', 'metallic'];
    return textures[Math.floor(this.random() * textures.length)];
  }

  private createSeededRandom(): typeof Math.random {
    let x = Math.sin(this.hashCode(this.seed)) * 10000;
    return () => {
      x = Math.sin(x) * 10000;
      return x - Math.floor(x);
    };
  }

  private hashCode(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    return hash;
  }
}
