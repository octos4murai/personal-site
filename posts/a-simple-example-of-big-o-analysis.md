---
layout: post.njk
title: A Simple Example of Big-O Analysis
date: 2016-05-09
---

What makes an algorithm better than another? One measure is Big-O.

Big-O analysis is concerned with the running time of an algorithm as n gets very large. This is why Big-O analysis is also commonly referred to as worst-case analysis.

Consider the following two functions. Both take a non-empty array of integers and return the smallest integer. In both functions, n represents the number of elements in the given array.

### Function A

```csharp
// Function A: Compares every element of an array to all others to find the smallest one
int min(int[] integerArray)
{
    int smallestSoFar;

    for (int i = 0; i < integerArray.Length; i++)
    {
        boolean isMin = true;

        for (int j = 0; j < integerArray.Length; j++)
        {
            if (integerArray[j] < integerArray[i])
            {
                isMin = false;
            }
        }

        if (isMin)
        {
            smallestInteger = integerArray[i];
            break;
        }
    }

    return smallestInteger;
}
```

For each element in the array, function A makes a comparison between that element (let's call this the *subject*) and every other element in the array. As soon as an element smaller than the subject is found, the subject is "disqualified" from being the smallest in the array, so function A moves on to the next subject. If a subject is never disqualified and it has been compared to every other element, the subject is declared the smallest and then returned.

### Function B

```csharp
// Function B: Traverses the array once, storing the smallest element encountered so far
int min(int[] integerArray)
{
    int smallestSoFar;

    for (int i = 0; i < integerArray.Length; i++)
    {
        if (smallestSoFar == null || integerArray[i] < smallestSoFar)
        {
            smallestSoFar = integerArray[i];
        }
    }

    return smallestSoFar;
}
```

Function B traverses the array only once. On the first element (the first *subject*), its value is stored under the variable *smallestSoFar*. On every subsequent element, function B compares its value to the value in smallestSoFar. If the subject is smaller, the value in smallestSoFar is replaced with the value of the subject. Otherwise, function B moves on to the next subject. Once every element in the array has had its turn to be the subject, the value in smallestSoFar is declared the smallest and returned.

### Discussion

In the worst case, function A will need to compare each element to every other element in the array. Each element from 1st to nth requires up to n comparisons. Therefore, in the worst case, there will be n x n comparisons made. We can then say that function A is O(n^2^), read as "Big-O of n-squared". On the other hand, in the worst case, function B will only need to make one comparison for every element in the array. Therefore, there will be n comparisons made in total. We can then say that function B is O(n).

Clearly, the running time of function B as n gets very large is much smaller (better) than function A's, and we can conclude that function B is better than function A in terms of running time.

Why take time to optimize our function's running time? Is it worth it? Sometimes it's not --- but other times it is extremely important. Consider the table below:

<p class="table-title">
    Running time for a computer that performs 1 million comparisons per second
</p>

| Big-O | n=1000 | n=10000 | n=100000 |
| --- | --- | --- | --- |
| O(n) | .001 secs | 0.01 secs | 0.1 secs |
| O(n^2^)| 1 sec | 1.67 mins | 2.78 hours |
| O(n^3^)| 16.67 mins | 11.57 days | 31.71 years |

If our computer can make 1 million comparisons per second, we can expect a function with a running time of O(n), function B in our example, to take .001 seconds to process an array of 1000 integers. Function A, with its running time of O(n^2^.), takes 1 second to process the same 1000 integers, much longer than function B. The difference becomes more drastic as n gets larger. For n = 100000 integers, function B will take our computer 0.1 seconds, while function A will take 2.78 hours. A function with running time O(n^3^) will take 31.71 *years* to compute the same result!