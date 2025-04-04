# Pillars of Object Oriented Programming

## Interface

An interface represents a form of contract for interaction between objects by specifying a set of method signatures. The concrete implementation of these methods is left to the objects that implement the interface. The primary benefit of using interfaces is that objects implementing the same interface can be treated uniformly. This capability, known as subtyping polymorphism (or inclusion polymorphism) is pivotal to object oriented design.

```java 

public interface Validator {
    boolean validate(String input);
}

public class EmailValidator implements Validator {
    @Override
    public boolean validate(String input) {
        return Pattern.compile(
            "^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$"
        )
        .matcher(input)
        .matches();
    }
}

public class PasswordValidator implements Validator {
    @Override
    public boolean validate(String input) {
        return Pattern.compile(
            "^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+|~=`{}\[\]:";'<>?,./\\]).{8,}$"
        )
        .matcher(input)
        .matches();
    }
}

```

The above example demonstrates an interface that defines an abstract, public method called validate. The EmailValidator and PasswordValidator classes demonstrate different types of validation. They conform to the interface's contract because they use the same method signature to provide concrete implementations of the validate method. This allows both classes to be referenced using the Validator type, enabling uniform handling despite their distinct validation logic.

## Inheritance

Inheritance is a mechanism adopted by object oriented programming languages where a class can inherit all attributes and methods from another class, known as the superclass or base class.

```java

public class UsersController extends Controller {
    public void index(HttpRequest request) {
        if (request.type.equals('GET')) {
            Query users = this.findAll();
            this.setViewVariables(users);
        }
    }
}

```

In this example, the UsersController class inherits from a Controller class and defines an index method for handling HTTP requests to the index page. This index method uses inherited methods (findAll() and setViewVariables()) to query the database and make the resulting data available to the view layer. As both methods are inherited from the Controller superclass, they don't need to be explicitly defined in the UsersController subclass. They are directly accessible through inheritance and can be called directly using the "this" keyword.

## Encapsulation

In object oriented programming, encapsulation is the ability of an object to hide parts of its state and behavior from other objects, exposing only a limited interface to the outside world. This involves the usage of language features, such as access modifiers, to make certain parts of an object either private (accessible only within the class itself) or protected (accessible from subclasses as well). However, encapsulation is not unique to object oriented programming. Abstract data types, modules, librarires, and even some design patterns also offer encapsulation.

## Polymorphism

Polymorphism is the programming language's ability to reference different types using the same symbol. This ability stems from the language's type system and is not exclusive to object oriented programming as well. The most common forms of polymorphism include:

1. **Ad Hoc Polymorphism (also known as Overloading)**: Functions can share the same name as long as they operate on arguments of different types (they have different method signatures). The Ad Hoc Polymorphism is resolved at compile time.

2. **Parametric Polymorphism**: Data types can be written generically to work with values without depending on their specific types, often by using type parameters or generics. This type of polymoprhism is resolved at runtime.

3. **Subtyping Polymorphism (or Inclusion Polymorphism)**: A set of types can be treated uniformly based on the Liskov Substitution Principle, which states that a certain type T can be replaced by a type S without breaking the program, as long as S remains a subtype of T. In object oriented programming, this is achieved through inheritance, interfaces, and virtual methods. The subtype polymorphism is resolved at runtime using mechanisms like virtual tables (or vtables).

4. **Coercion Polymorphism**: One type is automatically (and implicitly) converted into another under certain operations.

# Relations Between Objects

## Association

Association is a relationship where one object uses or interacts with another through a permanent link, often a class attribute. This is commonly referred to as a "has-a" relationship.

## Dependency

Dependency is a weaker form of association. In this type of relationship, one object temporarily depends on another during the execution of a specific operation. This is typically achieved by passing an object as a parameter to a method of another object or by instanciating an object within the method of another object. Either way, the link between the two objects is temporary.

## Aggregation

Aggregation is a specialized form of association where an object holds a reference to a set or collection of other objects, and the component objects can exist independently from the container object.

## Composition

Composition is another specialized form of association, closely resembling aggregation. The difference lies in the fact that the component object can only exist as part of the container object. As an example, we could think of a composite object initializing one of its fields with a instance of another object. The main idea is that one object manages the lifecycle of another.

# Object Oriented Design Principles

These are principles that help defining good software design, enforcing maintainability, scalability, and flexibility.

## Encapsulate What Varies

This principle revolves around the idea of identifying the aspects of the application that vary and separating them from what stays the same. The main intent is to minimize the negative impacts caused by changes in the application.

```python

def get_order_total(order):
    total = 0
    for item in order.items:
        total += item.price * item.quantity

    if order.country == "US":
        total += total * 0.07
    elif order.country == "EU":
        total += total * 0.20

    return total

```

In the example above, the python function calculates the total price of an order by accessing the ordered items and then applying the tax price based on the country where the purchase is being made. According to this principle, the tax calculation varies and should be encapsulated. BY moving the tax logic to a separate function, we can decouple these operations:

```python

