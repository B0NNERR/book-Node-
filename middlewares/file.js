import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
	destination(req, file, cb) {
		cb(null, path.join(__dirname, "..", "public", "imgs"));
	},
	filename(req, file, cb) {
		cb(
			null,
			`${new Date().toISOString().replace(/:/g, "-")}-${
				file.originalname
			}`
		);
	},
});

const allowedTypes = ["image/png", "image/jpg", "image/jpeg", "image/webp"];

const fileFilter = (req, file, cb) => {
	if (allowedTypes.includes(file.mimetype)) {
		cb(null, true);
	} else {
		cb(null, false);
	}
};

export default multer({ fileFilter, storage });
