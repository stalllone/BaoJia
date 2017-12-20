/**
 * Created by Administrator on 2015/5/28.
 */

/****
 *Objects
 */

/**
 *
 * @param year
 * @param month
 * @constructor
 */
var DayPicker = function (year, month) {
    var blackKeyMonth = new Array(4, 6, 9, 11);
    var bjDay = {
        year: (year == null) ? 1900 : year,
        month: (month == null) ? 1 : month
    }

    this.getBJDay = function () {
        return bjDay;
    }

    this.setBaoJiaDay = function (year, month) {
        bjDay.year = year;
        bjDay.month = month;
    }

    this.generateDayPickerView = function (year, month, pickedValue,selectedDate) {
        year = (year == null) ? bjDay.year : year;
        month = (month == null) ? bjDay.month : month;
        var sourceArray = getDayArray(year, month);
        var weekTitleArray = new Array('日', '一', '二', '三', '四', '五', '六');
        var weekTableHead, weekTableBody;
        var template = '<table class="datepicker-table">';
        var safeDate = new Date();
        weekTableHead = generateDayPickerHead(weekTitleArray);
        weekTableBody = generateDayPickerBody(sourceArray, year, month, pickedValue,selectedDate);
        template += weekTableHead;
        template += weekTableBody;
        template += '</table>'
        $('.date_selector').empty();
        $('.date_selector').append(template);
        $('.datetablebody tr td').delegate('span', 'click', function () {
            if ($(this).hasClass('unclickabledays')) {
                //warn user
            } else {
                var bjCalVal = bjCal.getPickedValue();
                var dateValue = parseInt($(this).attr('data-value'));
                //TO DO CLASH CHECK
                $('.datetablebody td span').removeClass('selecteddate');
                $(this).addClass('selecteddate');
                var startDTArray =[bjCal.getPickedValue().year,bjCal.getPickedValue().month,
                	dateValue, bjCal.getPickedValue().hour,bjCal.getPickedValue().minute];

                var startDTStr = transferDTArrayToString(startDTArray);
                bjCal.setPickedValue(null, null, dateValue, null, null);
                if (bjCal.getCalendarState() == 'rentalStart') {
                    var currentDTStr = transferDTToString(safeDate);
                    if(startDTStr <= currentDTStr ){
                    	var rounded  = roundUpTime(parseInt(safeDate.getHours()),parseInt(safeDate.getMinutes()));
                    	notifyHourSelector(rounded[0]);
                    	notifyMinuteSelector(rounded[1]); 
                    	bjCal.setPickedValue(null, null, null, rounded[0], rounded[1]);
                    	 
                    }
                    setSelectedDay(bjCal.getPickedValue().year, bjCal.getPickedValue().month,dateValue,'rentalStart');
                    notifyResultChange('rentalStart', bjCal.getPickedValue());
                } else {
                	setSelectedDay(bjCal.getPickedValue().year, bjCal.getPickedValue().month,dateValue,'rentalEnd');
                    notifyResultChange('rentalEnd', bjCal.getPickedValue());
                }
            }
        });
    }

    function generateDayPickerHead(source) {
        var head = '<thead>';
        for (var count = 0; count < source.length; count++) {
            head += '<th class="datetablehead">' + source[count] + '</th>';
        }
        return head += '</thead>';
    }

    function generateDayPickerBody(source, year, month, pickedValue,selectedDate) {
        var tdCount = 0;
        var week = '';
        var content = '<tbody class="datetablebody">';
        var currentDate = new Date();
        var currentYear = parseInt(currentDate.getFullYear());
        var currentMonth = parseInt(currentDate.getMonth()) + 1;
        var currentDate = parseInt(currentDate.getDate());
        var pickedYear = (pickedValue == null) ? 1900 : parseInt(pickedValue.year);
        var pickedMonth = (pickedValue == null) ? 0 : (pickedValue.month);
        var pickedDay = (pickedValue == null) ? 0 : (pickedValue.date);
        if(selectedDate == null){
            selectedDate = [currentYear, currentMonth,currentDate];
        }
        for (var dateCount = 0; dateCount < source.length; dateCount++) {
            if (tdCount == 0) {
                week += '<tr>';
            }
            week += '<td>'
            if (parseInt(source[dateCount]) == 0) {
                week += '<span class=" unclickabledays "></span>';
            } else if (year < pickedYear || year < currentYear) {
                week += '<span class=" unclickabledays " data-value="' + source[dateCount] + ' ">'
                + source[dateCount] + '</span>';
            } else if (year == currentYear && parseInt(month) < currentMonth) {
                week += '<span class=" unclickabledays " data-value="' + source[dateCount] + ' ">'
                + source[dateCount] + '</span>';
            } else if (year == pickedYear && parseInt(month) < pickedMonth) {
                week += '<span class=" unclickabledays " data-value="' + source[dateCount] + ' ">'
                + source[dateCount] + '</span>';
            } else if (parseInt(year) == currentYear && parseInt(month) == currentMonth && parseInt(source[dateCount]) < currentDate) {
                week += '<span class=" unclickabledays " data-value="' + source[dateCount] + ' ">'
                + source[dateCount] + '</span>';
            } else if (year == pickedYear && parseInt(month) == pickedMonth
                && parseInt(source[dateCount]) < pickedDay) {
                week += '<span class=" unclickabledays " data-value="' + source[dateCount] + ' ">'
                + source[dateCount] + '</span>';
            } else {
                week += '<span class=" availabledays ';
                if(parseInt(selectedDate[0]) == parseInt(year) && parseInt(selectedDate[1]) == parseInt(month) && parseInt(selectedDate[2]) == parseInt(source[dateCount])) {
                    week += ' selecteddate ';
                }
                week += ('" data-value="' + source[dateCount] + '">'+ source[dateCount] + '</span>');
            }
            week += '</td>';

            if (dateCount == (source.length - 1)) {
                week += '</tr>';
                content += week;
                week = '';
            } else if (tdCount == 6) {
                week += '</tr>'
                content += week;
                tdCount = 0;
                week = '';
            } else {
                tdCount++;
            }
        }
        content += '</body>'
        return content;
    }

    function getDayArray(year, month) {
        var numOfDays = calcualteDays(year, month);
        var firstDayWeekDay = getFirstDayWeekDay(year, month);
        var daysArray = new Array();
        /**
         * fill zeros
         */
        for (var fillInCountDown = firstDayWeekDay; fillInCountDown > 0; fillInCountDown--) {
            daysArray.push(0);
        }
        /**
         * fill in natural days
         */
        for (var natualDayCount = 1; natualDayCount <= numOfDays; natualDayCount++) {
            daysArray.push(natualDayCount);
        }
        return daysArray;
    }

    function calcualteDays(year, month) {
        if (parseInt(month) == 2) {
            if (isLeapYear(year) == 1) {
                return 29;
            } else {
                return 28;
            }
        }else{
        	var isBlackKey = 0;
           for( m in blackKeyMonth){
           	 if(blackKeyMonth[m] == month){
           	 	isBlackKey = 1;
           	 	break;
           	 }else{
           	 	continue;
           	 }
           }
           if(isBlackKey == 1){
           	return 30;
           }	else{
           	return 31;
           }
        } 
    }

    function isLeapYear(year) {
        return (year % 4 == 0) ? 1 : 0; // 1 represents leap year
    }

    function getFirstDayWeekDay(year, month) {
        var baseDate = new Date(year, (month - 1), 1);
        return baseDate.getDay();
    }
}
/**
 *
 * @param state //rental start or end
 * @constructor
 */
