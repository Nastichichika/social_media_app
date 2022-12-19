import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer"; // file import
import helmet from "helmet"; // HTTP headers, security
import morgan from "morgan"; // HTTP logging
import path from "path";
import { fileURLToPath } from "url";
import { register } from "./controllers/auth";
import { routes as authRoutes} from "./routes/auth.js";

// config
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

// routers with files
app.post("/auth/register", upload.single("picture"), register);

// routers
app.post("/login", authRoutes);

// mongoose setup
const PORT = process.env.PORT || 6001;
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL, {
  'useNewUrlParser': true,
  'useUnifiedTopology': true,
}).then(() => {
  app.listen(PORT, () => console.log(`SERVER PORT: ${PORT}`))
}).catch((error) => console.log(`Didn't connect ${error} `))
