import cryptoJs from "crypto-js";
import boom from "@hapi/boom";

import userDao from "../dao";
import env from "../../../../configs";

const createUser = async ({ ...newUser }) => {
  const validateUniqueUsername = await userDao.findUserByUsername(
    newUser.username
  );

  if (validateUniqueUsername)
    throw boom.badRequest(`${newUser.username} already exists`);

  const encryptedPassword = cryptoJs.AES.encrypt(
    newUser.password,
    env.CRYPTO_SECRET
  );
  newUser.password = encryptedPassword;

  try {
    let createdUser = await userDao.createUser(newUser);
    newUser.user = createdUser._id;
    newUser.driverLicense = "null";
    newUser.criminalRecordCertificate = "null";
    newUser.photo = "null";

    if (newUser.role === "DRIVER")
      createdUser = await userDao.createDriver(newUser);

    return createdUser;
  } catch (error) {
    throw boom.internal(`Error trying to create new user:  ${error}`);
  }
};

export default createUser;
