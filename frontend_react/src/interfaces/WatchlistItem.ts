import { Campaign } from "./Campaign";

export interface GetWatchlistItem {
    user?: number;
    campaign: Campaign;
}

export interface PostWatchlistItem {
    user?: number;
    campaign: number;
}
