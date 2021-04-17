---
layout: post.njk
title: Synchrony and Event Handling in JavaScript
date: 2016-06-13
---

### Synchronous execution and the execution stack

The JavaScript engine is synchronous and single-threaded. Code is executed line by line, in the order it is written. For instance, it is simple to deduce the order in which the following function is executed:

```javascript
function a() {
    var stringToPrint = 'bar';
    console.log(stringToPrint);
}

function b() {
    a();
}

var stringToPrint = 'foo';
console.log(stringToPrint);
b();
```

This writes the following two lines in the console:

> foo

> bar

Under the hood though, "variable and function definitions are hoisted at the top of the enclosing scope" ([Vilcu](http://stackoverflow.com/a/34561247), 2016). JavaScript runs code in two phases: the (1) creation phase and the (2) execution phase. In the creation phase, JavaScript *hoists* the definitions so that the program is actually executed like this:

```javascript/9,14
var stringToPrint;

function a() {
    var stringToPrint;
    stringToPrint = 'bar';
    console.log(stringToPrint);
}

function b() {
    a();
}

stringToPrint = 'foo';
console.log(stringToPrint);
b();
```

At the start of each scope, the compiler allocates memory for all variables used within that scope. Each of these newly-declared variables are given the reserved value undefined until they are assigned a different value later in the execution. Note that undefined is not equivalent to null; undefined is an actual value that occupies memory.

Moreover, JavaScript maintains something called the execution stack which always begins with the global execution context. When the call to function b is made, function b’s execution context is pushed onto the stack --- on top of the global execution context. At that point, no code in the global execution context is run. Similarly, when function b makes a call to function a, function a’s execution context is pushed onto the execution stack, and no code in function b or the global execution context gets executed. Once code in the top-most execution context finishes, that execution context is popped off the stack, and the one that was immediately below it is resumed.

### Event handlers and the event queue

But what about event handlers, isn't *that* an example of asynchrony in JavaScript? Not really. Instead, event handlers in JavaScript provide, what is in my opinion, the illusion of asynchrony.

Similar to the execution stack, JavaScript maintains an *event queue*. Like its name suggests, the event queue keeps track not of execution contexts but events, such as mouse-clicks or key-strokes. Unlike the environment stack, the event queue is a [FIFO](https://en.wikipedia.org/wiki/FIFO_(computing_and_electronics)).

Since JavaScript has synchronous execution, it is unable to address commands in the event queue at the same time as it is running code in the execution stack. Instead, items in the event queue are only ever addressed when the execution stack is empty. It is possible to have a huge delay in the execution of event handlers, if there is long-running code in the execution stack. To illustrate, have a look at the code below:

```javascript/17
function eventHandler() {
    console.log('The event handler was run');
}

document.addEventListener('click', eventHandler);

function wait(secondsToWait) {
    var millisecondsToWait = secondsToWait * 1000;
    var endTime = millisecondsToWait + new Date().getTime();

    while (new Date() < endTime){
        // Do nothing
    }

    console.log('Long-running function completed');
}

wait(10);
```

After about ten seconds, the console will look similar to this:

> Long-running function completed

> The event handler was run

When the call to the wait function was made, a long-running function was triggered. Any click events triggered were placed in the event queue -- but these events were only handled once the execution stack was empty. As a result, the string "The event handler was run" is always printed *after* "Long-running function completed", never before.

### TL/DR

The JavaScript engine is synchronous, and event handlers are only executed when the execution stack is empty. Long-running queries are a particularly nasty hazard in JavaScript.