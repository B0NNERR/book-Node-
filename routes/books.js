import express from "express";

import store from "./../store/index.js";

import fileMiddleware from "./../middlewares/file.js";
import Book from "../models/Book.js";

const router = express.Router();

router.get("/", (req, res) => {
	const books = store.books;

	res.render("book/index", {
		title: "Библиотека",
		books,
		path: "/books",
	});
});

router.get("/create", (req, res) => {
	res.render("book/create", {
		title: "Создание записи",
		book: {
			title: "",
			description: "",
			authors: "",
			favorite: "",
			fileCover: "",
		},
		isCreate: true,
	});
});

router.post("/create", fileMiddleware.single("fileCover"), (req, res) => {
	const body = req.body;
	console.log(req.file);
	store.books.push(
		new Book(
			body.title,
			body.description,
			body.authors,
			body.favorite,
			req.file.filename,
			"next fix",
			"next fix"
		)
	);

	res.redirect("/books");
});

router.get("/:id", (req, res) => {
	const books = store.books;
	const id = req.params?.id;
	const book = books.find((book) => book.id === id);

	if (!books.length || !id || !book) {
		res.status(404).redirect("/404");
	}

	res.render("book/view", {
		title: "Обзор книги",
		book,
	});
});

router.get("/update/:id", (req, res) => {
	const books = store.books;
	const id = req.params?.id;
	const book = books.find((book) => book.id === id);

	if (!books.length || !id || !book) {
		res.status(404).redirect("/404");
	}
	res.render("book/update", {
		title: "Обновить книгу",
		book,
	});
});

router.post("/update/:id", fileMiddleware.single("fileCover"), (req, res) => {
	const books = store.books;
	const id = req.params?.id;
	const book = books.find((book) => book.id === id);
	const body = req.body;

	book.title = body.title;
	book.description = body.description;
	book.authors = body.authors;
	book.favorite = body.favorite;
	book.fileCover = req.file.filename;

	if (!books.length || !id || !book || !req.file || !req.file.path) {
		res.redirect("/404");
	}

	res.redirect("/books");
});

router.post("/delete/:id", (req, res) => {
	const books = store.books;
	const id = req.params?.id;
	const book = books.find((book) => book.id === id);

	if (!books.length || !id || !book) {
		res.redirect("/404");
	}

	store.books = books.filter((book) => book.id !== id);

	res.redirect("/books");
});

export default router;
