SELECT p1.YEAR, p2.matricola, p2.cognome, p2.nome, COUNT(*) AS contributi
FROM paper_author p1 JOIN  paper_author p2
ON p1.handle=p2.handle
WHERE p1.matricola='x'
and p1.matricola!=p2.matricola
GROUP BY p1.YEAR, p2.matricola