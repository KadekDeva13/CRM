export type Channel = "Email" | "SMS" | "Push" | "Social";

export type CampaignReport = {
    id: string;
    name: string;
    channel: Channel;
    date: string;
    sent: number;
    bookings: number;
    revenue: number;
    opens: number;
    openRate: number;
    clicks: number;
    ctr: number;
    unsubscribes: number;
};

export type ReportQuery = {
    search?: string;
    type?: Channel | "All";
    tags?: string[];
    range?:
    | "Last 7 Days"
    | "Last 30 Days"
    | "Last 6 Months"
    | "This Year"
    | "Custom";
    from?: string;
    to?: string;
    page?: number;
    perPage?: number;
    sortBy?: SortKey;
    sortDir?: "asc" | "desc";
};

export type SortKey =
    | "name"
    | "date"
    | "sent"
    | "bookings"
    | "revenue"
    | "opens"
    | "clicks"
    | "ctr"
    | "unsubscribes";

export type Paginated<T> = {
    data: T[];
    total: number;
    page: number;
    perPage: number;
};
