// Required External Modules
import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import {Routers, ItemRouters, Menus }from "./Routes";
import { errorHandler} from "./Middleware/error.middleware";
import { notFoundHandler} from "./Middleware/not-found.middleware";
// import { itemsRouter } from "./Routes/items.routes";

dotenv.config();

// App Variables
// if (!process.env.PORT) {
//     process.exit(1);

// }

const PORT: number = parseInt(process.env.PORT as string, 10) || 7000;

const app = express();

// App Configuration
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/api/menu/items", ItemRouters);
app.use("/api/user/users", Routers);
app.use("/api/menu/menus", Menus);

app.use(errorHandler);
app.use(notFoundHandler);

// Server Activation
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
