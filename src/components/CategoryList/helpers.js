const catListWithDoneFlag = (taskList, categoryList) => {
  const categoriesWithTask = categoryList.reduce((acc, rec) => {
    let isDone = 0;
    let count = 0;
    taskList
      .filter((item) => item.categoryId === rec.categoryId)
      .forEach((item) => {
        if (item.status === "done") {
          isDone += 1;
        }
        count += 1;
      });
    const isAllTasksDone = isDone / count === 1 ? true : false;
    return [...acc, { ...rec, isAllTasksDone }];
  }, []);

  return categoriesWithTask.filter((el) => el.isAllTasksDone);
};

module.exports = {
  catListWithDoneFlag,
};