var BaojiaCalendar = function (state) {
    var currentState = (typeof (state) == undefined) ? 'rentalStart' : state;
    var pickedValue = {
        year: 1900,
        month: 1,
        date: 1,
        hour: 0,
        minute: 0
    };
    this.getCalendarState = function () {
        return currentState;
    }
    this.setCalendarState = function (state) {
        currentState = state;
    }
    /**
     *
     * @returns {{year: number, month: number, date: number, hour: number, minute: number}}
     */
    this.getPickedValue = function () {
        return pickedValue;
    }
    /**
     *
     * @param year
     * @param month
     * @param date
     * @param hour
     * @param minute
     */
    this.setPickedValue = function (year, month, date, hour, minute) {
        if (year != null) {
            pickedValue.year = year;
        }
        if (month != null) {
            pickedValue.month = month;
        }
        if (date != null) {
            pickedValue.date = date;
        }
        if (hour != null) {
            pickedValue.hour = hour;
        }
        if (minute != null) {
            pickedValue.minute = minute;
        }
    }
    this.resetBaojiaCalendar = function (newState, resultValue) {
        currentState = newState;
        this.setPickedValue(resultValue.year, resultValue.month, resultValue.date, resultValue.hour, resultValue.minute);
    }
    this.getPickedValArray = function () {
        return [pickedValue.year, pickedValue.month, pickedValue.date, pickedValue.hour, pickedValue.minute];
    }
    this.showPickedInfo = function () {
        return [currentState, pickedValue.year, pickedValue.month, pickedValue.date, pickedValue.hour, pickedValue.minute];
    }
}
/***
 *Result
 * @param type
 * @param pickedValue
 * @constructor
 */
var Result = function (type, pickedValue) {
    var resultType = (typeof(type) == undefined) ? 'rentalStart' : type;

    var resultValue = {
        year: (pickedValue == null) ? 1900 : pickedValue.year,
        month: (pickedValue == null) ? 1 : pickedValue.month,
        date: (pickedValue == null) ? 1 : pickedValue.date,
        hour: (pickedValue == null) ? 0 : pickedValue.hour,
        minute: (pickedValue == null) ? 0 : pickedValue.minute
    };
    this.getResultType = function () {
        return resultType;
    }
    this.setResultType = function (typ) {
        resultType = typ;
    }
    this.getResultValue = function () {
        return resultValue;
    }
    this.setResultValue = function (year, month, date, hour, minute) {
        if (year != null) {
            resultValue.year = year;
        }
        if (month != null) {
            resultValue.month = month;
        }
        if (date != null) {
            resultValue.date = date;
        }
        if (hour != null) {
            resultValue.hour = hour;
        }
        if (minute != null) {
            resultValue.minute = minute;
        }
    }
    this.displayResult = function (pickedValue) {
        //Display the result on the top
        var year, month, date, hour, minute, resultArray, ymdResult, hmResult, resultContent;
        if (pickedValue == null) {
            pickedValue = this.getResultValue();
            year = pickedValue.year;
            month = pickedValue.month;
            date = pickedValue.date;
            hour = pickedValue.hour;
            minute = pickedValue.minute;
        }
        resultArray = generateResultContent(year, month, date, hour, minute);
        ymdResult = resultArray[0];
        hmResult = resultArray[1];
        resultContent = '<span class="ymd-display-span">' + ymdResult + '</span><span class="hr-display-span">' + hmResult + '</span>';
        if (resultType == null || resultType == 'rentalStart') {
            $('.pickupResultDisplay .result-detail-div').empty();
            $('.pickupResultDisplay .result-detail-div').append(resultContent);
        } else {
            $('.returnResultDisplay .result-detail-div').empty();
            $('.returnResultDisplay .result-detail-div').append(resultContent);
        }
    }
}


