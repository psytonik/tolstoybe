import express, {Express, json, urlencoded} from 'express'
import cors from "cors";
import helmet from "helmet";
import {rateLimit, RateLimitRequestHandler} from "express-rate-limit"
import router from "./routes/route";

const app: Express = express();
const PORT: string | number = process.env.PORT || 5001;

app.use(cors());
app.use(helmet());
app.use(json());
app.use(urlencoded({ extended: true }));

const limiter: RateLimitRequestHandler = rateLimit({
	windowMs: 1000,
	limit: 5,
	standardHeaders: 'draft-7',
	legacyHeaders: false,
});
app.use(limiter);

app.use('/',router);

app.listen(PORT, (): void => {
	console.log(`Server is running on port ${PORT}`);
})
export default app;
