const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const authorizeRoles = require("../middleware/roles");
const ROLES = require("../config/roles");

const {
  createChannel,
  joinChannel,
  leaveChannel,
} = require("../controllers/channel.controller");

router.post(
  "/",
  auth,
  authorizeRoles(ROLES.ADMIN, ROLES.CO_ADMIN),
  createChannel
);

router.post("/:id/join", auth, joinChannel);
router.post("/:id/leave", auth, leaveChannel);

module.exports = router;
