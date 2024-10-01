const hasParentElemWihtDataset = (
  e: MouseEvent,
  datasetName: string,
  datasetValue: string,
  callback?: () => void,
) => {
  let check = true;
  let { target } = e as any;
  let go = true;

  while (go) {
    if (target) {
      if (target?.dataset?.[datasetName] === datasetValue) {
        go = false;
        check = false;
      } else {
        target = target.parentNode;
      }
    } else {
      go = false;
    }
  }

  if (check) {
    callback?.();
  }

  return check;
};

export default hasParentElemWihtDataset;
