interface ISearchParentElemWithDataset {
  event: MouseEvent,
  datasetName: string,
  datasetValue: string,
  successCallback?: () => void,
  failCallback?: () => void
}

const searchParentElemWithDataset = ({
  datasetName,
  datasetValue,
  event,
  failCallback,
  successCallback,
}: ISearchParentElemWithDataset) => {
  let hasParentElemWithDataset = false;
  let { target } = event as any;
  let isSearchDataset = true;

  while (isSearchDataset) {
    if (target) {
      if (target?.dataset?.[datasetName] === datasetValue) {
        isSearchDataset = false;
        hasParentElemWithDataset = true;
      } else {
        target = target?.parentNode;
      }
    } else {
      isSearchDataset = false;
    }
  }

  if (hasParentElemWithDataset) {
    successCallback?.();
  } else {
    failCallback?.();
  }

  return { hasParentElemWithDataset, target };
};

export default searchParentElemWithDataset;
