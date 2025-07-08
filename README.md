# Highway Backend

This is the backend for the **Highway Assignment** project. It is built using **Express.js**, **TypeScript**, **MongoDB**, and supports **JWT-based authentication** with OTP email verification.

> 🌐 The backend is deployed and live at: [https://highwayassignment.onrender.com](https://highwayassignment.onrender.com)

For frontend integration instructions, refer to the [Highway Frontend README](../highway-frontend/README.md).

---

## 🛠️ Tech Stack

- **Node.js**
- **Express.js**
- **TypeScript**
- **Mongoose (MongoDB)**
- **JWT Authentication**
- **Nodemailer** (for OTP via email)
- **dotenv** for environment config

---

## 📂 Project Structure

```
highway-backend/
├── src/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── index.ts
├── dist/
├── .env.example
├── package.json
├── tsconfig.json
└── README.md
```

---

## 📦 Scripts

| Command         | Description                             |
|----------------|-----------------------------------------|
| `npm run dev`   | Start dev server with nodemon + ts-node |
| `npm run build` | Compile TypeScript to JavaScript        |
| `npm start`     | Start the compiled production server    |

---

## 🔧 Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/sushim123/highwayAssignment.git
cd highwayAssignment
```

### 2. Switch to the `backend` branch

```bash
git checkout backend
```

### 3. Create your environment variables

Copy `.env.example` to `.env` and update values accordingly:

```bash
cp .env.example .env
```

### 4. Install dependencies

```bash
npm install
```

### 5. Start the server

- For development:
  ```bash
  npm run dev
  ```
- For production:
  ```bash
  npm run build
  npm start
  ```

---

## 🌐 API Base URL

All API routes are accessible from:

```
https://highwayassignment.onrender.com
```

This is already proxied in the frontend for seamless integration.

---

## 📄 Environment Variables

The following variables should be configured in your `.env.example` file:

```
PORT=4000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password_or_app_password
```

---

## 📃 License

This project is licensed under the ISC License.

---

## 🙌 Contributing

Pull requests and suggestions are welcome! Please open an issue first to discuss any major changes.