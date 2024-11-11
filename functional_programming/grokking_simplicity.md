# Notes on Grokking Simplicity: Taming Complex Software with Functional Thinking by Eric Normand

## What the book is about

The book is a distillation of various techniques, thought processes, and design patterns commonly found in functional programming circles. The primary goal of the book is to provide an alternative to existing literature on functional programming, which often tends to be either overly academic or lacking in essential foundational concepts. Consequently, it makes functional programming more accessible beyond academia and demonstrate its relevance to the software engineering industry.

Rather than providing a universal definition of functional programming or advocating for a strictly functional approach, the book acknowledges that, for any action to take place in software, some form of side effect must occur. However, it emphasizes the need for these side effects to be organized and controlled, allowing for a greater focus on other key concepts such as computations and data.

## Distinguishing between actions, calculations and data

When looking at any code through the lens of functional programming, it is crucial to classify it into one of these three categories:

- Actions: Constructs that change the state of the application. Their behaviour depends on when and how many times they are executed, making them challenging to test and analyze. In functional programming, functions that perform actions are referred to as impure functions. However, actions can come in many forms: class constructors, variable access expressions, property access expressions, array access expressions, variable assignment, property deletion, and many others.

- Calculations: Constructs that do not alter the state of the application and always produce the same output for the same input. They are responsible for processing application data and are easier to test and analyze. In functional programming, functions that perform calculations are known as pure functions. 

- Data: Recorded facts about events that hold meaning without execution and can be interpreted in various ways.

An important aspect of actions is that they spread easily through code. If an action is invoked within a computation or a pure function, that function becomes an action, as each invocation affects the application state.

Steps to convert an action to a computation:

1. Select and extract the code.

1. Identify implicit inputs and outputs.

1. Make both inputs and outputs explicit by converting them into arguments and return values, respectively.

This means smaller structures, with single responsibilities, are going to be pulled apart from larger structures with the intention of making code easier to reuse, easier to maintain and easier to test.

However, at some point code complexity will dictate that an action is the only viable solution. When that occurs, all the pulling apart that was done before will allow for the action to be performed safely, with minimal and easily traceable dependencies.

## Copy on write discipline

It is a discipline in which calculations do not modify the original data they take. Instead, they copy the data, modify the copy and then return the copy. This approach helps maintain the immutability of data and prevents undesirable side-effects by ensuring that values that may be in use elsewhere remain unchanged.

Shallow copies are an essential aspect of the copy on write discipline. A shallow copy of a data structure is a copy whose properties share the same references as those from the source from which the copy was made. This means that changes made to the nested data in either the copy or the original will affect them both, as they reference the same underlying data.

This technique makes the code memory efficient by avoiding the overhead of copying entire data structures each time they are taken as input. However, to ensure both performance and safety, it is crucial that each computation creates its own copy of the nested level, adhering to the copy-on-write discipline. Code example:

```javascript

function addElementLast(array, element) {
    const arrayCopy = [...array];
    arrayCopy.push(element); 
    return arrayCopy; 
}

```

## Defensive copy discipline

This discipline is suitable for cases where the application has to interact (exchange data) with untrusted code that doesn't implement the copy-on-write immutability discipline, and for some reason it can't be changed or doing so is not a viable option.

The goal is to avoid two key risks: first, untrusted code modifying the application state in an unpredictable, undesirable way; and second, the untrusted code returning new data without directly altering the original, but retaining references to the original data and modifying it later.

The solution to achieve this goal is to create deep copies -- duplicate all levels of nested data structures, from the top down -- of the data both when it enters the trusted code and when it exits. Code example:

``` javascript

function addItemToCart(shoppingCart, name, price) {
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
    // [...]
}

```
## Stratified design

It is a design practice in which the software application is organized into layers of abstractions. Each layer represents a level of equal abstraction, consisting of:

- Straightforward functions: Functions that solve the problem presented in their signatures at the right level of generality and detail in their bodies. 

- Abstraction barrier: Some layers provide an interface that hides important implementation details, enabling developers to write code at a higher level without thinking on the layers beneath. Typically, code above the barrier can ignore implementation specifics, such as which data structure is used, while code below the barrier can disregard higher-level details, like what the functions are being used for.

