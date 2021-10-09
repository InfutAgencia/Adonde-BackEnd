import boom from "@hapi/boom";
import userDao from "../dao";
import cryptoJs from "crypto-js";
import env from "../../../../configs";

const updateUser = async (username, updatedUserInformation) => {
  const usernameValidation = await userDao.findUserByUsername(username);
  if (!usernameValidation) throw boom.badRequest(`${username} no found`);
  let userToUpdate = { ...updatedUserInformation };

  if (
    !updatedUserInformation.password ||
    updatedUserInformation.password.trim() === ""
  )
    throw boom.badRequest(`password does not fullfill the requirements`);

  userToUpdate.password = cryptoJs.AES.encrypt(
    updatedUserInformation.password,
    env.CRYPTO_SECRET
  ).toString();

  const updateConfirmation = await userDao.updateUser(usernameValidation._id, {
    ...userToUpdate,
  });

  if (!updateConfirmation)
    throw boom.badRequest(`Error at moment to update user`);

  const updatedUser = await userDao.findUserByUsername(username);
  return updatedUser;
};

export default updateUser;
