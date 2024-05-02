import app from "./app";
import UserController from "./app/user/controllers/UserController";
import ErrorHandlerMiddleware from "./core/middlewares/ErrorHandlerMiddleware";
import container from "./di";

const port = process.env.PORT;
app.use("/users", container.resolve(UserController).router);
app.use(ErrorHandlerMiddleware.handleUtilsError);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
