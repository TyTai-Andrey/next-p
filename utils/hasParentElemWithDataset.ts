const hasParentElemWithDataset = (
  e: MouseEvent,
  datasetName: string,
  datasetValue: string,
  callback?: () => void,
) => {
  let foundDataset = true;
  let { target } = e as any;
  let isSearchDataset = true;

  while (isSearchDataset) {
    if (target) {
      if (target?.dataset?.[datasetName] === datasetValue) {
        isSearchDataset = false;
        foundDataset = false;
      } else {
        target = target?.parentNode;
      }
    } else {
      isSearchDataset = false;
    }
  }

  if (foundDataset) {
    callback?.();
  }

  return foundDataset;
};

export default hasParentElemWithDataset;
