# Chen Yang's Home Page

Personal academic website for Chen Yang.

## Development

Requires Node.js 20 or newer. No third-party dependencies are needed.

```bash
npm run dev    # Preview at http://localhost:4173
npm run check  # Validate content and build the site
npm run build  # Write the site to dist/
```

Edit homepage content in `src/content.mjs`. Place images and videos in `public/`; do not edit generated files in `dist/`.

The CV source is in `cv/chen-yang-cv.tex`, and the downloadable version is `public/cv.pdf`. See [cv/README.md](cv/README.md) to rebuild it.

## Publishing

Set the production URL in `src/content.mjs`, run `npm run check`, and manually trigger the GitHub Pages workflow.
