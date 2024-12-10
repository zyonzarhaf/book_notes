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

The means to prevent this problem can be crafted within the function itself, by implementing something called a base case. In order to work properly, all functions must include at least one base case and one recursive case. The base case is a circumstance where the recursive calls stop and simply returns. Common base cases include: empty strings, empty objects, empty arrays, and 0.

By contrast, the recursive case is a condition that triggers a recursive call. The recursive case must be designed in a way that makes each recursive call move closer to the base case (typically, by decreasing the value of at least one of its arguments with each call).

Another important aspect of the recursive case is that the code can be split into two parts: the code before the recursive call and the code after it. If there are two recursive calls, there will be a section before, one between, and one after. This means that once the base case is successfully reached, the last function call will return a value, and then the code after the recursive call from the previous function will execute, returning some other value. This process continues until all frame objects are popped off the call stack, and this is what makes recursive functions a two-way trip.

## Recursion vs. Iteration

Recursive code can be written as iterative code with a loop and a stack, and iterative code can be written as recursive code. Each technique offer distinct advantages. Recursive algorithms often bring elegance to complex tasks, whereas iterative solutions tend to be more efficient in execution. The important thing is to identify when a solution is useful and when it is not. Below is a list of common problems along with their solutions, demonstrating both recursive and iterative techniques.

### Factorial Example

The following code illustrates the inefficiency of the recursive solution compared to an iterative approach. The iterative approach uses only primitive types for its operations, while the recursive solution relies on full frame objects. While this works fine for small numbers, larger inputs lead to excessive frame object creation and could eventually result in a stack overflow error.

```python

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

### Fibonacci Example

Next is an example demonstrating "code before the first recursive call, after the first recursive call, and after the second recursive call." However, the recursive approach to calculating Fibonacci numbers illustrates its limitations; multiple frame objects with identical values are created (e.g., fib(4) calls fib(3) and fib(2), while fib(3) also calls fib(2)).

```python

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
### Iterative Call Stack Example

The following code illustrates how it is possible to fully convert a recursive algorithm into an iterative algorithm using an iterative "call stack."

```python

callStack = []
callStack.append({ 'returnAddr': 'start', 'number': 5 })
returnValue = None

while len(callStack) > 0:
    number = callStack[-1]['number']
    returnAddr = callStack[-1]['returnAddr']

    if (returnAddr == 'start'):
        if (number == 1):
            returnValue = number
            callStack.pop()
            continue
        else: 
            callStack[-1]['returnAddr'] = 'after the recursive call'
            callStack.append({ 'returnAddr': 'start', 'number': number - 1})
            continue
    else:
        returnValue *= number
        callStack.pop()
        continue


```

### Substring Search Example

Here’s an example where an iterative algorithm has been converted into a recursive algorithm with two base cases:

```python

def iterativeFindSubstring(needle, haystack):
    i = 0

    while i < len(haystack):
        if haystack[i:i + len(needle)] == needle:
            return i

        i = i + 1

    return - 1


def recursiveFindSubstring(needle, haystack, i=0):
    if i >= len(haystack):
        return -1

    if haystack[i:i + len(needle)] == needle:
        return i

    return recursiveFindSubstring(needle, haystack, i + 1)


```

### Exponential Calculation Example

Finally, here’s an example where recursion proves far more efficient by cutting down the problem size in half with each recursive call:

```python

def iterativeExp(a, n):
    result = a
   
    for i in range(n - 1):
        result = result * a

    return result
    

def recursiveExp(a, n):
    if n == 1:
        return a

    if n % 2 == 0:  
        result = recursiveExp(a, n // 2)
        return result * result
    
    if n % 2 == 1:
        result = recursiveExp(a, n // 2)
        return result * result * a


```

### Improved Iterative Exp Function

The previous example also shows how recursive approaches, even if they end up not being the most efficient solution, can sometimes provide a helpful insight on how to improve iterative code. Now we can design an iterative approach that cuts the problem size in half, just like the recursive function (and similar to the iterative call stack implemention from earlier):

