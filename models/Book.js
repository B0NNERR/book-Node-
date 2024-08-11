import { v4 as uuid } from "uuid";

export default class Book {
	constructor(
		title,
		desciption,
		authors,
		favorite,
		fileCover,
		fileName,
		fileBook
	) {
		this.id = uuid();
		this.title = title;
		this.desciption = desciption;
		this.authors = authors;
		this.favorite = favorite;
		this.fileCover = fileCover;
		this.fileName = fileName;
		this.fileBook = fileBook;
	}
}
