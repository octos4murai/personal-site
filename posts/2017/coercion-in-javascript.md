---
layout: post.njk
title: Coercion in JavaScript
date: 2017-04-02
---

### Static vs Dynamic Typing

The difference between static typing and dynamic typing has to do with two things:

1. When the type checking is done, and
2. Whether variables can be assigned values of different types at run time.

Statically-typed languages determine variable type at compile time, and the type remains unchanged throughout the entire program execution. On the other hand, dynamically-typed languages have variables that are not associated with any particular type. Therefore, the types of values assigned are determined "on-the-fly" and can change during program execution.

Often, statically-typed languages require the programmer to indicate a variable's type, while dynamically-typed languages do not. However, this is not always the case!

```csharp
// Often, statically-typed languages require the programmer to indicate a variable's type...
string a = "foo";
```

```javascript
// ... while dynamically-typed languages do not.
var b = "foo";
```

### Coercion in Javascript

As a dynamically-typed language, allows variables to be assigned values of different types:

```javascript/2
var b = "foo";      // b is assigned the string value foo
b = 15;             // b is reassigned the numeric value 15
var c = true && b;  // c is assigned the value 15
```

To support this, Javascript relies on coercion, which means implicitly converting a variable's type to another. For the unaware, coercion can cause some seemingly strange behaviour. In the highlighted line of the snippet above for instance, variable c is assigned the numeric value *15* because the operator *&&* causes *b* to be evaluated to *true* (i.e. var *c* = *true* && *true*) --- but then assigns the real value (before coercion) of the last operand to c.

Because Javascript syntax is so close to that of Java (and C#, etc.), Javascript developers coming from these languages are sometimes deceived into thinking the equality operator *==* in Javascript is the same as that in Java. Because Javascript coerces values, *==* in Javascript is less stringent than in Java. For instance:

```javascript
// Each of the following evaluates to true
var a = 1 == '1';
var b = false == 'false';
var c = 15 == '1' + 5;
```

In my opinion, *===* (or *strict equality*) should be used instead of *==* unless there is a specific reason to do otherwise. Unlike *==*, *===* takes coercion out of the equation (*punny!*):

```javascript
// Each of the following evaluates to false
var d = 1 === '1';
var e = false === 'false';
var f = 15 === '1' + 5;
```

### Leveraging Coercion

When used properly, coercion and *==* can allow developers to write some really clean and concise code. Note the example below:

```javascript
var a, b, c;

...

// Method A
if (a === null || a === undefined) {
    console.log("Hello world");
} else {
    console.log(a);
}

// Method B
if (b == null) {
    console.log("Hello world");
} else {
    console.log(b);
}

// Method C
console.log(c || "Hello world");
```

Methods^1^ A, B, C all do the same thing but are written in order of conciseness. All three methods check whether a variable (a, b, or c) is *null* or *undefined* ^2^.

Method A is the clunkiest implementation. The strict equality is used to check that the variable is not strictly equal to null and not strictly equal to undefined.

Method B uses coercion and the *==* operator. Since the Javascript engine coerces b to be equal to *null* even if its value is actually *undefined*, we can use this singular check to achieve the desired result.

Method C is the most elegant solution and also demonstrates knowledge of coercion. If c is either *null* or *undefined*, the alternate value "Hello world" is printed in its stead.

### TL/DR

Understanding coercion (along with *equality* and *strict equality* in Javascript) allows developers to avoid common pitfalls and write cleaner, more elegant code.

### Notes

- ^1^ To be clear, the word *method* is not used in the object-oriented sense here.
- ^2^ In Javascript, *null* and *undefined* are two distinct primitive values. *null* connotes an intentional lack of value, while *undefined* means a value was never set.