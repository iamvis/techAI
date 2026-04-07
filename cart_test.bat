@echo off
cd /d c:\Users\prjap\Desktop\TecAI_task
set PRODUCT_ID=69d4a650b215f76f1d9408db
curl -s -X POST http://localhost:5000/api/cart -H "Content-Type: application/json" -d "{\"productId\":\"%PRODUCT_ID%\",\"quantity\":2}" > cart_add.txt
type cart_add.txt
echo ---
curl -s http://localhost:5000/api/cart > cart_list.txt
type cart_list.txt
echo ---
for /f "usebackq tokens=2 delims=:," %%a in (`findstr /i /c:"_id" cart_list.txt ^| findstr /i /v "productId"`) do (
    set CART_ID=%%a
    goto :break
)
:break
echo Cart item id=%CART_ID%
curl -s -X DELETE http://localhost:5000/api/cart/%CART_ID% > cart_delete.txt
type cart_delete.txt
