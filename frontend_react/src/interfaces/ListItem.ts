export interface ListItem {
    id?: number;
    logo?: string;
    name: string;
    counter?: number;
    itemType: "Manual" | "Player" | "Setting";
}
