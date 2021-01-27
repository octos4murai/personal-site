---
layout: post.njk
title: Demystifying Events in C#
date: 2019-01-14
---

In a previous [post](/posts/2018/demystifying-delegates-in-csharp), I talked briefly about delegates as a way to reference one or more methods in C#. In this current post, I intend to demonstrate how events are used in practice, with delegates as the core underlying mechanism.

### Diving into it

Have a look at the following code shown below. It describes similar functionality to the code snippet from [Demystifying Delegates in C#](/posts/2018/demystifying-delegates-in-csharp) --- but this time using an event.

### The *EventPublisher* class

Besides the standard *Program* class, the code has an *EventPublisher* class for something that publishes an event. In the highlighted line is something with the keyword *event*, which creates a C# event that references a delegate. The delegate we use in this case is *EventHandler*, a built-in C# delegate used to trigger events that do not need to pass any arguments to the methods ultimately invoked.

A similar built-in delegate class that allows argument passing is *EventHandler\<T\>*. Since *EventHandler* and *EventHandler\<T\>* are just delegates built into C#, one can easily choose to use a custom delegate instead.

In *Main()*, the method *RaiseEvent()* calls our delegate passing in some required standard parameters corresponding to (1) the sender and (2) another C#-specific built-in class *EventArgs*.

```csharp
// Class that publishes an event
class EventPublisher
{
    // Declare event (which references a delegate)
    public event EventHandler OnRaiseEvent;

    // Trigger the event
    public virtual void RaiseEvent()
    {
        OnRaiseEvent?.Invoke(this, new EventArgs());
    }
}
```

### The *Program* class

Our *Program* class is very simple: It has two simplistic methods that print out "foo" and "bar" respectively and a *Main* function that serves as the starting point for out C# program.

The *Main* function instantiates an object from class EventPublisher. Then, just as in [Demystifying Delegates in C#](/posts/2018/demystifying-delegates-in-csharp), it hooks up each of our two *PrintToConsole-* methods to our delegate. Finally, invoking *RaiseEvent()* causes each of our attached methods to also get invoked. The end result is that "foo" and "bar" are printed in the console.

```csharp
// Starting point for the program
class Program
{
    static void Main(string[] args)
    {
        // Instantiate the publisher and attach methods
        EventPublisher publisher = new EventPublisher();
        publisher.OnRaiseEvent += PrintToConsoleFoo;
        publisher.OnRaiseEvent += PrintToConsoleBar;

        // Trigger the event which calls each of the methods attached
        publisher.RaiseEvent();
    }

    // Methods we attach to an event
    static void PrintToConsoleFoo(object sender, EventArgs e)
    {
        Console.WriteLine("foo");
    }

    // Methods we attach to an event
    static void PrintToConsoleBar(object sender, EventArgs e)
    {
        Console.WriteLine("bar");
    }
}
```

### Conclusion

In this post, I showed a simple but useful implementation of the events pattern in C# and described how delegates ultimately make this functionality possible. I intentionally kept my discussion of events and delegates brief to maximize its approachability; for a deeper dive, see the [Microsoft C# Programming Guide](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/events/).