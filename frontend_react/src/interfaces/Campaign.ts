import { Cast } from "./Cast";

export interface Campaign {
    id: number;
    name: string;
    season: number;
    slug: string;
    is_edited: boolean;
    manual: string;
    youtube_link: string;
    campaign_cast: Cast[];
}
