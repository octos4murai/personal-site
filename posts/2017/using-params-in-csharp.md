---
layout: post.njk
title: Using params in C#
date: 2017-03-20
---

### Overloading

Overloading occurs when two or more methods have the same name but different implementations, depending on their arguments. For instance, have a look at the following code:

```csharp
private int Add(int a, int b)
{
    return a + b;
}

private int Add(int a, int b, int c)
{
    return a + b + c;
}

private int Add(int a, int b, int c, int d)
{
    return a + b + c + d;
}
```

The snippet contains three methods, each adding a number of integers. The methods exhibit overloading --- their names are identical and their implementations differ based on their arguments. Overloading does not only occur when we have different numbers of arguments. Different argument types can also be used to differentiate between overloaded methods, e.g. *add(string, int)* and *add(int, int)* are also overloaded methods.

### Improving on our initial approach

Although the code in the previous section is valid, it can be observed that it is impractical in at least one way: if we want to add more and more integers we need to either add new methods (option A) or nest methods together (option B) like so:

```csharp
// Option A
private int Add(int a, int b, int c, int d, int e, int f)
{
    return a + b + c + d, e, f;
}

Console.Writeline(Add(1, 2, 3, 4, 5, 6));

// Option B
Console.Writeline(Add(Add(1, 2), Add(3, 4), Add(5, 6)));
```

Both options A and B look pretty ridiculous and are not very scalable. A better option (C) in many cases is to write an overloaded method that takes a single collection of integers:

```csharp
// Option C
private int Add(int[] numsToAdd)
{
    int sumSoFar = 0;
    foreach(var num in numsToAdd)
    {
        sumSoFar += num;
    }

    return sumSoFar;
}

Console.Writeline(Add(new int[] {1, 2, 3, 4, 5, 6});
```

Option C is better than options A and B in a number of ways: not only is it more readable, it is also far more scalable. Since a single array can hold an arbitrary amount of elements, there is no need to write new methods every time we need to add more elements.

### *params*

Option C is often good enough, but if we want to invoke our method in a way that is a little prettier, we can use *params*. *params* is [syntactic sugar](https://en.wikipedia.org/wiki/Syntactic_sugar) in C# that allows the developer to pass an arbitrary amount of arguments into a method as if it were declared as elements of an array. To illustrate, have a look at Option D:

```csharp/1
// Option D
private int Add(params int[] numsToAdd)
{
    int sumSoFar = 0;
    foreach(var num in numsToAdd)
    {
        sumSoFar += num;
    }

    return sumSoFar;
}

Console.Writeline(Add(1, 2, 3, 4, 5, 6);
```

Note the *params* keyword in the method signature before the argument type *int[]*. Inserting *params* allows us to invoke our Add() method in a cleaner way in line 13. The method parameters are passed as individual entities rather than wrapped in a collection, as if the underlying method was implemented as it was in option A.

With *params*, we can arguably get the best parts of two approaches.