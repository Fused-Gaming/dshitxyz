export interface ArtStyle {
  name: string;
  description: string;
  primaryColors: string[];
  patterns: string[];
  complexity: 'simple' | 'medium' | 'complex';
}

export class ArtStylePresets {
  static readonly BRUTALIST: ArtStyle = {
    name: 'Brutalist',
    description: 'Raw, geometric, industrial aesthetic',
    primaryColors: ['#000000', '#FFFFFF', '#FF0000'],
    patterns: ['grids', 'lines', 'blocks'],
    complexity: 'simple',
  };

  static readonly GLITCH: ArtStyle = {
    name: 'Glitch',
    description: 'Digital glitch and error art',
    primaryColors: ['#00FF00', '#FF00FF', '#00FFFF'],
    patterns: ['glitchy', 'lines', 'spirals'],
    complexity: 'complex',
  };

  static readonly ORGANIC: ArtStyle = {
    name: 'Organic',
    description: 'Flowing, nature-inspired forms',
    primaryColors: ['#8B4513', '#228B22', '#DAA520'],
    patterns: ['waves', 'spirals', 'organic'],
    complexity: 'medium',
  };

  static readonly CYBERPUNK: ArtStyle = {
    name: 'Cyberpunk',
    description: 'Neon synthwave aesthetic',
    primaryColors: ['#FF00FF', '#00FFFF', '#FFD700'],
    patterns: ['grids', 'spirals', 'waves'],
    complexity: 'complex',
  };

  static readonly MEMETIC: ArtStyle = {
    name: 'Memetic',
    description: 'Chaotic, viral meme energy',
    primaryColors: ['#FF6347', '#FFD700', '#00CED1'],
    patterns: ['dots', 'fractals', 'glitchy'],
    complexity: 'complex',
  };

  static all(): ArtStyle[] {
    return [
      this.BRUTALIST,
      this.GLITCH,
      this.ORGANIC,
      this.CYBERPUNK,
      this.MEMETIC,
    ];
  }

  static byName(name: string): ArtStyle | undefined {
    return this.all().find((s) => s.name.toLowerCase() === name.toLowerCase());
  }
}
