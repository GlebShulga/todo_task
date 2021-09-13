const express = require("express");

const categoriesRouter = require('./routes/categories.routes')
const tasksRouter = require('./routes/tasks.routes')

const PORT = process.env.PORT || 3001;
const app = express();

const middleware = [express.json({ limit: "50mb", extended: true })];

middleware.forEach((it) => app.use(it));

app.use("/api/v1/category", categoriesRouter);
app.use("/api/v1/task", tasksRouter);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
