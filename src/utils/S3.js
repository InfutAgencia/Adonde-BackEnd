import aws from "aws-sdk";
import { promisify } from "util";
import config from "../configs";

export default class S3Utility {
  asyncUpload = null;

  constructor() {
    aws.config.update({
      region: config.AWS_REGION,
      accessKeyId: config.AWS_ACCESS_KEY_ID,
      secretAccessKey: config.AWS_SECRET_KEY,
    });

    const s3 = new aws.S3();
    this.asyncUpload = promisify(s3.upload.bind(s3));
  }

  async storeFileBucket({
    bufferFile,
    fileName,
    mimeType,
    bucketName,
    acl = "public-read",
  }) {
    try {
      const s3Payload = {
        Key: fileName,
        Body: bufferFile,
        Bucket: bucketName,
        ContentType: mimeType,
        ACL: acl,
      };

      const response = await this.asyncUpload(s3Payload);
      if (!response) return null;
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}
