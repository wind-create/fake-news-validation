import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from "multer";
import helmet from 'helmet';
import morgan from 'morgan';
import path from "path";
import { fileURLToPath } from "url";
import clientRoutes from "./routes/client.js";
import authRoutes from "./routes/auth.js";
// import userRoutes from "./routes/users.js";
import { register } from "./controllers/auth.js"
import { add } from './controllers/client.js';
import { addHoax } from './controllers/client.js';
// import { createPost } from "./controllers/posts.js";
// import { verifyToken } from './middleware/auth.js';

/* configuration */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
app.use(express.json())
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

/* Routes post */
app.post("/auth/register", upload.single("picture"), register);

app.post("/client/add", add);
app.post("/client/addHoax", addHoax);

/* Routes */
app.use("/client", clientRoutes);
app.use("/auth", authRoutes);
// app.use("/users", userRoutes);



/* mongoose setup */
const PORT = process.env.PORT || 9000;
mongoose.set('strictQuery', false);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`))
}).catch((error) => console.log(`${error} did not connect`))