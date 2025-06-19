import { Cast } from "./Cast";

export interface Campaign {
    id: number;
    name: string;
    season: number;
    manual: string;
    setting: string;
    is_edited: boolean;
    youtube_link: string;
    thumbnail: string;
    slug: string;
    campaign_cast: Cast[];
}
