// 当前时间数据结构
function Date2Object(time) {
    let year = time.getFullYear(),
        month = time.getMonth() + 1,
        date = time.getDate(),
        day = time.getDay(),
        hours = time.getHours(),
        minutes = time.getMinutes(),
        seconds = time.getSeconds(),
        milliseconds = time.getMilliseconds();
    return { year, month, date, day, hours, minutes, seconds, milliseconds }
}

// 将选择数据转化为对象
function select2Range(select) {
    let start, stop;
    if(typeof select === 'string') {
        const arr = select.split(',');
        start = new Date(arr[0]);
        stop = new Date(arr[1]);
    } else if(select instanceof Array && select.length) {
        start = new Date(select[0]);
        stop = new Date(select[1]);
    } else {
        start = new Date;
        stop = new Date;
    }
    return {
        start, stop
    }
}

// 获得当前月份的天数
function getDateAmount(year, month){
    return (new Date(year, month, 0)).getDate();
}

// 产生一个递增的数字数组
function createNumberArray(num, month, year, currentMonth) {
    return new Array(num).fill(true).map((a, i) => ({
        date: i + 1,
        disabled: false,
        active: false,
        currentMonth,
        month,
        year
    }));
}

// 当前月份的二维数据
function calendar() {
    const td = new Date(...arguments) || new Date;
    let { year, month } = Date2Object(td);

    let currentMonthAmount = getDateAmount(year, month); //当前月份天数
    let currentMonthDates = createNumberArray(currentMonthAmount, month, year, true); // 当前月日期
    
    let beginIndex = new Date(year, month - 1, 1).getDay(); //月初是周几
    if(beginIndex % 7 < 2) {
        beginIndex += 7;
    }
    let endIndex = new Date(year, month - 1, currentMonthAmount).getDay();//月末是周几

    let prevMonth = month - 1, prevYear = year, nextMonth = month + 1, nextYear = year;
    if(prevMonth < 1) {
        prevMonth = 12;
        prevYear = year - 1;
    }
    if(nextMonth > 12) {
        nextMonth = 1;
        nextYear = year + 1;
    }
    let prevMonthAmount = getDateAmount(prevYear, prevMonth); // 上个月总天数
    let prevMonthDates = createNumberArray(prevMonthAmount, prevMonth, prevYear).filter(item => item.date > prevMonthAmount - beginIndex) //上个月部分日期
    let nextMonthDates = createNumberArray(14 - endIndex - 1, nextMonth, nextYear) //下个月部分日期
    
    const calendarArr = [...prevMonthDates, ...currentMonthDates, ...nextMonthDates]

    // 生成矩阵数据
    const datesArr = [];
    calendarArr.forEach((item, index) => {
        let i = parseInt(index / 7), j = index % 7;
        if(datesArr[i]) {
            datesArr[i][j] = item;
        } else {
            datesArr[i] = [item]
        }
    });
    return datesArr.slice(0,6);
}

function createYearArray(obj) {
    let arr = [], begin, end;
    if(typeof obj === 'number') {
        begin = obj - obj % 10;
        end = begin + 10;
    } else if(obj instanceof Array) {
        begin = obj[0];
        end = +obj[1] + 1;
    } else {
        let rg = obj.split('~');
        begin = +rg[0];
        end = +rg[1] + 1;
    }
    for(let i = begin - 1; i <= end; i++) {
        arr.push(i);
    }
    return arr;
}

function createYearRangArray(range) {
    let c = +range.split('~')[0];
    let begin = c - c % 100, end = begin + 100;
    const arr = [];
    for(let i = begin - 10; i <= end; i += 10) {
        arr.push(i + '~' + (i + 9))
    }
    return arr;
}

function quantity(v) {
    if(v === undefined || v === null || v < 0) { return ; }
    return v < 10 ? ('0' + v).slice(-2) : v
}

export {
    calendar,
    select2Range,
    createYearArray,
    createYearRangArray,
    quantity
}