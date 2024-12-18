export const DaysOfWeekEnum = {
	Sunday: 0,
	Monday: 1,
	Tuesday: 2,
	Wednesday: 3,
	Thursday: 4,
	Friday: 5,
	Saturday: 6,
} as const;

export type DaysOfWeekEnumType = keyof typeof DaysOfWeekEnum;
export const DaysOfWeekValues = Object.values(DaysOfWeekEnum) as number[];
