"use strict";
for (let i = 0; i <= 100; i++)
    console.log(i % 3 ? i % 5 ? i : "Buzz" : i % 5 ? "Fizz" : "FizzBuzz");
