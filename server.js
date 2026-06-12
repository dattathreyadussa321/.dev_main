// cPanel Node.js App startup file.
// Prerequisites: npm install && npm run build
// cPanel "Application startup file" should point to: server.js
//
// This file delegates to the Next.js standalone server produced by `next build`.
// The standalone output bundles everything needed to run; no `next start` required.
'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'production';

require('./.next/standalone/server.js');
