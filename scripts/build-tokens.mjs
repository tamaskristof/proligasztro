// Generates src/styles/tokens.css from design-system/tokens.json.
// Run `npm run tokens` after updating tokens.json from the design system.
import { readFileSync, writeFileSync } from 'node:fs';

const t = JSON.parse(readFileSync(new URL('../design-system/tokens.json', import.meta.url), 'utf8'));
const lines = [`/* ${t.name} — generated from design-system/tokens.json by scripts/build-tokens.mjs. Do not edit by hand. */`, ':root {'];
const theme = t.color.themes[0].id;
for (const tok of t.color.tokens) {
  const v = typeof tok.value === 'string' ? tok.value : tok.value[theme];
  lines.push(`  --${tok.name}: ${v};`);
}
for (const [name, stack] of Object.entries(t.type.families)) lines.push(`  --font-${name}: ${stack};`);
for (const fam of ['spacing', 'radius', 'shadow', 'layout']) {
  for (const tok of t[fam]?.tokens ?? []) lines.push(`  --${tok.name}: ${tok.value};`);
}
lines.push('}', '');
writeFileSync(new URL('../src/styles/tokens.css', import.meta.url), lines.join('\n'));
console.log('src/styles/tokens.css written');
