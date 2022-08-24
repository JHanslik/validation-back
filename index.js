const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const port = 5000;
const homeRoutes = require("./routes/Home");

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

app.use("/", homeRoutes);

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
