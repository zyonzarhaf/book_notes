# The Recursive Book of Recursion

## Introduction

The technique of recursion can produce elegant code solutions and it is found in many popular algorithms. However, it is oversuded in cases where a simpler solution exists, have worse performance in some cases and it can be hard to understand. The bottom line is, use recursion because it's the right technique for a given problem, not to feel smarter.

## Understanding Recursion

In a broader context, recursion is something whose definition includes itself. In a programming context, recursion is typically used in functions. A recursive function is a function that calls itself. A function is a reusable piece of code inside a program, and all programming languages implement at least these four features in their functions:

- Functions have code that is run when they are called.

- Functions take arguments for their inputs, and they can have zero or more arguments.

- Functions return a value as their output, although some programming languages allow functions not to return anything.

- The program remembers which line of code called the function and returns to it when the function finishes its execution.

The first three features can be easily seen in the source code, and although the fourth feature is an extremely important aspect of recursive functions, it can not be seen in the source code.

The fourth feature is associated with a special type of LIFO (last-in, first-out) data structure called the call stack, in which frame objects are kept. Frame objects are pushed to the stack when a function is called and popped out of it when the function returns.

Each frame contains information about a single function call, generally including the following information:

- The return address, or the line in which the function was called (to where control must return).

- The arguments passed to the function call.

- The function's local variables.

Since the call stack is a data structure that holds information about function calls, it must use the computer's finite memory. Therefore, unlike iterative structures, the program can not call a function recursively forever without hitting a stack overflow error, which is when the program execution consumes all the computer's memory allocated for the call stack.

The means to prevent this problem can be crafted within the function itself, by implementing something called a base case. In order to work properly, all functions must include at least one base case and one recursive case. The base case is a circumstance where the recursive calls stop and simply returns. Common base cases include: empty strings, empty objects, emtpy arrays, and 0.

By contrast, the recursive case is a condition that triggers a recursive call. The recursive case must be designed in a way that makes each recursive call move closer to the base case (typically, by decreasing the value of at least one of its arguments with each call).

Another important aspect of the recursive case is that the code can be split into two parts: the code before the recursive call and the code after it. If there are two recursive calls, there will be a section before, one between, and one after. This means that once the base case is successfully reached, the last function call will return a value, and then the code following the recursive call in the previous function will execute, returning some other value. This process continues until all frame objects are popped off the call stack, and this is what makes recursive functions a two-way trip.

## Recursion vs. Iteration

Recursive code can be written as iterative code with a loop and a stack, and iterative code can be written as recursive code. Each technique offer distinct advantages. Recursive algorithms often bring elegance to complex tasks, whereas iterative solutions tend to be more efficient in execution. The important thing is to identify when a solution is useful and when it is not. Below is a list of common problems along with their solutions, demonstrating both recursive and iterative techniques.

The following code illustrates the inefficiency of the recursive solution. The iterative approach uses only primitive types for its operations, while the recursive solution relies on full frame objects. While this works fine for small numbers, larger inputs lead to excessive frame object creation, and this could eventually lead to a stack overflow error.

```python

# Iteratively calculate the factorial of a number.

def iterativeFactorial(n):
    product = 1
    for i in range(1, n + 1):
        product *= i
    return product


def recursiveFactorial(n):
    if (n == 1):
        return 1

    return n * recursiveFactorial(n - 1)


```

The following code is a great example of the "code before the recursive call and the code after it" aspect of recursive code. In this case the recursive approach can be split into three sections: before the first recursive call (recursiveFibonacci(n - 1)), after the first recursive call (+), and after the second recursive call (recursiveFibonacci(n - 2)).

The recursive approach to the fibonacci sequence also illustrates very well another case of inefficiency, as the recursive calls end up creating multiple frame objects with identical values (e.g., fib(4) calls fib(3) and fib(2); and fib(3) calls fib(2) -- repeated -- and fib(1)).

```python

# Iteratively calculate the fibonacci sequence

def iterativeFibonacci(n):
    a = 1 
    b = 1

    for i in range(2, n):
        c = a + b
        a = b
        b = c

    return a


def recursiveFibonacci(n):
   if (n == 1 or n == 2):
        return 1

    return recursiveFibonacci(n - 1) + recursiveFibonacci(n - 2)


```

The following code illustrates that it is possible to fully convert a recursive algorithm into an iterative algorithm, including a form of implementing a "call stack".

```python

callStack = []
callStack.append({ 'returnAddr': 'start', 'number': 5 })
returnValue = None

while len(callStack) > 0:
    number = callStack[-1]['number']
    returnAddr = callStack[-1]['returnAddr']

    # Keep filling the stack
    if (returnAddr = 'start'): # Base case
        if (number == 1):
            returnValue = number
            callStack.pop()
            continue
        else: # Recursive case
            callStack[-1]['returnAddr'] = 'after the recursive call'
            callStack.append({ 'returnAddr': 'start', 'number': number - 1})
            continue
    # Keep emptying the stack
    else:
        returnValue = number * returnValue
        callStack.pop()
        continue


```

The following code is an example of an iterative algorithm converted into a recursive algorithm.

```python

def iterativeFindSubstring(needle, haystack):
    i = 0

    while i < len(needle):
        if (haystack[i:i + len(needle)]):
            return i
        i++

    return - 1


```
