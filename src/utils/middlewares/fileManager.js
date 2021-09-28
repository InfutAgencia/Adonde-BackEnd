import multer from "multer";
import boom from "@hapi/boom";

const availablesFileMimeTypes = [
  "image/jpeg",
  "image/png",
  "text/csv",
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
];

const availableFileMimeTypesAddToShipment = [
  "image/jpeg",
  "image/png",
  "application/pdf",
  "image/tiff",
  "application/msword",
  "application/vnd.oasis.opendocument.text",
];

const multerOptions = {
  storage: multer.memoryStorage(),
  fileFilter(req, file, next) {
    const isAvailable = availablesFileMimeTypes.includes(file.mimetype);

    if (!isAvailable) {
      next(boom.badRequest("The file type is not an available type"));
    } else {
      next(null, true);
    }
  },
};

const multerOptionsMultipleFiles = {
  storage: multer.memoryStorage(),
  fileFilter(req, file, next) {
    const isAvailable = availableFileMimeTypesAddToShipment.includes(
      file.mimetype
    );

    if (!isAvailable) {
      next(boom.badRequest("The file type is not an available type"));
    } else {
      next(null, true);
    }
  },
};

const receiveFile = multer(multerOptions).single("file");
const receiveMultipleFiles = multer(multerOptionsMultipleFiles).any();

export default { receiveFile, receiveMultipleFiles };
