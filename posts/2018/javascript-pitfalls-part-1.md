---
layout: post.njk
title: JavaScript Pitfalls, Part 1
date: 2018-06-28
---

JavaScript is known among software developers for both its popularity and its unconventional, sometimes frustrating design. One of the foremost books on JavaScript, Douglas Crockford's [JavaScript: The Good Parts](https://www.goodreads.com/book/show/2998152-javascript), even uses its own title to take a loving jab at JavaScript's notable blend of good parts and bad.

Throughout the past year or so, I have worked heavily with JavaScript --- learning many of its quirks and pitfalls --- and despite this, I have grown to really like JavaScript (even vanilla). Today, I find JavaScript very pleasant to use for the most part, even finding myself surprised by its occasional elegance.

In this series of blog posts *JavaScript Pitfalls*, I will be demonstrating several design flaws (some in my opinion qualify as legitimate bugs) in the JavaScript language. The goal is to write about lesser known, yet more legitimate, gripes with the language --- as opposed to the usual complaints (i.e. type coercion, weak/dynamic typing) which I actually think are just fine.

Let's get started.

### Automatic semi-colon insertion

If a piece of code is written to fail, I think it should be allowed to fail. It should not be the interpreter's job to try and make sense of failing code. Unfortunately, not only does the JavaScript engine try to make sense of failing code, it even occasionally tries to take a guess at missing code!

Take the following for example, paying attention to the way opening brackets are written on a new line every time. It is not uncommon, especially for developers coming from a C# background, to adopt a bracket convention similar to what's shown:

```javascript
var incrementAndWrapInObj = function (originalNum)
{
    return
    {
        incrementedNum: originalNum += 1
    };
}

console.log(incrementAndWrapInObj(5));
```

The variable incrementAndWrapInObj points to a function in memory that increments a given number parameter by 1 and returns the incremented number wrapped in an object. However, a bug comprising a common pitfall among C# developers makes it so that the value returned from incrementAndWrapInObj() is always *undefined*.

In line 3, the JavaScript engine reads *return* and assumes that the programmer meant to return the value at that point and merely forgot to append a semi-colon. What is ultimately run resembles the following:

```javascript
var incrementAndWrapInObj = function (originalNum) {
    return;
}

console.log(incrementAndWrapInObj(5));
```

And it is now clear why the value returned is always *undefined*. This is one reason why I like to follow JavaScript's recommended bracket convention and advise that other developers --- beginners especially --- do the same.

### Built-in constructors and strict equality

Like many other languages, JavaScript supports built-in constructors for primitives (also for arrays and objects):

```javascript
// Not using a built-in constructor
var boolA = true;

// Using a built-in constructor
var boolB = new Boolean(true);
```

In C# and Java, built-in constructors for primitives exist as well but because these languages are statically-typed, there is not much risk to using them. In JavaScript, they can become more of an issue. With a large and convoluted enough code base, they can often be difficult for new developers to debug.

Let's have a look at a few more examples:

```javascript/3-4,9-10
var numA = 1;
var numB = new Number(1);

console.log(numA == numB); // true
console.log(numA === numB); // false

var strA = 'Hello';
var strB = new String('Hello');

console.log(strA == strB); // true
console.log(strA === strB); // false
```

We can see from the highlighted lines that primitives created with built-in constructors are not the same as those created without using built-in constructors. Printing out the value of numA to the console, we get *1*. On the other hand, the value of numB is *Number { 1 }*. Looking deeper into numB, it also has a *\_\_proto\_\_* property containing the function used to construct it.

Applying the equality operator to numA and numB returns true because of [coercion](/posts/2017/coercion-in-javascript) but *strict* equality returns false. This behaviour may be obvious to experienced developers but it can be downright frustrating to debug given a large and complex code base.

My personal strategy is to avoid using built-in primitive constructors if I can help it. The same goes with array and object constructors.

### To be continued...

These are just a couple of things to watch out for when programming in JavaScript. There are a number more to tackle but I will save those for a later date.

"*JavaScript Pitfalls* will return." -- Marvel Studios