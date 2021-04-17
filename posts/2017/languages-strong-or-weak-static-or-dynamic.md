---
layout: post.njk
title: "Languages: Strong or Weak, Static or Dynamic"
date: 2017-09-08
---

### What gives?

A common misconception is that strong typing is synonymous with static typing and weak typing is synonymous with dynamic typing. In truth, strong-ness and static-ness have an orthogonal relationship, i.e. a programming language can be:

- strong-static (Java, C#),
- strong-dynamic (Python),
- weak-static (C), or
- weak-dynamic (Javascript).

While I find that definitions for strong/weak typing and static/dynamic typing are plentiful and sometimes contradictory, I will attempt to put forth definitions that makes sense to me --- and more importantly, preserve the usefulness of these terms.

### Strong vs weak typing

To determine whether a language implements strong or weak typing, we must look at the *value* being assigned to a variable. In strongly-typed languages, value types remain the same throughout the entire lifetime of the program. Weak typing, on the other hand, allows values of one type to be *coerced* into a different type:

```c
int main(void) {
    bool sampleBoolean = true;
    printf("%d", sampleBoolean);
    return 0;
}
```

In the code above, the first parameter passed to *printf* is a string containing the format specifier *%d*. This tells the function to expect a value of type integer as the second parameter. Instead we pass in the boolean value *true*. The C compiler coerces the boolean value into an integer value and prints the string "1".

This implicit conversion is not supported in a strongly-typed language.

### Static vs dynamic typing

Unlike strong or weak typing, identifying whether a language uses static or dynamic typing means inspecting the type of the *variable* referencing the value, not the type of the value.

In a static-typed language, variables themselves have a type; this type dictates what values can be referenced by the variables. For instance, a variable of type *int* in a static-typed language can only ever hold an int. This is true throughout the life of the program.

Since C# is a static-typed language, the following code returns an error:

```csharp/2
public static void Main()
{
    var sampleVariable = 2;
    sampleVariable = "two";
    Console.WriteLine(sampleVariable);
}
```

In the highlighted line, the compiler determines that the value *2* is an integer. Therefore, it gives the variable *sampleVariable* the type *int*. This is the reason why attempting to assign a string to the same variable will cause the compiler to throw an error.

In a dynamic language such as Python, this is not an issue:

```python
sample_variable = 2;
sample_variable = "two";
print sample_variable;
```

In the snippet above, the variable *sample_variable* is assigned the integer value *2*. Then it is reassigned the string value "two". This is not an issue for Python; it prints the expected string "two".

### TL/DR

Strong/weak typing and static/dynamic typing are orthogonal concepts. Strong and weak typing is determined by whether the type of a value can change throughout the life of the program.  Static and dynamic typing is determined by whether the variables have an enforced type that cannot be changed throughout the life of the program.