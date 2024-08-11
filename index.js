import { config as dotenvConfig } from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import path from "path";

import indexRouter from "./routes/index.js";
import booksRouter from "./routes/books.js";
import booksApiRouter from "./routes/api/books.js";

dotenvConfig();
const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set("view engine", "pug");
app.set("views");

app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", indexRouter);
app.use("/books", booksRouter);
app.use("/api/books", booksApiRouter);

app.listen(PORT, () => {
	console.log(`Сервер запущен на ${PORT}`);
});
