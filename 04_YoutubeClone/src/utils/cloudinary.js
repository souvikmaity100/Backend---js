import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uplodeOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    // upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath,
      { resource_type: "auto"}
    )
    //local image uploaded to Cloudinary successfully
    console.log("file uploaded successfully on Cloudinary", response.url);
    fs.unlinkSync(localFilePath);//delete local copy of the image after it's been uploaded to Cloudinary
    return response

  } catch (error) {
    fs.unlinkSync(localFilePath);//remove the locally saved temporary file as the upload operation got failed
    return null
  }
};

const deleteFromCloudinary  = async (cloudinaryPath) => {
  try {
    if (!cloudinaryPath) return null;
    // Regular expression to extract the part after the last '/' and type
    const trimmedPart = cloudinaryPath.match(/\/([^\/]+)\.\w+$/)[1];
    // delete the file on cloudinary
    const response = await cloudinary.uploader.destroy(cloudinaryPath)
    return response

  } catch (error) {
    console.log(`Failed to delete Image ${error}`);
    return null
  }
}


export {uplodeOnCloudinary, deleteFromCloudinary}
