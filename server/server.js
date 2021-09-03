const express = require("express");
const { nanoid } = require("nanoid");

const { readFile, writeFile } = require("fs").promises;

const taskTemplate = {
  categoryId: "",
  taskId: "",
  title: "",
  description: "",
  _createdAt: 0,
  status: "new",
};

const categoryTemplate = {
  categoryId: "",
  parentCategoryId: "",
  categoryTitle: "",
  _isDeleted: false,
  _createdAt: 0,
  _deletedAt: 0,
  lvl: 0,
};

const toWriteTask = (fileData) => {
  const text = JSON.stringify(fileData);
  writeFile(`${__dirname}/base/taskList.json`, text, { encoding: "utf8" });
};

const toReadTask = () => {
  return readFile(`${__dirname}/base/taskList.json`, {
    encoding: "utf8",
  }).then((file) => JSON.parse(file));
};

const toWriteCategory = (fileData) => {
  const text = JSON.stringify(fileData);
  writeFile(`${__dirname}/base/categoryList.json`, text, { encoding: "utf8" });
};

const toReadCategory = () => {
  return readFile(`${__dirname}/base/categoryList.json`, {
    encoding: "utf8",
  }).then((file) => JSON.parse(file));
};

const removeSpecialFields = (dataList) => {
  return dataList
    .filter((data) => !data?._isDeleted)
    .map((obj) => {
      return Object.keys(obj).reduce((acc, key) => {
        if (key[0] !== "_") {
          return { ...acc, [key]: obj[key] };
        }
        return acc;
      }, {});
    });
};

function sortCategoriesByDate(categoryList) {
  return categoryList.sort((a, b) => b._createdAt - a._createdAt);
}

const FilterDeletedCategories = (categories) => {
  return categories.filter((category) => !category._isDeleted);
};

const PORT = process.env.PORT || 3001;
const app = express();

const middleware = [express.json({ limit: "50mb", extended: true })];

middleware.forEach((it) => app.use(it));

app.post("/api/v1/category", async (req, res) => {
  const { categoryTitle, parentCategoryId, lvl } = req.body;
  const newCategory = {
    ...categoryTemplate,
    categoryId: nanoid(),
    parentCategoryId,
    categoryTitle,
    lvl,
    _createdAt: +new Date(),
  };
  const categoryList = await toReadCategory()
    .then((existingCategoryList) => {
      const list = [...existingCategoryList, newCategory];
      toWriteCategory(list);
      return list;
    })
    .catch(async () => {
      await toWriteCategory([newCategory]);
      return [newCategory];
    });
  res.json(FilterDeletedCategories(categoryList));
});

app.get("/api/v1/category", async (req, res) => {
  const data = await toReadCategory()
    .then((categoryList) => {
      return sortCategoriesByDate(categoryList);
    })
    .then((categoryList) => removeSpecialFields(categoryList))
    .catch(() => {
      res.status(404);
      res.end();
    });
  res.json(data);
});

app.patch("/api/v1/category", async (req, res) => {
  let { categoryId, categoryTitle } = req.body;
  const data = await toReadCategory()
    .then((categoryList) => {
      return categoryList?.map((category) => {
        if (category.categoryId !== categoryId) {
          return category;
        }
        if (categoryTitle === undefined) {
          categoryTitle = category.categoryTitle;
        }
        return { ...category, categoryTitle };
      });
    })
    .then((categoryList) => {
      return sortCategoriesByDate(categoryList);
    })
    .catch(() => {
      res.status(404);
      res.end();
    });
  toWriteCategory(data);
  res.json(FilterDeletedCategories(data));
});

app.delete("/api/v1/category", async (req, res) => {
  const { categoryId } = req.body;
  const data = await toReadCategory()
    .then((categoryList) =>
      categoryList.map((category) => {
        return category.categoryId !== categoryId
          ? category
          : { ...category, _isDeleted: true, _deletedAt: +new Date() };
      })
    )
    .catch(() => {
      res.status(404);
      res.end();
    });
  await toWriteCategory(data);
  res.json(FilterDeletedCategories(data));
});

app.post("/api/v1/task", async (req, res) => {
  const { title, categoryId } = req.body;
  const newTask = {
    ...taskTemplate,
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
  res.json(taskList);
});

app.get("/api/v1/task", async (req, res) => {
  const data = await toReadTask()
    .then((file) => {
      return file.sort((a, b) => b.status.localeCompare(a.status));
    })
    .then((file) => removeSpecialFields(file))
    .catch(() => {
      res.status(404);
      res.end();
    });
  res.json(data);
});

app.patch("/api/v1/task", async (req, res) => {
  let { taskId, title, description, status, categoryId } = req.body;
  const data = await toReadTask()
    .then((file) => {
      return file?.map((task) => {
        if (task.taskId !== taskId) {
          return task;
        }
        if (status === undefined) {
          status = task.status;
        }
        if (title === undefined) {
          title = task.title;
        }
        if (description === undefined) {
          description = task.description;
        }
        // Comment
        if (categoryId === undefined || categoryId === "") {
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
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
