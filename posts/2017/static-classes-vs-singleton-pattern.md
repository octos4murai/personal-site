---
layout: post.njk
title: Static Classes vs Singleton Pattern
date: 2017-02-10
---

### Classes and objects

In object-oriented programming, classes are templates containing any combination of methods and variables. A class definition determines the components of the instances of that class, which are called objects. Objects exhibit behaviours defined by its class.

To illustrate, the snippet below defines a class, instantiates an object, and shows how an object behaves according to its class definition:

```csharp
// Class definition
public class President()
{
    // Instance constructor
    public President(string lastName, int yearElected)
    {
        LastName = lastName;
        YearElected = yearElected;
    }

    // Class Fields
    private string LastName;
    private int YearElected;

    // Class Methods
    public string GetLastName()
    {
        return LastName;
    }

    public string PrintInfo()
    {
        return $"President {LastName} was elected in {YearElected}.";
    }
}

// Object instantiation
President currentPresident = new President("Trump", 2016);

// Prints "Trump"
Console.WriteLine(currentPresident.GetLastName());

// Prints "President Trump was elected in 2016."
Console.WriteLine(currentPresident.PrintInfo());
```

### Static classes (in C#)

While classes are usually written to be instantiated into objects, static classes cannot be instantiated. As such, they can have neither instance constructors nor non-static members. One way to think about static classes is that they are functionally the same as any regular class with only static members and a [private](/posts/2016/access-modifiers-in-csharp) constructor.

Here is a good example of a static class definition from [MSDN](https://msdn.microsoft.com/en-CA/library/79b3xss3.aspx). I also added a couple lines of code using the static methods. Note the *static* keyword in the class and member definitions:

```csharp
// Source: MSDN (https://msdn.microsoft.com/en-CA/library/79b3xss3.aspx)
public static class TemperatureConverter
{
    public static double CelsiusToFahrenheit(string temperatureCelsius)
    {
        // Convert argument to double for calculations.
        double celsius = Double.Parse(temperatureCelsius);

        // Convert Celsius to Fahrenheit.
        double fahrenheit = (celsius * 9 / 5) + 32;

        return fahrenheit;
    }

    public static double FahrenheitToCelsius(string temperatureFahrenheit)
    {
        // Convert argument to double for calculations.
        double fahrenheit = Double.Parse(temperatureFahrenheit);

        // Convert Fahrenheit to Celsius.
        double celsius = (fahrenheit - 32) * 5 / 9;

        return celsius;
    }
}

// Using the methods inside the static class
// Since we don't instantiate static classes, methods are instead called on the class itself
double tempInF = TemperatureConverter.CelsiusToFahrenheit(25);
double tempInC = TemperatureConverter.FahrenheitToCelsius(70);
Console.WriteLine($"25c in F is {tempInF}.");
Console.WriteLine($"25F in c is {tempInC}.");
```

### Singleton pattern

Whereas the *static* keyword is a feature of the C# (and Java) language, the Singleton is an architectural design pattern. Like its name suggests, a Singleton is a class that has a maximum of one instance. Through [lazy initialization](https://en.wikipedia.org/wiki/Lazy_initialization), a singleton class can be implemented such that it is created during runtime precisely the first time it is needed. This makes it inherently more lightweight than a static class, which is always created at compile time.

This is the simplest possible implementation of a Singleton from [MSDN](https://msdn.microsoft.com/en-us/library/ms998558.aspx):

```csharp
// Source: MSDN (https://msdn.microsoft.com/en-us/library/ms998558.aspx)
public class Singleton
{
    private static Singleton instance;

    private Singleton() {}

    public static Singleton Instance
    {
        get
        {
            if (instance == null)
            {
                instance = new Singleton();
            }
            return instance;
        }
    }
}
```

We can see from the code that the constructor is marked *private*, which allows only methods in the same class to create a new instance of the class. The *Instance* method is the the only public method that calls the constructor, and it is designed to only call that constructor if an instance of the class does not already exist.

### Static classes vs Singleton pattern

Developers don't necessarily need to choose between static components and a Singleton design pattern. In fact in C#, a good implementation of Singleton usually incorporates some static members. In general though, static classes are easier to write and use correctly. Personally, I like to write static classes for ancillary components in my projects, such as tools and utilities.

Singletons have the potential to offer better performance and extensibility --- which often makes it a good choice over the long run. However, it is more difficult to write correctly, especially within applications that implement multithreading.