/***
 *Functions
 */

/**
 *
 * @param bjcal //baojia calendar
 */
function initBaojiaCalendar(bjcal) {
    var currDT = new Date();
    var processedDT = processRawDate(currDT);
    bjcal.setPickedValue(processedDT.year, processedDT.month,
        processedDT.date, processedDT.hour, processedDT.minute);
    /**
     * fill the blanks on page
     */
        //year
    initiateYMHMView(processedDT.year, processedDT.month, processedDT.hour, processedDT.minute);
    return bjcal;
}
function initiateYMHMView(year, month, hour, minute) {
    $('.year-content').attr('data-value', year);
    $('.year-content').empty();
    $('.year-content').append(year);
    //month
    $('.month-content').attr('data-value', month);
    $('.month-content').empty();
    $('.month-content').append(fillBlank(month));
    //hour
    $('.hour-content').attr('data-value', hour);
    $('.hour-content').empty();
    $('.hour-content').append(fillBlank(hour));
    //minute
    $('.minute-content').attr('data-value', minute);
    $('.minute-content').empty();
    $('.minute-content').append(fillBlank(minute));
}
/**
 *
 * @param d
 * @returns {{year: number, month: *, date: number, hour: *, minute: *}}
 */
function processRawDate(d) {
    var rounded = roundUpTime(d.getHours(), d.getMinutes());
    var processed = {
        year: d.getFullYear(),
        month: fillBlank(d.getMonth() + 1),
        date: d.getDate(),
        hour: rounded[0],
        minute: rounded[1]
    }
    return processed;
}

function resumeDTPicker() {
    var state, pickupResultStr, returnResultStr, pickupDTArray, returnDTArray, pickupHM, returnHM;
    state = $('#initialType').attr('value');
    if (state == null || state == "" || state == "1") {
        state = 'rentalStart';
    } else {
        state = 'rentalEnd';
    }
    pickupResultStr = $('#pikeupResultHidden').attr('value');
    returnResultStr = $('#returnResultHidden').attr('value');
    pickupDTArray = transferInputDTStringToArray(pickupResultStr);
    returnDTArray = transferInputDTStringToArray(returnResultStr);
    pickupResult.setResultValue(pickupDTArray[0], pickupDTArray[1], pickupDTArray[2], pickupDTArray[3], pickupDTArray[4]);
    returnResult.setResultValue(returnDTArray[0], returnDTArray[1], returnDTArray[2], returnDTArray[3], returnDTArray[4]);
    setSelectedDay(pickupDTArray[0], pickupDTArray[1], pickupDTArray[2],'rentalStart');
    setSelectedDay(returnDTArray[0], returnDTArray[1], returnDTArray[2],'rentalEnd');
    bjCal.setCalendarState(state);

    $('.result-display').removeClass('selected-result');
    if (state == 'rentalStart') {
        $('.pickupResultDisplay').addClass('selected-result');
        bjCal.resetBaojiaCalendar('rentalStart', pickupResult.getResultValue());
        initiateYMHMView(pickupDTArray[0], pickupDTArray[1], pickupDTArray[3], pickupDTArray[4]);
        dayPicker.setBaoJiaDay(pickupDTArray[0], pickupDTArray[1]);
        dayPicker.generateDayPickerView(null, null, null,selectedPickupDate);
    } else {
        $('.returnResultDisplay').addClass('selected-result');
        bjCal.resetBaojiaCalendar('rentalEnd', returnResult.getResultValue());
        initiateYMHMView(returnDTArray[0], returnDTArray[1], returnDTArray[3], returnDTArray[4]);
        dayPicker.setBaoJiaDay(returnDTArray[0], returnDTArray[1]);
        dayPicker.generateDayPickerView(null, null, null,selectedReturnDate);
    }
    pickupResult.displayResult(null);
    returnResult.displayResult(null);
}
/***
 *
 * @param newtype
 * @param pickupResult
 * @param returnResult
 */
function switchPickType(newtype, pickupResult, returnResult) {
    var pickedValue = bjCal.getPickedValue();
    var pickedValueInString = transferPickedValueToString(pickedValue);
    var targetValue = null;
    if (newtype == 'rentalEnd') {
        targetValue = returnResult.getResultValue();
        var targetValueInString = transferPickedValueToString(targetValue);
        if (pickedValueInString > targetValueInString) {
            setSelectedDay(pickedValue.year, pickedValue.month, pickedValue.date,'rentalEnd');
            returnResult.setResultValue(pickedValue.year, pickedValue.month, pickedValue.date, pickedValue.hour, pickedValue.minute);
            returnResult.displayResult(null);
            notifyYearSelector(returnResult.getResultValue().year);
            notifyMonthSelector(returnResult.getResultValue().month);
            notifyHourSelector(returnResult.getResultValue().hour);
            notifyMinuteSelector(returnResult.getResultValue().minute);
            bjCal.resetBaojiaCalendar('rentalEnd', pickedValue);
            notifyDayPicker(returnResult.getResultValue().year, returnResult.getResultValue().month);   
        } else {
            setSelectedDay(targetValue.year, targetValue.month, targetValue.date,'rentalEnd');
            notifyYearSelector(targetValue.year);
            notifyMonthSelector(targetValue.month);
            notifyHourSelector(targetValue.hour);
            notifyMinuteSelector(targetValue.minute);
            bjCal.resetBaojiaCalendar('rentalEnd', targetValue);
            notifyDayPicker(targetValue.year, targetValue.month);
        }
    } else {
        targetValue = pickupResult.getResultValue();
        var targetValueInString = transferPickedValueToString(targetValue);
        if (targetValueInString > pickedValueInString) {
            alert('Pickup Time Must Be Prior To Return Time');
        } else {
            setSelectedDay(targetValue.year, targetValue.month, targetValue.date,'rentalStart');
            notifyYearSelector(targetValue.year);
            notifyMonthSelector(targetValue.month);
            notifyHourSelector(targetValue.hour);
            notifyMinuteSelector(targetValue.minute);
            bjCal.resetBaojiaCalendar('rentalStart', targetValue);
            notifyDayPicker(targetValue.year, targetValue.month);
        }
    }
}

