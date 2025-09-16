export type ReviewStatus = "Responded" | "Pending";
export type ReviewSource = "Google" | "OTA" | "Website";


export type Review = {
id: string;
guestName: string;
guestAvatar?: string | null;
rating: 1 | 2 | 3 | 4 | 5;
title: string;
body: string;
propertyName: string; 
roomName?: string | null; 
source: ReviewSource;
status: ReviewStatus;
createdAt: string; 
helpfulCount: number;
respondedAt?: string | null;
};


export type RatingDistribution = {
5: number;
4: number;
3: number;
2: number;
1: number;
};

export type ReviewStats = {
avgRating: number; 
totalReviews: number;
pendingResponses: number;
responseRate: number;
};