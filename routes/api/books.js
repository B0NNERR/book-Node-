import express from "express";
import path from "path";

import errorMiddleware from "./../../middlewares/error.js";
import fileMiddleware from "./../../middlewares/file.js";

import Book from "./../../models/Book.js";
import store from "./../../store/index.js";

const errorTemplate = (code, message, params = {}) => ({
	error: {
		code,
		message,
		params,
	},
});

const router = express.Router();

router.post("/api/user/login", (req, res) => {
	const body = req.body;

	res.json({ id: 1, mail: "test@mail.ru" });
});

router.get("/", (req, res) => {
	const books = store.books;

	if (!books) {
		res.status(404);
		res.json(errorTemplate(404, `ERROR! В хранилище нет книг.`));
		return;
	}

	res.status(200).json(books);
});

router.get("/:id", (req, res) => {
	const id = req.params.id;
	const books = store.books;

	if (!books || !books.length) {
		res.status(404);
		res.json(errorTemplate(404, `ERROR! В хранилище нет книг.`));
		return;
	}

	const book = books.find((book) => book.id === id);

	if (!book) {
		res.status(404);
		res.json(
			errorTemplate(404, `ERROR! В хранилище нет книги с ID - '${id}'.`)
		);
		return;
	}

	res.status(200).json(book);
});

router.post("/", fileMiddleware.single("file-book"), (req, res) => {
	const body = req.body;

	if (!Object.keys(body)?.length) {
		res.status(500);
		res.json(errorTemplate(500, `ERROR! Необходимо передавать параметры.`));
		return;
	}

	const { title, description, authors, favorite, fileCover, fileName } = body;
	const paramsArray = [
		title,
		description,
		authors,
		favorite,
		fileCover,
		fileName,
	];
	const isMissParam = paramsArray.some((i) => !i);
	const isValidContent = paramsArray.every((i) => typeof i === "string");
	const isSomeoneEmptyContent = paramsArray.some((i) => !i?.length);

	if (isMissParam) {
		res.status(500).json(
			errorTemplate(
				500,
				"ERROR! Необходимо передать все параметры.",
				body
			)
		);
		return;
	}

	if (!isValidContent) {
		res.status(500).json(
			errorTemplate(
				500,
				"ERROR! Неверный тип данных, необходимо передавать данные типа STRING.",
				body
			)
		);
		return;
	}

	if (isSomeoneEmptyContent) {
		res.status(500).json(
			errorTemplate(500, "ERROR! Параметры не должны быть пустыми", body)
		);
		return;
	}

	if (!req.file) {
		res.status(500).json(
			errorTemplate(500, "ERROR! Необходимо загрузить файл!")
		);
		return;
	}

	const newBook = new Book(...Object.values(body), req.file.path);
	store.books.push(newBook);

	res.status(201).json({ message: "SUCCESS" });
});

router.put("/:id", fileMiddleware.single("file-book"), (req, res) => {
	const id = req.params?.id;
	const bookIndex = store.books.findIndex((i) => i.id === id);
	const body = req.body;

	if (bookIndex === -1) {
		res.status(404);
		res.json(
			errorTemplate(404, `ERROR! В хранилище нет книги с ID - '${id}'.`)
		);
		return;
	}

	const { title, description, authors, favorite, fileCover, fileName } = body;
	const paramsArray = [
		title,
		description,
		authors,
		favorite,
		fileCover,
		fileName,
	];
	const isMissParam = paramsArray.some((i) => !i);
	const isValidContent = paramsArray.every((i) => typeof i === "string");
	const isSomeoneEmptyContent = paramsArray.some((i) => !i.length);

	if (isMissParam) {
		res.status(500).json(
			errorTemplate(
				500,
				"ERROR! Необходимо передать все параметры.",
				body
			)
		);
		return;
	}

	if (!isValidContent) {
		res.status(500).json(
			errorTemplate(
				500,
				"ERROR! Неверный тип данных, необходимо передавать данные типа STRING.",
				body
			)
		);
		return;
	}

	if (isSomeoneEmptyContent) {
		res.status(500).json(
			errorTemplate(500, "ERROR! Параметры не должны быть пустыми", body)
		);
		return;
	}

	if (!req.file) {
		res.status(500).json(
			errorTemplate(500, "ERROR! Необходимо загрузить файл!")
		);
		return;
	}

	store.books[bookIndex] = { id, ...body, fileBook: req.file.path };

	res.status(201).json({ message: "SUCCESS" });
});

router.delete("/:id", (req, res) => {
	const { id } = req.params;
	const bookIndex = store.books.findIndex((i) => i.id === id);

	if (bookIndex === -1) {
		res.status(404);
		res.json(
			errorTemplate(404, `ERROR! В хранилище нет книги с ID - '${id}'.`)
		);
		return;
	}

	store.books = store.books.filter((e, i) => i != bookIndex);

	res.status(201).json({ message: "SUCCESS" });
});

router.get("/:id/download", (req, res) => {
	const id = req.params.id;
	const books = store.books;

	if (!books || !books.length) {
		res.status(404);
		res.json(errorTemplate(404, `ERROR! В хранилище нет книг.`));
		return;
	}

	const book = books.find((book) => book.id === id);

	if (!book) {
		res.status(404);
		res.json(
			errorTemplate(404, `ERROR! В хранилище нет книги с ID - '${id}'.`)
		);
		return;
	}
	const linkOnFile = path.parse(book.fileBook);
	console.log(linkOnFile.dir + linkOnFile.base);
	res.download(
		path.join(linkOnFile.dir, linkOnFile.base),
		`fileBook.${linkOnFile.ext}`,
		(err) => {
			if (err) {
				res.json(
					errorTemplate(500, "ERROR! Не удалось извлечь изображение")
				);
				res.end();
			}
		}
	);
});

router.use(errorMiddleware);

export default router;
