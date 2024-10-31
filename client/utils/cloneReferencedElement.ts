import { cloneElement } from "react";

const cloneReferencedElement = (
  element: any,
  config: any,
  ...children: any
) => {
  const $original = element?.ref;
  const $clone = config.ref;

  if ($original === null || $clone === null) {
    return cloneElement(element, config, ...children);
  }

  if (typeof $original !== "function") {
    return cloneElement(element, config, ...children);
  }

  return cloneElement(
    element,
    {
      ...config,
      ref(component: any) {
        $clone(component);
        $original(component);
      },
    },
    ...children,
  );
};

export default cloneReferencedElement;
