const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");
const patientRoutes = require("./routes/patient");
const appointmentRoutes = require("./routes/appointment");
const rootUser = require("./routes/rootUser");
const { notFound, errorHandler } = require("./middlewares/error");
const protectRoute = require("./middlewares/protectRoute");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb+srv://workcorp:workcorp@cluster0.xvmzo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
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

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
