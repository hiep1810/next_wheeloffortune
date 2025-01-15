
export type WheelSegmentType = 'points' | 'name' | 'none';
export type WheelSegmentRewardType = number | string;

export interface WheelSegment {
  id: number;
  text: string;
  probability: number;
  color: string;
  reward: {
    type: WheelSegmentType;
    value: WheelSegmentRewardType;
  };
}

export const wheelSegments: WheelSegment[] = [
  {
    id: 1,
    text: "100 Points",
    probability: 0.2,
    color: "#FF6B6B",
    reward: {
      type: "points",
      value: 100,
    },
  },
  {
    id: 2,
    text: "200 Points",
    probability: 0.15,
    color: "#4ECDC4",
    reward: {
      type: "points",
      value: 200,
    },
  },
  {
    id: 3,
    text: "500 Points",
    probability: 0.1,
    color: "#45B7D1",
    reward: {
      type: "points",
      value: 500,
    },
  },
  {
    id: 4,
    text: "Try Again",
    probability: 0.25,
    color: "#96CEB4",
    reward: {
      type: "none",
      value: 0,
    },
  },
  {
    id: 5,
    text: "1000 Points",
    probability: 0.05,
    color: "#D4A5A5",
    reward: {
      type: "points",
      value: 1000,
    },
  },
  {
    id: 6,
    text: "50 Points",
    probability: 0.25,
    color: "#FFE66D",
    reward: {
      type: "points",
      value: 50,
    },
  },
]; 