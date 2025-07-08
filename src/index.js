"use strict";
// src/index.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// Create an Express application instance
const app = (0, express_1.default)();
// Define the port the server will listen on
const port = process.env.PORT || 3000;
// Define a route for the root URL ("/")
app.get("/", (req, res) => {
    // Send a simple text response
    res.send("Hello from Express with TypeScript!");
});
// Start the server and listen for incoming requests
app.listen(port, () => {
    // Log a message to the console when the server starts successfully
    console.log(`Server is running on http://localhost:${port}`);
});
