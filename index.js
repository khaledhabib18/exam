const express = require("express");
const sequelize = require("./models/config");
require("./models/index");
require("dotenv").config();
const cors = require("cors");
const PORT = process.env.PORT || 3000;
const app = express();
const userRoutes = require("./routes/userRoute");
const examRoutes = require("./routes/examRoute");
const questionRoutes = require("./routes/questionRoute");

app.use("/api/v1/questions", questionRoutes);

app.use("/api/v1/exams", examRoutes);

app.use("/api/v1/", userRoutes);
app.use(express.json());
app.use(cors());

sequelize.sync().then(() => {
    console.log("Database synced");
}).catch((error) => {
    console.error("Error syncing database:", error);
});

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});