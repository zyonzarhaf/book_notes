# Notes on Code: the Hidden Language of Computer Hardware and Software

## Chapter 1

A code can be thought of as an implementation of different systems of symbols, letters, and words, to convey some kind of information. We use different types of it for communicating among ourselves because some codes are more convenient than others. The code of the spoken word can't be stored on a piece of paper, so the code of written word is used instead. Silently exchanging information across a distance in the dark isn't possible with speech or paper. Hence, Morse code is a convenient alternative.

A code is useful if it serves a purpose that no other code can. Bottom line is The systems used for transmitting messages are heavily determined by the context in which they are applied. Morse code is an example of a code system that is suitable for communication between people over a distance, composed by just two types of code components: dots and dashes.

## Chapter 2

The number of letters that can be represented in Morse code depends on the amount of code components used in a sequence. This idea repeats in several sections of the book because it follows a formula that can be used for all types of code systems: number of possible codes = number of code components^length of the sequence.

Sticking with Morse code, this means that a code sequence consisting of a single dot or dash can represent only two letters: E and T, but two dots or dashes provides four additional letters: I, A, N and M. Therefore, by using the same types of components (dots and dashes) in different amounts, Morse code can represent an exponentially larger set of code combinations, resulting in a larger amount of letters from the alphabet.

In other words, each time a component (dot or dash) is added to the code, the number of possible combinations is double the amount from before. Since the combinations will increase by 2 every time, this can be represented as powers of 2 (e.g. 2 x 2 x 2 x 2 = 2^4).

## Chapter 3
Braille follows a similar pattern because it consists of either flat or raised dots. This means that the number of codes is also determined by powers of 2. Since Braille code lives in a 3x2 cell, the number of codes equals to 2 x 2 x 2 x 2 x 2 x 2 = 2^6 = 64.

## Chapter 4
[TODO]
## Chapter 5
[TODO]

## Chapter 6
To convey information through electricty, a combination of Boolean algebra and switches can be used. Boolean algebra is like algebra, but instead of using variables with numbers, it uses variables with truth values (true or false, 1 or 0) and instead of using multiple operators it uses just three: the conjunction operator, the disjunction operator and the negation unary operator. The conjunction operation is takes two or more truth variables and produce the value of true only if they are all equal to true (otherwise it produces the value of false). The disjunction operation takes two or more truth variables and produce the value of true if either one is true or if all of them are true (otherwise it produces the value of false). Another way to look at it is: the disjunction operation produces. Finally, the unary negation operation takes a variable and produce it's opposite value (if x = 1 or true, then the negation of x is 0 or false).

In an electrical circuit, switches can be wired in series or in parallel to physically represent the Boolean conjunction AND and the Boolean disjunction OR, respectively. Example: a circuit with two switches in sequence will only let an electrical current flow if they are both (logical AND) on. Another circuit with two switches in parallel will let an electrical current flow if at least one switch is on. By messing with the number of switches and wires, it is possible to physically implement an entire Boolean expression.

## Chapter 7
Telegraphs and relays are another example of information transmission through Boolean logic and electricity. And telegraphs also use a binary code system inspired in Morse code. By using batteries, wires, electromagnets, switches and pivotable bars, a telegraph can use a special type of lever to make an electrical current either flow or not and over the otherside an electromagnet would pull a metal bar against another piece of metal to produce a "click clack" sound or even punch holes in a paper, or, in the case of a relay device, simply pull the switch of another electrical circuit to forward the current to another one, boosting the signal.

## Chapter 8
The most basic component in a computer that allows the transmission of information in a similar fashion is the logic gate. **A logic gate is a physical implementation of the Boolean algebra**, a device that takes two or more inputs and returns a single output. Combine millions of these things, and you have a microprocessor.

Although this can be achieved by electromagnetic relay devices (this certainly helps in visualizing logic gates), relays and logic gates are not the same thing. These types of relays are just one possible implementation. There are other types of implementations as well:

- Diodes and transistors

- MOSFETs (metal-oxide-semiconductor field-effect transistors)

- Vacuum tubes

- Fluidic logic

- Pneumatic logic

- Optics

- Molecules etc.

