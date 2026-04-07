@echo off
cd /d c:\Users\prjap\Desktop\TecAI_task
curl -s http://localhost:5000/api/products > product.txt
curl -s http://localhost:5000/api/categories > categories.txt
curl -s -X POST http://localhost:5000/api/newsletter -H "Content-Type: application/json" -d "{\"email\":\"dummy@test.com\"}" > newsletter.txt
if exist product.txt type product.txt
echo ---
if exist categories.txt type categories.txt
echo ---
if exist newsletter.txt type newsletter.txt
