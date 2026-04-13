#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const SPECIAL_SLUG_OVERRIDES = new Map([
  ['food drug lawyer', 'food--drug-lawyer'],
  ['food and drug lawyer', 'food--drug-lawyer'],
  ['debt recovery drt lawyer', 'debt-recovery-lawyer-drt-lawyer'],
  ['debt recovery lawyer drt lawyer', 'debt-recovery-lawyer-drt-lawyer'],
  ['debt recovery tribunal lawyer', 'debt-recovery-lawyer-drt-lawyer'],
]);

const STOP_WORDS = new Set([
  'case',
  'cases',
  'service',
  'services',
  'litigation',
  'dispute',
  'disputes',
  'matter',
  'matters',
  'law',
  'laws',
]);

function normalizeText(input) {
  return String(input || '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[()]/g, ' ')
    .replace(/[^a-z0-9\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function createServiceSlug(serviceName) {
  const normalized = normalizeText(serviceName);

  if (!normalized) return '';
  if (SPECIAL_SLUG_OVERRIDES.has(normalized)) {
    return SPECIAL_SLUG_OVERRIDES.get(normalized);
  }

  if (/\bfood\b/.test(normalized) && /\bdrug\b/.test(normalized)) {
    return 'food--drug-lawyer';
  }

  if (/\bdebt\b/.test(normalized) && /\brecovery\b/.test(normalized) && /\bdrt\b/.test(normalized)) {
    return 'debt-recovery-lawyer-drt-lawyer';
  }

  let words = normalized.split(' ').filter(Boolean);

  words = words.filter((word) => !STOP_WORDS.has(word));

  if (words.length === 0) return 'lawyer';

  if (words.includes('cat')) {
    return 'cat-matters-lawyer';
  }

  const alreadyEndsWithLawyer = words[words.length - 1] === 'lawyer';
  if (!alreadyEndsWithLawyer) {
    words.push('lawyer');
  }

  return words.join('-').replace(/-+/g, '-').replace(/^-|-$/g, '');
}

function parseInput(argv) {
  const inputFlagIndex = argv.indexOf('--input');

  if (inputFlagIndex !== -1) {
    const inputPath = argv[inputFlagIndex + 1];
    if (!inputPath) {
      throw new Error('Missing value for --input. Example: --input ./services.txt');
    }

    const absolutePath = path.resolve(process.cwd(), inputPath);
    const content = fs.readFileSync(absolutePath, 'utf8');

    if (inputPath.endsWith('.json')) {
      const parsed = JSON.parse(content);
      if (!Array.isArray(parsed)) {
        throw new Error('JSON input must be an array of service names.');
      }
      return parsed.map(String).map((x) => x.trim()).filter(Boolean);
    }

    return content
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);
  }

  const positionalArgs = argv.filter((arg, idx) => idx === 0 || argv[idx - 1] !== '--input');
  if (positionalArgs.length > 0) {
    return positionalArgs.map((x) => x.trim()).filter(Boolean);
  }

  if (!process.stdin.isTTY) {
    const stdin = fs.readFileSync(0, 'utf8');
    return stdin
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);
  }

  return [];
}

function main() {
  const rawArgs = process.argv.slice(2);

  if (rawArgs.includes('--help') || rawArgs.includes('-h')) {
    console.log('Usage:');
    console.log('  node generate-service-slugs.js --input ./services.txt');
    console.log('  node generate-service-slugs.js --input ./services.json');
    console.log('  node generate-service-slugs.js "Criminal Lawyer" "Cheque Bounce Lawyer"');
    console.log('  cat services.txt | node generate-service-slugs.js');
    process.exit(0);
  }

  const serviceNames = parseInput(rawArgs);
  if (!serviceNames.length) {
    console.error('No service names provided. Use --help for examples.');
    process.exit(1);
  }

  const result = serviceNames.map((name) => ({
    service: name,
    slug: createServiceSlug(name),
  }));

  console.log(JSON.stringify(result, null, 2));
}

main();

