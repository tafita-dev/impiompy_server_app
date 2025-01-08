import {
  v2 as cloudinary,
  UploadApiResponse,
  UploadApiErrorResponse,
} from "cloudinary";

const env = process.env;

export const uploadFile = async (images: string): Promise<string | null> => {
  // Configuration
  cloudinary.config({
    cloud_name: env.cloud_name,
    api_key: env.api_key,
    api_secret: env.api_secret,
  });

  try {
    const uploadResult: UploadApiResponse = await cloudinary.uploader.upload(
      images,
      {
        public_id: "shoes",
      }
    );

    return uploadResult.url;
  } catch (error) {
    const uploadError = error as UploadApiErrorResponse;
    console.error(uploadError);
    return null;
  }
};
