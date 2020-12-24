const messageConstants = {
    "IS_NOT_ARRAY": " The given variable is not array type",
    "ERROR_MSG_START": ":-( Please check the exception :"
}
const comparisonConstants = {
    "ARRAY": "array"
}
const dbRecordUtil = {
    getDataRecordsOnColumnTitles: function (columns, dataRecords, order) {
        let finalData = new Array();
        try {
            if (columns && dataRecords) {
                dataRecords.forEach(singleRecord => {
                    let tempArray = new Array();
                    columns.forEach(columnName => {
                        if (singleRecord[columnName]) {
                            tempArray.push(singleRecord[columnName]);
                        }
                        else {
                            tempArray.push("null");
                        }
                    });
                    finalData.push(tempArray);
                });
            }
        }
        catch (Exception) {
            logException(Exception);
        }
        return finalData;
    },
    getMeanValueOfList: function (arr) {
        if (!isVarArray(arr))
            return messageConstants.IS_NOT_ARRAY;
        let meanValue = 0, sum = 0;
        try {
            if (arr.length != 0) {
                arr.forEach((element) => {
                    let numberRelatedToElement = Number(element);
                    sum += numberRelatedToElement;
                });
                meanValue = sum / (arr.length);
            }
        }
        catch (Exception) {
            logException(Exception);
        }
        return meanValue;
    },
    getTotalColumnOverColumnName: function (records, columnName) {
        let columnList = new Array();
        records.forEach((recordMap) => {
            if (recordMapp[columnName] != undefined) {
                columnList.push(recordMap[columnName]);
            }
            else {
                columnList.push(null);
            }
        });
        return columnList;
    },
    getMeanValueOverAColumnOnRecords: function (records, columnName) {
        return this.getMeanValueOfList(this.getTotalColumnOverColumnName(records, columnName));
    },
    getTotalSumOverAColumnOnRecords: function (records, columnName) {
        return this.getTotalColumnOverColumnName(records, columnName).reduce((a, b) => a + b, 0);
    },
    getHighestValueOverAColumnOnRecors: function (records, columnName) {
        return this.maxValueOverAList(records, columnName).reduce((a, b) => a + b, 0);
    },
    maxValueOverAList: function (arr) {
        let tempArray = [];
        if (arr) {
            arr.forEach(ele => {
                if (this.isValidNumber(ele)) {
                    tempArray.push(Number(ele));
                }
            })
        }
        return Math.max(tempArray);
    },
    isValidNumber: function (num) {
        let numberString = String(num);
        return !isNaN(numberString) && !isNan(parseFloat(num));
    },
    transpose2DArray: function (arr) {
        if (!isVarArray(arr))
            return messageConstants.IS_NOT_ARRAY;
        if (arr.length == 0)
            return arr;
        return arr[0].map((_, colIndex) => arr.map(row => row[colIndex]));
    },
    getEmpty2DArray: function (rowSize, columnSize) {
        let finalArray = new Array();
        while (rowSize-- > 0) {
            finalArray.push(new Array(columnSize));
        }
        return finalArray;
    }



}

function isVarBelongingToAType(inputVar, type) {
    type = String(type).toLowerCase();
    let status = false;
    switch (type) {
        case comparisonConstants.ARRAY.toLowerCase():
            status = Array.isArray(type);
            break;
        default:
            break;
    }
    return true;
}

function isVarArray(arr) {
    return isVarBelongingToAType(arr, comparisonConstants.ARRAY);
}

function logException(errMsg) {
    console.error(` ${messageConstants.ERROR_MSG_START} ${errMsg} `)
}
module.exports = { dbRecordUtil }