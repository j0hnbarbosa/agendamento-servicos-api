const db = require("../db/models/index");

const WorkTypeController = {
  getWorkTypes: async (req, res) => {
    /**
     * #swagger.tags = ['WorkType']
     * #swagger.description = 'Endpoint to get all work types'
     */

    try {
      const workTypes = await db.WorkType.findAll();

      return res.json(workTypes);
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  },

  createWorkType: async (req, res) => {
    /**
     * #swagger.tags = ['WorkType']
     * #swagger.description = 'Endpoint to create a new work type'
     */

    try {
      const { name } = req.body;

      const workType = await db.WorkType.create({ name });

      return res.json(workType);
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  },

  deleteWorkType: async (req, res) => {
    /**
     * #swagger.tags = ['WorkType']
     * #swagger.description = 'Endpoint to delete a work type'
     */

    try {
      const id = req.params.id;

      const workType = await db.WorkType.findByPk(id);

      if (!workType) {
        return res.status(404).json({ message: "Work Type not found" });
      }

      await workType.destroy();

      return res.json({ message: "Work Type deleted" });
    } catch (error) {
      return res.json({ error: error.message });
    }
  }
}

module.exports = { WorkTypeController };