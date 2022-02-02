const express = require("express");
const userController = require("../controllers/user-controller");

const router = express.Router();

router.get("/:id", userController.getUser);

router.post("/", userController.createUser);

router.post("/reward", userController.rewardReferrer);

module.exports = router;
