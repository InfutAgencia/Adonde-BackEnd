import boom from "@hapi/boom";
import S3Utility from "../../../../utils/S3";
import vehicleDao from "../dao";
import env from "../../../../configs";
import userServices from "../../user/services";

const s3 = new S3Utility();

const createVehicle = async ({ newVehicle, files }) => {
  await userServices.getDriverById(newVehicle.driver);

  await Promise.all(
    files.map(async (file) => {
      let bucketName =
        file.name === "photo"
          ? env.AWS_BUCKET_VEHICLE_PHOTOS
          : env.AWS_BUCKET_VEHICLE_DOCUMENTS;

      let newBuffer = Buffer.from(file.uri, "base64");

      let uploadPayload = {
        bufferFile: newBuffer,
        fileName:
          file.type === "image/png"
            ? `${file.name} - ${newVehicle.plate}.png`
            : `${file.name} - ${newVehicle.plate}.jpeg`,
        bucketName: bucketName,
        mimeType: file.type,
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
