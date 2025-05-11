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
      const dataIsValid = await PasswordService.validate(email, password);

      if (dataIsValid.isValid && !dataIsValid?.error) {
        const token = jwt.sign({ email }, "Something_Secret_Here", {
          expiresIn: "8h",
        });

        return res.json({ token });
      } else {
        return res.status(401).json({ message: dataIsValid?.error?.message || "Login failed" });
      }
    } catch (error) {
      console.log('LoginController validate error:', error);
      return res.json({ error: error.message });
    }
  },
}

module.exports = { LoginController }