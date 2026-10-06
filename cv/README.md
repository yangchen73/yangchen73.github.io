# Chen Yang academic CV

The source adapts [Sina Atalay's RenderCV EngineeringResumes theme on Overleaf](https://www.overleaf.com/latex/templates/rendercv-engineeringresumes-theme/shwqvsxdgkjy). The original PDF supplied by Chen Yang has the same core visual features: Charter typography, centered header, underlined section titles, and right-aligned dates.

Edit `chen-yang-cv.tex`, then build from the repository root:

```bash
latexmk -pdf -interaction=nonstopmode -halt-on-error -outdir=cv/build cv/chen-yang-cv.tex
cp cv/build/chen-yang-cv.pdf public/cv.pdf
```

The homepage links to `public/cv.pdf`. Before sending the CV to an application, confirm that the GPA and expected graduation date are current; those figures were carried over from the May 2026 CV.
