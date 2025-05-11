const { PasswordService } = require('../services/PasswordService');
const jwt = require("jsonwebtoken");

const LoginController = {
  validate: async (req, res) => {
    /**
     * #swagger.tags = ['Login']
     * #swagger.description = 'Endpoint to validate login'
     */

    try {
      const email = req.body.email.trim();
      const password = req.body.password.trim();
      const isValid = await PasswordService.validate(email, password);

      if (isValid) {
        const token = jwt.sign({ email }, "Something_Secret_Here", {
          expiresIn: "8h",
        });

        return res.json({ token });
      } else {
        return res.json({ message: "Login failed" });
      }
    } catch (error) {
      return res.json({ error: error.message });
    }
  },
}

module.exports = { LoginController }