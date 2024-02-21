import User from "../models/user.model.js";

/**
 * Retrieves a list of users for the sidebar, excluding the logged-in user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The filtered list of users.
 */
const getUsersForSidebar = async (req, res) => {
    try {
        // Get the ID of the logged-in user
        const loggedInUserId = req.user._id;

        // Find all users except the logged-in user and exclude the password field
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

        // Return the filtered users as a JSON response
        res.status(200).json(filteredUsers);

    } catch (error) {
        // Handle any errors that occur during the process
        console.error("Error in getUsersForSidebar controller ", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
};

export default getUsersForSidebar;
