---
layout: post.njk
title: Demystifying Delegates in C#
date: 2018-10-22
---

### A bit of context

Languages like JavaScript treat functions as first-class citizens. This means functions can be passed as parameters and assigned to variables and invoked through these assigned variables. Consider the following JavaScript code:

```javascript
// Assign a function to a variable
let functionVar = function (message) {
    console.log(message);
};

// Call the function
functionVar("Hello World");
```

In the snippet above, we assign an anonymous function to the variable *functionVar*. This allows us to invoke the anonymous function, printing a message to the console. This type of behaviour is central to JavaScript and many other "functional" programming languages.

C# is *not* a functional programming language, and it does not treat functions as first-class citizens. Nevertheless, there is a way to assign functions to variables and invoke the assigned functions through said variables. We can do this by using *delegates*.

### What is a delegate?

A *delegate* is a type in C# class, just like *class* or *struct*. It represents a reference to a method similar to the way *functionVar* references our anonymous JavaScript function in the snippet above.

Let's have a look at the code below and note the delegate declaration:

```csharp/17
class Program
{
    static void Main(string[] args)
    {
        // Instantiate the delegate
        PrintToConsoleDelegate delegateHandler = PrintToConsole;

        // Call the delegate
        delegateHandler("Hello World");
    }

    static void PrintToConsole(string message)
    {
        System.Console.WriteLine(message);
    }
}

delegate void PrintToConsoleDelegate(string message);
```

The highlighted line declares the delegate with the following parts: (1) the name *PrintToConsoleDelegate*, (2) the return type *void*, and (3) the parameters --- this has just one. It looks a lot like a method declaration.

In *Main()*, we create an instance of *PrintToConsoleDelegate* and name it *delegateHandler*. We then assign to it a reference to the static method *PrintToConsole*. Then calling the delegate causes its assigned function to be invoked.

Any method can be assigned to a delegate as long as it has a return type and a set of parameters that match the delegate declaration. In our example above, any method that takes a string and returns void can be assigned to our delegate.

### Assigning methods to a delegate

In the above snippet, we assign a single method to our delegate. But what if we want to assign several methods to a single delegate? This can be done like so:

```csharp/3
PrintToConsoleDelegate delegateHandler;
delegateHandler += functionA;
delegateHandler += functionB;
delegateHandler -= functionA;
delegateHandler += functionC;
```

The snippet above shows how methods can be added --- *and removed* --- from the delegate. Because the reference to *functionA* is removed from *delegateHandler* in the highlighted line, at the end of the snippet, the delegate will only contain references to *functionB* and *functionC*.

### What's next?

Perhaps the biggest application of delegates in C# is *events*. In a future blog post, I intend to discuss how events are built on top of the functionality of delegates. I plan to do this by transforming our sample delegate functionality above into one that uses *events* instead.