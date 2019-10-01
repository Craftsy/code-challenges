/* 
** Javascript solutions to Bluprint Coding Challenge 1
*/

// Solution 1
const codeChallenge = n => n.toString().split('').reduce((s,x) => (parseInt(x, 10)||1) * s, 1)

// Solution 2
const codeChallenge = n => {
    let num = n;
    let mod = 10;
    let val = 1;

    while (mod < 10 * n) {
        const remainder = num % mod;
        num -= remainder;
        const integer = remainder / (mod / 10);
        val *= integer || 1;
        mod *= 10
    }

    return val
};

// Solution 3
function nonZeroDigitalProduct(integer) {
    if (1 <= integer && integer <= 100000000) {
        return integer.toString().split('').map(Number).filter((num) => num > 0).reduce((a,b) => a*b)
    }
}

// Solution 4
var str = '17801'
var splitNumber = str.split('').filter(n => n !== '0')
var p = 1
for (i=0; i < splitNumber.length; i += 1){
  p *= splitNumber[i] 
}
console.log('The product of all numbers is ' + p)

// Solution 5
function digProduct() {
    const num = 361218402;
    let currentValue = 0;
    let multiplier = 0;
    let arr = num.toString().split('');
    for(let i =0; i <= arr.length; i++) { 
        if (arr[i] != 0) {
            if (i === 0) {
                currentValue = arr[i];
            } else if (arr[i] !== undefined) {
                multiplier = arr[i]
                currentValue = currentValue * multiplier
            }
        }
    }
    return currentValue
}

// Solution 6
var codeChallenge = (number) => {
    var stringified = number.toString();
    var listified = stringified.split("");
    var total = 1;
    for (var i = 0; i < listified.length; i++) {
        var thisNum = parseInt(listified[i]);
        if (thisNum != 0) {
            total *= thisNum;
        }
    }
    return total;
}
  
// Solution 7
// this is a fancy function that uses .. fancy math to get a number at a digit without converting to a string
// here's how it works.. it starts with this idea. To get the rightmost digit (ones), you use:
//  Math.floor((number / 1) % 10)
// to get the number in the (tens) column, you would update the function to be:
//  Math.floor((number / 10) % 10)
// see the difference? I bet you can imagine what it looks like for the (hundreds) digit:
//  Math.floor((number / 100) % 10)
// because our number is variable and can have tens, hundreds, thousands digits and so on, we need to use fancy math
//  Math.floor((number / 10^n-1) % 10)
// but because this uses a bitwise XOR (^) which converts to a 32bit (which we don't want in this exercise),
// we replace that with an equation that takes a dynamic index:
//  Math.floor(Math.log(val) / Math.LN10) gives you a number of digits in the number to the left of the 1s digit
//  you take that number and subtract the index which is the dynamic part here to plug into the formula
function digitAt(val, index) {
    return Math.floor((val / Math.pow(10, Math.floor(Math.log(val) / Math.LN10)-index)) % 10);
  };
  
function multiplyEveryDigit(num) {
    // do we need to test for these things?
    if(
        isNaN(num) // make sure it's a number
        || !Number.isInteger(num) // make sure it's an integer
        || (num < 1 || num > 1e8) // make sure it's in the test case
        ) return -1; // we didn't really specify what happens here? let's just return -1
    // short circuits
    if(num < 10) return num; // if we're less than 10 don't bother
    // at this point we'll want the first digit of the number no matter what
    let firstDigit = digitAt(num, 0);
    // i wanna check for n00 or n000 or n0000 or n00000 etc.
    // if we take the first digit and multiply it by the number of digits
    // does it equal the number? then it's a number that looks like n000 with n number of zeros
    //  for example, if number is 50000, this grabs the first digit (5) and multiples it by the 10s/100s/1000s
    //  in this case 10000. 5x10000 = 50000. If the number has only zeros, the numbers will equal eachother
    //  in the case of 50001, 5x10000 = 50000 which != 50001. Make sense?
    if( firstDigit * Math.pow(10, Math.floor(Math.log10(num))) === num ) return firstDigit;
    // OTHERWISE do the real work. We've already got the first digit, now while we subtract by the tens column,
    // continue to get the first digit and do the multiplication work
    let result = firstDigit;
    // greater than 10 here because once we get to the 10s digit we don't care
    while (num > 10) {
        // take the first digit we already know, subtract the largest 10s/100s/1000s etc. number
        num -= firstDigit * Math.pow(10, Math.floor(Math.log10(num)));
        // console.log('num:', num); // uncomment to watch the number lose digits!
        // we say || 1 if it's 0 to replace 0s with 1s
        let newFirstDigit = digitAt(num, 0) || 1;
        // this is the line that actually multiplies the first and second digit
        result *= newFirstDigit;
        // we need to re set the "firstDigit" to the new first digit after we subtracted the largest base10 number
        firstDigit = newFirstDigit;
    }
    return result;
}
  
  console.log(multiplyEveryDigit(3452));

// Solution 8
f=n=>[...''+n].reduce((x,y)=>x*y||1)

