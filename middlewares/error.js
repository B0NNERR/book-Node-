export default (req, res, next) => {
	res.status(404);
	res.json({
		error: {
			code: 404,
			message: "Не найден такой ROUTE",
		},
	});
	res.end();
};
