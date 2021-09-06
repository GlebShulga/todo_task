const { nanoid } = require("nanoid");
const {
  isEmpty,
  removeSpecialFields,
  toWriteCategory,
  toReadCategory,
} = require("../helpers");

const categorySchema = require("../models/category.model");

module.exports = {
  get,
  post,
  patch,
  remove,
};

function sortCategoriesByDate(categoryList) {
  return categoryList.sort((a, b) => b._createdAt - a._createdAt);
}

const FilterDeletedCategories = (categories) => {
  return categories?.filter((category) => !category._isDeleted);
};

async function post (req, res) {
  const { categoryTitle, parentCategoryId, lvl } = req.body;
  if (!req.body.categoryTitle) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  const newCategory = {
    ...categorySchema,
    categoryId: nanoid(),
    parentCategoryId,
    categoryTitle,
    lvl,
    _createdAt: +new Date(),
  };
  const categoryList = await toReadCategory()
    .then(async (existingCategoryList) => {
      const list = [...existingCategoryList, newCategory];
      await toWriteCategory(list);
      return list;
    })
    .then((categoryList) => sortCategoriesByDate(categoryList))
    .then((categoryList) => removeSpecialFields(categoryList))
    .catch(async () => {
      await toWriteCategory([newCategory]);
      return [newCategory];
    });
  res.json(FilterDeletedCategories(categoryList));
}

async function get (req, res) {
    const data = await toReadCategory()
      .then((categoryList) => sortCategoriesByDate(categoryList))
      .then((categoryList) => removeSpecialFields(categoryList))
      .catch(() => {
        res.status(404);
        res.end();
      });
    res.json(FilterDeletedCategories(data));
}

async function patch (req, res) {
    let { categoryId, categoryTitle } = req.body;
      if (!req.body.categoryTitle) {
        res.status(400).send({
          message: "Content can not be empty!",
        });
      }
    const data = await toReadCategory()
      .then((categoryList) => {
        return categoryList?.map((category) => {
          if (category.categoryId !== categoryId) {
            return category;
          }
          if (isEmpty(categoryTitle)) {
            categoryTitle = category.categoryTitle;
          }
          return { ...category, categoryTitle };
        });
      })
      .then((categoryList) => sortCategoriesByDate(categoryList))
      .catch(() => {
        res.status(404);
        res.end();
      });
    toWriteCategory(data);
    res.json(removeSpecialFields(FilterDeletedCategories(data)));
}

async function remove (req, res) {
    const { categoryId } = req.body;
    const data = await toReadCategory()
      .then((categoryList) =>
        categoryList.map((category) => {
          return category.categoryId !== categoryId
            ? category
            : { ...category, _isDeleted: true, _deletedAt: +new Date() };
        })
      )
      .then((categoryList) => sortCategoriesByDate(categoryList))
      .catch(() => {
        res.status(404);
        res.end();
      });
    await toWriteCategory(data);
    res.json(removeSpecialFields(FilterDeletedCategories(data)));
}
