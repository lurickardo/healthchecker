type IntervalType = "minute" | "hour";

interface Params {
    [key: string]: string;
}

interface Headers {
    [key: string]: string;
}

interface Schedule {
    method: "GET" | "POST" | "PUT" | "DELETE";
    url: string;
    body?: string;
    monday?: "on" | "off";
    tuesday?: "on" | "off";
    wednesday?: "on" | "off";
    thursday?: "on" | "off";
    friday?: "on" | "off";
    saturday?: "on" | "off";
    sunday?: "on" | "off";
    intervalType: IntervalType;
    interval: string;
    params: Params;
    headers: Headers;
}
