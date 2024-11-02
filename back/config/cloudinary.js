import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
    cloud_name: 'do9db8flv',// process.env.CLOUDINARY_CLOUD_NAME,
    api_key: '923592795459613',//process.env.CLOUDINARY_API_KEY,
    api_secret: 'FL0Q6WMFIpl2gJHqVpGAKumnaJc'// CLOUDINARY_SECRET_KEY
});

export default cloudinary