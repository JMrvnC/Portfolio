import fs from 'fs';

const html = fs.readFileSync('index.html', 'utf8');
const match = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
if (!match) throw new Error('Could not extract body from index.html');

let body = match[1];
body = body.replace(/\s*<script\s+src="script\.js"><\/script>\s*/i, '\n');
body = body.replace('<form class="space-y-6">', '<form id="contactForm" class="space-y-6">');

const content = `---
import BaseLayout from '../layouts/BaseLayout.astro';

const scriptSrc = \`\${import.meta.env.BASE_URL}script.js\`;
---
<BaseLayout>
${body.trim()}
<script is:inline src={scriptSrc} defer></script>
</BaseLayout>
`;

fs.writeFileSync('src/pages/index.astro', content, 'utf8');

const sample = fs.readFileSync('src/pages/index.astro', 'utf8');
console.log('wrote', fs.statSync('src/pages/index.astro').size, 'bytes');
console.log('has arrow', sample.includes('→'));
console.log('has emoji', sample.includes('🎓'));
console.log('has copyright', sample.includes('©'));
console.log('has contactForm', sample.includes('id="contactForm"'));
