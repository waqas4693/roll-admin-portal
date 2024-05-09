import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginUser = async (req, res) => {
  // try {
  //   const { adminEmail, adminPassword } = req.body;

  //   // Find the super admin by adminEmail
  //   const superAdmin = await SuperAdmin.findOne({ adminEmail });
  //   if (!superAdmin) {
  //     return res.status(400).json({ message: "Invalid adminEmail " });
  //   }

  //   // Compare adminPasswords
  //   const isMatch = await bcrypt.compare(adminPassword, superAdmin.adminPassword);
  //   if (!isMatch) {
  //     return res.status(400).json({ message: "Invalid  adminPassword" });
  //   }

  //   // Check if the super admin has a valid token
  //   if (superAdmin.token && superAdmin.tokenExpiration > Date.now()) {
  //     return res.json({ token: superAdmin.token });
  //   }

  //   // Generate a new token
  //   const token = jwt.sign({ superAdminId: superAdmin._id }, "secretkey", {
  //     expiresIn: "5m",
  //   });

  //   // Update the super admin with the new token
  //   superAdmin.token = token;
  //   superAdmin.tokenExpiration = Date.now() + 5 * 60 * 1000; // 5 minutes
  //   await superAdmin.save();

  //   res.json({ token });
  // } catch (error) {
  //   res.status(500).json({ message: "Internal server error" });
  // }
};