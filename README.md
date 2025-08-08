# Chen Yang - Academic Homepage

This is my personal academic website built with [Astro](https://astro.build) and deployed on GitHub Pages.

## 🌐 Website

Visit: https://yangchen73.github.io

## 🚀 Tech Stack

- **Framework**: [Astro](https://astro.build) - Modern static site generator
- **Styling**: [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework
- **Deployment**: [GitHub Pages](https://pages.github.com) + [GitHub Actions](https://github.com/features/actions)
- **Fonts**: Inter + Noto Sans SC

## 📁 Project Structure

```
/
├── src/
│   ├── layouts/          # Layout components
│   ├── pages/           # Page files
│   └── styles/          # Style files
├── public/              # Static assets
│   ├── profile.jpg      # Profile photo
│   ├── cv.pdf          # Resume
│   └── favicon.svg     # Website icon
├── .github/workflows/   # GitHub Actions configuration
└── package.json
```

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview build
npm run preview
```

## 🚀 Deployment

The website is automatically deployed via GitHub Actions:

1. Push code to `main` branch
2. GitHub Actions automatically builds
3. Deploy to GitHub Pages

## 📝 Content Updates

To update website content, edit `src/pages/index.astro` file, then:

```bash
git add .
git commit -m "Update website content"
git push origin main
```

## 🎨 Features

- ✨ Responsive design
- 🌙 Dark/light theme toggle
- 📱 Mobile optimized
- ⚡ Fast loading
- 🔍 SEO friendly

## 📄 License

MIT License

---

**Contact**: [GitHub](https://github.com/yangchen73)
