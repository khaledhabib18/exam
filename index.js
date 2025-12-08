const express = require("express");
const sequelize = require("./models/config");
require("dotenv").config();
const cors = require("cors");
const PORT = process.env.PORT || 3000;
const app = express();
const userRoutes = require("./routes/userRoute");

app.use("/", userRoutes);
app.use(express.json());
app.use(cors());



sequelize.sync({ force: true }).then(() => {
    console.log("Database synced");
}).catch((error) => {
    console.error("Error syncing database:", error);
});



app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});