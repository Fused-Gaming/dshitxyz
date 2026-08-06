#!/usr/bin/env node

import { DesignTokensSkill } from './skill';
import { TokenValidator } from './validator';
import { TokenExporter } from './exporter';
import { TokenSyncManager } from './token-sync';

const args = process.argv.slice(2);
const command = args[0];

async function main() {
  const skill = new DesignTokensSkill();
  const validator = new TokenValidator();
  const exporter = new TokenExporter();
  const syncManager = new TokenSyncManager();

  try {
    switch (command) {
      case 'sync':
        await handleSync();
        break;
      case 'validate':
        handleValidate(validator);
        break;
      case 'export':
        handleExport(exporter, args[1]);
        break;
      case 'colors':
        handleColors(skill);
        break;
      case 'contrast':
        handleContrast(validator, args[1], args[2]);
        break;
      case 'help':
        printHelp();
        break;
      default:
        printHelp();
    }
  } catch (error) {
    console.error('Error:', error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}

async function handleSync() {
  console.log('🎨 Syncing design tokens...\n');

  const result = await skill.sync({
    source: 'packages/design-tokens/src/tokens.ts',
    destination: 'dist',
    format: 'tailwind',
  });

  console.log(`Files generated: ${result.filesGenerated.join(', ')}`);
  console.log(`Tokens updated: ${result.tokensUpdated}`);
  console.log(`Duration: ${result.duration}ms\n`);
}

function handleValidate(validator: TokenValidator) {
  const skill = new DesignTokensSkill();
  const validation = skill.validate();

  if (validation.valid) {
    console.log('✅ All design tokens are valid!');
  } else {
    console.log('❌ Validation errors:');
    validation.errors.forEach((error) => console.log(`  - ${error}`));
  }
}

function handleExport(exporter: TokenExporter, format?: string) {
  const fmt = format || 'json';

  console.log(`📤 Exporting tokens as ${fmt}...\n`);

  let output = '';
  switch (fmt) {
    case 'json':
      output = exporter.exportAsJSON();
      break;
    case 'css':
      output = exporter.exportAsCSS();
      break;
    case 'ts':
      output = exporter.exportAsTypeScript();
      break;
    case 'tailwind':
      output = exporter.exportAsTailwindConfig();
      break;
    default:
      console.error(`Unknown format: ${fmt}`);
      return;
  }

  console.log(output);
}

function handleColors(skill: DesignTokensSkill) {
  const palette = skill.getColorPalette();

  console.log('🎨 Available Colors:\n');
  Object.entries(palette).forEach(([name, hex]) => {
    console.log(`  ${name.padEnd(30)} ${hex}`);
  });
}

function handleContrast(validator: TokenValidator, fg?: string, bg?: string) {
  if (!fg || !bg) {
    console.error('Usage: design-tokens contrast <foreground> <background>');
    console.error('Example: design-tokens contrast "#FFFFFF" "#000000"');
    return;
  }

  const passes = validator.validateColorContrast(fg, bg);

  console.log(`\n🔍 Contrast Check:`);
  console.log(`  Foreground: ${fg}`);
  console.log(`  Background: ${bg}`);
  console.log(`  WCAG AA: ${passes ? '✅ Pass' : '❌ Fail'}\n`);
}

function printHelp() {
  console.log(`
Design Tokens Skill CLI

Usage:
  design-tokens <command> [options]

Commands:
  sync                          Sync design tokens to all formats
  validate                      Validate token structure
  export [format]              Export tokens (json|css|ts|tailwind)
  colors                        List available colors
  contrast <fg> <bg>           Check color contrast ratio
  help                          Show this help message

Examples:
  design-tokens sync
  design-tokens export json
  design-tokens export css > tokens.css
  design-tokens colors
  design-tokens contrast "#FFFFFF" "#000000"
  `);
}

const skill = new DesignTokensSkill();
main();
