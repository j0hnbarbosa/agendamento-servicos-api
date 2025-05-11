const bcrypt = require("bcrypt");
const db = require("../db/models/index");

const PasswordService = {
  create: async (email, password) => {
    /**
     * #swagger.tags = ['Password']
     * #swagger.description = 'Endpoint to create a new password'
     */

    try {
      const pass_email = password.trim() + email.trim();

      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(pass_email, salt);

      await db.Password.create({ email, salt, passwordHash });
    } catch (error) {
      return ({ error: error.message });
    }
  },

  update: async (email, password) => {
    /**
     * #swagger.tags = ['Password']
     * #swagger.description = 'Endpoint to create a new password'
     */

    try {
      const pass_email = password.trim() + email.trim();

      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(pass_email, salt);

      await db.Password.update({ salt, passwordHash }, {
        where: { email },
      });
    } catch (error) {
      console.log('PasswordService update error', error)
      return ({ error: error.message });
    }
  },

  validate: async (email, password) => {
    /**
     * #swagger.tags = ['Password']
     * #swagger.description = 'Endpoint to validate password'
     */

    try {
      const pass_email = password.trim() + email.trim();

      const passwordData = await db.Password.findOne({ where: { email } });

      if (!passwordData) {
        return res.status(404).json({ message: "User not found" });
      }

      const isValid = await bcrypt.compare(pass_email, passwordData.passwordHash);

      return isValid;
    } catch (error) {

      return false
    }
  },

};

module.exports = { PasswordService };