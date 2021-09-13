const { readFile, writeFile } = require("fs").promises;

const isEmpty = (value) => value === undefined || value === "";

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

const toWriteCategory = (fileData) => {
  const text = JSON.stringify(fileData);
  writeFile(`${__dirname}/base/categoryList.json`, text, {
    encoding: "utf8",
  });
};

const toReadCategory = () => {
  return readFile(`${__dirname}/base/categoryList.json`, {
    encoding: "utf8",
  }).then((file) => JSON.parse(file));
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

module.exports = {
  isEmpty,
  removeSpecialFields,
  toWriteCategory,
  toReadCategory,
  toWriteTask,
  toReadTask,
};
