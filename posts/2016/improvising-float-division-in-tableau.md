---
layout: post.njk
title: Improvising Float Division in Tableau
date: 2016-09-10
---

### The Problem

Working with Tableau 9.3, I was surprised to find that a built-in function for dividing two floats was missing. I don't know if this has been remedied in the most recent version of Tableau.

Tableau 9.3 has only one division function: DIV(integer, integer), which returns the integer portion of the quotient. Since my task was to divide two floats (each with three decimal places), my problem was two-part:

1. Find a way to simulate float division using integer division, and
2. Get both the integer and non-integer portions of the quotient.

### Test Variables

> float *a* = 5.502

> float *b* = 2.437

The quotient of *a* and *b* to three decimal places is 2.258. This is the result we want to get.

### Solution

The most direct approach to try is simply to cast *a* and *b* as integers. This will allow us to use Tableau's built-in DIV function:

> DIV(INT(*a*), INT(*b*))

>> = DIV(INT(5.502), INT(2.437))

>> = DIV(6, 2)

>> = <span class="red-text">3</span>

This solution is problematic for a number of reasons, but the primary reason is that the conversion between integer to float causes enough information loss so as to change the result. Thus, the answer derived is quite far from the one we want to get.

The next approach to try is to use the MOD (short for *modulo*) and FLOOR operations. MOD gets the remainder portion in a division operation. This is useful when we don't necessarily care about the non-integer portion of the quotient. FLOOR, on the other hand truncates a certain portion of a number starting from a particular position. In our example, we use FLOOR to truncate the fractional portion of our floats.

Applying these to the same example, we get:

> DIV(INT(FLOOR(*a*)), INT(FLOOR(*b*))) + MOD(*a*, *b*)

>> = DIV(INT(FLOOR(5.502)), INT(FLOOR(2.437))) + MOD(5.502, 2.437)

>> = DIV(5, 2) + MOD(5.502, 2.437)

>> = 2 + 0.628

>> = <span class="green-text">2</span>.<span class="red-text">628</span>

The problem here seems to lie in the fractional part of the result --- the portion computed using MOD. And indeed, the error is caused by the fact that MOD returns the remainder as a raw value rather than as a portion of the quotient. In our example, MOD returned 0.628 instead of the expected 0.258 (which can be derived by dividing 0.628 by *b*).

In this last attempt, we move away from MOD and FLOOR. Instead, we multiply the dividend by 10^3^, perform the division, and then multiply the result by 10^-3^. Note that we use the exponent 3 since our floats have precision 3 (three decimal places).

> DIV(INT(*a* x 10^3^), INT(*b*)) x 10^-3^

>> = DIV(INT(5.502 x 10^3^), INT(2.437)) x 10^-3^

>> = DIV(INT(5502), INT(2437)) x 10^-3^

>> = 2258 x 10^-3^

>> = <span class="green-text">2.258</span>

We were able to simulate float division using integer division, as well as return both the integer and non-integer portions of the quotient. This approach does the job!

### TL/DR

Tableau 9.3 only allows integer division. To perform a division operation between two floats, multiply the dividend by 10^x^ before dividing (where *x* is the precision of the floats). After performing the division, multiply the result by 10^-x^.