const sumOfTasks = (taskList) => {
  Object.values(
    taskList.reduce((r, e) => {
      let categoryId = `${e.categoryId}`;
      if (!r[categoryId]) {
        r[categoryId] = { categoryId: e.categoryId, sumOfTasks: 1 };
      } else {
        r[categoryId].sumOfTasks += 1;
      }
      return r;
    }, {})
  );
};

const sumOfDoneTasks = (taskList) => { Object.values(
  taskList.reduce((r, e) => {
    let categoryId = `${e.categoryId}`;
    let status = `${e.status}`;
    if (!r[categoryId] && status === "done") {
      r[categoryId] = { categoryId: e.categoryId, sumOfDoneTasks: 0 };
    }
    if (r[categoryId] && status === "done") {
      r[categoryId].sumOfDoneTasks += 1;
    }
    return r;
  }, {})
);
}

const mergeById = (a1, a2) =>
  a1?.map((itm) => ({
    ...a2.find((item) => item.categoryId === itm.categoryId),
    ...itm,
  }));

  const result = mergeById(sumOfTasks, sumOfDoneTasks).reduce((acc, rec) => {
    if (rec.sumOfDoneTasks) {
      const completed = Math.round((rec.sumOfDoneTasks / rec.sumOfTasks) * 100);
      return [...acc, { ...rec, completed }];
    }
    return acc;
  }, []);
