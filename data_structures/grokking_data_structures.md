# Notes on Grokking Data Structures by Marcello La Rocca

## What are data structures?

Data structures are ways of organizing and storing data. They define the relationships between data elements, supported operations, and access constraints.

While data structures and algorithms are deeply intertwined, they serve different purposes. Data structures organize and present data, whereas algorithms provide instructions for processing that data. For instance, a queue organizes elements in a FIFO (first in, first out) manner, with clear rules governing relationships and constraints. Algorithms dictate the steps to process the data within that structure.

## Choosing the right data structure

The process of selecting the appropriate data structure can be generally described through the following steps:

1. Understand the problem
1. Identify a solution
1. Determine the necessary data structures
1. Implement the solution
1. Test the solution's efficiency and iterate if needed

## Common data structures

### Arrays

Arrays are ordered collections of elements (roughly of the same type) that are directly accessible via an index indicating their position. The elements inner structure and their correlations are abstracted away. In the computer memory, arrays are allocated as a single, contiguous block with consecutive addresses.

They can be:

- Static: their size is determined at the time of their creation and can not be changed

- Dynamic: their size can change to fit more elements as needed

- Sorted: the order of elements matters

- Unsorted the order of elements does not matter

Defining an array as static or dynamic, sorted or unsorted, is crucial for determining supported operations and their specific implementation details.

For example, a static, unsorted array allows 'insert' and 'delete' operations without giving much thought about element positioning, making it easier to implement them:

```python
from arrays.core import Array


class UnsortedArray:
    def __init__(self, max_size, typecode='1'):
        self._array = Array(max_size, typecode) # Initialize and fill the array with a specified placeholder (defaults to 1)
        self._max_size = max_size
        self._size = 0

    def insert(self, value):
        # Raise an error if the array is full already
        if self._size >= len(self._array):
            raise ValueError('Array already at full capacity.')
        else:
            self._array[self._size] = value # Add the value to the end of the array
            self._size += 1 # Increment the size

    def delete(self, index):
        # Raise an error if the array is empty or index is out of range
        if self._size == 0:
            raise ValueError('Delete from an empty array.')
        elif index < 0 or index >= self._size:
            raise ValueError(f'Index {index} out of range.')
        else:
            self._array[index] = self._array[self._size - 1] # Overwrite target with the last element
            self._size -= 1 # Decrement the size
 ```
As demonstrated above, after an insertion or deletion, the order of the elements may change, but this is not a problem. What matters is that a new element has been added to the array, or that an element has been deleted. However, the 'insert' and 'delete' operations follow different rules when it comes to sorted arrays:

```python
class SortedArray:
    def __init__(self, max_size, typecode='1'):
        self._array = Array(max_size, typecode)
        self._max_size = max_size
        self._size = 0

    def insert(self, value):
        if self._size >= self._max_size:
            raise ValueError('Array already at full capacity.')
        for i in range(self._size, 0, -1):  # Iterate backwards
            if self._array[i - 1] <= value: # Check if the current element is equal to or lesser than 'value'
                self._array[i] = value # If it is, place 'value' to its right side
                self._size += 1 # Increment the size
                return
            else:
                self._array[i] = self._array[i - 1] # If not, shift current element right to make space
        self._array[0] = value # If the 'value' is the smallest, place it at the beginning
        self._size += 1 # Increment the size

    def deleteAt(self, index):
        if self._size == 0:
            raiseValueError('Delete from an empty array.')
        elif index < 0 or index >= self._size:
            raise ValueError(f'Index {index} out of range.')
        for i in range(index, self._size - 1):
            self._array[i] = self._array[i + 1] # Shift elements left
        self._size -= 1 # Decrement the size
```

In this case, the 'insert' method ensures that the array remains sorted by iterating backwards and shifting elements to the right until the correct position for the new value is found. The 'delete' operation shifts an entire section of the array left to effectively remove the target.

Sorted arrays can also enhance search operations. For example, with linear search (checking each element to find a target), sorted elements allow earlier termination if an entry exceeds the target:

```python
def linear_search(self, target):
    for i in range(self._size):  # Loop through the array's size
        if self._array[i] == target:
            return i
        elif self._array[i] > target:
            return None  # Stop if the current element exceeds the target
    return None # No match found
```
A binary search algorithm can further optimize this process, iteratively splitting the array into left and right subsets and comparing the target to the middle element:

```python
def binary_search(self, target):
    left = 0  # Start at the leftmost element
    right = self._size - 1  # Start at the rightmost element
    while left <= right:
        mid_index = (left + right) // 2  # Calculate the middle index
        mid_value = self._array[mid_index]  # Retrieve the middle value
        if mid_value == target:
            return mid_index  # Target found at mid index
        elif mid_value > target:
            right = mid_index - 1  # Target is in the left section; adjust right boundary
        else:
            left = mid_index + 1  # Target is in the right section; adjust left boundary
    return None  # No matches found
```

Use unsorted arrays when the write-to-read ratio is high, and opt for sorted arrays when the read-to-write ratio is high instead.

## Asymptotic analysis

There are two main methods for measuring an algorithm's performance: profiling and asymptotic analysis. Profiling involves running the code with various inputs and measuring the time and memory consumption, while **asymptotic analysis uses mathematical formulas to describe runtime and space complexity in terms of input size**.

Profiling is best suited for evaluating performance after the implementation is complete, and it helps identify bottlenecks.

**Asymptotic analysis, on the other hand, is most useful during the design phase of the software development process** for two main reasons: first, **it does not depend on implementation details**; second, it **allows for easier generalization of results to any input size and facilitates comparisons of performance between two algorithms as the input size grows towards infinity**.

### Definition

It is a way of describing the runtime and space complexity of an algorithm (respectively, the time it takes to execute and the resources it consumes during its execution) in terms of the size of the input data. Its purpose is to provide a generalized understanding of how the algorithm's performance scales as the input size increases (growth rate), and to compare the efficiency of different algorithms regardless of implementation details or specific hardware.

The big-O notation is a type of asymptotic analysis that describes an algorithm under a worst-case scenario, meaning when the algorithm takes the longest time or uses the most memory to complete its task, given a specific input size. 

\[...continue]