def get_tax_rate(country):
    if country == "US":
        return 0.07
    elif country == "EU":
        return 0.20

    return 0

```

This new function encapsulates the varying tax logic and can now be invoked from within the original function. And this is what the code would look like in an object oriented design:

```Java

import java.util.List;

class Order {
    private List<Item> items = new ArrayList<>();
    private String country;

    public Order(List<Item> items, String country) {
        this.items = items;
        this.country = country;
    }

    public double getOrderTotal() {
        double subtotal = 0;
        for (Item item : items) {
            subtotal += item.getPrice() * item.getQuantity();
        }
        return subtotal + (subtotal * this.getTaxRate(this.getCountry()));
    }

    public double getTaxRate(String country) {
        if (country.equals("US")) {
            return 0.07;
        } else if (country.equals("EU")) {
            return 0.20;
        } else {
            return 0;
        }
    }

    public String getCountry() {
        return this.country;
    }
}

```

Both the functional and object-oriented implementations achieve the same result. Another way of satisfying the goal would be to move the varying logic to a whole new class. Ideally this would happen if the tax calculation became too complex.

## Program to an Interface, not an Implementation

This principle emphasizes that relationships between classes should be defined by interfaces rather than concrete classes. Consider an association relationship. By making a concrete class depend on an interface, we allow its dependency to be supplied by any number of classes as long as they implement a common interface. The resulting relationship is much more flexible.

## Favor Composition Over Inheritance

Inheritance allows a class to inherit all attributes and methods from its superclass. However, inheritance has several drawbacks. Firstly, a subclass must implement all abstract methods and interfaces of the superclass, even if they are irrelevant to the subclass. Secondly, extensive use of inheritance often results in deeply nested inheritance hierarchies, complicating the code and making it harder to go through. Lastly, inheritance tightly couples subclasses to superclasses, meaning changes in the superclass can potentially disrupt the functionality of subclasses.

This principle suggests that instead of using inheritance as a mean to represent different aspects of an object, objects should have their aspects represented through composition.

# SOLID Principles

In addition to the afore mentioned principles, there are five more principles known as SOLID, introduced by Robert C. Martin with similar intents (maintainability, scalability, and flexibility).

## Single Responsibility Principle

This principle states that a program should consist of multiple classes, and each class should be responsible for a specific functionality. To adhere to this principle, things that change for the same reason should be grouped together, while those that change for different reasons should be separated.

## Open/Closed Principle

According to this principle, classes should be open for extension but closed for modification, ensuring that existing code does not break whenever new features are implemented. This principle is typically achieved by using techniques such as object composition, interfaces, and inheritance, which allow developers to add new functionality without altering the existing codebase. Since inheritance and interfaces are closely related to inclusion polymorphism, adherence to the Liskov substitution principle is essential.

## Liskov Substitution Principle

The Liskov substitution principle states that a certain type T can be replaced by a type S without breaking the program as long as S is a subtype of T. But there is more to it.

To fully satisfy the Liskov substitution principle, the following requirements must be met:

1. Parameter Types: In methods of a subclass, parameter types should match or be more abstract than those in the superclass.

1. Return Types: In methods of a subclass, return types should match or be more specific than those in the superclass -- a subtype of the return type of the method in the superclass.

1. Exceptions: A method in a subclass should not throw types of exceptions that the base method is not expected to throw.

1. Pre-conditions: A subclass should not add more pre-conditions. Pre-conditions are conditions that must be true before a method is called to ensure it is invoked in a valid state.

1. Post-conditions: A subclass should not remove post-conditions. Post-conditions are conditions that must be true after a method has completed its execution.

1. Invariants: Invariants (conditions that must be true for an object at all times) of the superclass must be preserved.

1. Private Fields: A subclass should not change the values of private fields of the superclass (some programming languages allow access to private members of a class via reflection mechanisms).

```Java

class Document {
    String data;
    String fileName;

    public Document(String data, String fileName) {
        this.data = data;
        this.fileName = fileName;
    }

    public void open() {
    }

    public void save() {
    }
}

class ReadonlyDocument extends Document {
    public ReadonlyDocument(String data, String fileName) {
        super(data, fileName);
    }

    @Override
    public void save() {
        throw new Exception("Unable to save readonly file.");
    }
}

class Project {
    Document[] documents;

    public Project(Document[] documents) {
        this.documents = documents;
    }

    public void openAll() {
        for (Document document : this.documents) {
            document.open();
        }
    }

    public void saveAll() {
        for (Document document : this.documents) {
            if (document instanceof ReadonlyDocument) {
                System.out.println("Cannot save readonly document.");
            } else {
                document.save();
            }
        }
    }
}

