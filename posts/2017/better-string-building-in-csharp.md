---
layout: post.njk
title: Better String Building in C#
date: 2017-06-12
---

### Strings in C#

Unlike strings in C which are nothing more than *char* arrays, strings in C# are represented as objects of the *String* class. At the heart of the *String* class resides a *char* array, not unlike strings in C.

Aside from the *char* array and a host of methods and constructors, the *String* class also keeps a *Length* property which contains the length of the *char* array. To get the length of a string in C, one would need to iterate through the entire array while incrementing a counter. This takes O(n). In C#, the Length property is always available and so retrieving a string's length is O(1).

Modifying a string in C is as simple as modifying the corresponding element/s of the *char* array. In C# however, strings are immutable --- they can never be modified once instantiated. Instead, a new string is created every time a change is made, an expensive operation.

Examine the code below as an example of this sub-optimal operation. Then have a look further below for a better alternative, making use of the *StringBuilder* class.

### The Common Way

```csharp
// A
string[] stringArray = ["This", "is", "a", "string"];
string returnString = string.Empty;

foreach (int = 0; i < stringArray.Length, i++)
{
    returnString += stringArray[i] + " ";
}

Console.Writeline(returnString); // prints "This is a string"
```

This is a very common way to build a string but it is also highly inefficient. Each time the string is modified inside the *foreach* loop, a new string must necessarily be created.

Here is a snippet that demonstrates what takes place internally:

```csharp
// A (Internal)
string[] stringArray = ["This", "is", "a", "string"];
string returnString = string.Empty;

foreach (int = 0; i < stringArray.Length, i++)
{
    StringBuilder builder = new StringBuilder();
    builder.Append(returnString);
    builder.Append(stringArray[i]);
    builder.Append(" ");
    returnString = builder.ToString();
}

Console.Writeline(returnString); // prints "This is a string"
```

At each iteration, a new object is instantiated, and its string representation returned.

You may have noticed I used a class *StringBuilder*, which seems to be able to mutate strings through the method *Append()*. Couldn't that class be used to create the string instead of the *String* class? Yes, it can; this leads us to our alternative...

### A Better Way

Like *String*, *StringBuilder* is a class that represents a string. Unlike *String* however, *StringBuilder* is used explicitly for --- *pause for effect* --- building strings. *StringBuilder* is mutable, which means a new object need not be created at each iteration of our code.

```csharp
// B
string[] stringArray = ["This", "is", "a", "string"];
StringBuilder builder = new StringBuilder();

foreach (int = 0; i < stringArray.Length, i++)
{
    builder.Append(stringArray[i]);
    builder.Append(" ");
}

Console.Writeline(builder.ToString()); // prints "This is a string"
```

### TL/DR

When writing code that appends to a string many times (probably through a loop), consider using the *StringBuilder* class which is more performant at this task than the *String* class.