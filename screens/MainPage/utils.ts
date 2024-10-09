import { ReadonlyURLSearchParams } from "next/navigation";

const sortButtonsFields = [
  { field: "released", title: "Released" },
  { field: "rating", title: "Rating" },
];

const getParentPlatformsValue = (
  parentPlatforms: PlatformDetails[],
  query: ReadonlyURLSearchParams | null,
) => parentPlatforms?.find(i => String(i.id) === query?.get("parent_platforms"))?.name ?? "";

export { getParentPlatformsValue, sortButtonsFields };
