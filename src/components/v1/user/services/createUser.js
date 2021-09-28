import cryptoJs from "crypto-js";
import boom from "@hapi/boom";

import userDao from "../dao";
import env from "../../../../configs";

const createUser = async (username, password) => {
  const validateUniqueUsername = await userDao.findUserByUsername(username);

  if (validateUniqueUsername) throw boom.badRequest("Username already exists");

  const encryptedPassword = cryptoJs.AES.encrypt(password, env.CRYPTO_SECRET);
  password = encryptedPassword;

  const createdUser = await userDao.newUser({ username, password });

  if (!createdUser) throw boom.internal("Error trying to create new user");
  return createdUser;
};

export default createUser;