function quiteDateTimePicking() {
    window.history.go(-1);
}
/**
 * This function need to be improved and as an exposed function for other page to use
 */
function submitDateTimeValues() {
    var pickupVal = pickupResult.getResultValue();
    var returnVal = returnResult.getResultValue();
    var pickeupValArray = transferSealedValueToArray(pickupVal);
    var returnValArray = transferSealedValueToArray(returnVal);
    var pickupString = transferDTArrayToString(pickeupValArray);
    var returnString = transferDTArrayToString(returnValArray);
    if ((pickupString - returnString) >= 0) {
//        alert('Pickup time MUST Be Before Return Time');
//        viewError("还车时间必须大于取车时间，请重新选择!");
        viewError("还车时间必须在取车时间两小时后!");
    } else {
        //TO DO SUBMIT DATA IN INPUT
        $('#pikeupResultHidden').attr('value', getResultInDisplayForm(pickeupValArray));
        $('#returnResultHidden').attr('value', getResultInDisplayForm(returnValArray));
        $('#startDate').attr('value',getResultInDisplayForm(pickeupValArray));
        $('#endDate').attr('value',getResultInDisplayForm(returnValArray));
        $('#startTime').text(getResultInDisplayForm(pickeupValArray));
        $('#endTime').text(getResultInDisplayForm(returnValArray));
        $(".window-body").hide();
        $(".page").hide();
    }
}
/**************************************************************
 * supporting functions
 */

function transferInputDTStringToArray(strVal) {
    var splitedStrVal = strVal ? strVal.split(/[-\/:\s]/) : [],
        result = null;
    switch (splitedStrVal.length) {
        case 6:
            /*year, month, day, hour, minute, second*/
            break;
        case 5:
            /*year, month, day, hour, minute*/
            result = [splitedStrVal[0], splitedStrVal[1], splitedStrVal[2], splitedStrVal[3], splitedStrVal[4]];
            break;
        case 3:
            /*year, month, day*/
            result = [splitedStrVal[0], splitedStrVal[1], splitedStrVal[2]];
            break;
        default:
            /*when no string is given*/
            result = [1900, 1, 1, 0, 0];
    }
    return result;
}
/**
 *
 * @param dtArray
 * @returns {string}
 */
function getResultInDisplayForm(dtArray) {
    return dtArray[0] + "-" + fillBlank(dtArray[1]) + "-" + fillBlank(dtArray[2]) + " " + fillBlank(dtArray[3]) + ":" + fillBlank(dtArray[4]);
}
/**
 * generate result content and seal them in a array
 * @param year
 * @param month
 * @param date
 * @param hour
 * @param minute
 * @returns {*[]}
 */
function transferPickedValueToString(pickedValue) {
    return pickedValue.year.toString() + fillBlank(pickedValue.month)
        + fillBlank(pickedValue.date) + fillBlank(pickedValue.hour) + fillBlank(pickedValue.minute);
}
/**
 *
 * @param pickedValue
 * @returns {*[]}
 */
function transferSealedValueToArray(pickedValue) {
    var year = pickedValue.year;
    var month = fillBlank(pickedValue.month);
    var date = fillBlank(pickedValue.date);
    var hour = fillBlank(pickedValue.hour);
    var minute = fillBlank(pickedValue.minute);
    return [year, month, date, hour, minute];
}

function transferDTArrayToString(dtArray) {
    var year, month, date, hour, minute;
    year = dtArray[0];
    month = dtArray[1];
    date = dtArray[2];
    hour = dtArray[3];
    minute = dtArray[4];
    return year.toString() + fillBlank(month) + fillBlank(date) + fillBlank(hour) + fillBlank(minute);
}

function transferDTToString(dt){
	var dtArray = [dt.getFullYear(),fillBlank(parseInt(dt.getMonth())+1), fillBlank(dt.getDate()),fillBlank(dt.getHours()),fillBlank(dt.getMinutes())];
	var dtStr = transferDTArrayToString(dtArray);
	return dtStr;
}
/**
 * transfer year, month, day, hour ,and minute to a string
 * @param year
 * @param month
 * @param date
 * @param hour
 * @param minute
 * @returns {*[]}
 */
