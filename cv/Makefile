.PHONY: cv clean

cv: cv.tex
	pdflatex -interaction=nonstopmode cv.tex
	# Run twice for proper references
	pdflatex -interaction=nonstopmode cv.tex
	cp cv.pdf ../public/cv.pdf

clean:
	rm -f *.aux *.log *.out *.fdb_latexmk *.fls *.synctex.gz

