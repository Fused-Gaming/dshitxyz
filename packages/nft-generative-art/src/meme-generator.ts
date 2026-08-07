import { GenerativeArtEngine, GenerativeArtConfig } from './engine';
import { ArtStylePresets } from './styles';

export interface MemeConfig {
  text?: string;
  topText?: string;
  bottomText?: string;
  style: string;
  width?: number;
  height?: number;
}

export class MemeGenerator {
  private engine: GenerativeArtEngine;

  constructor() {
    this.engine = new GenerativeArtEngine();
  }

  generateMeme(config: MemeConfig) {
    const style = ArtStylePresets.byName(config.style) || ArtStylePresets.MEMETIC;

    const artConfig: GenerativeArtConfig = {
      width: config.width || 1024,
      height: config.height || 1024,
      seed: config.text || `meme-${Date.now()}`,
      style: style.name,
      complexity: style.complexity,
    };

    const art = this.engine.generate(artConfig);

    console.log(`Generated meme: "${config.topText || ''}" / "${config.bottomText || ''}"`);

    return {
      ...art,
      metadata: {
        ...art.metadata,
        topText: config.topText || '',
        bottomText: config.bottomText || '',
        style: style.name,
      },
    };
  }

  generateCollection(count: number, baseConfig: Partial<MemeConfig>) {
    const memes = [];

    for (let i = 0; i < count; i++) {
      const seed = `${baseConfig.text}-${i}`;
      const meme = this.generateMeme({
        ...baseConfig,
        text: seed,
      } as MemeConfig);

      memes.push(meme);
    }

    return memes;
  }

  getAvailableStyles() {
    return ArtStylePresets.all().map((s) => ({
      name: s.name,
      description: s.description,
      complexity: s.complexity,
    }));
  }
}
