# Notes on Grokking Simplicity: Taming Complex Software with Functional Thinking by Eric Normand

## What the book is about

The book is a distillation of various techniques, thought processes, and design patterns commonly found in functional programming circles. The primary goal of the book, it seems, is to provide an alternative to existing literature on functional programming, which often tends to be either overly academic or lacking in essential foundational concepts. Consequently, it makes functional programming more accessible beyond academia and demonstrate its relevance to the software engineering industry.

Rather than providing a universal definition of functional programming or advocating for a strictly functional approach, the book acknowledges that for any action to take place in software some form of side effect must occur. However, it emphasizes the need for these side effects to be organized and controlled, allowing for a greater focus other key concepts such as computations and data.

## Distinguishing between actions, calculations and data

When looking at any code through the lens of functional programming, it is crucial to classify it into one of three categories:

- Actions: Constructs that affect the external state of the application. Their behaviour depends on when and how many times they are executed, making them challenging to test and analyze. In functional programming, these are referred to as impure functions. 

- Calculations: Constructs that do not alter external state and always produce the s ame output for the same input. They are responsible for processing application data and are easier to test and analyze. In functional programming, these are known as pure functions. 

- Data: Recorded facts about events that hold meaning without execution and can be interpreted in various ways.

An important aspect of actions is that they spread easily through code. If an action is invoked within a computation or a pure function, that function becomes an action, as each invocation affects the application state.

Steps to convert an action to a computation:

1. Select and extract the code

1. Identify implicit inputs and outputs

1. Make both inputs and outputs explicit by converting them into arguments and return values, respectively

This means smaller structures, with single responsibilities, are going to be pulled apart from larger structures with the intention of making code easier to reuse, easier to maintain and easier to test.

However, at some point code complexity will dictate that an action is the only viable solution. When that occurs, all the pulling apart that was done before will allow for the action to be performed safely, with minimal and easily traceable dependencies.

## Copy on write discipline

It is a discipline in which calculations do not modify the original data they take. Instead, they copy the data, modify the copy and then return the copy. This approach helps maintain the immutability of data and prevents undesirable side-effects by ensuring that values that may be in use elsewhere remain unchanged.

Shallow copies are an essential aspect of the copy on write discipline. A shallow copy of a data structure is a copy whose properties share the same references as those from the source from which the copy was made. This means that changes made to the nested data in either the copy or the original will affect them both, as they reference the same underlying data.

This technique makes the code memory efficient by avoiding the overhead of copying entire data structures each time they are taken as input. However, to ensure both performance and safety, it is crucial that each computation creates its own copy of the nested level, adhering to the copy-on-write discipline. Code example:

```javascript
function addElementLast(array, element) {
    const arrayCopy = [...array]; // Make a copy
    arrayCopy.push(item); // Modify the copy
    return arrayCopy; // Return the coy
}
```

## Defensive copy discipline

This discipline is suitable for cases where the application has to interact (exchange data) with untrusted code that doesn't implement the copy-on-write immutability discipline, and for some reason it can't be changed or doing so is not a viable option.

The goal is to avoid two key risks: first, untrusted code modifying the application state in an unpredictable, undesirable way; and second, the untrusted code returning new data without directly altering the original, but retaining references to the original data and modifying it later.

The solution to achieve this goal is to create deep copies -- duplicate all levels of nested data structures, from the top down -- of the data both when it enters the trusted code and when it exits. Code example:

``` javascript
function addItemToCart(name, price) {
    const item = makeCartItem(name, price);
    const shoppingCart = addItem(shoppingCart, item);
    const total = calcTotal(shoppingCart);

    setCarTotalDom(shoppingCart);
    updateShippingIcons(shoppingCart);
    updateTaxDom(total);

    // Create a deep copy as data leaves the trusted code
    const cartCopy = deepCopy(shoppingCart);

    // Call untrusted code with the copy
    blackFridayPromotion(cartCopy);

    // Alternatively, the untrusted code could be wrapped in a function 
    // that includes the defensive copying inside it.

    // Create a deep copy as data enters
    const shoppingCartCopy = deepCopy(cartCopy);
}

```
## Stratified design

It is a design practice in which the software application is organized into layers of abstractions. Each layer represents a level of equal abstraction, consisting of:

- Straightforward functions: Functions that solve the problem presented in their signatures at the right level of generality and detail in their bodies. 

- Abstraction barrier: Some layers provide an interface that hides important implementation details, enabling developers to write code at a higher level without thinking on the layers beneath. Typically, code above the barrier can ignore implementation specifics, such as which data structure is used, while code below the barrier can disregard higher-level details, like what the functions are being used for.

- Minimal interface: New features should ideally be developed at higher levels rather than lower levels, by using existing functions in the leves beneath. This approach helps avoid bloat and unnecessary modifications to code that should rarely change. The term "minimal" emphasizes the importance of leaving well-established levels of abstraction untouched.

- Comfortable layers: The process of building layers of abstraction must serve a purpose: to make the code more reusable, testable and maintainable, allowing for faster delivery and higher quality software. If the tower of abstraction gets too tall at the expense of readability -- or other critical aspects -- and start to feel inconvenient, it is time to reassess and simplify. 

## First-class abstractions

A first-class value is a value that has three properties: it can be assigned to a variable, passed as argument to a function, or returned from a function. First-class values are crucial to functional programming, as they help create better abstractions and reduce code duplication.

There are two significant scenarios in which first-class values prove to be particularly useful, as shown in the book: 

1. Implicit argument in function name: When a function references a value in the local scope, and that value is named in the function's name.

1. Function with varying behaviour: When a function includes behaviour that may vary, but this behaviour does not depend on any of the function's arguments (instead, similarly to the first case, they depend on the function's name).

In both cases, the code could benefit from first-class values.

- In the first scenario, instead of leaving the value implicitly defined in the function name, it can be turned into a first-class value, allowing it to be used as an explicit input/argument. 

- In the second scenario, rather than hardcoding the varying behaviour in the function, this behaviour can be wrapped in another function, making it a first-class value that can be passed as an argument, just like any other value.