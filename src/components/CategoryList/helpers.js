const catListWithDoneFlag = (taskList, categoryList) => {
  const commonTaskData = Object.values(
    taskList.reduce((r, e) => {
      let categoryId = `${e.categoryId}`;
      let status = `${e.status}`;
      if (!r[categoryId]) {
        if (status === "done") {
          r[categoryId] = {
            categoryId: e.categoryId,
            sumOfDoneTasks: 1,
            sumOfTasks: 1,
          };
        } else {
          r[categoryId] = {
            categoryId: e.categoryId,
            sumOfTasks: 1,
            sumOfDoneTasks: 0,
          };
        }
      } else {
        r[categoryId].sumOfTasks = (r[categoryId].sumOfTasks ?? 0) + 1;
        if (status === "done") {
          r[categoryId].sumOfDoneTasks =
            (r[categoryId].sumOfDoneTasks ?? 0) + 1;
        }
      }
      return r;
    }, {})
  );

  const categoriesWithTask = commonTaskData.reduce((acc, rec) => {
    const isAllTasksDone =
      Number(rec.sumOfTasks) / Number(rec.sumOfDoneTasks) === 1 ? true : false;
    return [...acc, { categoryId: rec.categoryId, isAllTasksDone }];
  }, []);

  const allTaskDoneStatusList = categoryList.map((itm) => ({
    ...categoriesWithTask.find(
      (item) => item.categoryId === itm.categoryId && item
    ),
    ...itm,
  }));

  const taskDoneStatusList = allTaskDoneStatusList.filter(el => el.isAllTasksDone)

  return taskDoneStatusList;
};

module.exports = {
  catListWithDoneFlag,
};
