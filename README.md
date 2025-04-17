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

## ขั้นตอนการติดตั้ง
```
1. git clone https://github.com/hellOoSaksit/Interview-Crypto.git
2. cd Interview-Crypto
3. npm i
4. npx prisma generate
5. ติดตั้ง DATABASE ตามข้างล่าง
6. ตั้งค่า SQL ที่ไฟล์ .env
7. nest start --watch
```
## ขั้นตอนการSQL (PostgreSql)
1. สร้าง Database
   
![image](https://github.com/user-attachments/assets/617ed4a5-142c-4079-b959-59a6c91ea794)

2.เลือก Restore

![image](https://github.com/user-attachments/assets/a59d1d69-f0f6-4f3d-9446-7b6de57738ed)

3.เลือกที่อยู่ไฟล์ (อยู่ใน โฟเดอร์ SQL ) และกด Restore

![image](https://github.com/user-attachments/assets/cea1add0-9d21-4e4c-b5c6-96846f62e814)

4.ตรวจสอบข้อมูลเริ่มต้น

**shasma**  ที่ควนมี

![image](https://github.com/user-attachments/assets/15a832e0-84c1-4b35-84d7-9aa5506999aa)

ข้อมูลที่ควรมีใน Currency

![image](https://github.com/user-attachments/assets/82f8998f-081f-41d4-9338-5d3890fd3015)

ข้อมูลที่ควรมีใน Order

![image](https://github.com/user-attachments/assets/bf2a5b95-d4ad-4b7a-b235-753201ffc622)

ข้อมูลที่ควรมีใน Order_History

![image](https://github.com/user-attachments/assets/b5c1a2af-d85f-411a-9d7b-4734d881e535)

ข้อมูลที่ควนมีใน Transaction_History

![image](https://github.com/user-attachments/assets/51352bc6-d963-4082-8ee1-26cb66dcb582)

ข้อมูลที่ควรมีใน User

![image](https://github.com/user-attachments/assets/e1ba232c-9c55-4d7b-a7ab-e0b113cdb80c)

ช้อมูลที่ควรมีใน Wallet

![image](https://github.com/user-attachments/assets/3b3a0030-29f9-4909-81f4-de7d8d03548e)


## 🔌 API ทั้งหมด
```
Register                  [POST]         : http://localhost:5000/auth/register

Login                     [POST]         : http://localhost:5000/auth/login

GetProfile                [GET]          : http://localhost:5000/member/profile

TopUp                     [POST]         : http://localhost:5000/member/topup

Exchange                  [POST]         : http://localhost:5000/member/wallet/exchange

TradeSeller               [POST]         : http://localhost:5000/member/trade/sell

TradeBuying               [POST]         : http://localhost:5000/member/trade/buy

Transaction               [POST]         : http://localhost:5000/member/wallet/transaction

GetOrderAll               [GET]          : http://localhost:5000/member/order

GetWalletProfile          [GET]          : http://localhost:5000/member/wallet/profile

GetTransaction_History    [GET]          : http://localhost:5000/member/TransactionHistory

GetOrder_History          [GET]          : http://localhost:5000/member/orderHistory
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
POST   http://localhost:5000/member/topup
```

**Body**
```
{
    "currency_code" : "THB", 
    "amount" : 1000000
}


```
> 💡 **currency_code** : `เลือกว่าจะเติม THB หรือ USD เท่านั้น`

> 💡 **amount**: `จำนวนการเติม`


**Response**

![image](https://github.com/user-attachments/assets/7bd112a0-2851-4dbb-af2c-aa3e85dcf5ab)




### 📝 GetOrder

**Endpoint**
```
GET     http://localhost:5000/member/order
```


**Response**

![image](https://github.com/user-attachments/assets/fd344e7e-58c3-4370-ad74-798062057963)

### 📝 GetTransaction History

**Endpoint**
```
GET    http://localhost:5000/member/TransactionHistory
```
![image](https://github.com/user-attachments/assets/eea3fb7d-c92f-486a-bbb5-2f26aa253f89)




**Response**

### 💳 GetOrder History

**Endpoint**
```
GET   http://localhost:5000/member/orderHistory
```


**Response**

![image](https://github.com/user-attachments/assets/71bd1c91-3842-4fe2-bae1-6d36a29efaf7)



### 💳 Exchange

**Endpoint**
```
POST    http://localhost:5000/member/wallet/exchange
```

**Body**
```
{
    "from_currency" : "THB",
    "to_currency" : "USD",
    "amount" : 10000000
}
```
> 💡 **from_currency** : `ไม่สามารถเปลี่ยนได้`

> 💡 **to_currency**: `ไม่สามารถเปลี่ยนได้`

> 💡 **amount**: `จำนวนเงินที่เติม`


**Response**

หากยอดเงิน THB มีพอที่จะแลก

![image](https://github.com/user-attachments/assets/e630122e-ac73-428b-ae57-1ea46b1bb383)

หากยอดเงิน THB ไม่พอ

![image](https://github.com/user-attachments/assets/139f77fa-6a66-4c55-997c-008787cfb23b)


### ⚖️ TradeSeller

**Endpoint**
```
POST    http://localhost:5000/member/trade/sell
```

**Body**
```
{
    "order_type" : "SELL",
    "from_currency" : "DOGE",
    "amount" : 100,
    "price" : 10000
}
```
> 💡 **order_type** : `ไม่สามารถเปลี่ยนได้`

> 💡 **from_currency**: `ประเภทเหรียญที่จะขาย  เช่น XRP , ETH , BTC , DOGE ไม่สามารถขาย USD หรือ THB` 

> 💡 **amount**: `จำนวนเงินที่อยากขาย (เหรียญที่อยากขาย)`

> 💡 **price**: `ราคาขายต่อเหรียญ`


**Response**

![image](https://github.com/user-attachments/assets/43faf69d-d6ba-420e-a259-3a51094b84a6)

### ⚖️ TradeBuying

**Endpoint**
```
POST    http://localhost:5000/member/trade/buy
```

**Body**
```
{
    "seller_wallet_id" :"00000000-0000-0000-0000-000000000000",
    "currency" : "BTC",
    "amount" : 1
}
```
> 💡 **seller_wallet_id** : `Wallet ที่ต้องการซื้อ (คนขาย)`

> 💡 **currency**: `ประเภทเหรียญ  เช่น XRP , ETH , BTC , DOGE ` 

> 💡 **amount**: `จำนวนเงินที่ซื้อ`



**Response**
ผู้ใช้ไม่สามารถซื้อ เหรียญตัวเองได้

![image](https://github.com/user-attachments/assets/deb8ed69-28fb-458c-8339-22ee22a96bb3)

ผู้ซื้อมีเงิน USD มากพอสามารถซื้อได้

![image](https://github.com/user-attachments/assets/352e8a73-551d-4a30-8c32-567de9acb9df)

ผู้ซื้อมีเงินไม่มากพอ

![image](https://github.com/user-attachments/assets/13d47793-26ce-4c7e-9600-cb22dc2656a0)

### ⚖️ Transaction

**Endpoint**
```
POST    http://localhost:5000/member/wallet/transaction
```

**Body**
```
{
    "to_wallet_id" : "00000000-0000-0000-0000-000000000000",
    "currency_code" : "BTC",
    "amount" : 1
}
```
> 💡 **seller_wallet_id** : `Wallet ที่ต้องการโอนเงิน`

> 💡 **currency**: `ประเภทเหรียญ  เช่น XRP , ETH , BTC , DOGE ` 

> 💡 **amount**: `จำนวนเหรียญที่โอน`



**Response**

หากผู้โอนมีเหรียญมากพอ

![image](https://github.com/user-attachments/assets/32fff6dc-01a0-4163-b0ca-53ae3a8b511b)

หากผู้โอนมีเหรียญไม่มากพอ

![image](https://github.com/user-attachments/assets/d9cb5ebf-3f67-46ee-9162-269dc237b35a)



---

> หากต้องการตัวอย่าง Prisma Model, Controller หรือ Seed เพิ่มเติม สามารถแจ้งได้ครับ 👨‍💻
