
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

กำหนด รหัสผ่านและผู้ใช้ DB -> Crypto

```

# ภาษาและ Lib ที่ใช้งานหลัก
- Nest.Js
- Prisma
- decimal.js



# ER diagram


```
 LINK : https://dbdiagram.io/d/Interview-67ff891e1ca52373f539090b
```


![ER](https://github.com/user-attachments/assets/9868114d-8f67-4933-981b-3a5a040388e3)


# แนวความคิดในการออกแบบ ระบบ
1. ต้องทำระบบ Login ที่สามารถยืนยันผู้ใช้ได้ในระดับหนึง
   - ทำการสร้าง JWT และ COOKIE เพือเก็บ ข้อมูล Users ในการเข้าสู่ระบบ
2. วางแผนการแลกเปลี่่ยนค่าเงินหลักในการซื้อขายเหรียญ
   - จากโจทย์ จะเห็นว่า ใช้ THB,USD เพราะเฉพาะ เลยจะทำการออกดั้งต่อไปนี้
       * ใช้ค่าเงินหลักเป็น USD
       * สร้างระบบแปลงค่าเงินจาก THB -> USD
       * นำ USD เป็นค่าเงินในการแลกเปลี่ยนหลัก
3. ระบบ การซื้อขาย และ แลกเปลี่ยน
   - ออกแบบ ระบบ ซื้อขาย โดยผู้ขายสามารถวางขายเหรียญได้ เช่น จำนวน , ราคา , ชนิดเหรียญ
   - ออกแบบ Log โดยอ้างอิ่งถึง หลักๆ คือ  
       * OrderID เป็นตัวหลักในการซื้อขายไม่สามารถใช้ walletID เพราะ ตาราง order จะถูกลบออกเมือผู้ขายเหรียญหมด
   - ระบบแลกเปลี่ยน
       * ผู้ใช้ สามารถโอนเหรียญ กันได้ โดย Log จะเก็บบันทึกการโอนของผู้ใช้งาน
  
# API & TEST BY POSTMAN

![image](https://github.com/user-attachments/assets/b8d43cc5-a2b4-4b89-85ad-2eb132486cb6)

## ระบบ Register 

```
http://localhost:5000/auth/register
```

###ตัวอย่างข้อมูลที่ใส่

```
{
    "email" : "Buying_Start@gmail.com",
    "password" : "0000",
    "username" : "Buying"
}
```

###ข้อมูลตอบกลับ

![image](https://github.com/user-attachments/assets/130ad1f9-bad0-4623-8092-2f535e949d61)

###หากมีผู้ใช้ซ้ำ 

![image](https://github.com/user-attachments/assets/6b9e4251-be73-467b-a23f-77784d286831)








