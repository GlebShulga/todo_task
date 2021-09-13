const { nanoid } = require("nanoid");
const {
  isEmpty,
  removeSpecialFields,
  toReadTask,
  toWriteTask,
} = require("../helpers");

module.exports = {
  get,
  post,
  patch,
};

async function post(req, res) {
  const { title, categoryId } = req.body;
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  const newTask = {
    categoryId,
    taskId: nanoid(),
    title,
    status: "new",
    _createdAt: +new Date(),
  };
  const taskList = await toReadTask()
    .then((data) => {
      const list = [...data, newTask];
      toWriteTask(list);
      return list;
    })
    .catch(async () => {
      await toWriteTask([newTask]);
      return [newTask];
    });
  res.json(removeSpecialFields(taskList));
}

async function get(req, res) {
  const data = await toReadTask()
    .then((taskList) => {
      return taskList.sort((a, b) => b.status.localeCompare(a.status));
    })
    .then((taskList) => removeSpecialFields(taskList))
    .catch(() => {
      res.status(404);
      res.end();
    });
  res.json(data);
}

async function patch(req, res) {
  let { taskId, title, description, status, categoryId } = req.body;
    if (!req.body.title) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }
  const data = await toReadTask()
    .then((file) => {
      return file?.map((task) => {
        if (task.taskId !== taskId) {
          return task;
        }
        if (isEmpty(status)) {
          status = task.status;
        }
        if (isEmpty(title)) {
          title = task.title;
        }
        if (isEmpty(description)) {
          description = task.description;
        }
        if (isEmpty(categoryId)) {
          categoryId = task.categoryId;
        }
        return { ...task, status, title, description, categoryId };
      });
    })
    .then((file) => {
      return file.sort((a, b) => b.status.localeCompare(a.status));
    })
    .catch(() => {
      res.status(404);
      res.end();
    });
  toWriteTask(data);
  res.json(removeSpecialFields(data));
}