function generateResultContent(year, month, date, hour, minute) {
    return [year + "-" + fillBlank(month) + "-" + fillBlank(date), fillBlank(hour) + " : " + fillBlank(minute)];
}
function roundUpTime(hr, min) {
    hr = parseInt(hr);
    min = parseInt(min);
    if(min>0 && min <=15){
        min = 15;
    }else if(min>15 && min<=30){
        min = 30;
    }else if(min>30 && min<=45){
        min = 45;
    }else if(min>45 && min<=60){
        hr += 1;
        min = 0;
    }
    return [hr, min];
}
function fillBlank(num) {
    if (num.toString().length == 1) {
        return '0' + num;
    }
    return num;
}
function yearAdd() {
    var returnResultVal = returnResult.getResultValue();
    var returnResultArray;
    var startResultArray;
    var startResultVal = pickupResult.getResultValue();
    var isClash = 0;
    var nextYear = parseInt($('.year-content').attr('data-value')) + 1;

    if (bjCal.getCalendarState() == 'rentalStart') {
        returnResultArray = [returnResultVal.year, returnResultVal.month,
            returnResultVal.date, returnResultVal.hour, returnResultVal.minute];
        startResultArray = [nextYear, startResultVal.month, startResultVal.date,
            startResultVal.hour, startResultVal.minute];
        //clash or not, if check
        bjCal.setPickedValue(nextYear, null, null, null, null);
        notifyResultChange('rentalStart', bjCal.getPickedValue());
        notifyDayPicker(nextYear, bjCal.getPickedValue().month,selectedPickupDate);
        $('.year-content').attr('data-value', nextYear);
        $('.year-content').text(nextYear);
    } else {
        startResultArray = [startResultVal.year, startResultVal.month, startResultVal.date,
            startResultVal.hour, startResultVal.minute];
        returnResultArray = [nextYear, returnResultVal.month,
            returnResultVal.date, returnResultVal.hour, returnResultVal.minute];
        isClash = clashTimeCheck(startResultArray, returnResultArray);
        if (isClash == 1) {
//            alert("Return Date Must Be After Start Date");
            viewError("还车时间必须在取车时间两小时后!");
        } else {
            bjCal.setPickedValue(nextYear, null, null, null, null);
            notifyResultChange('rentalEnd', bjCal.getPickedValue());
            notifyDayPicker(nextYear, bjCal.getPickedValue().month,selectedReturnDate);
            $('.year-content').attr('data-value', nextYear);
            $('.year-content').text(nextYear);
        }
    }
}
function yearMinus() {
    var returnResultVal = returnResult.getResultValue();
    var returnResultArray;
    var startResultArray;
    var startResultVal = pickupResult.getResultValue();
    var isClash = 0;
    var currDT = new Date();
    var lastYear = parseInt($('.year-content').attr('data-value')) - 1;
    if (lastYear < currDT.getFullYear()) {
//        alert("Picked Date Must Be After Current Date");
    } else {

        if (bjCal.getCalendarState() == 'rentalStart') {
            bjCal.setPickedValue(lastYear, null, null, null, null);
            notifyResultChange('rentalStart', bjCal.getPickedValue());
            notifyDayPicker(lastYear, bjCal.getPickedValue().month,selectedPickupDate);
            $('.year-content').attr('data-value', lastYear);
            $('.year-content').text(lastYear);
        } else {
            startResultArray = [startResultVal.year, startResultVal.month, startResultVal.date,
                startResultVal.hour, startResultVal.minute];
            returnResultArray = [lastYear, returnResultVal.month,
                returnResultVal.date, returnResultVal.hour, returnResultVal.minute];
            isClash = clashTimeCheck(startResultArray, returnResultArray);
            if (isClash == 1) {
//                alert("Return Date Must Be After Start Date");
                viewError("还车时间必须在取车时间两小时后!");
            } else {
                bjCal.setPickedValue(lastYear, null, null, null, null);
                notifyResultChange('rentalEnd', bjCal.getPickedValue());
                notifyDayPicker(lastYear, bjCal.getPickedValue().month,selectedReturnDate);
                $('.year-content').attr('data-value', lastYear);
                $('.year-content').text(lastYear);
            }
        }
    }
}
function monthAdd() {
    var returnResultVal = returnResult.getResultValue();
    var returnResultArray;
    var startResultArray;
    var startResultVal = pickupResult.getResultValue();
    var isClash = 0;
    var isNextYear = 0;
    var nextMonth = parseInt($('.month-content').attr('data-value')) + 1;
    var nextYear = parseInt($('.year-content').attr('data-value')) + 1;
    if (nextMonth > 12) {
        nextMonth -= 12;
        isNextYear = 1;
    }
    if (bjCal.getCalendarState() == 'rentalStart') {
        bjCal.setPickedValue(null, nextMonth, null, null, null);
        notifyResultChange('rentalStart', bjCal.getPickedValue());
        notifyDayPicker(bjCal.getPickedValue().year, nextMonth,selectedPickupDate);
        $('.month-content').attr('data-value', nextMonth);
        $('.month-content').text(fillBlank(nextMonth));
    } else {
        startResultArray = [startResultVal.year, startResultVal.month, startResultVal.date,
            startResultVal.hour, startResultVal.minute];
        if (isNextYear == 1) {
            returnResultArray = [nextYear, nextMonth,
                returnResultVal.date, returnResultVal.hour, returnResultVal.minute];
        } else {
            returnResultArray = [returnResultVal.year, nextMonth,
                returnResultVal.date, returnResultVal.hour, returnResultVal.minute];
        }

        isClash = clashTimeCheck(startResultArray, returnResultArray);
        if (isClash == 1) {
//            alert("Return Date Must Be After Start Date");
            viewError("还车时间必须在取车时间两小时后!");
        } else {
            if (isNextYear == 1) {
                bjCal.setPickedValue(nextYear, nextMonth, null, null, null);
                $('.year-content').attr('data-value', nextYear);
                $('.year-content').text(nextYear);
            } else {
                bjCal.setPickedValue(null, nextMonth, null, null, null);
            }
            notifyResultChange('rentalEnd', bjCal.getPickedValue());
            notifyDayPicker(bjCal.getPickedValue().year, nextMonth,selectedReturnDate);
            $('.month-content').attr('data-value', nextMonth);
            $('.month-content').text(fillBlank(nextMonth));
        }
    }
}
function monthMinus() {
    var returnResultVal = returnResult.getResultValue();
    var returnResultArray;
    var startResultArray;
    var startResultVal = pickupResult.getResultValue();
    var isClash = 0;
    var isLastYear = 0;
    var lastMonth = parseInt($('.month-content').attr('data-value')) - 1;
    var lastYear = parseInt($('.year-content').attr('data-value')) - 1;
    if (lastMonth == 0) {
        lastMonth = 12;
        isLastYear = 1;
    }
    var baseDate = new Date();
    /**
     * make sure the selected year month is after the current
     */
    if (bjCal.getPickedValue().year == baseDate.getFullYear() && lastMonth < parseInt(baseDate.getMonth()) + 1) {
//        viewError("还车时间必须在取车时间两小时后!");
    } else {
        if (bjCal.getCalendarState() == 'rentalStart') {
            bjCal.setPickedValue(null, lastMonth, null, null, null);
            notifyResultChange('rentalStart', bjCal.getPickedValue());
            notifyDayPicker(bjCal.getPickedValue().year, lastMonth,selectedPickupDate);
            $('.month-content').attr('data-value', lastMonth);
            $('.month-content').text(fillBlank(lastMonth));
        } else {
            startResultArray = [startResultVal.year, startResultVal.month, startResultVal.date,
                startResultVal.hour, startResultVal.minute];
            if (isLastYear == 1) {
                returnResultArray = [lastYear, lastMonth,
                    returnResultVal.date, returnResultVal.hour, returnResultVal.minute];
            } else {
                returnResultArray = [returnResultVal.year, lastMonth,
                    returnResultVal.date, returnResultVal.hour, returnResultVal.minute];
            }
            isClash = clashTimeCheck(startResultArray, returnResultArray);
            if (isClash == 1) {
//                alert("Return Date Must Be After Start Date");
                viewError("还车时间必须在取车时间两小时后!");
            } else {
                if (isLastYear == 1) {
                    bjCal.setPickedValue(lastYear, lastMonth, null, null, null);
                    $('.year-content').attr('data-value', lastYear);
                    $('.year-content').text(lastYear);
                } else {
                    bjCal.setPickedValue(null, lastMonth, null, null, null);
                }
                notifyResultChange('rentalEnd', bjCal.getPickedValue());
                notifyDayPicker(bjCal.getPickedValue().year, lastMonth,selectedReturnDate);
                $('.month-content').attr('data-value', lastMonth);
                $('.month-content').text(fillBlank(lastMonth));
            }
        }
    }
}
function hourAdd() {
    var returnResultVal = returnResult.getResultValue();
    var returnResultArray;
    var startResultArray;
    var startResultVal = pickupResult.getResultValue();
    var isClash = 0;
    var nextHour = parseInt($('.hour-content').attr('data-value')) + 1;
    if (nextHour == 24) {
        nextHour = 0;
    }
    if (bjCal.getCalendarState() == 'rentalStart') {
        startResultArray = [startResultVal.year, startResultVal.month, startResultVal.date,
            nextHour, startResultVal.minute];
        isClash = isBeforeCurrentDT(startResultArray);
        if (isClash != 1) {
            bjCal.setPickedValue(null, null, null, nextHour, null);
            notifyResultChange('rentalStart', bjCal.getPickedValue());
            $('.hour-content').attr('data-value', nextHour);
            $('.hour-content').text(fillBlank(nextHour));
        } else {
        }
    } else {
        startResultArray = [startResultVal.year, startResultVal.month, startResultVal.date,
            startResultVal.hour, startResultVal.minute];
        returnResultArray = [returnResultVal.year, returnResultVal.month,
            returnResultVal.date, nextHour, returnResultVal.minute];
        isClash = clashTimeCheck(startResultArray, returnResultArray);
        if (isClash == 1) {
//            alert("Return Date Must Be After Start Date");
            viewError("还车时间必须在取车时间两小时后!");
        } else {
            bjCal.setPickedValue(null, null, null, nextHour, null);
            notifyResultChange('rentalEnd', bjCal.getPickedValue());
            $('.hour-content').attr('data-value', nextHour);
            $('.hour-content').text(fillBlank(nextHour));
        }
    }
}
function hourMinus() {
    var returnResultVal = returnResult.getResultValue();
    var returnResultArray;
    var startResultArray;
    var startResultVal = pickupResult.getResultValue();
    var isClash = 0;
    var lastHour = parseInt($('.hour-content').attr('data-value')) - 1;
    if (lastHour == -1) {
        lastHour = 23;
    }
    if (bjCal.getCalendarState() == 'rentalStart') {
        startResultArray = [startResultVal.year, startResultVal.month, startResultVal.date,
            lastHour, startResultVal.minute];
        isClash = isBeforeCurrentDT(startResultArray);
        if (isClash == 1) {
        } else {
            bjCal.setPickedValue(null, null, null, lastHour, null);
            notifyResultChange('rentalStart', bjCal.getPickedValue());
            $('.hour-content').attr('data-value', lastHour);
            $('.hour-content').text(fillBlank(lastHour));
        }
    } else {
        startResultArray = [startResultVal.year, startResultVal.month, startResultVal.date,
            startResultVal.hour, startResultVal.minute];
        returnResultArray = [returnResultVal.year, returnResultVal.month,
            returnResultVal.date, lastHour, returnResultVal.minute];
        isClash = clashTimeCheck(startResultArray, returnResultArray);
        if (isClash == 1) {
//            alert("Return Date Must Be After Start Date");
            viewError("还车时间必须在取车时间两小时后!");
        } else {
            bjCal.setPickedValue(null, null, null, lastHour, null);
            notifyResultChange('rentalEnd', bjCal.getPickedValue());
            $('.hour-content').attr('data-value', lastHour);
            $('.hour-content').text(fillBlank(lastHour));
        }
    }
}
function minuteAdd() {
    var returnResultVal = returnResult.getResultValue();
    var returnResultArray;
    var startResultArray;
    var startResultVal = pickupResult.getResultValue();
    var isClash = 0;
    var nextHalfHour = parseInt($('.minute-content').attr('data-value')) + 15;
    if (nextHalfHour >= 60) {
        nextHalfHour -= 60;
    }
    if (bjCal.getCalendarState() == 'rentalStart') {
        startResultArray = [startResultVal.year, startResultVal.month, startResultVal.date,
            startResultVal.hour, nextHalfHour];
        isClash = isBeforeCurrentDT(startResultArray);
        if (isClash == 1) {
        } else {
            bjCal.setPickedValue(null, null, null, null, nextHalfHour);
            notifyResultChange('rentalStart', bjCal.getPickedValue());
            $('.minute-content').attr('data-value', nextHalfHour);
            $('.minute-content').text(fillBlank(nextHalfHour));
        }
    } else {
        startResultArray = [startResultVal.year, startResultVal.month, startResultVal.date,
            startResultVal.hour, startResultVal.minute];
        returnResultArray = [returnResultVal.year, returnResultVal.month,
            returnResultVal.date, returnResultVal.hour, nextHalfHour];
        isClash = clashTimeCheck(startResultArray, returnResultArray);
        if (isClash == 1) {
//            alert("Return Date Must Be After Start Date");
            viewError("还车时间必须在取车时间两小时后!");
        } else {
            bjCal.setPickedValue(null, null, null, null, nextHalfHour);
            notifyResultChange('rentalEnd', bjCal.getPickedValue());
            $('.minute-content').attr('data-value', nextHalfHour);
            $('.minute-content').text(fillBlank(nextHalfHour));
        }
    }
}
function minuteMinus() {
    var returnResultVal = returnResult.getResultValue();
    var returnResultArray;
    var startResultArray;
    var startResultVal = pickupResult.getResultValue();
    var isClash = 0;
    var lastHalfHour = parseInt($('.minute-content').attr('data-value')) - 15;
    if (lastHalfHour < 0) {
        lastHalfHour = 60 + lastHalfHour;
    }
    if (bjCal.getCalendarState() == 'rentalStart') {
        startResultArray = [startResultVal.year, startResultVal.month, startResultVal.date,
            startResultVal.hour, lastHalfHour];
        isClash = isBeforeCurrentDT(startResultArray);
        if (isClash != 1) {
            bjCal.setPickedValue(null, null, null, null, lastHalfHour);
            notifyResultChange('rentalStart', bjCal.getPickedValue());
            $('.minute-content').attr('data-value', lastHalfHour);
            $('.minute-content').text(fillBlank(lastHalfHour));
        } else {

        }
    } else {
        startResultArray = [startResultVal.year, startResultVal.month, startResultVal.date,
            startResultVal.hour, startResultVal.minute];
        returnResultArray = [returnResultVal.year, returnResultVal.month,
            returnResultVal.date, returnResultVal.hour, lastHalfHour];
        isClash = clashTimeCheck(startResultArray, returnResultArray);
        if (isClash == 1) {
//            alert("Return Date Must Be After Start Date");
            viewError("还车时间必须在取车时间两小时后!");
        } else {
            bjCal.setPickedValue(null, null, null, null, lastHalfHour);
            notifyResultChange('rentalEnd', bjCal.getPickedValue());
            $('.minute-content').attr('data-value', lastHalfHour);
            $('.minute-content').text(fillBlank(lastHalfHour));
        }
    }

}

