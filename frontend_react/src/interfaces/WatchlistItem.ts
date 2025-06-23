import { Campaign } from "./Campaign";

export interface GetWatchlistItem {
    id?: number;
    user?: number;
    campaign: Campaign;
}

export interface PostWatchlistItem {
    id?: number;
    user?: number;
    campaign: number;
}
