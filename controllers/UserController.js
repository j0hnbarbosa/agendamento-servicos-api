const db = require("../db/models/index");

const { PasswordController } = require('./PasswordController')

const UserController = {
  getUsers: async (req, res) => {
    /**
     * #swagger.tags = ['User']
     * #swagger.description = 'Endpoint to get all users'
     * #swagger.responses[200] = {
     *  description: 'List of users'
     * }
     * #swagger.responses[404] = {
     * description: 'User not found'
     * }
     */

    try {
      const users = await db.User.findAll();

      if (!users) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.json(users);
    } catch (error) {
      return res.json({ error: error.message });
    }
  },

  createUser: async (req, res) => {
    /**
     * #swagger.tags = ['User']
     * #swagger.description = 'Endpoint to create a new user'
     */

    try {

      const name = req.body.name.trim();
      const email = req.body.email.trim();
      const password = req.body.password.trim();
      const isProvider = req.body.isProvider

      const newUser = await db.User.create({ name, email, isProvider })

      if (newUser?.id) {
        await PasswordController.create(email, password)
      }

      return res.json(newUser);
    } catch (error) {
      return res.json({ error: error.message });
    }
  },

  createPassword: async (req, res) => {
    /**
     * #swagger.tags = ['User']
     * #swagger.description = 'Endpoint to create a new password'
     */
    try {
      const password = req.body.password.trim();
      const user = await db.User.findByPk(req.params.userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      user.password = password;
      await user.save();

      return res.json(user);
    } catch (error) {
      return res.json({ error: error.message });
    }
  },

  updateUser: (req, res) => {
    /**
     * #swagger.tags = ['User']
     * #swagger.description = 'Endpoint to update a user'
     */
    const { name, email } = req.body;

    const user = users.find((user) => user.id === parseInt(req.params.userId));

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name;
    user.email = email;

    res.json({
      user: user,
    });
  },

  deleteUser: (req, res) => {
    /**
     * #swagger.tags = ['User']
     * #swagger.description = 'Endpoint to delete a user'
     */

    try {
      users = users.filter((user) => user.id !== parseInt(req.params.userId));

      return res.json();
    } catch (error) {
      return res.json({ error: error.message });
    }
  },
};

module.exports = { UserController };