There are 7 types of logic gates and some of them are based on De Morgan's laws:

- AND gate: performs the Boolean conjunction operation.

- OR gate: performs the Boolean disjunction operation.

- NOT gate: performs the Boolean negation operation.

- NAND gate: performs the boolean conjunction operation, but inverts the result.

- NOR gate: performs the boolean disjunction operation, but inverts the result.

- XOR gate: 

- XNOR gate: 

It is possible to create any kind of logic gate by simply using a NAND gate or a NOR gate, which are both universal gates, based on the De Morgan's laws. These are a pair of transformation rules that allow the expression of conjunctions and disjunctions in terms of each other via negation. [TODO]

## Chapter 9
Chapter 9 is all about the Hindu-Arabic numeric system and the positional notation. In the positional notation, the same digit can represent different numerical values depending on where it is found in the number. To determine the value of a digit, one must multiply it by the number of available digits raised to the power of the corresponding place value. The Hindu-Arabic numeric system is a base-10 positional system. This means that it has up to 10 symbols for representing numerical values, so the value of a digit is identified by multiplying it by 10 and then raising it to the power of it's place value (starts at 0 index from the right to the left). Example: given the number 530, the value of the digit 5 is 5x10^2 = 5 x (10 x 10) = 5 x 100 = 500.

## Chapter 10
What's best about the positional system is how it can easily be used for translating counting systems **not**based on ten into a base-10 number. Example: given the binary number 1010, the value of the leftmost 1 is 1x2^3 = 2x2x2 = 8. From decimal to other base systems isn't as straightforward though.

## Chapter 11
As mentioned before, to get the possible combinations of codes in a code system, one must raise the number of available code components to the number of codes actually being used in a sequence. But how do you go backwards? By using the base-two logarithm, which is the opposite of the power. Example: 2^7 = 128; log_2_128 = 7. So 7 is the number of codes in a sequence one would have to use in order to represent 128 possible combinations.

## Chapter 12
As stated before, to actually get a microprocessor out of logic gates, one would have to combine millions of them to perform larger and more complex Boolean operations, allowing the representation of other kinds of data like text, sound, music, pictures and movies. For convenience, computer systems often group a certain number of bits into a quantity called a *word*. The number of bits that compose this word depends on the architecture of the computer. The computer industry decided to use words composed by 8 bits called a byte because each byte would be a power of 2, which is more in alignment with the binary system.

## Chapter 13
Character encoding is the most vital computer standard because it allows for the overcoming of differences between computer systems and applications, between hardware and software manufacturers and even between national boundaries. The most important text encoding standard stil recognized by the computer industry is the ASCII (American Standard Code for Information Exchange), formalized in 1967.

It is composed by 7 bits, ranging from 0000000 to 1111111, therefore 128 possible codes. This is enough to represent all latin characters it has some limitations (it fails to represent characters other sets of characters, like the cyrillic, the arabic, the chinese, etc). Besides representing normal characters, the ASCII standard also supports the so called control characters. These characters are responsible for performing various functions, such as moving the cursor to the next line, moving the cursor to the beginning of the current line, moving the cursor one position back, allowing for the deletion of a character, etc.

The problem with the ASCII standard is that it is "too darn American", as Petzold (2022, p.160) states. Therefore, it lacks the possibility to represent other symbols found outside of the USA. Because computers nowadays store characters as 8 bit values, it's possible to devise what is called the extended ASCII character set, which gives 256 possible codes. This means 128 codes to represent the same characters represented in normal ASCII and an additional 128 to be extended at will.

The problem with this approach is that numerous extensions started to pop and the character encoding system that was supposed to be a standard became a mess. This lead to the creation of the Unicode encoding standard, a 16-bit code that gives 65,536 possible codes, allowing for the representation of all the world's languages that are likely to be used in computer communication. Unicode has been expanded since then and currently is at 21-bit code, potentially suportting over 1 million different characters (including the so called emojis).

Unicode also has a few extensions on it's own, being the most important of them all the UTF-8, which is used extensively throughout the internet. It's backwards compatible with ASCII because the characters are stored as different sizes of bytes and prefaced with 1s and 0s so that each byte can be precisely identified:

1. If the byte begins with a zero, that’s simply a 7-bit ASCII charac-
ter code.

1. If the byte begins with 10, it’s part of a sequence of bytes repre-
senting a multibyte character code, but it’s not the first byte in 
that sequence.

1. Otherwise, the byte begins with at least two 1 bits, and it’s the 
first byte of a multibyte character code. The total number of bytes 
for this character code is indicated by the number of 1 bits that 
this first byte begins with before the first 0 bit. This can be two, 
three, or four.

# Chapter 14, adding with logic gates
Binary addition operates on the same principles as decimal addition, but it is simpler because it only involves two digits: 0 and 1.

Steps for Binary Addition:

1. Align the Operands: Just like with decimal numbers, the binary numbers must be aligned vertically by their least significant digit (the rightmost digit).

1. Add Column by Column: Starting from the rightmost column and moving to the left, each pair of binary digits is added together.

1. Carry Over: If the sum exceeds the binary limit (1), the excess is carried to the next column. This process is repeated until all digits have been added together.

Example:

 101001
 +11100
------
 110101

Adding column by column from right to left:

- Rightmost Column: 1 + 0 = 1 (write down 1)

- Next Column: 0 + 0 = 0 (write down 0)

- Next Column: 0 + 1 = 1 (write down 1)

- Next Column: 1 + 1 = 10 (write down 0, carry 1)

- Next Column: 0 + 1 + 1 (carry) = 10 (write down 0, carry 1)

- Leftmost Column: 1 + 0 + 1 (carry) = 10 (write down 0, carry 1)

Now, in order to reproduce these steps physically through electrical relays and logic gates, the system would have to do sums and carries separately, using two 2-input logic gates. The sum would be handled by an XOR gate, so that it is possible to represent the first part of an operation like "1 + 1 = 0, carry the one". The carry part would be handled by an AND gate to get the carry out of the operation, which in this case (since both inputs are 1) is 1. These 2-input gates together form a half-adder.

But this half-adder deals only with the first part of the sum operation: 1 + 1 = 0, carry the 1. What about the rest? We are still not getting the 10 (one zero). This other step would involve a sum of three digits: the carry from the first sum operation (at the rightmost part of the number) and the two digits at the next column. Of course, since it's a sum of only 2 bits total, it would seem as if there were no next column, but in reality the column is filled with 0s, plus the carry.

To add these three digits two additional half-adders are required. The first half-adder handles the sum of the current column and returns 0 (0 + 0 = 0). The second half-adder handles the carry plus the sum and finally returns 1 (technically, it also returns 0 as the carry).

Both half-adders return a sum and a carry. But the last binary digit is 1, so we only have to carry a single 1. This can be achieved by using a 2-input OR gate to return a single 1 whenever the sum results in a carry, or 0. This is known as a full-adder.

To sum larger numbers, each full-adder would feed it's carry output into the next full-adder until the final sum is computed.

# Chapter 15, is this for real

Computers today are no longer made from relays. Todays computers are made from transistors, which made it's first appearance in 1947, through the works of the physicists at Bell Labs, John Bardeen and Walter Brattain. Transistors can be used to control the flow of electricity and retransmit signals just like relays. But they work in a completely new fashion. Unlike relays, transistors only require a small voltage to close the circuit to let the electricity flow -- at least 0.6v or 0.7v. So they are very efficient. Additionally, they innaugurate what's known as **solid-state electronics**, which means they are built from solids and have no moving parts (as opposed to the electromechanical relay). This makes them very small.

While, transistors allows for the placing of more logic gates in smaller spaces, they don't necessarily make computers any simpler to construct because all transistors still have to be interconnected. On top of the revolution brought by the transistors, another technological advancement allowed for a more seamlessly way of constructing computers: the emergence of the IC (integrated circuit).

ICs are manufactered through a complex process that involves layering thin wafers of silicon that are precisely doped and etched in different areas to form microscopic components. In the 60s Gordon E. Moore noticed that technology was improving in such a way that the number of transistors that could fit on a single chip had doubled every year since 1959, and later his observation was adapted to embody the prediction that a doubling of transistors on a chip would occur every 18 months. This became known as the Moore's law. Moore's law seems to have broken down in the second decade of the 21st century, but reality is still coming close to the prediction.

