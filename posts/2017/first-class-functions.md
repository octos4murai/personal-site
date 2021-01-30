---
layout: post.njk
title: First-class Functions
date: 2017-05-12
---

### What is it?

Having first-class functions is a feature that is characteristic of functional programming --- a programming paradigm "that treats computation as the evaluation of mathematical functions and avoids changing-state and mutable data" ([Functional Programming](https://en.wikipedia.org/wiki/Functional_programming)). Programming languages that treat functions as first-class support the following:

1. Assigning functions to variables,
2. Passing functions as arguments, and
3. Returning functions as the output of other functions.

Here is some JavaScript^1^ code to illustrate:

```javascript/3,7,11
function outerFunction(year, functionArg) {
    functionArg();
    return function(obj) {
        return obj == null ? 1 : 2;
    }
}

var innerFunctionAlias = function innerFunction() {
    console.log('In inner function');
}

console.log(outerFunction(2017, innerFunctionAlias)());
```

This snippet shows how JavaScript supports each of the previously-mentioned features of first-class functions. Let me go through them one by one within the context of the code above.

### Assigning functions to variables 

The second highlighted line shows how first-class functions can be assigned to variables (just like numbers, booleans, and other primitives). In JavaScript, no reserved keywords need be used. Instead, the JavaScript engine attempts to independently determine the type of the value being assigned. 

To call the assigned function, one can use the variable name with the requisite parentheses to invoke the function. For example, the function *innerFunction* can be called with *innerFunctionAlias()*. 

### Passing functions as arguments 

The last highlighted line shows how first-class functions can be passed as arguments of other functions. In the example provided, *innerFunctionAlias* (a variable that points to a function) is passed as an argument for *outerFunction*, along with the number variable *year*. 

*outerFunction* invokes whatever function is passed to it by using the argument variable *functionArg*. The function to which *innerFunctionAlias* is pointing is therefore invoked. 

### Returning functions as output 

The first highlighted line shows how first-class functions can be returned from other functions. In the example provided, an anonymous function^2^ is returned that itself returns one of two values. 

It is very important to note that what is being returned from *outerFunction* is not the output of said anonymous function. Instead, what is returned is the function itself! Because of this, we can observe in the final line of the snippet that a trailing set of parentheses is used to invoke the function returned: *outerFunction(2017, innerFunctionAlias)<span class="green-text">()</span>*. 

### A realistic example

These features of first-class functions can be combined to make some very elegant and intuitive implementations. One popular usage is implementing the *map* functionality. By convention, a *map* function takes a function and a collection of values and "applies" the function on every element of the collection.

In non-functional programming, options in applying functions to objects in a collection are limited. The most common way is to use a loop like so:

```csharp
int[] numbers = [1, 2, 3];
int[] squaredNumbers = [];
int[] doubledNumbers = [];

// Squaring numbers
for (var num in numbers) {
    squaredNumbers.Add(num * num);
}
Console.Writeline(string.Join(", "), squaredNumbers);

// Doubling numbers
for (var num in numbers) {
    doubledNumbers.Add(num * 2);
}
Console.Writeline(string.Join(", "), doubledNumbers);
```

With first-class functions, we can instead do the following:

```javascript
var numbers = [1, 2, 3];

// Squaring numbers
var squaredNumbers = simpleMap(numbers, function(num) {
    return num * num;
});
console.log(squaredNumbers);

// Doubling numbers
var doubledNumbers = simpleMap(numbers, function(num) {
    return num * 2;
});
console.log(doubledNumbers);

// Map function
function simpleMap(objArray, functionArg) {
    result = [];
    for (i = 0; i < objArray.length; i++ ) {
        result += functionArg(objArray[i]);
    }
    return result;
}
```

With a map function available (i.e. *simpleMap()*), we are able to abstract away some functionality such that any function can be passed to our map function (along with a compatible collection of objects) and the function will be applied to every object in the collection.

### TL/DR

The concept of first-class functions constitutes a paradigm shift for programmers who have only ever worked with non-functional languages. Learning both and pondering their differences can be a worthwhile and enjoyable experience.

{% include section-divider.njk %}

### Notes

- ^1^ JavaScript was named after the very popular Java to attract more developers to learn and use the language. For the same reason, JavaScript syntax resembles Java syntax -- making it more palatable to Java developers. Under the hood however, JavaScript has more in common with languages like Scheme and Haskell (e.g. JavaScript treats functions as first-class entities, while Java does not). 
- ^2^ Anonymous functions are created at runtime and are typically for single-use.