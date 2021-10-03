import cryptoJs from "crypto-js";
import boom from "@hapi/boom";
import S3Utility from "../../../../utils/S3";
import userDao from "../dao";
import env from "../../../../configs";
import companyService from "../../company/services";

const s3 = new S3Utility();

const createUser = async ({ newUser, files }) => {
  const validateUniqueUsername = await userDao.findUserByUsername(
    newUser.username
  );

  if (validateUniqueUsername)
    throw boom.badRequest(`${newUser.username} already exists`);

  await companyService.getCompanyById(newUser.company);

  const encryptedPassword = cryptoJs.AES.encrypt(
    newUser.password,
    env.CRYPTO_SECRET
  );
  newUser.password = encryptedPassword;

  if (files.length !== 3)
    throw boom.badRequest(`Error, all files are required`);
  files.forEach((value) => {
    if (
      value.fieldname !== "photo" &&
      value.fieldname !== "driverLicense" &&
      value.fieldname !== "criminalRecordCertificate"
    )
      throw boom.badRequest(
        `Error (photo, driverLicense, criminalRecordCertificate) are required`
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
      let bucketName =
        file.fieldname === "photo"
          ? env.AWS_BUCKET_USER_PHOTOS
          : env.AWS_BUCKET_DRIVER_DOCUMENTS;

      let uploadPayload = {
        bufferFile: file.buffer,
        fileName: `${file.fieldname} - ${newUser.email}`,
        bucketName: bucketName,
        mimeType: file.mimetype,
      };

      let fileUpload = await s3.storeFileBucket(uploadPayload);

      if (!fileUpload.Location)
        throw boom.badRequest(`Error upload files, Please contact support`);

      if (fileUpload.key.includes("photo")) newUser.photo = fileUpload.Location;

      if (fileUpload.key.includes("License"))
        newUser.driverLicense = fileUpload.Location;

      if (fileUpload.key.includes("Certificate"))
        newUser.criminalRecordCertificate = fileUpload.Location;
    })
  );

  let createdUser = await userDao.createUser(newUser);
  newUser.user = createdUser._id;

  if (newUser.role === "DRIVER") {
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
