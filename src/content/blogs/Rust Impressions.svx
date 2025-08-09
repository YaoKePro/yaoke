---
title: "Rust: First Impressions"
description: Just completed 100 exercises to learn Rust, here are my initial impressions
date: 2025-08-05
edited: 2025-08-05
tags:
  - rust
  - programming
  - exercises
  - impression
category: coding
---
I recently completed [100 Exercises To Learn Rust](https://rust-exercises.com/100-exercises/01_intro/00_welcome.html), so here are my initial impressions of Rust as a language.

As a quick aside, I actually tried to learn Rust twice before this by reading the book. But alas, both attempts were rather short-lived as learning coding by reading is a bit like learning acrobatics as a circus audience; it just doesn't work unless you get your hands dirty.

### Basic arithmetics & Control flow

As a systems level language, Rust does a wonderful job of implementing convenient, exact types. The syntax for control flow is clean and allows users to easily write exact, performant code. 

One of the biggest positives of this language is immutable by default. No more unintended mutations or re-assignments.

Also explicitly giving users the choice to check for overflow and underflow before the compilation is a very interesting design choice and concept, offering maximum flexibility. 

Explicit casting in a strongly-typed language seems to be the way to go. 

### Traits

Traits are a great idea. It takes the best parts of OOP and distills it into a powerful, dynamic abstraction. Programmers can use traits to contrain types and ensure more precise generics than otherwise. 

### Memory

I have mixed feelings about the borrow-checker. Years ago when I was first introduced to Rust and its promise of compile time memory safety and C-level performance, I was immediately sold and considered it magical. Now, having spent more time in C, and gaining a deeper understanding of the complexities of runtime memory management, I'm starting to see the ugly side of the borrow checker.

I think for most use cases, it is a usable and even excellent mental model for managing memory. In a way it's a formalised system of how good C developers would manage memory, by always keeping something responsible for owning and later de-allocating the memory. Another way to think about it is an extension of the stack. Instead of always cleaning up at the end of the function, you can pass the data to a different function which is now responsible for cleaning it up.

But the bad side to this mental model is some times, it's easier to build your own abstraction and system with malloc and free. For instance in multi-threaded workloads, instead of fighting with lifetimes that you have to define in compile time, some times, it is just easier to do it manually.

### Async

Ok, this one really shocked me. Rust does not ship an async runtime?!?! So instead of a standard event loop or run time, it relies on 3rd party libraries to bundle their own runtimes. Currently, Tokio is the dominant async runtime, but it's not compatible with any other run times. This creates a fragmented ecosystem, especially in async heavy contexts like networking and servers, and there are about as many ideas of how to implement the event loop as there are Kardashians. I honestly don't know if this is good in the long-run...

### Pattern Matching

Ah, the joys of functional programming. Rust has strict types for null safety and errors. This is great in that we can use a power, exhaustive "match" statement to handle most business logic. But, a part of me still thinks, hey, this is very long and kind of ugly. 

### Macros

I'm not a big fan of macros in general. I think common macro patterns should be implemented at the language level and not exposed to the user. But I understand their appeal. Just personally not a big fan. They do work great as decorators though.

### Mutexes

This one is fun, Rust fixes the biggest problem with mutexes in C! In C, it is up to the function using an area of memory to respect any associated lock, but in Rust, the data itself is protected by a lock and associated type. This is pretty cool.

### Enums

Rust's first class support for enums allows users to practically create their own custom types and rules using Domain Driven Design. It pairs perfectly with functional pattern matching.

### Compilation Time

I'm not usually too fussed about things like this, but when you are sitting at a desk waiting for a large Rust graphics library to compile, you can't help but wonder how many more iterations of development you could have achieved in, say, Python.

## Conclusion

Rust seems to be a performant language which takes the best of OOP, powerful polymorphism using traits, and the best of functional programming, pattern matching and chaining into one unified language. 

The memory model promises truly useful invariants, at the cost of ergonomics in certain use cases. The syntax feels somewhat inconsistent and verbose, but is generally well thought out. The fractured async ecosystem will need some serious evolution over time. 

Overall, development speed is slow and methodical, and requires some wrestling with types, with the advantage of the fastest possible runtime performance.

Again theses are just my initial impressions, so it does seem like a cool language with lots of interesting ideas borrowed from other places. I think it's particularly useful in serious, business oriented applications where the type system and memory model can take on a lot of the burden of correctness at compile time, at the cost of rapid development speed.

If I ever get the chance to complete a serious project using Rust, I'll write more about it in a comprehensive review.


