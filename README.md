# Highway Frontend

This is the frontend for the **Highway Assignment** project. It is built using **React**, **TypeScript**, **Tailwind CSS**, and other modern frontend tools.

> 🚀 The backend is live at: [https://highwayassignment.onrender.com](https://highwayassignment.onrender.com)

---

## 🛠️ Tech Stack

- **React** 19
- **TypeScript**
- **React Router DOM** v7
- **Tailwind CSS**
- **Axios**
- **Jest + React Testing Library**

---

## 📁 Project Structure

```
highway-frontend/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── styles/
│   ├── App.tsx
│   └── index.tsx
├── tailwind.config.js
├── tsconfig.json
├── package.json
└── README.md
```

---

## 🔧 Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/sushim123/highwayAssignment.git
cd highwayAssignment
```

### 2. Switch to the `frontend` branch

```bash
git checkout frontend
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

The app will run on: [http://localhost:3000](http://localhost:3000)

---

## 🌐 API Proxy Setup

The frontend proxies API requests to the backend using this entry in `package.json`:

```json
"proxy": "https://highwayassignment.onrender.com"
```

This avoids CORS issues during local development.

---

## 📦 Scripts

| Command           | Description                          |
|------------------|--------------------------------------|
| `npm run dev`     | Start the development server         |
| `npm start`       | Alias for `npm run dev`              |
| `npm run build`   | Build the app for production         |
| `npm test`        | Run unit tests                       |
| `npm run eject`   | Eject from Create React App config   |

---

## 🧪 Running Tests

```bash
npm test
```

Runs the test suite using React Testing Library and Jest.

---

## 📃 License

This project is licensed under the MIT License.

---

## 🙌 Contributing

Pull requests and suggestions are welcome! Please open an issue first to discuss changes if needed.