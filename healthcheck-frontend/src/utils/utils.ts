import { ResponseRecord } from "@/@interfaces/ResponseRecord";
import { utils, writeFile } from "xlsx";
import jsPDF from "jspdf";

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
	const month = String(date.getMonth() + 1).padStart(2, "0");
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
		cronInterval += " *";
	}

	return {
		...schedule,
		cronInterval,
	};
}

export function formatScheduleRequest(schedule: any): Schedule {
	return addCronInterval(addDaysOfWeek(schedule));
}

export function calculateSla(
	data: ResponseRecord[],
	slaTarget: number,
): { slaStatus: "VIOLATED" | "PASSED"; slaPercent: number } {
	const total = data.length;
	const successCount = data.filter(
		(item) => item.response?.status < 300,
	).length;
	const successRate = total > 0 ? (successCount / total) * 100 : 0;
	const slaViolated = successRate < slaTarget;
	const slaStatus = slaViolated ? "VIOLATED" : "PASSED";
	const slaPercent = Math.round(successRate);

	return { slaStatus, slaPercent };
}

export function exportToExcel({
	headers,
	data,
	fileName = "export.xlsx",
}: {
	headers: string[];
	data: (string | number)[][];
	fileName?: string;
}) {
	const sheetData = [headers, ...data];
	const ws = utils.aoa_to_sheet(sheetData);
	const wb = utils.book_new();
	utils.book_append_sheet(wb, ws, "Sheet1");
	writeFile(wb, fileName);
}

export function exportToPDF({
	title,
	headers,
	data,
	fileName = "export.pdf",
	footer,
}: {
	title: string;
	headers: string[];
	data: (string | number)[][];
	fileName?: string;
	footer?: string;
}) {
	const doc = new jsPDF({
		orientation: "l",
		unit: "pt",
		format: "a4",
	});

	doc.setFontSize(14);
	doc.text(title, 40, 40);

	let yPos = 80;
	const lineHeight = 20;

	doc.setFont("helvetica", "bold");
	headers.forEach((header, index) => {
		doc.text(header, 40 + index * 120, yPos);
	});

	doc.setFont("helvetica", "normal");
	yPos += lineHeight;

	data.forEach((row) => {
		row.forEach((cell, index) => {
			doc.text(String(cell), 40 + index * 120, yPos);
		});
		yPos += lineHeight;

		if (yPos > 550) {
			doc.addPage();
			yPos = 80;
			headers.forEach((header, index) => {
				doc.text(header, 40 + index * 120, yPos);
			});
			yPos += lineHeight;
		}
	});

	if (footer) {
		yPos += lineHeight;
		doc.text(footer, 40, yPos);
	}

	doc.save(fileName);
}
