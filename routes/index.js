const { Router } = require("express");
const { UserController } = require("../controllers/UserController");
const { LoginController } = require("../controllers/LoginController");
const { WorkTypeController } = require("../controllers/WorkTypeController");
const { AvailableHourController } = require("../controllers/AvailableHourController");

const router = new Router();

router.get("/api/v1/users", UserController.getUsers);
router.post("/api/v1/createUser", UserController.createUser);
router.delete("/api/v1/deleteUser/:id", UserController.deleteUser);
router.put("/api/v1/updateUser/:id", UserController.updateUser);

router.post("/api/v1/login", LoginController.validate);

router.get("/api/v1/workTypes", WorkTypeController.getWorkTypes);
router.post("/api/v1/createWorkType", WorkTypeController.createWorkType);
router.delete("/api/v1/deleteWorkType/:id", WorkTypeController.deleteWorkType);

router.get('/api/v1/availableHours', AvailableHourController.getAvailableHours)
router.post('/api/v1/createAvailableHour', AvailableHourController.createAvailableHour)
router.delete('/api/v1/deleteAvailableHour/:id', AvailableHourController.deleteAvailableHour)

module.exports = router;