import multer from "multer";

const storage = multer.diskStorage({
  // remove destination as we dont want it to store on our server.
  //   destination:function(req, file, cb) {
  //     cb(null, "/tmp/my-uploads");
  //   },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

function fileFilter(req, file, cb) {
  const allowedFiles = ["image/png", "image/jpg", "image/jpeg", "image/wepg"];
  if (!allowedFiles.includes(file.mimetype)) {
    // to indicate if the file should be accepted
    // The function should call `cb` with a boolean

    cb(new Error("Only images are allowed"), false);
  } else {
    cb(null, true);
  }
}

const upload = multer({ storage: storage, fileFilter: fileFilter });
export default upload;
