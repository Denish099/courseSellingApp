const express = require("express");
const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");
const { default: mongoose } = require("mongoose");
const app = express();

app.use(express.json());
// to parse req body

app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/course", courseRouter);

async function main() {
  await mongoose.connect(
    "mongodb+srv://goyaldenish099:Guk%4015051990@cluster0.nd0vq.mongodb.net/coursera-app"
  );
  app.listen(3000);
  console.log("listening on port 3000");
}

main();
