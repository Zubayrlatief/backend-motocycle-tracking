import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";
import { errorHandling } from "./middleware/errorHandling"
import { userRouter } from "./routes/users/userRouter";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Request-Methods", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Expose-Headers", "Authorization");
    next();
});

app.use(
    express.static("./static"),
    express.json(),
    express.urlencoded({
        extended: true
    }),
    cookieParser(),
    cors()
)

app.get("^/$|/Motorcycle Tracking", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "./static/index.html"))
})
app.use("/users", userRouter)
app.use(errorHandling)
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
