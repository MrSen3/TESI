SELECT handle, title, paper_author.YEAR AS anno, paper_author.issn, journal, quartile
FROM paper_author JOIN quartile_best
ON paper_author.issn=quartile_best.issn AND paper_author.YEAR=quartile_best.YEAR
WHERE matricola='x'
AND typeID='1'