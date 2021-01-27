---
layout: post.njk
title: JavaScript Pitfalls, Part 2
date: 2018-09-28
---

This blog post is part two of series JavaScript Pitfalls where I attempt to demonstrate design flaws in the JavaScript language. To read the first part, click here: [JavaScript Pitfalls, Part 1](/posts/2018/javascript-pitfalls-part-1).

### Constructors and the *new* keyword

In JavaScript, constructors are nothing but functions meant to create objects. In other words, the difference between functions and constructors is not in their implementation but in their usage. For example, examine the two examples below and note that syntactically there is little difference between the former (function) and the latter (constructor):

```javascript
// Function
let foo = function () {
    ...
};

foo(); // Invoking the function

// Constructor
let Bar = function () {
    ...
};

let bar = new Bar(); // Using the constructor
```

By convention, the variable *foo* to which the function was assigned is in *camelCase* while the variable *Bar* to which the constructor was assigned is in *PascalCase*. Constructors are also invoked with the keyword *new*, triggering the creation of a new object.

Since a constructor is just a function invoked with the keyword *new*, if we ever forget to write *new*, no error will be thrown. The JavaScript engine will simply invoke the function instead of creating a new object and using the function as a constructor. As you can imagine, this behaviour can cause bugs which are difficult to detect.

### Arrays, objects, and for loops

In most languages other than JavaScript, the choice between using for loops and foreach loops comes down to readability and conveying the developer's intent. Specifically, foreach loops tell readers "that you are planning to do something to each member of a collection irrespective of its place in the collection." ([Stack Overflow](https://stackoverflow.com/a/1946941)) In this sense, foreach loops can be thought of as a special case of for loops.

In JavaScript, however, I would advise against using foreach loops, instead opting towards for loops. Let me explain why:

```javascript/0-1
Array.prototype.foo = 'foo';
Array.prototype.bar = 'bar';
let elements = [1, 2, 3, 4, 5];

// Example: for loop
for (let elemIndex = 0; elemIndex < elements.length; elemIndex++) {
    console.log(elements[elemIndex]); // Prints 1 2 3 4 5
}

// Example: foreach loop
// Note: Javascript has deprecated the old 'for each' syntax.
// Instead, a 'for in' syntax is used. Nevertheless, it is still a foreach loop.
for (let element in elements) {
    console.log(element); // Prints 0 1 2 3 4 foo bar
}
```

Among the two examples above, the first does what we probably expect it to do (i.e. print 1 2 3 4 5), while the latter's behaviour may seem strange. To understand why, it is helpful to know how arrays are implemented in Js.

JavaScript arrays are implemented as objects --- and JavaScript objects are simply key-value pairs. Each element in the array is a value in the array object, and its key is its index in said array. Therefore, the elements array in the above example can be represented as:

> { **0**: 1, **1**: 2, **2**: 3, **3**: 4, **4**: 5 }

From this, we can see that printing the variable *element* in the foreach loop outputs the implicit indices (keys) of the array object. But why are there two additional elements printed --- 'foo' and 'bar'?

Well, in the highlighted lines above, I added those values to properties of the same name on the *Array.prototype* object. This makes it so that every *Array* object created after that point inherits properties *foo* and *bar*.

While I made the *Array.prototype* property assigments glaringly obvious in this example, in real non-trivial applications, this can quickly become very hard to debug. Many times, we just cannot ensure that the object we are looping on has not been tampered with either within our own code or within a library our code uses. Thus, my personal rule is to make things simple and stick with for loops in JavaScript.

### Inner Functions and *this*

The example below shows the creation of an object *myObj* and two functions within it *buggyFun* and *fixedFun*. Within each of these functions, another function --- we call this an inner function --- is declared and set to be invoked when a user clicks within the browser window:

```javascript/2
let myObj = {
    buggyFun: function () {
        this.foo = 'foo';
        document.addEventListener('click', function () {
            console.log(this.foo);
        });
    },

    fixedFun: function () {
        var self = this;
        this.bar = 'bar';
        document.addEventListener('click', function () {
            console.log(self.bar);
        });
    }
};

myObj.buggyFun(); // Clicking prints 'undefined'
myObj.fixedFun(); // Clicking prints 'bar'
```

Developers who are inexperienced in JavaScript may have a hard time spotting what is wrong with the first function *buggyFun*. While the *this* keyword in the highlighted line points to *myObj* (i.e. myObj.foo === 'foo' is true), *this* in the inner function no longer points to the same object. Once again, this Js quirk is particularly hard to debug especially for beginners.

We address this in *fixedFun*, where we saved a reference to *myObj* in the variable *self*. Then within our inner function, we use the saved reference in *self* to log the value in myObj.bar. This is just one of several ways of dealing with this prevalent JavaScript pitfall --- but what is most important is being aware that the pitfall exists.

### In summary

While it is far from perfect and is the butt of too many nerdy jokes, by and large JavaScript *is* the language of the Internet. In recent years, it has managed to encroach even into areas such as desktop development and IOT (largely with the help of Google's V8 engine). With so many JavaScript libraries and frameworks fighting for developers' attention, it is understandable that many devs find the JavaScript ecosystem to be volatile and somewhat transient.

While frameworks like Node and React are certainly some of the trendiest JavaScript stacks for good reason, I think it is also crucial for JavaScript devs to have more than a surface-level knowledge of vanilla JavaScript. While occasionally clumsy and error-prone, vanilla JavaScript can occasionally surprise with its simplicity and elegance(?!).

Deep knowledge in vanilla JavaScript can help developers reinforce their understanding of how and why popular JavaScript frameworks do what they do.