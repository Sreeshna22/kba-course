// 1 Write a function to reverse a string (without using built-in reverse functions). -->

function reverseString(str) {
  let reversed = "";  

 
  for (let i = str.length - 1; i >= 0; i--) {
    reversed += str[i]; 
  }

  return reversed;
}

console.log(reverseString("hello"));  
console.log(reverseString("world")); 



//2 .Write a function to check if a number is prime.


function isPrime(num) {
  if (num <= 1) {
    return false;
  }

  for (let i = 2; i < num; i++) {
    if (num % i === 0) {  
      return false; 
    }
  }

  return true; 
}

console.log(isPrime(2));   
console.log(isPrime(11));  
console.log(isPrime(15));  
console.log(isPrime(1));   


// 3.Write a function to count vowels in a string.      

function countVowels(str) {
  let count = 0;  
  let vowels = "aeiouAEIOU";  
  for (let i = 0; i < str.length; i++) {
    if (vowels.includes(str[i])) {
      count++;
    }
  }

  return count;
}

console.log(countVowels("hello"));       
console.log(countVowels("javascript"));  
console.log(countVowels("SKY"));  





//4. Write a function to check for Palindrome


function isPalindrome(str) {
  let reversed = "";

  
  for (let i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
  }

  
  if (str === reversed) {
    return true;
  } else {
    return false;
  }
}


console.log(isPalindrome("madam"));   
console.log(isPalindrome("racecar")); 
console.log(isPalindrome("hello"));   

//5.Print a Right Triangular Star Pattern as shown below:


function leftTriangle(rows) {
  for (let i = 1; i <= rows; i++) {
    let pattern = "";

 
    for (let j = 1; j <= i; j++) {
      pattern += "* ";
    }

    console.log(pattern);
  }
}


leftTriangle(5);



//6. Find the factorial of a number
function factorial(num) {
  let result = 1;

  for (let i = 1; i <= num; i++) {
    result = result * i;  
  }

  return result;
}


console.log(factorial(5));  
console.log(factorial(0));  

//7 Find the largest number in an array


function findLargest(arr) {
  
  let largest = arr[0];


  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > largest) {
      largest = arr[i];  
    }
  }

  return largest;
}


console.log(findLargest([3, 7, 2, 9, 5]));  
console.log(findLargest([-1, -5, -3]));     

// 8. Sum of All Numbers in an Array



function sumArray(arr) {
  let sum = 0; 

  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];  
  }

  return sum;
}


console.log(sumArray([1, 2, 3, 4, 5]));  
console.log(sumArray([10, -2, 7]));      
console.log(sumArray([]));               


// 9. Find Fibonacci Series up to N terms
let n = 10;   
let n1 = 0, n2 = 1, nextTerm;

console.log("Fibonacci Series:");
console.log(n1);
console.log(n2);

for (let i = 3; i <= n; i++) {
  nextTerm = n1 + n2;
  console.log(nextTerm);


  n1 = n2;
  n2 = nextTerm;
}

//10 Count Vowels in a String


let str = "JavaScript is Fun";   
let count = 0;
let vowels = "aeiouAEIOU";

for (let i = 0; i < str.length; i++) {  
  if (vowels.includes(str[i])) {
    count++;
  }
}

console.log("Number of vowels: " + count);

//Write a JavaScript program to find the length of a string without using the .length property.
let strr= "Hello World";
let Count = 0;

while (strr[Count] !== undefined) {
  count++;  
}

console.log("Length of the string: " + Count);


//11 Sort an Array (Ascending Order)


let arr = [5, 3, 8, 1, 2];

for (let i = 0; i < arr.length; i++) {
  for (let j = 0; j < arr.length - 1; j++) {
    if (arr[j] > arr[j + 1]) {
    
      let temp = arr[j];
      arr[j] = arr[j + 1];
      arr[j + 1] = temp;
    }
  }
}

console.log("Sorted Array (Ascending): " + arr);



//12 Find the Sum of Digits of a Number

let num = 12345;
let sum = 0;

while (num > 0) {
  let digit = num % 10;  
  sum += digit;        
  num = Math.floor(num / 10); 
}

console.log("Sum of digits: " + sum);



//. Find the Length of a String (without .length)

let S = "JavaScript";
let C = 0;

while (S[C] !== undefined) {
  C++;
}

console.log("Length of the string: " + C);

//