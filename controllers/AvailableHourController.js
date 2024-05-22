const db = require("../db/models/index");

const AvailableHourController = {
  getAvailableHours: async (req, res) => {
    /**
     * #swagger.tags = ['AvailableHour']
     * #swagger.description = 'Endpoint to get all available hours'
     */

    try {
      const availableHours = await db.AvailableHour.findAll({
        include: [
          { model: db.User, as: "users" },
          { model: db.WorkType, as: "workTypes" }
        ]
      });

      return res.json(availableHours);
    } catch (error) {
      return res.json({ error: error.message });
    }
  },

  createAvailableHour: async (req, res) => {
    /**
     * #swagger.tags = ['AvailableHour']
     * #swagger.description = 'Endpoint to create a new available hour'
     */

    try {
      const {
        startHour: start_hour,
        endHour: end_hour,
        date,
        userId: UserId,
        workTypeId: WorkTypeId
      } = req.body;

      const respo = await db.AvailableHour.create({ UserId, start_hour, end_hour, date, WorkTypeId });

      return res.json(respo);
    } catch (error) {
      return res.json({ error: error.message });
    }
  },

  deleteAvailableHour: async (req, res) => {
    /**
     * #swagger.tags = ['AvailableHour']
     * #swagger.description = 'Endpoint to delete an available hour'
     */

    try {
      const id = req.params.id;

      const availableHour = await db.AvailableHour.findByPk(id);

      if (!availableHour) {
        return res.status(404).json({ message: "Available Hour not found" });
      }

      await availableHour.destroy();

      return res.json({ message: "Available Hour deleted" });
    } catch (error) {
      return res.json({ error: error.message });
    }
  }
}

module.exports = { AvailableHourController };