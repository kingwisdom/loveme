import cloudinary from "../config/cloudinary.js"
import User from "../model/User.js"
import sharp from 'sharp';

export const updateUser = async (req, res) => {
    try {
        const { image, ...otherData } = req.body

        let updatedData = otherData
        if (image) {
            if (image.startsWith('data:image')) {
                try {
                    const uploaded = await cloudinary.uploader.upload(image)
                    updatedData.image = uploaded.secure_url
                } catch (e) {
                    console.log(e)
                    res.status(400).json({ success: false, message: "Something went wrong", err: e.message })
                }
            }
        }

        const updatedUser = await User.findByIdAndUpdate(req.user._id, updatedData, { new: true })

        res.status(200).json({ success: true, message: "User updated", user: updatedUser })

    } catch (err) {
        res.status(500).json({ success: false, message: "Something went wrong", err: err.message })

    }
}

export const processUserUploadImage = async (req, res) => {
    const { image, ...otherData } = req.body
    let updatedData = otherData

    if (image.startsWith('data:image')) {
        try {
            const buffer = Buffer.from(image.split(',')[1], 'base64');
            const metadata = await sharp(buffer).metadata();

            const maxSize = 150 * 1024; // 150KB
            let resizedImage = buffer;

            if (metadata.size > maxSize) {
                // Resize the image if it is too large
                resizedImage = await sharp(buffer)
                    .resize({ width: 800, height: 600, fit: 'inside' })
                    .jpeg({ quality: 80 }) // Compress to JPEG with 80% quality
                    .toBuffer();
            }

            // Upload the processed image to Cloudinary
            const uploaded = await cloudinary.uploader.upload(resizedImage);
            updatedData.image = uploaded.secure_url;

            const updatedUser = await User.findByIdAndUpdate(req.user._id, updatedData, { new: true })

            res.status(200).json({ success: true, message: "User updated", user: updatedUser })


        } catch (e) {
            console.log(e);
            res.status(400).json({ success: false, message: "Something went wrong", err: e.message });
        }
    }
}
