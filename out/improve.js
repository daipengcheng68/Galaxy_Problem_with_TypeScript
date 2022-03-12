"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MerchantGalaxy = void 0;
var readline = __importStar(require("readline"));
var fs = __importStar(require("fs"));
var UniversRoman = {};
var MetalInt = {};
/* ReadStream Interface to catch new line event */
var read = readline.createInterface({
    input: fs.createReadStream('./input.txt'),
    terminal: false
});
var romanInit = ['I', 'V', 'X', 'L', 'C', 'D', 'M'];
var romanVal = {
    'M': 1000,
    'D': 500,
    'C': 100,
    'X': 10,
    'L': 50,
    'V': 5,
    'I': 1,
};
var splitLine = [];
read.on('line', function (line) {
    splitLine = line.split(/\s+/);
    var result = "";
    if (splitLine[splitLine.length - 1] !== "?") { // for conditions  // use two equals after ! 
        // could use "switch"
        if (romanInit.indexOf(splitLine[splitLine.length - 1]) !== -1) {
            MerchantGalaxy.getUnitOfGalaxy(splitLine);
        }
        else if (splitLine[splitLine.length - 1] === 'Credits') {
            MerchantGalaxy.getUnitPriceInGalaxy(splitLine);
        }
        else {
            console.log(" I have no idea about that");
        }
        // getInfo(con);
    }
    else { // for questions
        result = MerchantGalaxy.checkQuestions(splitLine);
    }
});
var MerchantGalaxy = /** @class */ (function () {
    function MerchantGalaxy() {
    }
    MerchantGalaxy.prototype.construtor = function () { };
    MerchantGalaxy.getUnitOfGalaxy = function (line) {
        console.log(line);
        var findRoman = romanInit.indexOf(line[line.length - 1]);
        if (findRoman !== -1) {
            UniversRoman[line[0]] = line[2];
        }
        console.log(UniversRoman);
        return UniversRoman;
    };
    MerchantGalaxy.getUnitPriceInGalaxy = function (line) {
        var findIsInLine = line.indexOf('is');
        var creditValue = Number(line[findIsInLine + 1]);
        var sliceArray = line.splice(0, findIsInLine);
        var creditUnit = sliceArray.pop(); // devide the final element to get the univers unit for counting
        var intVal = this.romanToInt(sliceArray);
        if (intVal !== -1) {
            intVal = creditValue / intVal;
            MetalInt[creditUnit] = intVal;
        }
        console.log(MetalInt);
        return MetalInt;
    };
    MerchantGalaxy.checkQuestions = function (splitLine) {
        var result = "";
        var findStringIs = splitLine.indexOf('is');
        //How Much  
        if (splitLine.indexOf('much') !== -1) {
            var stringLen = splitLine.length - findStringIs - 2; //(total lenght -1 + startPos -1) 
            var sliceArray = splitLine.splice(findStringIs + 1, stringLen);
            var tValue = this.romanToInt(sliceArray);
            if (tValue > 0) {
                result = sliceArray.join(' ') + ' is ' + tValue;
                console.log(sliceArray.join(' ') + ' is ' + tValue);
            }
            else {
                result = "I have no idea what you are talking about";
                console.log("I have no idea what you are talking about");
            }
        }
        //How Many
        if (splitLine.indexOf('many') !== -1) {
            var stringLen = splitLine.length - findStringIs - 2;
            var sliceArray = splitLine.splice(findStringIs + 1, stringLen);
            var creditUnit = sliceArray.pop();
            var tValue = this.romanToInt(sliceArray);
            tValue *= MetalInt[creditUnit];
            if (tValue > 0) {
                result = sliceArray.join(' ') + ' ' + creditUnit + ' is ' + tValue + ' credits';
                console.log(sliceArray.join(' ') + ' ' + creditUnit + ' is ' + tValue + ' credits');
            }
            else {
                result = "I have no idea what you are talking about";
                console.log("I have no idea what you are talking about");
            }
        }
        return result;
    };
    MerchantGalaxy.romanToInt = function (sliceArray) {
        console.log("000 " + sliceArray);
        var findRoman = "";
        var romanNum = [];
        // var finalValue = 0;
        for (var i = 0; i < sliceArray.length; i++) {
            //if (UniversRoman[sliceArray[i]]) { 
            if (UniversRoman.hasOwnProperty(sliceArray[i])) {
                findRoman += UniversRoman[sliceArray[i]];
                romanNum.push(UniversRoman[sliceArray[i]]);
            }
        }
        var result = 0;
        var a = 0;
        var b = 0;
        for (var i_1 = 0; i_1 < findRoman.length; i_1++) {
            if (romanVal.hasOwnProperty(findRoman[i_1])) {
                a = romanVal[findRoman[i_1]];
                //let a = Object.keys(romanVal).find(findRoman[i])
            }
            if (romanVal.hasOwnProperty(findRoman[i_1 + 1])) {
                b = romanVal[findRoman[i_1 + 1]];
            }
            if (a < b) {
                result += (b - a);
                i_1 += 1;
            }
            else {
                result += a;
            }
        }
        return result;
    };
    return MerchantGalaxy;
}());
exports.MerchantGalaxy = MerchantGalaxy;
