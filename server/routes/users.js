import express from "express";
import {
  getUsers,
  getUser,
  deleteUser,
  updateDataUser
} from "../controllers/users.js";

const router = express.Router();

/* READ */

router.get("/managers", getUsers)
router.get("/:id", getUser);

router.delete("/:id/deleteUser", deleteUser)

router.patch("/:id/updatedatauser", updateDataUser)
/* UPDATE */
// router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default router;