import { CreateScheduleSchema } from "@/schemas/schedule.schema";

export const markPage = (
	pathname: string | undefined,
	href: string,
	className: string,
) => (pathname === href ? className : "");

export const routeLayer = (
	pathname: string,
	layer: number,
): string | undefined => {
	const parts = pathname.split("/").filter((part) => part.length > 0);
	return `/${parts[layer - 1]}`;
};

export const formatDateToBR = (dateString: string): string => {
	const date = new Date(dateString);
	const day = String(date.getDate()).padStart(2, "0");
	const month = String(date.getMonth() + 1).padStart(2, "0"); // Mês começa do zero
	const year = date.getFullYear();
	const hours = String(date.getHours()).padStart(2, "0");
	const minutes = String(date.getMinutes()).padStart(2, "0");

	return `${day}/${month}/${year} ${hours}:${minutes}`;
};

export const transformObject = (
	keyNames: string[],
	prefixKeys: string[],
	prefixValues: string[],
	obj: any,
) => {
	if (
		keyNames.length !== prefixKeys.length ||
		keyNames.length !== prefixValues.length
	) {
		throw new Error(
			"The array keyNames, prefixKeys and prefixValues should some element size.",
		);
	}

	const transformedObject = { ...obj };

	keyNames.forEach((keyName, i) => {
		const prefixKey = prefixKeys[i];
		const prefixValue = prefixValues[i];
		const subObject: any = {};

		for (const key in obj) {
			if (key.startsWith(prefixKey)) {
				const index = key.split("-")[1];
				const valueKey = `${prefixValue}${index}`;
				if (obj[key] && obj[valueKey]) {
					subObject[obj[key]] = obj[valueKey];
				}

				delete transformedObject[key];
				delete transformedObject[valueKey];
			}
		}

		transformedObject[keyName] = subObject;
	});

	return transformedObject;
};

export const transformHttpPrefix = (url: string): string => {
	if (!/^https?:\/\//i.test(url)) {
		return `https://${url}`;
	}
	return url;
};

export const formatResponse = (data: any): string => {
	if (typeof data === "object" && data !== null) {
		try {
			return JSON.stringify(data, null, 2);
		} catch (err) {
			throw new Error("Invalid JSON data");
		}
	} else if (typeof data === "string") {
		if (data.trim().startsWith("<") && data.trim().endsWith(">")) {
			return data;
		}
		if (
			data.includes("<html") ||
			data.includes("<body") ||
			data.includes("<head")
		) {
			return data;
		}
	}
	throw new Error("Unsupported data format");
};

export function addDaysOfWeek(schedule: any): Schedule {
	const daysInOrder = [
		{ key: "monday", value: 1 },
		{ key: "tuesday", value: 2 },
		{ key: "wednesday", value: 3 },
		{ key: "thursday", value: 4 },
		{ key: "friday", value: 5 },
		{ key: "saturday", value: 6 },
		{ key: "sunday", value: 7 },
	];

	const daysOfWeek: number[] = [];

	for (const day of daysInOrder) {
		if (schedule[day.key]?.toLowerCase() === "on") {
			daysOfWeek.push(day.value - 1);
		}
	}

	return { ...schedule, daysOfWeek };
}

function addCronInterval(schedule: any): Schedule {
	let { intervalType, interval, daysOfWeek } = schedule;
	let cronInterval = "";

	if (intervalType === "hour") {
		cronInterval = `*/${interval} * * *`;
	} else if (intervalType === "minute") {
		cronInterval = `* */${interval} * *`;
	}

	if (daysOfWeek && Array.isArray(daysOfWeek) && daysOfWeek.length > 0) {
		cronInterval += ` ${daysOfWeek.join(",")}`;
	} else {
		cronInterval += " *"; // Default para todos os dias
	}

	return {
		...schedule,
		cronInterval,
	};
}

export function formatScheduleRequest(schedule: any): Schedule {
	return addCronInterval(addDaysOfWeek(schedule));
}