function notifyResultChange(type, pickedValue) {
    if (type == 'rentalStart' || type == null) {
        pickupResult.setResultValue(pickedValue.year, pickedValue.month, pickedValue.date,
            pickedValue.hour, pickedValue.minute);
        pickupResult.displayResult(null);
    } else {
        returnResult.setResultValue(pickedValue.year, pickedValue.month,
            pickedValue.date, pickedValue.hour, pickedValue.minute);
        returnResult.displayResult(null);
    }
}

function notifyDayPicker(year, month) {
    dayPicker.setBaoJiaDay(year, month);
    if (bjCal.getCalendarState() == 'rentalEnd') {
        dayPicker.generateDayPickerView(year, month, pickupResult.getResultValue(),selectedReturnDate);
    } else {
        dayPicker.generateDayPickerView(year, month, null, selectedPickupDate);
    }
    //dayPicker.
}
function notifyYearSelector(year) {
    $('.year-content').attr('data-value', year);
    $('.year-content').empty();
    $('.year-content').append(year);
}
function notifyMonthSelector(month) {
    $('.month-content').attr('data-value', month);
    $('.month-content').empty();
    $('.month-content').append(fillBlank(month));
}
function notifyHourSelector(hour) {//hour-content
    $('.hour-content').attr('data-value', hour);
    $('.hour-content').empty();
    $('.hour-content').append(fillBlank(hour));
}
function notifyMinuteSelector(minute) {
    $('.minute-content').attr('data-value', minute);
    $('.minute-content').empty();
    $('.minute-content').append(fillBlank(minute));
}
function clashTimeCheck(previousTime, laterTime) {
    var previousString = transferDTArrayToString(previousTime);
    var laterString = transferDTArrayToString(laterTime);
    if (previousString > laterString) {
        return 1;
    } else {
        return 0;
    }
}

