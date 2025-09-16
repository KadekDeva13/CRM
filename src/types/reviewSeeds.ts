/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Review, RatingDistribution, ReviewStats } from "./review";

export const reviewStats: ReviewStats = {
    avgRating: 4.5,
    totalReviews: 1226,
    pendingResponses: 23,
    responseRate: 95,
};

export const ratingDistribution: RatingDistribution = {
    5: 68,
    4: 22,
    3: 6,
    2: 3,
    1: 1,
};

const LOREM =
    "Had an amazing stay at this hotel. The staff was incredibly helpful and the ocean view room was breathtaking. Will definitely be back!";


function pad(num: number) {
    return String(num).padStart(2, "0");
}

function dateOffset(days: number) {
    const d = new Date();
    d.setDate(d.getDate() - days);
    return d.toISOString();
}

const base: Omit<Review, "id"> = {
    guestName: "Mindimedia Indonesia",
    guestAvatar: null,
    rating: 5,
    title: "Exceptional service and beautiful rooms!",
    body: LOREM,
    propertyName: "MindiMedia Indonesia",
    roomName: "Ocean View 301",
    source: "Google",
    status: "Responded",
    createdAt: dateOffset(1),
    helpfulCount: 12,
    respondedAt: dateOffset(1),
};

export const reviewsSeed: Review[] = Array.from({ length: 36 }).map((_, i) => ({
    id: `rvw_${i + 1}`,
    ...base,
    rating: (([5, 4, 5, 3, 5, 4, 2, 5, 5, 4] as const)[i % 10]) as 1 | 2 | 3 | 4 | 5,
    status: (i % 4 === 1 ? "Pending" : "Responded"),
    createdAt: dateOffset(i + 1),
    respondedAt: i % 4 === 1 ? null : dateOffset(i + 1),
    helpfulCount: 6 + (i % 15),
}));