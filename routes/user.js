const { Router } = require("express");
const { userModel } = require("../../db");
const zod = require("zod");
const bcrypt = require("bcrypt");
const userRouter = Router();

userRouter.post("/signup", async function (req, res) {
  const { email, password, firstName, lastName } = req.body; //Add zod validation
  const mySchema = zod.object({
    email: zod.string(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string(),
  });

  const validationResult = mySchema.safeParse(req.body);
  if (!validationResult.success) {
    return res.status(400).json({
      errors: validationResult.error.errors,
    });
  }
  //Hash the password so plain text password is not stored in db
  const HashedPassword = await bcrypt.hash(password, 10);
  //put inside a try catch block
  try {
    await userModel.create({
      email,
      password: HashedPassword,
      firstName,
      lastName,
    });
    res.json({
      message: "You are signed in",
    });
  } catch (e) {
    res.status(500).json({
      message: "error creating user",
      error: e.message,
    });
  }
});

userRouter.post("/signin", function (req, res) {
  res.json({
    message: "signup endpoint",
  });
});

userRouter.get("/purchases", function (req, res) {
  res.json({
    message: "signup endpoint",
  });
});

module.exports = {
  userRouter: userRouter,
};
