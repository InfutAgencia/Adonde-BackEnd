import cryptoJs from "crypto-js";
import boom from "@hapi/boom";
import jwt from "jsonwebtoken";
import getDriverByUserId from "../../user/services/getDriverByUserId";
import getCompanyByDriverId from "../../company/services/getCompanyByDriverId";
import getUserByUsername from "../dao";
import env from "../../../../configs";

const getSessionToken = async ({ username, password }) => {
  const user = await getUserByUsername(username);

  if (user && user.role === "DRIVER") {
    const driver = await getDriverByUserId(user._id);
    const company = await getCompanyByDriverId(driver._id);
    if (!company)
      throw boom.badRequest(
        `There is not a company associated to username: ${username}`
      );

    user.driverId = driver._id;
    user.name = driver.name;
    user.lastname = driver.lastname;
    user.points = driver.points;
    user.deviceId = driver.deviceId;
    user.companyId = company[0]._id;
    user.companyName = company[0].name;
  }

  if (!user) throw boom.unauthorized("Wrong credentials");
  const decryptedPassword = cryptoJs.AES.decrypt(
    user.password,
    env.CRYPTO_SECRET
  ).toString(cryptoJs.enc.Utf8);

  if (decryptedPassword !== password)
    throw boom.unauthorized("Wrong credentials");

  const token = jwt.sign({ ...user }, env.AUTH_SECRET, {
    expiresIn: Number(env.TOKEN_EXPIRATION_TIME || 86400),
  });

  return {
    token,
  };
};

export default getSessionToken;
