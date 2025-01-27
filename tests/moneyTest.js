import { formatPrice } from '../scripts/utils/money.js';

console.log('test suite: formatPrice');

//give test case a name 
console.log('converts cents into dollars');

// testcase
// this is basic test case
if (formatPrice(2095) === '20.95'){
    console.log('passed');
}else{
    console.log('failed');
}

console.log('works with 0');

// this 2 test cases is edge test case
// another test case
if(formatPrice(0) === '0.00'){
    console.log('passed');
}else{
    console.log('failed');
}

console.log('rounds up to the nearest cent');

// another test case
if(formatPrice(2000.5) === '20.01'){
    console.log('passed');
}else{
    console.log('failed');
}