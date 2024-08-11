import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
	res.render("index", {
		title: "Главная",
		path: "/",
	});
});

router.get("/404", (req, res) => {
	res.render("404", {
		title: "Ошибка",
	});
});

export default router;
