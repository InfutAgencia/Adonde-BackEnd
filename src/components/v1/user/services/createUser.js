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
        if (file.name === "photo" && file.type.includes("image")) {
          let newBuffer = Buffer.from(file.uri, "base64");
          let uploadPayload = {
            bufferFile: newBuffer,
            fileName: `${file.name} - ${newUser.email}.jpeg`,
            bucketName: env.AWS_BUCKET_USER_PHOTOS,
            mimeType: file.type,
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
    await Promise.all(
      files.map(async (file) => {
        let newBuffer = Buffer.from(file.uri, "base64");
        let fileName =
          (file.name === file.type) === "image/png"
            ? `${file.name} - ${newUser.email}.png`
            : `${file.name} - ${newUser.email}.jpeg`;

        let uploadPayload = {
          bufferFile: newBuffer,
          fileName: fileName,
          bucketName: env.AWS_BUCKET_DRIVER_DOCUMENTS,
          mimeType: file.type,
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
    newUser.points = 0;

    const newDriver = await userDao.createDriver(newUser);
    createdUser._doc.driver = await userDao.getDriverById(newDriver._id);

    const driverByCompany = {
      driver: newDriver._id,
      company: newUser.company,
      isActive: JSON.parse(newUser.isActive),
    };

    await companyService.createDriverByCompany(driverByCompany);
    const createdCompany = await companyService.getCompanyByDriverId(
      newDriver._id
    );
    createdUser._doc.company = createdCompany[0];
  }

  return createdUser;
};

export default createUser;
