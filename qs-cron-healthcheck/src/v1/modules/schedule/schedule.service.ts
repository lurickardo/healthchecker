import type {
	CreateScheduleDto,
	UpdateScheduleDto,
	RemoveScheduleDto,
} from "./dto";

export const scheduleService = {
	create: async (createScheduleDto: CreateScheduleDto) => {
		console.log(createScheduleDto);
		return;
	},
	update: async (updateScheduleDto: UpdateScheduleDto) => {
		console.log(updateScheduleDto);
		return;
	},
	remove: async (removeScheduleDto: RemoveScheduleDto) => {
		console.log(removeScheduleDto);

		return;
	},
};
