# Functional Design "Patterns"

## Composition

In functional programming composition is everywhere. Functions are typically implemented as first-class objects, meaning they can be passed as arguments to other functions, they can be returned from other functions, or they can be assigned to variables. We can use this capability to compose them, making their behavior configurable and extensible, whether by supplying a function to another function, or returning a function from another function.

We can also compose types in functional programming, in a more simple manner compared to the OOP way, which usually involves creating interfaces and subclasses to implement them. All that is required to compose types in functional programming is to use AND (tuple) and OR (choice) types, and build bigger types from smaller ones.

Common patterns involving function composition are:

1. The Decorator Pattern: a function is wrapped by another function to dynamically extend or modify its behavior, while keeping them decoupled.

1. The Currying Pattern: a multiple parameter function is turned into a sequence of functions that each take a single argument, by making each function take an argument and return another function that takes the next argument in the list.

2. Partial Application: a function is wrapped by another function that consistently supplies specific arguments to it, along with any new arguments provided, allowing the wrapped function to have some of its parameters fixed -- thus creating a partially applied version of it.

3. Monoids: the concept of a monoid comes from abstract algebra, and it is defined formally as a set of elements that can participate in a binary operation to produce another element that is also contained within the set, regardless of the order in which the operation is applied. Additionally, there exists an identity element that leaves any element unchanged when combined with it. These three aspects maps to the three axioms that a system must satisfy to be classified as a monoid:

    1. closure (the pairwise operation between elements from the set produce another element of the same type);
    
    2. associativy (the order of the operation does not matter);

    3. identity element (there has to exist an element such that when combined with another element it leaves the latter untouched).

    Monoid as a pattern in functional programming can be achieved by writting functions that operate on some type and return values of that same type, while also supporting a parameter that can participate in the operation without altering the result. This last part can be achieved by using either:

    1. the natural identity element associated with a built-in type (e.g., `""` for string concatenation, or "0" for integers under addition);

    2. a custom-defined identity value for user-defined types.

4. Bind: 

5. Map:

3. TODO: **go through interface, builder pattern, bind, and Railroad Oriented Pattern**. 

## Making Implicit Inputs Explicit: Parametrize Everything

Based on the principle of referential transparency, a function will always produce the same output if given the same inputs. If the function doesn't take anything as a param., and still returns something or performs some sort of action, then we can safely say that the function does not have referential transparency.
