import aws from "aws-sdk";
import { promisify } from "util";
import config from "../configs";

export default class S3Utility {
  asyncUpload = null;

  constructor() {
    aws.config.update({
      region: config.awsRegion,
      accessKeyId: config.s3AccessKey,
      secretAccessKey: config.s3SecretKey,
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
