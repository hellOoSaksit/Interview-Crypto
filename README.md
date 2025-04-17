# 🪙 Crypto Exchange System

## 🗂️ About Project

### 📌 โจทย์ข้อ 1  
ออกแบบระบบฐานข้อมูล (ER Diagram) สำหรับระบบแลกเปลี่ยน Cryptocurrencies เช่น Bitcoin  
- สามารถซื้อเหรียญโดยใช้เงิน Fiat (THB, USD)  
- สามารถโอนเหรียญให้กันภายในระบบ หรือส่งออกไปภายนอก  
- ตัวอย่าง: [Binance P2P](https://c2c.binance.com/th/trade/buy/BTC)

**ฟีเจอร์ที่ระบบต้องมี**
- ตั้งคำสั่ง “ซื้อ-ขาย” เหรียญ (BTC, ETH, XRP, DOGE)  
- บันทึกการโอนเงิน/การซื้อขาย/แลกเปลี่ยน  
- ระบบบัญชีผู้ใช้งาน  

### 📌 โจทย์ข้อ 2  
นำ ER Diagram จากข้อ 1 มาพัฒนาเป็นโปรเจกต์โดยใช้ **Node.js หรือ PHP**

**สิ่งที่ต้องทำ**
- สร้าง Model และเขียน Method สำหรับดึงข้อมูลความสัมพันธ์ (ตามตัวอย่าง [Laravel Relationship](https://laravel.com/docs/8.x/eloquent-relationships#one-to-many))  
- สร้าง Controller และ Routing ในส่วนหลัก ๆ  
- สร้าง Seed File สำหรับเตรียมข้อมูลทดสอบ  

## ⚙️ .ENV ที่ใช้เชื่อมต่อ Database

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/crypto"
```

> 💡 **Username**: `postgres`  
> 💡 **Password**: `postgres`  
> 💡 **Database**: `crypto`

## 🧩 Stack & Libraries ที่ใช้

- 🧠 **NestJS** – Backend Framework  
- 📊 **Prisma** – ORM สำหรับจัดการฐานข้อมูล  
- 🔢 **decimal.js** – สำหรับการคำนวณค่าตัวเลขที่แม่นยำ

## 📐 ER Diagram

> 🔗 ER Diagram: [dbdiagram.io](https://dbdiagram.io/d/Interview-67ff891e1ca52373f539090b)

![ER](https://github.com/user-attachments/assets/9868114d-8f67-4933-981b-3a5a040388e3)

## 💡 แนวคิดการออกแบบระบบ

### 1. ระบบ Login
- ใช้ JWT และ Cookie ในการจัดการ Session
- ยืนยันตัวตนของผู้ใช้ด้วย Token ที่ฝังใน Cookie

### 2. ระบบการแลกเปลี่ยนค่าเงิน
- ค่าเงินหลักในระบบใช้ **USD**  
- แปลงจาก THB เป็น USD ก่อนทำการซื้อขาย  
- ใช้ USD ในการคิดราคาทั้งหมด

### 3. ระบบซื้อขายและโอนเหรียญ
- ผู้ใช้สามารถตั้งขายเหรียญได้ พร้อมระบุจำนวน, ราคา และประเภทของเหรียญ  
- ใช้ OrderID ในการอ้างอิง (ไม่ใช้ WalletID เนื่องจากข้อมูลอาจถูกลบ)  
- ระบบโอนเหรียญสามารถบันทึก Log

## 🔌 API ทั้งหมด
```
Register            [POST]         : http://localhost:5000/auth/register

Login               [POST]         : http://localhost:5000/auth/login

GetProfile          [GET]          : http://localhost:5000/member/profile

TopUp               [POST]         : http://localhost:5000/member/topup

Exchange            [POST]         : http://localhost:5000/member/wallet/exchange

TradeSeller         [POST]         : http://localhost:5000/member/trade/sell

TradeBuying         [POST]         : http://localhost:5000/member/trade/buy

Transaction         [POST]         : http://localhost:5000/member/wallet/transaction

GetOrderAll         [GET]          : http://localhost:5000/member/order

GetWalletProfile    [GET]          : http://localhost:5000/member/wallet/profile
```


## 🔌 API ตัวอย่าง (Test ผ่าน Postman)

### ✅ Register

**Endpoint**
```
POST http://localhost:5000/auth/register
```

**Body**
```
{
    "email": "Buying_Start@gmail.com",
    "password": "0000",
    "username": "Buying"
}
```

**Response**
![register-success](https://github.com/user-attachments/assets/130ad1f9-bad0-4623-8092-2f535e949d61)

**หากผู้ใช้งานซ้ำ**
![register-duplicate](https://github.com/user-attachments/assets/6b9e4251-be73-467b-a23f-77784d286831)

### 🔐 Login

**Endpoint**
```
POST http://localhost:5000/auth/login
```

**Body**
```
{
    "email": "Buying_Start@gmail.com",
    "password": "0000"
}
```

**Response**

![login-success](https://github.com/user-attachments/assets/fe0c2c6b-70e2-43ac-a7e7-94752cae9307)

**หากรหัสผิด**

![login-fail](https://github.com/user-attachments/assets/67aa4619-473f-4a58-a68f-b4e9d91865db)

**Cookie ที่ได้รับ**

![cookie](https://github.com/user-attachments/assets/cf5f44af-193f-4f89-944e-e413ee415ecb)

**JWT ภายใน Cookie**

![jwt-decode](https://github.com/user-attachments/assets/99244009-74f8-4295-a44e-5a2cd4f87d3e)


### 🔐 Profile

**Endpoint**
```
GET  http://localhost:5000/member/profile
```

**Response**

![image](https://github.com/user-attachments/assets/c691b773-e610-46a8-9845-a0bd3b030400)


### 💳 TopUp

**Endpoint**
```
GET   http://localhost:5000/member/topup
```

**Response**

![image](https://github.com/user-attachments/assets/7bd112a0-2851-4dbb-af2c-aa3e85dcf5ab)




---

> หากต้องการตัวอย่าง Prisma Model, Controller หรือ Seed เพิ่มเติม สามารถแจ้งได้ครับ 👨‍💻
