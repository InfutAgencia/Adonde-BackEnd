import cryptoJs from "crypto-js";
import boom from "@hapi/boom";
import S3Utility from "../../../../utils/S3";
import userDao from "../dao";
import env from "../../../../configs";
import companyService from "../../company/services";

const s3 = new S3Utility();

const createUser = async ({ newUser, files }) => {
  const defaultPhoto = `https://adonde-user-photos.s3.amazonaws.com/photo%20-%20default%40gmail.com`;

  const validateUniqueUsername = await userDao.findUserByUsername(
    newUser.username
  );
  if (validateUniqueUsername)
    throw boom.badRequest(`${newUser.username} already exists`);

  if (newUser.company) await companyService.getCompanyById(newUser.company);

  const encryptedPassword = cryptoJs.AES.encrypt(
    newUser.password,
    env.CRYPTO_SECRET
  );
  newUser.password = encryptedPassword;
  newUser.photo = defaultPhoto;

  if (files.length !== 0) {
    await Promise.all(
      files.map(async (file) => {
        if (
          file.fieldname === "photo" &&
          (file.mimetype === "image/png" || file.mimetype === "image/jpeg")
        ) {
          let uploadPayload = {
            bufferFile: file.buffer,
            fileName: `${file.fieldname} - ${newUser.email}`,
            bucketName: env.AWS_BUCKET_USER_PHOTOS,
            mimeType: file.mimetype,
          };

          let fileUpload = await s3.storeFileBucket(uploadPayload);
          if (!fileUpload.Location || !fileUpload.key.includes("photo"))
            throw boom.badRequest(`Error upload files, Please contact support`);

          newUser.photo = fileUpload.Location;
        }
      })
    );
  }

  let createdUser = await userDao.createUser(newUser);

  if (newUser.role === "DRIVER") {
    if (files.length !== 4 && files.length !== 3)
      throw boom.badRequest(`Error, all files are required`);
    files.forEach((value) => {
      if (
        value.fieldname !== "photo" &&
        value.fieldname !== "driverLicenseFront" &&
        value.fieldname !== "criminalRecordCertificate" &&
        value.fieldname !== "driverLicenseBack"
      )
        throw boom.badRequest(
          `Error (driverLicenseFront, driverLicenseBack, criminalRecordCertificate) are required`
        );

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
        let uploadPayload = {
          bufferFile: file.buffer,
          fileName: `${file.fieldname} - ${newUser.email}`,
          bucketName: env.AWS_BUCKET_DRIVER_DOCUMENTS,
          mimeType: file.mimetype,
        };

        let fileUpload = await s3.storeFileBucket(uploadPayload);

        if (!fileUpload.Location)
          throw boom.badRequest(`Error upload files, Please contact support`);

        if (fileUpload.key.includes("driverLicenseFront"))
          newUser.driverLicenseFront = fileUpload.Location;

        if (fileUpload.key.includes("driverLicenseBack"))
          newUser.driverLicenseBack = fileUpload.Location;

        if (fileUpload.key.includes("Certificate"))
          newUser.criminalRecordCertificate = fileUpload.Location;
      })
    );

    newUser.connectStatus = true;
    newUser.user = createdUser._id;
    createdUser = await userDao.createDriver(newUser);

    const driverByCompany = {
      driver: createdUser._id,
      company: newUser.company,
      isActive: newUser.isActive,
    };

    await companyService.createDriverByCompany(driverByCompany);
  }

  return createdUser;
};

export default createUser;
