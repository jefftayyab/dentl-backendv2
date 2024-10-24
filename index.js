const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");
const patientRoutes = require("./routes/patient");
const appointmentRoutes = require("./routes/appointment");
const rootUser = require("./routes/rootUser");
const { notFound, errorHandler } = require("./middlewares/error");
const protectRoute = require("./middlewares/protectRoute");

dotenv.config();
connectDB();

const app = express();

app.use(morgan("dev"));
app.use(cors({
  origin: 'https://dental-app-frontend-v2.vercel.app', 
  methods: 'GET,POST,PUT,DELETE', 
  credentials: true 
}));
app.use(express.json());

app.use("/api/patients", protectRoute, patientRoutes);
app.use("/api/appointments", protectRoute, appointmentRoutes);
app.use("/api/rootuser", rootUser);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
