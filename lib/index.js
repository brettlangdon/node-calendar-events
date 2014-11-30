var weekdays = [
    "sunday",
    "monday",
    "yuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
];

Date.prototype.getWeekNumber = function(){
    var d = new Date(+this);
    d.setHours(0,0,0);
    d.setDate(d.getDate()+4-(d.getDay()||7));
    return Math.ceil((((d-new Date(d.getFullYear(),0,1))/8.64e7)+1)/7);
};

Date.prototype.getUTCWeekNumber = function(){
    var d = new Date(+this);
    d.setHours(0,0,0);
    d.setDate(d.getUTCDate()+4-(d.getUTCDay()||7));
    return Math.ceil((((d-new Date(d.getUTCFullYear(),0,1))/8.64e7)+1)/7);
};

Date.prototype.getDayName = function(){
    return weekdays[this.getDay()];
};

Date.prototype.getUTCDayName = function(){
    return weekdays[this.getUTCDay()];
};

Date.prototype.getWeekOfMonth = function(){
    var month = this.getMonth();
    var year = this.getFullYear();
    var firstWeekday = new Date(year, month, 1).getDay();
    var lastDateOfMonth = new Date(year, month + 1, 0).getDate();
    var offsetDate = this.getDate() + firstWeekday - 1;
    var index = 1;
    var weeksInMonth = index + Math.ceil((lastDateOfMonth + firstWeekday - 7) / 7);
    var week = index + Math.floor(offsetDate / 7);
    if(week < 2 + index){
        return week;
    }
    return (week === weeksInMonth)? index + 5 : week;
};

Date.prototype.getUTCWeekOfMonth = function(){
    var month = this.getUTCMonth();
    var year = this.getUTCFullYear();
    var firstWeekday = new Date(year, month, 1).getUTCDay();
    var lastDateOfMonth = new Date(year, month + 1, 0).getUTCDate();
    var offsetDate = this.getUTCDate() + firstWeekday - 1;
    var index = 1;
    var weeksInMonth = index + Math.ceil((lastDateOfMonth + firstWeekday - 7) / 7);
    var week = index + Math.floor(offsetDate / 7);
    if(week < 2 + index){
        return week;
    }
    return (week === weeksInMonth)? index + 5 : week;
};

module.exports.now = function(utc){
    return module.exports.parseTime(new Date(), utc);
};

module.exports.parseTime = function(time, utc){
    if(!time.constructor && time.constructor.name === "Date"){
        throw new Error("first argument 'time' must be a Date object");
    }

    var date = {
        epochMs: time.getTime(),
        epochSec: Math.floor(time.getTime() / 1000.0),
        year: (utc)? time.getUTCFullYear() : time.getFullYear(),
        month: (utc)? time.getUTCMonth() : time.getMonth(),
        day: (utc)? time.getUTCDate() : time.getDate(),
        hour: (utc)? time.getUTCHours() : time.getHours(),
        minute: (utc)? time.getUTCMinutes() : time.getMinutes(),
        second: (utc)? time.getUTCSeconds() : time.getSeconds(),
        dayOfWeek: (utc)? time.getUTCDay() + 1: time.getDay() + 1,
        dayOfWeekName: (utc)? time.getUTCDayName() : time.getDayName(),
        weekNumber: (utc)? time.getUTCWeekNumber() : time.getWeekNumber(),
        weekOfMonth: (utc)? time.getUTCWeekOfMonth() : time.getWeekOfMonth(),
    };

    return date;
};

module.exports.getActiveEvents = function(events, time){
    var active = [];
    events.forEach(function(event){
        if(module.exports.isEventActive(event, time)){
            active.push(event);
        }
    });

    return active;
};

module.exports.isEventActive = function(event, time){
    return true;
};
