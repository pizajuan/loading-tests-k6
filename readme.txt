Los tests de estrés fueron diseñados con la herramienta k6

https://k6.io/docs/getting-started/running-k6

Primero realizar la instalación de la misma y correrla

para ejecutar un test se debe ejecutar el siguiente comando en la misma ruta del .js

k6 run script.js 

y si quiere escribirse la salida del test en un archivo el siguiente

k6 run script.js > output.txt
--summary-export=export.json