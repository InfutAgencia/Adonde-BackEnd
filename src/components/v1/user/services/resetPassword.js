import ses from "../../../../utils/SES";
import userDao from "../dao/index";
import boom from "@hapi/boom";

const resetPassword = async (user) => {
  //await ses.verifyEmail(user);
  const username = await userDao.findUserByUsername(user);
  if (!username) throw boom.badRequest(`${user} no found`);

  let payload = {
    originVerifiedAWSEmail: "adonde.driver@gmail.com",
    destinationEmails: [user],
    emailSubject: "Password Reset",
  };

  const result = await ses.sendEmail(payload);
  if (!result) throw boom.badRequest(`Error at moment to send the email`);

  return;
};

export default resetPassword;
