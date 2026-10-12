// Post-build: turn root-absolute asset paths ("/_astro/x.css", "/favicon.svg") into
// paths relative to each page, so dist/ works on any host, sub-path or file preview.
import fs from 'node:fs';
import path from 'node:path';

const dist = path.resolve('dist');

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => {
    const p = path.join(dir, d.name);
    return d.isDirectory() ? walk(p) : [p];
  });
}

const files = walk(dist);
for (const file of files) {
  const rel = path.relative(dist, path.dirname(file));
  const prefix = rel ? '../'.repeat(rel.split(path.sep).length) : './';
  if (file.endsWith('.html')) {
    let html = fs.readFileSync(file, 'utf8');
    html = html.replace(/(href|src|component-url|renderer-url|before-hydration-url)="\/(?!\/)/g, `$1="${prefix}`);
    fs.writeFileSync(file, html);
  } else if (file.endsWith('.css')) {
    // CSS lives in dist/assets; its url(/assets/...) become siblings.
    let css = fs.readFileSync(file, 'utf8');
    css = css.replace(/url\(\/assets\//g, 'url(./');
    fs.writeFileSync(file, css);
  } else if (file.endsWith('.js')) {
    // Vite preload helpers reference "/assets/..."; make them sibling-relative.
    let js = fs.readFileSync(file, 'utf8');
    if (js.includes('"/assets/')) {
      js = js.replace(/"\/assets\//g, '"./');
      fs.writeFileSync(file, js);
    }
  }
}
console.log(`relativized ${files.length} files`);
