import boom from "@hapi/boom";
import S3Utility from "../../../../utils/S3";
import vehicleDao from "../dao";
import env from "../../../../configs";
import userServices from "../../user/services";

const s3 = new S3Utility();

const createVehicle = async ({ newVehicle, files }) => {
  await userServices.getDriverById(newVehicle.driver);

  if (files.length !== 2)
    throw boom.badRequest(`Error, all files are required`);

  files.forEach((value) => {
    if (value.fieldname !== "photo" && value.fieldname !== "identification")
      throw boom.badRequest(`Error (photo, identification) are required`);

    if (
      value.mimetype !== "image/png" &&
      value.mimetype !== "application/pdf" &&
      value.mimetype !== "image/jpeg"
    )
      throw boom.badRequest(`Error, file type is not allowed`);
    return;
  });

  await Promise.all(
    files.map(async (file) => {
      let bucketName =
        file.fieldname === "photo"
          ? env.AWS_BUCKET_VEHICLE_PHOTOS
          : env.AWS_BUCKET_VEHICLE_DOCUMENTS;

      let uploadPayload = {
        bufferFile: file.buffer,
        fileName: `${file.fieldname} - ${newVehicle.plate}`,
        bucketName: bucketName,
        mimeType: file.mimetype,
      };

      let fileUpload = await s3.storeFileBucket(uploadPayload);

      if (!fileUpload.Location)
        throw boom.badRequest(`Error upload files, Please contact support`);

      if (fileUpload.key.includes("photo"))
        newVehicle.photo = fileUpload.Location;

      if (fileUpload.key.includes("identification"))
        newVehicle.identification = fileUpload.Location;
    })
  );

  const createdVehicle = await vehicleDao.createVehicle(newVehicle);
  const vehicleByDriver = {
    driver: newVehicle.driver,
    vehicle: createdVehicle._id,
    isActive: newVehicle.isActive,
  };
  await vehicleDao.createVehicleByDriver(vehicleByDriver);

  return createdVehicle;
};

export default createVehicle;