```

In this example, the subclass throws an exception that the baseclass is not expected to throw. This means that the client code must always check the specific type of the document before saving it to avoid breaking the program. The example illustrates a violation of the Liskov substitution principle, as well as a violation of the open/closed principle, since the current design requires existing code to be modified to support different kinds of documents.

## Interface Segregation Principle

This principle suggests that clients should not be forced to depend on methods they do not use. To avoid this situation, interfaces should be designed to be thin, granular, specific, allowing a class to implement only those interfaces containing methods that make sense for them.

## Dependency Inversion Principle

The Dependency Inversion Principle is commonly expressed by the maxim: "High-level classes should not depend on low-level classes. Both should depend on abstractions. Abstractions should not depend on details. Details should depend on abstractions."

To better understand this principle, let's break it down. High-level classes are typically designed to orchestrate multiple low-level classes and handle more complex business rules. Low-level classes, on the other hand, are designed to perform fundamental, basic operations. Although low-level classes can handle some of the business logic, their scope is generally more limited compared to high-level classes.

In a traditional dependency flow, high-level classes depend directly on low-level classes. However, the Dependency Inversion Principle suggests an alternative approach. Both high-level and low-level classes should depend on abstractions, such as interfaces. For instance, a high-level class might associate itself with an interface, while a low-level class implements this interface. This setup helps decouple the high-level logic from specific low-level implementations, making the system more modular and easier to maintain.

# Design Patterns

Design patterns are high-level, implementation-agnostic solutions to recurring problems in the realm of architecture and design. The concept was introduced by the architect Christopher Alexander, and was later adopted by programmers in the decades following the publication of his book A Pattern Language, in 1977.

In software engineering, design patterns are typically described in terms of their intent, motivation, structure, and code examples. Some pattern catalogs also include details about applicability, implementation steps, and correlation with other patterns.

Although not the first book on software design patterns, Design Patterns: Elements of Reusable Object-Oriented Software by Erich Gamma, Richard Helm, Ralph Johnson, and John Vlissides was pivotal in formalizing and cataloging software design patterns in the 1990s. Each pattern described in the book falls into one of three categories: creational patterns, structural patterns, and behavioral patterns.

## Creational Patterns

Creational patterns provide high-level solutions for recurring problems related to object creation.

### Factory Method

Defines a mechanism for creating different types of an object without specifying its concrete class. It achieves this by encapsulating the decision of which object to instantiate within a factory class, thereby eliminating the need to scatter conditional logic across the program. In order for this to work properly, objects must implement a common interface that the factory class can work with.

Since modifying an existing factory to support new specific types of objects can violate the open/closed principle, the factory is typically extended by specific factories, with each one responsible for creating a particular type of object. To keep avoiding excessive conditional logic in the program, the client code can then choose which specific factory to use based on its own requirements.

### Abstract Factory

Defines a mechanism for creating different families of related objects without specifying their concrete classes. This pattern builds upon the core concept of the Factory Method by having a factory class define not one, but a set of factory methods, with the goal of creating objects thatwork together cohesively within a specific context.

### Builder

Defines a mechanism for creating different representations of a complex object using the same construction code. It achieves this by moving the object construction code out of its own class to a standalone object called the builder. The builder organizes the construction process into a set of steps that can be selected and executed in any order to produce a particular object configuration. The finished product is typically returned by calling a specialized method to prevent other objects from accessing the product while it is being built.

Like the majority of design patterns, there are many ways to implement the builder. Some approaches merely use the builder to hide ugly, bloated constructor parameters, often neglecting the ability to construct objects using different combinations of optional parts. Other implementations overlook the immutability aspect and allow the final product to be altered after its creation. The following example illustrates a Java implementation that is able to support both immutatbility and flexible configuration. It leverages nested classes, access modifiers, and association relationships to achieve this goal.

```Java

public class Button {
    private String bgColor;
    private String textColor;
    private String text;

    private Button() {
    }

    public static class Builder {
        private Button button;

        public Builder() {
            button = new Button();
        }

        public Builder setBgColor(String color) {
            button.bgColor = color;
            return this;
        }

        public Builder setTextColor(String color) {
            button.textColor = color;
            return this;
        }

        public Builder setText(String text) {
            button.text = text;
            return this;
        }

        public void reset() {
            button = new Button();
        }

        public Button build() {
            Button result = button;
            reset();
            return result;
        }
    }
}

```

In the above example, the product class defines an enclosed builder that holds an internal reference to a product instance. The Builder exposes methods to configure this instance, directly modifying its private fields. To ensure immutability and prevent external access during construction, a specialized method (the build() method) returns the final Button instance by capturing it in a temporary variable. Immediately after, the builder's internal reference is reset, allowing the builder to be reused for other instances. This approach ensures that the returned Button instance is immutable, as it is no longer tied to the builder's mutable state.

### Prototype

Provides a mechanism for cloning objects without specifying their concrete class. In this pattern, objects implement a common interface or inherit from a superclass, referred to as the prototype, which defines an abstract clone method. Each concrete class provides its own implementation of the clone method, typically by invoking the class constructor and passing the existing object as a parameter. The constructor then copies all fields from the original object into the new instance, effectively creating a clone. For subclasses, the copy constructor must also call the superclass constructor to ensure that private fields from the superclass are properly cloned.

## Structural Patterns

Structural patterns provide high-level solutions for recurring problems related to object composition.

## Behavioral Patterns

Behavioral patterns provide high-level solutions for recurring problems related to how objects interact with each other.