```python

def betterIterativeExp(a, n):
    if n == 0:
        return 1

    opStack = []

    while n > 1:
        if n % 2 == 0:
            opStack.append('square')
            n = n // 2
        if n % 2 == 1:
            opStack.append('multiply')
            n = n - 1

    result = a

    while opStack:
        op = opStack.pop()

        if op == 'multiply'
            result = result * a
        if op == 'square'
            result = result * result

    return result


```

### Recursion vs. Iteration: Summary

There isn't a problem that cannot be solved using an iterative approach, and recursion is not strictly necessary for problem-solving. However, recursion can play a valuable role in programming by:

- Providing Key Insights: Recursion helps break down complex problems into manageable subproblems, making it easier to understand the overall structure of the solution.

- Offering Elegance: In cases involving tree-like structures or backtracking, a recursive approach can be more elegant and intuitive.

### Coming Up with Recursive Algorithms

The first step to design a recursive algorithm is to identify the recursive case and the base case. If the problem can be broken down into smaller subproblems that are similar to the original problem, then the recursive case can be built to progressively work on each instance of the problem. As each instance shrinks more and more, eventually there will be one that is small enough to have a trivial answer, which would be the base case. All recursive functions have at least one recursive case and one base cse.

Sometimes it is better to identify the base case first, and then see how larger and larger problems are constructed and solved from there.

## Classic Recursion Algorithms

Classic recursion algorithms include summing the numbers in an array, reversing a text string, detecting whether a string is a palindrome, solving the tower of Hanois, and coming up with a form of implementing the Ackermann function.

### Summing Numbers in an Array

This problem can be solved by using the head-tail technique, which consists of splitting the recursive function's array argument into two parts: head and tail. By doing this we are able to pass a smaller array with each recursive call, until we end up passing an empty array (the base case, which has the sum of 0).

```python 

def arraySum(arr):
    if len(arr) == 0:
        return 0

    head = arr[0]
    tail = arr[1:]

    return head + arraySum(tail)


def arrConcat(arr):
    if len(arr) == 0:
        return ''

    head = arr[0]
    tail = arr[1:]

    return head + arrConcat(tail)


```

### Reverse a String

To reverse a string using the recursive approach we can also employ the head-tail technique. The main idea is to keep passing smaller subsections of the original string to the recursive calls until we hit the base case, which means returning an empty or a single-character string because they are already the reverse of themselves. However, we have to keep in mind that placing the head after the tail is not enough. We have to place the head after the reverse of the tail.

```python

def recursiveReverseString(string):
    if len(string) == 0 or len(string) == 1:
        return string
    
    head = string[0]
    tail = string[1:]

    return recursiveReverseString(tail) + head


```

### Detecting Palindromes

A palindrome is a word or phrase that is spelled the same when written forward and backward. Just like the previous implementation, we'll pass in smaller and smaller subsections of the original string with each recursive call. However, this time we will split the string into three parts: head, middle, and tail. By doing this we can successfully move the head and tail pointers to the right and to the left, respectively, thus comparing different parts of the string each time the recursive case is triggered.

```python

def recursiveIsPalindrome(string):
    if len(string) == 0 or len(string) == 1:
        return True

    head = string[0]
    middle = string[1:-1]
    tail = string[-1]

    return head == tail and recursiveIsPalindrome(middle)


```

### Solving the Tower of Hanoi

The Tower of Hanoi is a puzzle consisting of three columns, in which you have to movea certain amount of disks from one column to another following these three rules:

1. You can only move one disk at a time.

1. You can only move disks to and from the top of a tower.

1. Disks are of different widths, and you can never place a larger disk on top of a smaller disk.

Taking a bottom-up approach, we start with the simplest case of one disk. The solution is straightforward: move disk 1 from tower A to tower C. As we progress to two disks, we find that the most efficient solution is to move disk 1 to tower B, then disk 2 to tower C, and finally move disk 1 to tower C. Continuing to increase the amount of disks involved soon reveals a pattern: the steps required to solve a tower of n disks mirror those required for a tower of n - 1 disks:

1. Move the n - 1 disks from the start pole to the temporary pole.

1. Move the nth disk from the start pole to the end pole.

1. Move the n - 1 disks from the temporary pole to the end pole.
