const bcrypt = require("bcrypt");

// Generate password hashing before saving
exports.hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (error) {
        console.log(error);
    }
};

// Compare entered password with hashed password
exports.comparePassword = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
};
