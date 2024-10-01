interface IPlatformListRequest {
  page: number;
  page_size: number;
  ordering: "name" | "released" | "added" | "created" | "updated" | "rating" | "metacritic"
  | "-name" | "-released" | "-added" | "-created" | "-updated" | "-rating" | "-metacritic";
}
