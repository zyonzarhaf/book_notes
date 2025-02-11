# The Runner Up Problem

In one out of two cases, the wrong contender is awarded first place. This issue was introduced by Lewis Carroll, the author of Alice in Wonderland. A true finalist can only reach the final if itstarts in the half staged opposed to the winner. This occurrence has a 50/50 probability, as the real finalist could begin in either half.

## Naive Solution

One straightforward solution is to conduct another tournament with n − 1 participants, excluding the first place winner, thus leading to n - 2 comparisons, and a total of 2n - 3 comparisons. This method is overly simplistic.

## Lewis Carroll's Solution

Carroll's solution involves identifying the maximum among all participants who lost directly to the champion. Since the champion plays exactly one match per level, the number of contenders who lost is equal to the number of levels, denoted as k for n = 2 ^ k. Isolating k, we find k = log2(n). To determine the real runner-up, we need to compare these contenders, resulting in log2(n) − 1 additional comparisons. Thus, the total number of comparisons is n − 1 + (log2(n) − 1) = n + log2(n) − 2.

# A Financial Problem

The problem revolves around the question of when to buy a number of shares of a stock, and when to sell them to maximize profit. In computer science, this is the equivalent of the Maximum Subarray Sum problem, in which, given a vector D, we determine a contiguous subvector that contains the maximum sum out of the other contiguous subvectors.

There are two cases in which the Maximum Subarray Sum problem becomes trivial, and this is expresssed through the financial problem proposed in the book: if the vector consists entirely of positive numbers, then the maximum subarray sum is the entire array. And if the vector consists of negative numbers only, the maximum subarray is a subvector containing the maximum number out of the entire vector.

The main problem takes place in a vector containing positive and negative numbers. The goal is to design an algorithm that computes the sum of the values in a specific slice of the vector where the total is maximized.

The first (naive) approach to this problem is a cubic algorithm that employs three nested for-loops. The first two loops examine all possible intervals within a vector D[1, n]. Each loop uses a control variable that acts as a pointer: the outer loop determines the starting point of an interval, while the inner loop identifies the ending point. The third loop computes the sum of the values in the specific slice D[i:j] using an auxiliary variable 'tmp'. If the total sum of D[i:j] exceeds the best result computed so far, stored in a variable 'max_sum', then 'tmp' is updated. Additionally, the starting and ending points of the interval that produced this sum are both saved in variables 'b' and 's', respectively. In the context of financial problems, these variables correspond to the buying and selling instants.

```python

def cubic(fluctuations):
    max_sum = float('-inf')
    buy = 0
    sell = 0

    for i in range(0, len(fluctuations)):
        for j in range(i, len(fluctuations)):
            tmp = 0
            for k in range(i, j + 1):
                tmp += fluctuations[k]
            if tmp > max_sum:
                max_sum = tmp
                buy = i
                sell = j

    print(f'Buy: {buy}. Sell: {sell}. Max Subarray Sum: {max_sum}')```


The second approach consists in a quadratic algorithm, motivated by a key inneficiency of the previous algorithm: if we consider two consecutive iterations of the middle for-loop, we notice that the sums computed by the first and the second iterations differ only by the value D[j + 1] -- the rightmost element in a subarray. 

This means the algorithm is wasting resources by computing the same values from scratch everytime the ending point moves one index forward. To solve this, we move our 'tmp' variable to the outer for-loop, making our algorithm reuse the value currently stored in 'tmp' instead of adding up one by one all over again:

```python

def quadratic(fluctuations):
    max_sum = float('-inf')
    buy = 0
    sell = 0

    for i in range(0, len(fluctuations)):
        tmp = 0
        for j in range(i, len(fluctuations)):
            tmp += fluctuations[j]
        if tmp > max_sum:
            max_sum = tmp
            buy = i
            sell = j

    print(f'Buy: {buy}. Sell: {sell}. Max Subarray Sum: {max_sum}')```