function isBeforeCurrentDT(targetDTArray) {
    var compareDT = new Date();
    var compareDTArray = [compareDT.getFullYear(), fillBlank(parseInt(compareDT.getMonth()) + 1),
        fillBlank(compareDT.getDate()), fillBlank(compareDT.getHours()), fillBlank(compareDT.getMinutes())];
    var compareDTStr = transferDTArrayToString(compareDTArray);
    var targetDTStr = transferDTArrayToString(targetDTArray);
    if (compareDTStr > targetDTStr) {
        return 1;
    } else {
        return 0;
    }
}
function setSelectedDay(year, month, date,usage){
    if(usage == null){
        year = bjCal.getPickedValue().year;
        month = bjCal.getPickedValue().month;
        date = bjCal.getPickedValue().date;
        selectedPickupDate = [year, month,date];
        selectedReturnDate = [year, month,date];
    }else if(usage == 'rentalStart'){
        if(year == null){
            year = pickupResult.getResultValue().year;
        }
        if(month == null){
            month = pickupResult.getResultValue().month;
        }
        if(date == null){
            date = pickupResult.getResultValue().date;
        }
        selectedPickupDate = [year, month,date];
    }else{
        if(year == null){
            year = returnResult.getResultValue().year;
        }
        if(month == null){
            month = returnResult.getResultValue().month;
        }
        if(date == null){
            date = returnResult.getResultValue().date;
        }
       selectedReturnDate = [year, month,date];
    }
}
function resetHourMinute(){
	var baseDate = new Date();
	var baseHours = baseDate.getHours();
	var baseMinute = baseDate.getMinutes();
	var rounded = roundUpTime(baseHours,baseMinute);
	notifyHourSelector(rounded[0]);
	notifyMinuteSelector(rounded[1]);

}
function compareDateByResults(pickVal, returnVal) {
    var pickDate = new Date(pickVal.year, pickVal.month, pickVal.date, pickVal.hour, pickVal.minute);
    var returnVal = new Date(returnVal.year, returnVal.month, returnVal.date, returnVal.hour, returnVal.minute);
    return (pickDate - returnVal);
}
/**
 * initialise the page
 */
