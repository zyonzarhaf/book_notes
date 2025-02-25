# Functional Design "Patterns"

## Functions as First Class Objects

In functional programming composition is everywhere. Functions are typically implemented as first-class objects, meaning they can be passed as arguments to other functions, they can be returned from other functions, or they can be assigned to variables. We can use this capability to compose them, making their behavior configurable and extensible, whether by supplying a function to another function, or returning a function from another function.

We can also compose types in functional programming, in a more simple manner compared to the OOP way, which usually involves creating interfaces and subclasses to implement them. All that is required to compose types in functional programming is to use AND (tuple) and OR (choice) types, and build bigger types from smaller ones.

With these observations made, we can safely say that functional patterns mainly are about function compositions, type compositions, and how functions operate on types.

## The Decorator Pattern

A function is wrapped by another function to dynamically extend or modify its behavior, while preserving their independence, keeping them decoupled.

## The Currying Pattern

A multiple parameter function is turned into a sequence of functions. Each function in the sequence takes a single argument and returns another function that takes the next argument in the list.

## Partial Application

A function is wrapped by another function that consistently supplies specific arguments to it, along with any new arguments provided, allowing the wrapped function to have some of its parameters fixed -- thus creating a partially applied version of it.

## Monoids

The concept of a monoid comes from abstract algebra, and it is defined formally as a set of elements that can participate in a binary operation to produce another element that is also contained within the set, regardless of the order in which the operation is applied. Additionally, there exists an identity element that leaves any element unchanged when combined with it. These three aspects maps to the three axioms that a system must satisfy to be classified as a monoid:

1. Closure (the pairwise operation between elements from the set produce another element of the same type);
    
2. Associativity (the order of the operation does not matter);

3. Identity element (there has to exist an element such that when combined with another element it leaves the latter untouched).

Monoid as a pattern can be achieved by writting functions that operate on some type and return values of that same type, while also supporting a parameter that can participate in the operation without altering the result (the identity element). This last part can be achieved by using either:

1. The natural identity element associated with a built-in type (e.g., `""` for string concatenation, "0" for integers under addition, "1" for integers under multiplication, "[]" for concatenated lists, etc);

2. A custom-defined identity value for user-defined types. Two tips come in handy when creating a custom type: number one is always make sure that each field of the type is also a monoid, and number two is to replace single items with lists when dealing with non-numeric types.

## Bind: 

## Map:

## TODO: **go through interface, builder pattern, bind, and Railroad Oriented Pattern**. 
