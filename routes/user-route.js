const express = require("express");
const userController = require("../controllers/user-controller");

const router = express.Router();

router.post("/reward", userController.rewardReferrer);

router.get("/", userController.getAllUsers);

router.get("/:id", userController.getUser);

router.post("/", userController.createUser);

module.exports = router;