The last approach is a linear one. The idea is to discard portions of the vector that do not contain the maximum sum without examining them. The algorithm that achieves such a goal is based on two key properties found in the optimal slice:

1. Every portion that ends just before the optimal one has a negative sum of its elements. This can be proven by contradiction: if we assume that there is, in fact, a portion D[i: b - 1] of positive sum, we'd have to admit this slice as part of the maximum subarray, as this would yield a larger total.

1. Every portion that starts where the optimal one starts, and every portion that is included in it, has a positive sum of its elements. This also can be proven by contradiction: if we assume that there is, in fact, a portion D[b:j] where b <= j <= s with negative sum, then we'd have to rule it out from the maximum subarray, as doing so would increase its sum.

```python

def linear(fluctuations):
    max_sum = 0, tmp = 0
    b = 0, btmp = 0, s = 0

    for i in range(0, len(fluctuations)):
        tmp += fluctuations[i]
        
        if tmp > max_sum:
            max_sum = tmp, b = btmp, s = i

        if tmp < 0:
            tmp = 0, btmp = i + 1

```

In a nutshell, the algorithm examines each element in a vector, indiscriminately calculates the sum of all subvectors from D[i:j], and as long as this computation yields a value greater than the maximum sum so far, the starting point remains unchanged, and the ending point is set to the current position being examined. On the other hand, if the algorithm finds an index where the computation yields a negative sum, it sets the starting point to an index after and resets the accumulated value from the previous sums to 0. In other words, the algorithm then restarts from the "bad" slice forward. 

The final solution is capable of examining all positions without passing through them more than once, hence why it is a linear algorithm.

## Algorithm Efficiency Versus Hardware Efficiency

According to Moore's Law, the performance of computers doubles approximately every 18 months. When making a proportional comparison between the time taken by a slower computer and a faster computer to run the same algorithm, it becomes evident that the advantage gained from using the faster computer still depends on the time efficiency of the executed algorithm. This relationship can be demonstrated through asymptotic analysis in an abstract computer model.

To accurately represent the increase in computer capacity without misrepresenting the algorithm's complexity, we express the time complexity of an algorithm such as T(n) = n (slower computer) as T∗(n) = kT (faster computer), where r represents how many times faster the new computer is, allowing for an increase in its input size.

To determine how many elements can be processed by an algorithm within a bounded time window T, we set the function equal to T and solve for the variable n. For the slower computer, this results in the expression n = T, whereas for the faster computer this results in the expression n' = kT. By directly comparing both expressions -- n = T = n' = kT -- we get n' = kn.

This means that if the slower computer can process n elements in time T, then the faster computer process k times more elements in the same amount of time.

If we run an algorithm such as T(n) = n^3 on a faster computer, and an algorithm like T(n) = n^2 on a slower computer, applying the same principles from above and solving the equation for k would result in k = sqrt[2]{T}.

This means that if the slower computer can process n elements in time sqrt[2]{T}, then the faster computer needs another sqrt[2]{T} faster computer to process the same number of elements.

# Secret Message

Etymologically speaking, cryptography means "hidden writting". It is an ancient practice that dates from even before Julius Caesar, who is often cited as the father of encryption. Roughly speaking, cryptography consists of transforming a message (or information) using rules that are known only to the sender and the receiver. Therefore, the secrecy is the determinant aspect of cryptography. Following the Caesar's cypher, all cyphers required an additional piece of information, nowadays known as the secret key. The secret key is capable of changing the rules of transformation, enhancing the secrecy aspect of cryptography.

Encryption relies heavily on various mathematical concepts. One of them is the concept of modularity. Modularity is an arithmetic property that makes certain numbers "wrap around" when reaching a certain value, called the modulus. The clock is a popular example of this property, because passing 11:59 the clock counts back from 00:00, also known as counting the hours module 12. Similarly, if it is an analog clock, once you reach 12, you start over at 1.

This is relevant to the earlier definition of encryption because the module does something very similar: it transforms a piece of information into something else, based on some set of rules (the modulus), consistently.