- Minimal interface: New features should ideally be developed at higher levels rather than lower levels, by using existing functions in the levels beneath. This approach helps avoid bloat and unnecessary modifications to code that should rarely change. The term "minimal" emphasizes the importance of leaving well-established levels of abstraction untouched.

- Comfortable layers: The process of building layers of abstraction must serve a purpose: to make the code more reusable, testable and maintainable, allowing for faster delivery and higher quality software. If the tower of abstraction gets too tall at the expense of readability -- or other critical aspects -- and start to feel inconvenient, it is time to reassess and simplify. 

## First-class abstractions

A first-class value is a value that can be assigned to a variable, passed as argument to a function, or returned from a function. First-class values are crucial to functional programming, as they help create better abstractions and reduce code duplication.

There are two significant scenarios in which first-class values prove to be particularly useful, as shown in the book: 

1. Implicit argument in function name: When a function references a value in the local scope, and that value is named in the function's name.

1. Function with varying behaviour: When a function includes behaviour that may vary, but this behaviour does not depend on any of the function's arguments (instead, similarly to the first case, they depend on the function's name).

In both cases, the code can benefit from first-class values.

- In the first scenario, instead of leaving the value implicitly defined in the function name, it can be turned into a first-class value, allowing it to be used as an explicit input/argument. This is a common refactor called **express implicit argument**:

```javascript
// Original function that implicitly uses 'price' in the function body
// Similar functions for setting different fields
function setSizeByName(name, size) {
    const item = cart[name];
    const newItem = objectSet(item, 'size',  size);
    const newCart = objectSet(cart, name, newItem);
    return newCart;
}

function setQuantityByName(name, quantity) {
    const item = cart[name];
    const newItem = objectSet(item, 'quantity',  quantity);
    const newCart = objectSet(cart, name, newItem);
    return newCart;
}

function setPriceByName(name, price) {
    const item = cart[name];
    const newItem = objectSet(item, 'price',  price);
    const newCart = objectSet(cart, name, newItem);
    return newCart;
}

// Refactored function that takes field and value as arguments and explicitly uses them in the body
function setFieldByName(cart, name, field, value) {
    // Run-time check to check if the string is valid
    if (!validItemFields.includes(field)) {
        throw `Not a valid item field: {'${field}'.}`;
    }

    // Translate old field name to new field name if necessary
    if(translations.hasOwnProperty(field)) {
        field = translations[field];
    }
    const item = cart[name];
    const newItem = objectSet(item, field, value);
    const newCart = objectSet(cart, name, newItem);
    return newCart;
}
```

- In the second scenario, rather than hardcoding the varying behaviour in the function, this behaviour can be wrapped in another function, making it a first-class value that can be passed as an argument -- just like any other value --:

```javascript
function doSomething() {
    try {
        // Do something
    } catch (error) {
        // Handle errors
    }
}

function doSomethingElse() {
    try {
        // Do something else
    } catch (error) {
        // Handle errors
    }
}

// Wrapper function to perform any action with error handling, encapsulating the above behaviours
function tryCatchWrapper(f, errorHandler) {
    try {
        f();
    } catch (error) {
        errorHandler(error);
    }
}
```

First-class functions can also replace non-first-class syntax elements. In JavaScript, operators like + are not first-class because they cannot be assigned to a variable, passed as an argument, or returned from a function. We can encapsulate their behaviour to make them first-class:

```javascript
function plus(a, b) {
    return a + b;
}

function minus (a, b) {
    return a - b;
}

function times(a, b) {
    return a * b;
}

function dividedBy(a, b) {
    return a / b;
}
```

This concept also applies to repetition structures and selection structures:

```javascript
function forEach(array, f) {
    for (let i = 0; i < array.length; i++) {
        const item = array[i];
        f(item);
    }
}

function when(test, then) {
    if (test) return then();
}

function IF(test, then, ELSE) {
    if (test) return then();
    return ELSE();
}
```
## Returning functions from functions

As previously mentioned, first-class values can be assigned to a variable, passed as arguments to a function, or returned from a function. When a programming language supports functions as first-class values, it allows functions to return other functions. 

This concept opens up new possibilities for abstraction and encapsulation. Sometimes, instead of calling the wrapper function immediately, it may be necessary to call it at a later time. This can be easily achieved by assigning the returned function to a variable:

```javascript
function tryCatchWrapper(f, errorHandler) {
    return function(...args) {
        try {
            return f(...args);
        } catch (error) {
            errorHandler(error);
        }
    }
}

const later = tryCatchWrapper(function (a, b) {
   // Do something with a 
   // Do something with b
}, handleError);

// Call later -- which holds the returned function --
// with the required arguments. 2 and 3 is just an example.
// It could be anything, as long as it matches the function signature.
later(2, 3);
```
By using this pattern, not only is the execution of the innermost function deferred, but it also becomes possible to pass arguments to it, eliminating the need to hardcode variables beforehand.

## Functional iteration

As previously illustrated, first-class functions can effectively replace any syntax, including iterative structures. The practice of replacing for loops with functions is a well-established pattern in functional programming. This approach brings with it three widely recognized applications for dealing with data collections: the map, filter, and reduce functions.

In general terms, the three functions work like this: the higher-order function takes a data collection and another function as arguments. Then, in its local scope, an empty collection is created. For each element in the original collection, the function that was passed as an argument is called with the element, which is then processed by this function and returned. Whatever the return value is, it is pushed to the empty collection. Finally, the collection is returned from the higher-order function.

- Map: A function that transforms one array into another array of the same length:

```javascript

function map(array, f) {
    const newArray = [];
    forEach(array, function(element) {
        const newElement = f(element);
        newArray.push(newEelement);
        // Alternatively,
        // newArray.push(f(element));
    });
    return newArray;
}

```

- Filter: A function that creates a new array based on an existing array, but only containing elements that matches a specified condition. In other words, it creates a subset of the elements of an array:

```javascript

function filter(array, f) {
    const newArray = [];
    forEach(array, function(element) {
        if(f(element))  {
            newArray.push(element);
        }
    });
    return newArray;
}

```

- Reduce: A function that accumulates a value as it iterates over the array. The logic behind the accumulation and the returned value is decided by another function that is taken as argument, to which the current value of the accumulator and the current element of the iteration must be passed, and which returns a value of the same type as its first argument:

```javascript 

function reduce(array, init, f) {
    let accum = init;
    forEach(array, function(element) {
      accum = f(accum, element);
    });
    return accum;
}

```

## Chaining functional tools

While functional tools in isolation are usually enough to handle simple computations, complex calculations often require **chaining**: the process of breaking down intricate calculations into a series of steps, where each step involves the application of a functional tool.

Example: consider the task of processing an array of customers to return the largest purchase for each customer who has made three or more purchases:

```javascript

function biggestPurchasesBestCustomers(customers) {
    // Filter for only good customers
    const bestCustomers = filter(customers, function(customer) {
        return customer.purchases.length >= 3;
    });

    // Map those to their biggest purchases
    const biggestPurchases = map(bestCustomers, function(customer) {
        return reduce(customer.purchases,
                      { total: 0 },
                      function(biggestSoFar, purchase) {
                        if(biggestSoFar.total > purchase.total) {
                            return biggestSoFar;
                        }
                        return purchase;
                     });
    });
    return biggestPurchases;
}

```
Although the code successfully achieves its goal, there is a lot of room for improvement. For starter, the function can be more straightforward (solve the problem in the right level of detail and generality) by letting another function decide what value to compare. This gets rid of the dot notation, which is a language built-in feature from a lower level of abstraction. Improved version with 'maxKey':

```javascript

// Wrap the reduce function to find the largest value from an array,
// using a callback to decide what value to compare
function maxKey(array, init, f) {
    return reduce(array,
                  init,
                  function(biggestSoFar, element) {
                    if(f(biggestSoFar) > f(element) {
                        return biggestSoFar;
                    });
                    return element;
                  }
}

function biggestPurchasesBestCustomers(customers) {
    const bestCustomers = filter(customers, function(customer) {
        return customer.purchases.length >= 3;
    });

    const biggestPurchases = map(bestCustomers, function(customer) {
        return maxKey(customer.purchases, { total: 0 }, function(purchase) {
            return purchase.total;
        });
    } 
    return biggestPurchases;

```

The code could be made even more clear by getting rid of the nested callbacks and return statements. This can be achieved by either naming the steps or naming the callbacks:

Naming the steps:

```javascript

function selectBestCustomers(customers) {
    filter(customers, function(customer) {
        return customer.purchases.length >= 3;
    });
}

function selectBiggestPurchases(customers) {
    return map(customers, selectBiggestPurchase);
}

function selectBiggestPurchase(customer) {
    return maxKey(customer.purchases,
                  { total: 0 },
                  function(purchase) {
                    return purchase.total;
                  }
    );
}

function biggestPurchasesBestCustomers(customers) {
    const bestCustomers = selectBestCustomers(customers);
    const biggestPurchases = selectBiggestPurchases(bestCustomers);
    return biggestPurchases;
}

```

Naming the callbacks:

```javascript

function isGoodCustomer(customer) {
    return customer.purchases.length >= 3;
}

function selectBiggestPurchase(customer) {
    return maxKey(customer.purchases, { total: 0 }, getPurchaseTotal);
}

function getPurchaseTotal(purchase) {
    return purchase.total;
}

function biggestPurchasesBestCustomers(customers) {
    const bestCustomers = filter(customers, isGoodCustomer);
    const biggestPurchases = map(bestCustomers, selectBiggestPurchase); 
    return biggestPurchases;
}

```

In general, naming the callbacks results in clearer, more reusable code, because the callbacks are more reusable than the calls to the higher-order functions. However, there is still another issue to consider, which is the potential inefficiency of creating multiple intermediate arrays during chaining operations. To address this problem, there is a technique called stream fusion that minimizes the overhead associated with creating intermediate data structures and enhances performance. **Stream fusion is the combination of multiple calculations into a single step**, reducing memory usage and enhancing performance. Example of stream fusion:

```javascript

function biggestPurchasesBestCustomers(customers) {
    return map(filter(customers, isGoodCustomer), selectBiggestPurchase);
}

```

In this example, instead of filtering the customers to create an intermediate array and then mapping over that array, filter and map are executed in a single pass.

Functional chaining can also be used to refactor existing for loops. The first step is to understand what the loop is trying to achieve. Then, simply forget about the current implementation and make your own, using functional tools. If the code is too complex, refactor from clues:

1. Look for the data types being used within the loop. Try to identify composite types, such as an array, or an object.

1. Instead of using primitives to loop over data, operate on whole data structures at once.

1. Break it in as many small steps as required.

Example of a for loop turned into functional code:

```javascript

// Original code
function shoesAndSocksInventory(products) {
    let inventory = 0;
    for(let p = 0; p < products.length; p++) {
        const product = products[p];
        if (product.type === 'shoes' || product.type === 'socks') {
            inventory += product.numberInInventory;
        }
    }
    return inventory;
}

// Refactor with functional tools
function shoesAndSocksInventory(products) {
    const shoesAndSocks = filter(products, function(product) {
        return product.type === 'shoes' || product.type === 'socks';
    });

    const inventories = map(shoesAndSocks, function(product) {
        return product.numberInInventory;
    });

    return reduce(inventories, 0, plus);
}

```

Other common functional tools:

```javascript

function pluck(array, field) {
    return map(array, function(object) {
        return object[field];
    });
}

function concat(arrays) {
    const ret = [];
    forEach(arrays, function(array) {
        forEach(array, function(element) {
            ret.push(element);
        });
    });
    return ret;
}

function frequenciesBy(array, f) {
    const ret = [];
    forEach(array, function(element) {
        const key = f(element);
        if (ret[key]) ret[key] += 1;
        else ret[key] = 1;
    });
    return ret;
}

function groupBy(array, f) {
    const ret = [];
    forEach(array, function(element) {
        const key = f(element);
        if (ret[key]) ret[key].push(element);
        else ret[key] = [element];
    });
    return ret;
}

```

## Reduce for building values

Reduce can do much more than simply summarize data; it can also be used to build data structures. For example, consider a shopping cart represented by a simple one-dimensional array containing all the items a user has added, including duplicates.

If we want to create a complete shopping cart that includes both the quantity and the price of each item, we should reflect on the essence of the reduce() function. Since reduce iterates over an array and combines its elements into a single value, we can use it to transform our existing shopping cart into a more complex object:

```javascript

const shoppingCart = reduce(itemsAdded,
                            {},
                            function(cart, item) {
                                if (!cart[item]) {
                                    return add_item(cart, {
                                        name: item,
                                        quantity: 1,
                                        price: priceLookup(item) 
                                    });
                                }
                                const quantity = cart[item].quantity;
                                return setFieldByName(cart, item, 'quantity', quantity + 1);
                            }
);

```

Extracting and naming the callback:

```javascript 

function addOne(cart, item) {
    if (!cart[item]) {
        return add_item(cart, {
            name: item,
            quantity: 1,
            price: priceLookup(item) 
        });
    }
    const quantity = cart[item].quantity;
    return setFieldByName(cart, item, 'quantity', quantity + 1);
}

const shoppingCart = reduce(itemsAdded, {}, addOne);

```

To allow users to remove items as well, we need to modify the initial data structure slightly, transforming it into a matrix:

```javascript

const itemOps = [['add', 'shirt'], ['add', 'shoes'], ['remove', 'shirt'], ['add', 'socks'], ['remove', 'hat']];

function removeOne(cart, item) {
    if(!cart[item]) {
        return cart;
    }
    else {
        const quantity = cart[item].quantity;
        if (quantity === 1) {
            return removeItemByName(cart, item);
        }
        else {
            return setFieldByName(cart, item, 'quantity', quantity - 1);
        }
    }
}

const shoppingCart = reduce(itemOps, {}, function(cart, itemOp) {
    const op = itemOp[0];
    const item = itemOp[1];
    if (op === 'add') return addOne(cart, item);
    if (op === 'remove') return removeOne(cart, item);
});

```

In summary, the reduce function not only allows us to literally reduce a given dataset but also helps in constructing more complex data structures. The last code example demonstrates a common functional programming technique where operations are represented in a data structure — an array containing the operation name and its corresponding argument (the cart item).

## Functional Tools for Nested Data

This section focuses on working with objects and nested objects. It begins with simple operations on zero-depth objects while adhering to functional principles such as copy-on-write discipline and higher-order functions.

```javascript

let shirt = {
    "model": "camiseta muito foda",
    "price": 59
    "size": "small",
    "color": "blue"
}

function update(object, key, modify) {
    const value = object[key];
    const newValue = modify(value);
    const newObject = objectSet(object, key, newValue);
    return newObject;
}

shirt = update(shirt, 'color', value => "white");

```

And this is a good intro to what comes next: dealing with nested objects. Nested objects can be processed by using the same principles as before, but with an extra step: for each level of nesting there must be a nested function call:

```javascript

let shirt = {
    model: "camiseta muito foda",
    price: 59,
    options: {
        size: "small",
        color: "blue",
        stamps: {
            desenho: "miranha",
        },
    }
}

// We could either derive update2, update3, and update4
function update2(object, key1, key2, modify) {
    return update(object, key1, function(object2) {
        return update(object2, key2, modify);
    });
}

function update3(object, key1, key2, key3, modify) {
    return update(object, key1, function(object2) {
        return update2(object2, key2, key3, modify);
    });
}

function update4(object, key1, key2, key3, key4, modify) {
    return update(object, key1, function(object2) {
        return update3(object2, key2, key3, key4, modify);
    });
}

// Path: options/size
shirt = update2(
    shirt,
    "options",
    "size",
    function(size) {
        return "medium";
    }
);

// Path: options/stamps/desenho
shirt = update3(
    shirt,
    "options",
    "stamp",
    "desenho",
    function("desenho") {
        return "ben10";
    }
);

// OR simply nest a bunch of 0-depth update functions
shirt = update(shirt, "options", function(option) {
    return update(option, "size", function(size) {
        return "medium";
    });
});

shirt = update(shirt, "options", function(option) {
    return update(option, "stamps", function(stamp) {
        return update(stamp, "desenho", function(desenho) {
            return "ben10";
        });
    });
});

```

This process continues until we derive an updateX function. A pattern emerges where each updateX function contains an updateX-1 nested within an update function. This is where recursion comes into play. A recursive function is one that calls itself. To eliminate implicit arguments in function names and derive a recursive updateX function that accepts an array of keys representing a path (the sequence of keys for locating a value in nested objects), we must also establish a base case -- a condition that stops the recursion. The final result looks like this:

```javascript

function nestedUpdate(object, keys, modify) {
    // Base case: 0-depth
    if (key.length === 0) {
        return modify(object);
    }
    const key1 = keys[0];
    const restOfKeys = dropFirst(keys); // Make progress toward base case by dropping one path element
    return update(object, key1, function(object2) {
        return nestedUpdate(object2, restOfKeys, modify);
    });
}

```

And here is a fully working example:

```javascript

const foo = {
  names: {
    peopleNames: {
      a: "hans",
      b: "michael",
      c: "casimiro"
    }
  }
}

function dropFirst(keys) {
  const keysCopy = [...keys];
  keysCopy.shift();
  return keysCopy;
}

function update(object, key, modify) {
  const value = object[key];
  const newValue = modify(value);
  const newObject = {...object, [key]: newValue};
  return newObject;
}

function nestedUpdate(object, keys, modify) {
    // Base case: 0-depth
    if (keys.length === 0) {
        return modify(object);
    }
    const key1 = keys[0];
    const restOfKeys = dropFirst(keys); // Make progress toward base case by dropping one path element
    return update(object, key1, function(object2) {
        return nestedUpdate(object2, restOfKeys, modify);
    });
}

console.log(nestedUpdate(foo, ['names', 'peopleNames', 'b'], function(name) {
  return "Hannah";
}));

```

## The Anatomy of Safe Recursion

To ensure recursion does not lead to infinite loops or errors:

1. Base Case: This condition stops recursion because it does not include any recursive call. Common base cases include empty arrays, empty objects, empty string, or 0.

1. Recursive Case: This condition triggers the recursive call.

1. Progress Toward Base Case: Each recursive call should move closer to the base case; at least one argument must decrease with each call.

## Design Considerations with Deep Nesting

When dealing with deeply nested data structures, remembering long path lists can be challenging. One solution is to use stratified design and abstraction barriers to limit the complexity of data structures we need to understand. We can delegate the task of identifying a given path to the function itself instead of tracking it manually. For example:

```javascript

function updatePostById(category, id, modifyPost) {
   return nestedUpdate(category, ['posts', id], modifyPost);
}

```

Taking from the example above, the client code doesn't need to know beforehand how posts are stored in a 'category' object. All it needs to know is that there is a post object and there is an id field in it. 

## Isolating Timelines

Drawing timeline diagrams is a way of representing sequences of actions over time. It helps us understand how our software runs, and can be used to find bugs, especially when there are multiple timelines running at the same time in the system.

However, to really understand how to put a timeline diagram together, it's really important to recap what was already discussed at the beginning of the book: the distinction between actions, calculations, and data, because only actions are described in the diagrams. And as previously mentioned, actions can come in many forms. This has an implication when it comes to building a timeline diagram, because we have to keep track of the specifics of a given language, to avoid skipping more subtle forms of actions.

Example:

```javascript 

let total = 30;
total++;

```

Although hidden by built-in features of the javascript language, this code contains not only two, but **three actions**: the first action comes in the form of a variable assignment; the other two are, respectively, a read and a write to the total variable.

We have different timelines when actions run in different threads, processes, machines, or asynchronous callbacks, depending on which threading model the language supports:

- Single-threaded, synchronous: everything happens in order when it comes to the flow of execution of the program, meaning each operation must complete before the next one begins, leading to I/O blocking.

- Single-threaded, asynchronous: the flow of execution happens out of order, because mechanisms such as callbacks and promises are employed to handle I/O operations, returning them to the event loop so that they get called at some unknown time in the future (typically when the I/O operation finishes and no other task is running).

- Multi-threaded: the program can have different parts of it executed in parallell across multiple threads, meaning the program can have multiple timelines.

The fundamentals of the timeline diagram are:

1. If two actions occur in order, put them in the same timeline. Watch out for more subtle forms of actions, as previously discussed.

1. If two actions can happen at the same time or out of order, they belong in separate timelines, placed side-by-side.

1. There are two kinds of sequential code: one in which there is an unknown amount of time that may pass between two actions, and one in which nothing can be run in between two actions. In the first case, actions on different timelines may interleave between any two other actions in another timeline.

1. There are three kinds of ordering when we deal with multiple timelines: simultaneous, left first, and right first. Although we may draw diagrams differently to highlight one ordering, when we read a timeline diagram, we have to see these three orders, regardless of how long the lines are and how the actions line up.

Additionally, there are also 5 principles that guide us to improve our code so that it's easier to understand and work with:

1. Fewer timelines are easier.

1. Shorter timelines are easier (reduce the number of actions in each timeline).

1. Sharing fewer resources is easier (when looking at two timelines, you really only have to consider the actions that share resources across timelines).

1. Coordinate when resources are shared (ensure that each timeline take turns in the right order).

1. Manipulate time as a first-class concept.