var bjCal, dayPicker;
var pickupResult, returnResult;
var selectedPickupDate, selectedReturnDate;
$(function () {
    var pickupResultStr, returnResultStr, pickupDTArray, returnDTArray, pickupHM, returnHM;
    var initialState = $('#initialType').attr('value');
    if (initialState == null || initialState == "" || initialState == "1") {
        initialState = 'rentalStart';
    } else {
        initialState = 'rentalEnd';
    }
    bjCal = new BaojiaCalendar(initialState);
    pickupResultStr = $('#pikeupResultHidden').attr('value');
    returnResultStr = $('#returnResultHidden').attr('value');
    pickupDTArray = transferInputDTStringToArray(pickupResultStr);
    pickupHM = roundUpTime(pickupDTArray[3], pickupDTArray[4]);
    returnDTArray = transferInputDTStringToArray(returnResultStr);
    returnHM = roundUpTime(returnDTArray[3], returnDTArray[4]);
    pickupResult = new Result('rentalStart', null);
    returnResult = new Result('rentalEnd', null);
    pickupResult.setResultValue(pickupDTArray[0], pickupDTArray[1], pickupDTArray[2], pickupHM[0], pickupHM[1]);
    returnResult.setResultValue(returnDTArray[0], returnDTArray[1], returnDTArray[2], returnHM[0], returnHM[1]);
    setSelectedDay(pickupDTArray[0], pickupDTArray[1], pickupDTArray[2],'rentalStart');
    setSelectedDay(returnDTArray[0], returnDTArray[1], returnDTArray[2],'rentalEnd');
    bjCal.setCalendarState(initialState);

    $('.result-display').removeClass('selected-result');
    if (initialState == 'rentalStart') {
        $('.pickupResultDisplay').addClass('selected-result');
        bjCal.resetBaojiaCalendar('rentalStart', pickupResult.getResultValue());
        initiateYMHMView(pickupDTArray[0], pickupDTArray[1], pickupHM[0], pickupHM[1]);
    } else {
        $('.returnResultDisplay').addClass('selected-result');
        bjCal.resetBaojiaCalendar('rentalEnd', returnResult.getResultValue());
        initiateYMHMView(returnDTArray[0], returnDTArray[1], returnHM[0], returnHM[1]);
    }
    dayPicker = new DayPicker(bjCal.getPickedValue().year, bjCal.getPickedValue().month);
    dayPicker.generateDayPickerView(null, null, null,null);
    pickupResult.displayResult(null);
    returnResult.displayResult(null);
});
/***
 * Events
 */
$('.topbar').delegate('section', 'click', function () {
    var newType = 'rentalEnd';
    $('.topbar section').removeClass('selected-result');
    if ($(this).hasClass('pickupResultDisplay') && bjCal.getCalendarState() == 'rentalEnd') {
        newType = 'rentalStart';
        switchPickType(newType, pickupResult, returnResult);
    } else if ($(this).hasClass('returnResultDisplay') && bjCal.getCalendarState() == 'rentalStart') {
        newType = 'rentalEnd';
        switchPickType(newType, pickupResult, returnResult);
    } else {
    }
    $(this).addClass('selected-result');
});



