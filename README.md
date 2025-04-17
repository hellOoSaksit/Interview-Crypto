
## 🗂️ About Project
โจทย์
โจทย์ข้อ 1 

ให้ออกแบบระบบฐานข้อมูล(ทำเป็นรูปแบบ ER) ที่เป็นตัวกลางของการแลกเปลี่ยน Cryptocurrencies เช่น Bitcoin โดย สามารถนำเงิน Fiat (THB,USD) มาซื้อเหรียญ จาก User คนอื่นๆในระบบได้ และสามารถจะโอนเหรียญหากันภายในระบบ หรือ โอนหาคนอื่นภายนอกระบบได้ 
ยกตัวอย่าง https://c2c.binance.com/th/trade/buy/BTC

- ระบบสามารถตั้ง ซื้อ-ขาย Cryptocurrencies (BTC,ETH,XRP, DOGE)
- ระบบบันทึกการโอนเงินและซื้อ-ขายแลกเปลี่ยน
- ระบบมีการสร้างบัญชีผู้ใช้

โจทย์ข้อ 2 

นำ ER Diagram จากข้อ 1 มาเขียนโดยใช้ Node.js หรือ PHP

- เขียน Method ใน Model เพื่อดึงข้อมูลของ Model อื่นๆที่ความสัมพันธ์กัน ตัวอย่าง
  https://laravel.com/docs/8.x/eloquent-relationships#one-to-many
- เขียน Controller และ Routing ในส่วนหลักๆของระบบ ไม่จำเป็นต้องทำทั้งหมด
- สร้างไฟล์สำหรับ Seed ข้อมูล เพื่อใช้ในการทดสอบ




# .ENV

#### เพราะเป็นการ ทดสอบ ผมเลยทำการส่งไฟล์ .env ไฟล์ไว้ให้ครับ
- ทำการเปลี่ยนข้อมูลไฟล์เป็นของDATABASE ที่ตัวเองใช้นะครับ


```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/crypto"
```
