---
layout: post.njk
title: Multiple Inheritance in Python
date: 2016-12-21
---

Multiple inheritance is supported but usually not recommended in Python. In my own work, I certainly avoid it if I can. Nevertheless, I think it is important for Python developers to understand what multiple inheritance is and how it is implemented.

### A Simple Example of Inheritance

Consider the following snippet of code:

```python
class Person(object):
    def __init__(self):
        self.age = 41

    def get_age(self):
        return self.age

class Tourist(Person):
    pass

t = Tourist()
print t.get_age()
```

The Tourist class inherits from the Person class, as indicated by the syntax:

> class &lt;*class name*&gt;(&lt;*classes to inherit from*&gt;)

Inheritance allows the call to the method get_age() on variable t (which is of type Tourist) even if the class Tourist does not implement an &#95;&#95;init&#95;&#95;() method or a get_age() method. Upon instantiation in line 11, the interpreter finds that there is no &#95;&#95;init&#95;&#95;() method in Tourist and looks at any inherited class definitions. In this instance, it finds an implementation in the inherited class Person. The age attribute in the Tourist object in t is then assigned the value 41.

After the interpreter goes through a similar process to address the call to t.get_age(), the program prints out 41.

### An Example of Multiple Inheritance

Now consider the following:

```python
class Person(object):
    def __init__(self):
        self.age = 41

    def get_age(self):
        return self.age

class Japanese(Person):
    pass

class Korean(Person):
    def __init__(self):
        self.age = 42

class Tourist(Japanese, Korean):
    pass

t = Tourist()
print t.get_age()
```

The first thing to note is that the class Tourist now inherits from two other classes: Japanese and Korean. Both Japanese and Korean inherit from Person. However, Korean overrides Person's implementation of &#95;&#95;init&#95;&#95;(). Suddenly, it is not so simple to reason about which value will be printed. Will it be the Japanese/Person age or Korean age?

### Arriving at the Answer

To arrive at the answer, we need to look at something called the Method Resolution Order (MRO). [Wikipedia](https://en.wikipedia.org/wiki/C3_linearization) defines it as "an algorithm used primarily to obtain the order in which methods should be inherited (the "linearization") in the presence of multiple inheritance."

By appending *print Tourist.mro()* at the end of our code, we can see the MRO used by the interpreter for class Tourist:

> [<class '__main__.Tourist'>, <class '__main__.Japanese'>, <class '__main__.Korean'>, <class '__main__.Person'>, <type 'object'>]

When the Python interpreter looks inside the Tourist object, it follows the following order:

> Tourist -> Japanese -> Korean -> Person -> object

Note that the interpreter does not traverse deeper into Person until it has looked at both Japanese and Korean. This is a popular algorithm called [breadth-first search](https://en.wikipedia.org/wiki/Breadth-first_search).

The interpreter finds an implementation of &#95;&#95;init&#95;&#95;() as soon as it reaches Korean, and so the value 42 is printed. Had the interpreter instead performed a [depth-first search](https://en.wikipedia.org/wiki/Depth-first_search), then it would have arrived at the value 41. In fact: this was actually the case up to Python 2.1.

### TL/DR

Multiple inheritance in Python: "Learn it in depth, and then avoid using it as much as possible" ([Vasquez](https://www.quora.com/Multiple-inheritance-in-C%2B%2B-Should-we-embrace-it-or-avoid-it/answer/Fernando-Vazquez-2?srid=uucQM)). I would avoid it in other languages too.