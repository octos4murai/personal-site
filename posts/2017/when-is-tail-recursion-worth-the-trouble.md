---
layout: post.njk
title: When is Tail Recursion Worth the Trouble?
date: 2017-07-05
---

### Recursion

Simply put, recursive code is code that invokes itself within its execution. Well-written recursive code has at least two parts: (1) a recursive case and (2) a base case. As the name suggests, the recursive case contains the recursive step, i.e. it performs the self-invocation calling smaller and smaller versions of itself. This last detail is important because it ensures that the base case is eventually arrived at (otherwise a stack overflow *usually* occurs). At the base case, the final solution is found, and the function is exited.

A classic example of a recursive function:

```csharp/10
public static int FactorialRecursive(int number)
{
    if (number <= 1)
    {
        // Base case
        return 1;
    }
    else
    {
        // Recursive case
        return number * FactorialRecursive(number - 1);
    }
}

Console.WriteLine(FactorialRecursive(3)); // prints 6 by computing 3 x 2 x 1
Console.WriteLine(FactorialRecursive(5)); // prints 120 by computing 5 x 4 x 3 x 2 x 1
Console.WriteLine(FactorialRecursive(1)); // prints 1
Console.WriteLine(FactorialRecursive(0)); // prints 1
```

This example is so common because it quickly demonstrates the main benefit of a recursive implementation: it can make code more intuitive and readable. In my experience, I find computer scientists tend to have a fondness for recursive implementations --- perhaps because of its mathematical heritage. *Elegant* is a common word used to describe the appeal of well-written recursive code.

Alas, recursive implementations have a common problem!

Recursion relies on repeatedly invoking the same function. Whenever a function is invoked, a contiguous section of memory is allocated on the stack. Every time a function finishes executing, that section of memory is freed. By invoking functions within functions (within functions) such that none of them finish executing, the stack can fill up quickly, eventually resulting in a *stack overflow*.

Cue tail recursion...

### How Tail Recursion Can Help

Tail recursion is a subset of recursion where the recursive call is simultaneously the final computational step.

In the function FactorialRecursive() above, we see in the highlighted line above that the recursive call *FactorialRecursive(number - 1)* is only the penultimate step. The final step is actually to multiply the result of that call with the value in variable *number*.

Here is a tail recursive version of the same function:

```csharp
public static int FactorialTailRecursive(int number, int multiplier=1)
{
    if (number <= 1)
    {
        // Base case
        return multiplier;
    }
    else
    {
        // Recursive case
        return FactorialTailRecursive(number - 1, number * multiplier);
    }
}

Console.WriteLine(FactorialTailRecursive(3)); // prints 6 by computing 3 x 2 x 1
Console.WriteLine(FactorialTailRecursive(5)); // prints 120 by computing 5 x 4 x 3 x 2 x 1
Console.WriteLine(FactorialTailRecursive(1)); // prints 1
Console.WriteLine(FactorialTailRecursive(0)); // prints 1
```

They key difference in this tail-recursive method is that our recursive call is also our final computational step. But what is it about tail recursion that makes it better than your regular flavour of recursion?

Well, many popular language compilers recognize this structure and are able to perform *tail-call optimization*.

Tail call optimization is a compiler feature by which a tail-recursive function can take no additional stack space beyond the initial function. This ability comes with the realization that any tail-recursive function A calling tail-recursive function B (in this instance B is the same function as A) needs only return whatever function B returns.

In this sense, the output derived in the final recursion is merely passed back up to the first function. Since no additional work is done between the recursive calls and their respective return statements, the compiler does not need to keep stack space for each method in the recursive process. That space can instead be reused for every recursive function call.

### When is Tail Recursion Worth the Trouble?

Unfortunately, many compiler writers have decided not to support tail call optimization, in effect forcing their users to use an iterative implementation for anything that involves sufficiently deep recursion.

Simply put, know whether your language compiler supports tail call optimization. If it does (e.g. ES6, Scheme, Scala), recursive functions are a viable option. Otherwise (e.g. stock Python, Java, C#), stick with loops.