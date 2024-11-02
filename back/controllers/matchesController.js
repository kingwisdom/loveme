import User from "../model/User.js"
import { getConnectedUsers, getIO } from "../socket/socket.server.js";

export const swipeRight = async (req, res) => {
    try {
        //match/swipe-right/67151ff8413cd9bc45048c31
        const { likeUserId } = req.params;
        const currentUser = await User.findById(req.user.id);
        const likedUser = await User.findById(likeUserId);

        if (!likedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        if (!currentUser.likes.includes(likeUserId)) {
            currentUser.likes.push(likeUserId);
            await currentUser.save();

            // if the other user already liked us, it's a match, so let's update both users
            if (likedUser.likes.includes(currentUser.id)) {
                currentUser.matches.push(likeUserId);
                likedUser.matches.push(currentUser.id);

                await Promise.all([await currentUser.save(), await likedUser.save()]);

                // send notification in real-time with socket.io
                const connectedUsers = getConnectedUsers();
                const io = getIO();

                const likedUserSocketId = connectedUsers.get(likeUserId);

                if (likedUserSocketId) {
                    io.to(likedUserSocketId).emit("newMatch", {
                        _id: currentUser._id,
                        name: currentUser.name,
                        image: currentUser.image,
                    });
                }

                const currentSocketId = connectedUsers.get(currentUser._id.toString());
                if (currentSocketId) {
                    io.to(currentSocketId).emit("newMatch", {
                        _id: likedUser._id,
                        name: likedUser.name,
                        image: likedUser.image,
                    });
                }
            }
        }

        res.status(200).json({
            success: true,
            user: currentUser,
        });
    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: "Something went wrong", err: err.message })
    }
}

export const swipeLeft = async (req, res) => {
    try {
        const { dislikeUserId } = req.params;
        const currentUser = await User.findById(req.user.id);

        if (!currentUser.dislikes.includes(dislikeUserId)) {
            currentUser.dislikes.push(dislikeUserId);
            await currentUser.save();
        }

        res.status(200).json({
            success: true,
            user: currentUser,
        });
    } catch (error) {
        console.log("Error in swipeLeft: ", error);

        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
export const getUserProfiles = async (req, res) => {
    try {
        const currentUser = await User.findById(req.user._id)
        const users = await User.find({
            $and: [
                { _id: { $ne: currentUser.id } },
                { _id: { $nin: currentUser.likes } },
                { _id: { $nin: currentUser.dislikes } },
                { _id: { $nin: currentUser.matches } },
                {
                    gender:
                        currentUser.genderPreference === "both"
                            ? { $in: ["male", "female"] }
                            : currentUser.genderPreference,
                },
                { genderPreference: { $in: [currentUser.gender, "both"] } },
            ],
        });
        // console.log(currentUser)
        res.status(200).json({
            success: true,
            users
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Something went wrong", err: error.message })
    }
}
export const getMatches = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate("matches", "name image")
        // console.log('matches: ', user);
        res.status(200).json({
            success: true,
            matches: user.matches
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: "Something went wrong", err: err.message })
    }
}