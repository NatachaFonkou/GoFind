import { UuidFactory } from "@nestjs/core/inspector/uuid-factory";
import { extname } from "node:path";

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error("Only image files are allowed!"), false);
  }
  callback(null, true);
};

export const editFileName = (req, file, callback) => {
  const name = file.originalname.split(".")[0];
  const fileExtName = extname(file.originalname);
  callback(null, `${UuidFactory.get(name)}${fileExtName}`);
};