The integrated circuits consist of logic gates that are prewired in a particular configuration, providing different capabilities to use in digital computer engineering. One important fact to know about a particular chip is the **propagation time**, which is the time it takes for a change in the inputs of a chip to be reflected in the output.

Propagation times for chips are genereally measured in **nanoseconds**, which is a bilionth of a second. **This is very important** because each step a computer takes to perform some larger and more complex operation is a very simple basic operation, and the only reason anything substantial gets done is that these smaller and simpler operations get done **very quickly**.

# Chapter 16, but what about subtraction?

To use logic gates to perform subraction, the operation needs to be done by using **nine's complement**. First rewrite the operation as a positive number added to a negative number. Then, from left to right subtract the number from a string of 9s that has the same amount of digits in the number. The result is called the **nine's complement of the number**. Add this number with the next, plus 1, minus a string of 10s (this number also must match the same amount of digits of the others). This will work for positive subtractions.

For negative subtractions, first switch the two numbers. Then, subtract the first number from the string of 9s and add the result to the second number. Lastly, switch the numbers again and get the 9's complement of the first number. That would be the result of the operation.

In binary 1 is the last digit, like the 9 in the base-10 system. This means that there is no 9's complement. Instead, there is the 1's complement. In other words, instead of adding 999, for example, you would add 111. Instead of adding 1, you would add 001. And instead of adding 1000 (thousand), you would add 100000000.

As expected, in binary this whole thing is simpler because the 1's complement of a given number ends up being simply it's inverse (in binary, the inverse of a number is a number that replaces it's 0's and 1's with 1's and 0's). Example: the inverse of 1011000 is 0100111.

But we are not quite there yet, as this back-and-forth switching numbers is only in our head and we didn't actually came up with a way to reproduce this with logic gates. We simply avoided the borrowing technique.

# Chapter 17, feedback and flip-flops
An oscilator is a circuit that quickly alternates between providing a voltage and not providing a voltage (in other words, it alternates between 0 and 1). A simple example would be an electric buzzers and bells. This type of device usually takes a human being to close a switch, which will then allow the flow of electricity. By using an electromagnet, another switch is then closed. But once the device is wired in such a way that when the second switch is closed, the voltage stops. When the voltage stops, the second switch opens again and as long as the first switch remains closed, the circuit (with the help of a hammer and a metal gong) will produce a repetitive sound.

The circuit goes continuously if it loses the first switch. This can be represented as an inverter that takes it's own output as it's input, thus making an oscilator. The interval during which the output of an oscilator changes and then comes back again to where it started is called a **cycle**. The time a cycle takes is called a **period** and the frequency of an oscilator is **1 divided by the period**, which gives the **cycles per second** of the oscilator. But cycles per second is not used anymore. Instead, this property is described in **hertz**.

Another type of circuit that feeds on it's own output is a **flip-flop**. A flip-flop is a type of circuit that is capable of preserve the state of a previous input. This can be illustrated by a circuit composed of two 2-input NOR gates wired in a say such as that the output of the first gate is an input to the second gate and the output of the second gate is an input to the first gate. This leaves one input for each gate to be supplied by an external source.

In such a circuit, if an external source provides a voltage for both gates, nothing happens. But the circuit remains closed if a voltage is provided for either one of the gates. And when the same gate loses the voltage coming from the source, it still remains closed because it's feeding itself from the outputs 1 - 0 and 0 - 0 everytime, which results in 1 and this goes on and on. And it would still remain closed even if the voltage were on again, because then the circuit would be 1 - 1 and 0 - 0, which results in 1 again.

Only when the source goes into the second gate input the circuit stops. But then, the same logic applies: even though the input changes, the circuit's sate remains the same as before. Then, when both gates get 0 from the source, the circuit will either close or open depending on whether it was closed or open.

This means that the circuit can **retain information** or **"remember"** the first input it was given to. There a couple of different types of flip-flops. The one previously mentioned is called a Reset-Set (R-S) flip-flop.

