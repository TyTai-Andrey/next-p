interface Platform {
  platform: {
    id: number;
    slug: string;
    name: string
  };
}

interface Game {
  id: number;
  slug: string;
  name: string;
  released: string;
  tba: boolean;
  background_image: string;
  rating: number;
  rating_top: number;
  ratings: object;
  ratings_count: number;
  reviews_text_count: string;
  added: number;
  added_by_status: object;
  metacritic: number;
  parent_platforms: Platform[];
  playtime: number;
  suggestions_count: number;
  updated: Date;
  esrb_rating: {
    id: number;
    slug: string;
    name: string
  };
  platforms: Platform[];
}

interface GameDetails extends Game {
  name_original: string;
  description: string;
  description_raw: string;
  metacritic_platforms: [
    {
      metascore: number;
      url: string
    }
  ];
  background_image_additional: string;
  website: string;
  reactions: object;
  screenshots_count: number;
  movies_count: number;
  creators_count: number;
  achievements_count: number;
  parent_achievements_count: string;
  reddit_url: string;
  reddit_name: string;
  reddit_description: string;
  reddit_logo: string;
  reddit_count: number;
  twitch_count: string;
  youtube_count: string;
  alternative_names: string[];
  metacritic_url: string;
  parents_count: number;
  additions_count: number;
  game_series_count: number;

}

interface Screenshot {
  height: number
  id: number
  image: string
  is_deleted: boolean
  width: number
}
