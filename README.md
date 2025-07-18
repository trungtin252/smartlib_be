# 📚 SmartLib Backend

SmartLib Backend là hệ thống máy chủ được xây dựng bằng Node.js, Express và MongoDB phục vụ cho ứng dụng thư viện thông minh. Dự án hỗ trợ các chức năng như:

* Quản lý tài nguyên thư viện qua API
* Upload ảnh lên Cloudinary
* Tạo mã QR cho tài nguyên
* Lưu trữ và truy vấn dữ liệu với MongoDB

---

## 🚀 Tính năng chính

* ✅ RESTful API cho quản lý thư viện
* ☁️ Upload ảnh lên Cloudinary
* 📆 Lưu trữ dữ liệu bằng MongoDB qua Mongoose
* 🔐 Bảo mật thông tin cấu hình bằng `.env`
* 🔁 Tự động reload với `nodemon` khi dev
* 🧽 Format và lint code với ESLint + Prettier

---

## 🛠️ Công nghệ sử dụng

| Công nghệ              | Mục đích                       |
| ---------------------- | ------------------------------ |
| **Express**            | Xây dựng Web API               |
| **MongoDB & Mongoose** | Cơ sở dữ liệu NoSQL            |
| **Cloudinary, Multer** | Xử lý và upload ảnh            |
| **QRCode**             | Tạo mã QR từ chuỗi             |
| **Dotenv**             | Quản lý biến môi trường        |
| **Nodemon**            | Tự động reload server          |
| **ESLint + Prettier**  | Kiểm tra và định dạng mã nguồn |

---

## ⚙️ Cài đặt và chạy dự án

### 1. Clone repository

```bash
git clone https://github.com/trungtin252/smartlib_be.git
cd smartlib_be
```

### 2. Cài đặt package

```bash
npm install
```

### 3. Tạo file `.env`

Tạo file `.env` ở thư mục gốc với nội dung sau:

```env
PORT=3000
MONGO_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/dbname

# Cloudinary upload
CLOUD_NAME=your_cloud_name
API_KEY=your_api_key
API_SECRET=your_api_secret
```

> ⚠️ Thay thế các giá trị `<...>` bằng thông tin thực tế của bạn.

---

### 4. Chạy server

```bash
npm start
```

> Server mặc định chạy tại `http://localhost:3000`

---
