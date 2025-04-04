"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const records_1 = __importDefault(require("./routes/records"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let port = process.env.PORT || 5000;
let app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(records_1.default);
app.use(express_1.default.urlencoded({ extended: true }));
app.listen(port, () => {
    console.log(`Server is running on port: http://localhost:${port}`);
});
