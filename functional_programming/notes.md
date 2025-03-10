# Functional Design "Patterns"

## Functions as First Class Objects

In functional programming composition is everywhere. Functions are typically implemented as first-class objects, meaning they can be passed as arguments to other functions, they can be returned from other functions, or they can be assigned to variables. We can use this capability to compose them, making their behavior configurable and extensible, whether by supplying a function to another function, or returning a function from another function.

We can also compose types in functional programming, in a more simple manner compared to the OOP way, which usually involves creating interfaces and subclasses to implement them. All that is required to compose types in functional programming is to use AND (tuple) and OR (choice) types, and build bigger types from smaller ones.

With these observations made, we can safely say that functional patterns mainly are about function compositions, type compositions, and how functions operate on types.

## The Decorator Pattern As a Result of Functions Being First Class Objects

A function is wrapped by another function to dynamically extend or modify its behavior, while preserving their independence, keeping them decoupled.

## Currying

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

2. A custom-defined identity value for user-defined types.

Non-monoids can also be converted into monoids by using some of these techniques: always make sure that each field of the user-defined type is also a monoid; replace non-numeric types with lists or similar data structures that can easily be operated on as monoids; try to move the operation into the object; create an identity element by using discriminated union types.

## Monads

Monads are a pattern that stems from category theory. In category theory, a category is a structure containing objects and morphisms. Morphisms are meaningful relationships or mappings between objects within a category, satisfying three key properties:

1. They can be composed if the target of one morphism matches the source of another. For example: if f: X -> Y and g: Y -> Z, then their composition is given by g o f: X -> Z, which is also a valid morphism.

2. The compositions are associative, meaning if there are three morphisms f, g, h, then h o (g o f) = (h o g) o f.

3. Every object in a category has an identity morphism that maps the object to itself and effectively leaves the object untouched (1X(x) = x, ∀x ∈ X, or  1X: X -> X).

Rather than mapping objects to other objects within a category, a monad maps both objects and morphisms (the relationship between them) while preserving its monadic structure. Additionally, monads are equipped with two natural transfomrations, namely the unit (it wraps a value in the monadic context) and the bind (it allows the chaining of computations that use the wrapped value and return another monad with the result, feeding into each other).

These transformations abide to the monad rules:

1. Left and right identity: applying the unit transformation to a value and then immediately binding a function to it should have the same effect as applying the function directly to the value(supposing the binded function correctly returns the same type of monad); applying bind to a function that does nothing should leave the monadic value untouched.

2. Associativity: the order in which sequential operations are binded together does not matter.

Unlike simple function composition, which can lead to nested or complex function calls, or cluttered imperative code, monads lead to clean, readable, and predictable code. It is a way of handling effects like state, I/O, optional values, asynchronous operations, etc, without having to write nested if statements with exception handling, or build complex function compositions.

## Bind: 

## Map:

## TODO: **go through interface, builder pattern, bind, and Railroad Oriented Pattern**. 
