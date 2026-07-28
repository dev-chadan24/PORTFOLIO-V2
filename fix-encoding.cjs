// FINAL FIX - based on byte-level analysis
// em dash mojibake: C3A2 E282AC E2809D = U+00E2 U+20AC U+201D = â€"
// middle dot mojibake: C2B7 = U+00C2 + U+00B7 = Â·
// right arrow mojibake: from bytes E2 86 92 misread as Win-1252

const fs = require('fs');
const path = require('path');

function getAllFiles(dir) {
  const results = [];
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const e of entries) {
      const full = path.join(dir, e.name);
      if (e.isDirectory() && !['node_modules','.git','dist','.output','.vercel','.wrangler','.tanstack','.nitro'].includes(e.name)) {
        results.push(...getAllFiles(full));
      } else if (e.isFile() && /\.(tsx?|css|md)$/.test(e.name) && !e.name.includes('fix-encoding')) {
        results.push(full);
      }
    }
  } catch(e) {}
  return results;
}

const files = getAllFiles('src');
files.push('AUDIT.md', 'README.md', 'version.md');

let totalFixed = 0;

files.forEach(f => {
  try {
    let content = fs.readFileSync(f, 'utf8');
    const orig = content;

    // THE ACTUAL MOJIBAKE:
    // em dash: U+00E2 + U+20AC + U+201D  → U+2014 (—)
    content = content.split('\u00e2\u20ac\u201d').join('\u2014');
    // em dash variant: U+00E2 + U+20AC + U+201C → U+2014 (—) [alternate]
    content = content.split('\u00e2\u20ac\u201c').join('\u2014');
    
    // middle dot: U+00C2 + U+00B7 → U+00B7 (·)
    content = content.split('\u00c2\u00b7').join('\u00b7');
    
    // right arrow: → let's check: E2 86 92 in Win-1252: â (E2) + † (86) + ' (92)
    // U+00E2 + U+2020 + U+2019 → U+2192 (→)
    content = content.split('\u00e2\u2020\u2019').join('\u2192');
    
    // left arrow: ← E2 86 90 in Win-1252: â (E2) + † (86) + (90=private char)
    // U+00E2 + U+2020 + U+0090 → U+2190 (←)
    content = content.split('\u00e2\u2020\u0090').join('\u2190');

    // right single quote: E2 80 99 → â (E2) + (80=€) + (99=™)
    // U+00E2 + U+20AC + U+2122 → U+2019 (')
    content = content.split('\u00e2\u20ac\u2122').join('\u2019');

    // en dash: U+2013 → E2 80 93 → â€" = U+00E2 + U+20AC + U+0093 (no, 0x93=")
    // Win-1252 0x93 = U+201C left double quote
    // so: U+00E2 + U+20AC + U+201C → could be en dash
    
    // Â· also fix the combined encoding artifact
    content = content.split('\u00c2\u00b7').join('·');

    // Remove BOM if present
    content = content.replace(/^\uFEFF/, '');

    if (content !== orig) {
      fs.writeFileSync(f, content, 'utf8');
      const fixes = content.length - orig.length;
      console.log(`FIXED (${orig.length - content.length} chars removed): ${f}`);
      totalFixed++;
    }
  } catch(e) {
    // skip missing files
  }
});

console.log('\nTotal files fixed: ' + totalFixed);
