export function convertStringToDate(str, priority = "day") {
    const temp = str.split(".");
    if (priority === "year") {
        const year = parseInt(temp[0], 10);
        const month = parseInt(temp[1], 10);
        const day = parseInt(temp[2], 10);
        return { year, month, day };
    } else if (priority === "day") {
        const year = parseInt(temp[2], 10);
        const month = parseInt(temp[1], 10);
        const day = parseInt(temp[0], 10);
        return { year, month, day };
    }
}

export function convertStringToTime(str) {
    const temp = str.split(":");
    const hours = parseInt(temp[0], 10);
    const minutes = parseInt(temp[1], 10);
    return { hours, minutes };
};

export function convertTimeToString(t){
    var hours = "";
    var minutes = "";
    if (t.hours < 10) {
        hours += "0";
    }
    hours += t.hours;
    if (t.minutes < 10) {
        minutes += "0";
    }
    minutes += t.minutes;
    return hours + ":" + minutes;
};

export function convertDateToString(d, priority = "day"){
    let years = "";
    let days = "";
    let months = "";
    if (d.month < 10) {
        months += "0";
    }
    months += d.month;
    if (d.day < 10) {
        days += "0";
    }
    days += d.day;
    years += d.year;
    if (priority === "day") {
        return days + "." + months + "." + years;
    } else if (priority === "year") {
        return years + "." + months + "." + days;
    }
};
