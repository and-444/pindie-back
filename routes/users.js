const usersRouter = require("express").Router();

const {
  findAllUsers,
  createUser,
  updateUser,
  deleteUser,
  findUserById,
  checkIsUserExists,
  checkEmptyNameAndEmail,
  checkEmptyNameAndEmailAndPassword,
  filterPassword,
  hashPassword,
} = require("../middlewares/users");

const { checkAuth } = require("../middlewares/auth");

const {
  sendAllUsers,
  sendUserCreated,
  sendUserUpdated,
  sendUserDeleted,
  sendUserById,
  sendMe,
} = require("../controllers/users");

usersRouter.get("/users", findAllUsers, filterPassword, sendAllUsers);

usersRouter.get("/me", checkAuth, sendMe);

usersRouter.get("/users/:id", findUserById, filterPassword, sendUserById);

usersRouter.post(
  "/users",
  findAllUsers,
  checkIsUserExists,
  checkEmptyNameAndEmailAndPassword,
  checkAuth,
  hashPassword,
  createUser,
  sendUserCreated
);

usersRouter.put(
  "/users/:id",
  checkEmptyNameAndEmail,
  checkAuth,
  updateUser,
  sendUserUpdated
);

usersRouter.delete("/users/:id", checkAuth, deleteUser, sendUserDeleted);

module.exports = usersRouter;
