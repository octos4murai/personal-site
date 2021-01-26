---
layout: post.njk
title: The JavaScript Scope Chain
date: 2017-10-31
---

JavaScript is notorious for having mechanisms that seem to work in unintuitive and unexpected ways. In my opinion, this is often an effect of JavaScript syntax being so close to popular compiled languages like Java or C# while --- under the hood --- working very differently.

### Some code

To illustrate one example, here's some code:

```javascript/9
function bar() {
    console.log(someNumber);
}

function foo() {
    var someNumber = 1;
    bar();
}

var someNumber = 0;
foo(); // prints 0
```

In the highlighted line, the variable *someNumber* is declared and given a value of 0. Then the function *foo* is invoked, which declares a new variable of the same name and gives it a value of 1. Finally, *foo* invokes the function *bar* which prints out the string representation of the value in *someNumber*.

Some may expect JavaScript to throw a reference error because *someNumber* was never declared in *bar()*. Others may think that the string "1" will be printed out. Instead, the value printed to the console is "0".

### Peeking under the hood

Upon running the code, the JavaScript engine does something before the actual execution: it goes through what's called a *creation phase*. In this phase, the engine parses the code character-by-character looking for any variables and functions that may have been declared. It allocates the memory required for each of these variables and functions^1^ --- and in the case of variables, it assigns them the value *undefined* ^2^.

Something else that the JavaScript engine does is create the *global execution context*. As the engine goes through the code, it creates new execution contexts as needed and adds them to the *execution stack*. Taking the code above as an example, invoking the function *foo()* triggers the engine to add a new execution context in the *execution stack*. This newly-created execution context contains, among other things, a reference to its outer environment --- the *global execution context*.

If we try to access a variable that has not been declared in the current execution stack, JavaScript checks in the outer environment recursively until it either finds the variable or finishes searching the outermost environment (i.e. the *global execution context*). Only after failing to find the variable in the outermost environment does JavaScript throw a reference error.

This chain formed by nested execution environments is what is called the *scope chain*.

### Defining *outer environment*

Since the concept of outer environment is central to the scope chain, it is important to know how the outer environment is determined by JavaScript.

A fair guess might be that JavaScript takes the lexical environment of the calling function and sets that as the new execution context's outer environment. *But this is wrong!*

Instead, we should think about when each function and variable is created. Memory is allocated for each declared function and variable during the *creation phase* before any of the code is ever executed. Taking the same code snippet above: As soon as we declare the function *bar()*, it is created in memory. At this point, *foo()* has not yet been created. Therefore, it is impossible that the *bar()* execution context's outer environment is *foo()*'s lexical environment.

When *bar()* is created, only the global execution context exists. So *bar()*'s outer environment is the gloabl execution context.

Although I prefer to think about this in the way I just described, a helpful alternative is to look at where the function or variable in question physically sits in the code. By this, I mean: Is it declared within a function or outside any function?

If *bar()* was declared within *foo()*, its outer environment would've been *foo()*. But since it is declared outside any function, its outer environment is the global execution context.

### Slightly altered code

For example, here is an alternate version of our original code:

```javascript
function foo() {
    var someNumber = 1;
    function bar() {
        console.log(someNumber);
    }
    bar();
}

var someNumber = 0;
foo(); // prints 1
```

It is identical to the previous except *bar()* is declared within *foo()*, rather than in the global scope. It makes sense then that calling *bar()* logs the value '1' --- the value of *someNumber* declared in its outer environment *foo()*.

### Notes

- ^1^ This process is called *hoisting*.
- ^2^ *Undefined* should not to be confused with 'not defined', which indicates at runtime that memory has not been allocated for the function or variable).