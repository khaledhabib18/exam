const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

async function createAdmin(req, res) {
    const adminData = req.body;
    try {
        const adminExists = await User.findOne({ where: { email: adminData.email } });
        if (!adminExists) {
            adminData.role = "teacher";
            adminData.password = bcrypt.hashSync(adminData.password, 10);
            await User.create(adminData);
            res.status(201).json({ message: "Admin user created successfully" });
        }
        else {
            res.status(200).json({ message: "Admin user already exists" });
        }
    } catch (error) {
        console.error("Error creating admin user:", error);
        res.status(500).json({ message: "Error creating admin user" });
    }
}

module.exports = createAdmin;