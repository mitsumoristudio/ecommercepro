
import path from "path";
import express from "express";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
    destination(req, file, cb) { // cb = callback
        cb(null, "../uploads");
    },
    filename(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

// function checkFileType(file, cb) {
//     const filetypes = /jpg|jpeg|png/;
//     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//     const mimetype = filetypes.test(file.mimetype);
//     if (extname && mimetype) {
//         return cb(null, true)
//     } else {
//         cb("Image Only!");
//     }
// }

function fileFilter(req, file, cb) {
    const filetypes = /jpeg|png|webp/;

    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
        return cb(null, true)
    } else {
        cb("Image Only!");
    }
}

const upload = multer({
    storage: storage,
});

router.post("/", upload.single("image"), (req, res) => {
    res.send({
        message: "Upload image was successfully uploaded",
        image: `/${req.file.path}`
    })
})


export default router;