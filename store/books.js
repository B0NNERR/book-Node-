import { v4 as randomId } from "uuid";

const books = [
	{
		id: randomId(),
		title: "The Great Adventure",
		description: "A thrilling journey across unknown lands.",
		authors: "John Doe",
		favorite: true,
		fileCover: "great_adventure_cover.webp",
		fileName: "the_great_adventure.pdf",
		fileBook: "the_great_adventure.pdf",
	},
	{
		id: randomId(),
		title: "Mystery of the Old Mansion",
		description: "A detective story set in an abandoned mansion.",
		authors: "Jane Smith",
		favorite: false,
		fileCover: "mystery_mansion_cover.jpg",
		fileName: "mystery_of_the_old_mansion.pdf",
		fileBook: "mystery_of_the_old_mansion.pdf",
	},
	{
		id: randomId(),
		title: "Space Odyssey",
		description: "An epic tale of exploration in the outer space.",
		authors: "Arthur Clark",
		favorite: true,
		fileCover: "space_odyssey_cover.jpg",
		fileName: "space_odyssey.pdf",
		fileBook: "space_odyssey.pdf",
	},
];

export default books;
