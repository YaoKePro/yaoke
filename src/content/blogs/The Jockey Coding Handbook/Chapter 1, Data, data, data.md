Most apps are CRUD apps. This is a fancy way of saying, most apps just create instances of something, read it, update it and then delete it. For instance you might create users, read users, update users and delete users.

Hence, the core to every app, rather unsurprisingly, is data. We want to store how many shoes we have in stock, or messages send in our social media app. This guide does not dive into defining business logic. I assume you already have a billion dollar idea ready to be implemented. 

The first *keystone* document we should create for any app, with the help of ai, before we start coding is, *what are the use cases and scenarios in your app, and how does this inform our data design*?

For instance, a car dealership has 5 locations, and each location has a number of cars. A user might want to see all cars at a particular location etc. etc. This will inform our *database.md*, a critical file for the rest of our development.

The database is the foundation of all apps. This is where all the information is stored. If its design is shaky or poorly thought out, you'll waste huge amounts of time running in circles and refactoring old code (speaking from experience). Therefore it is crucial you have a document with the actual database schema, whether SQL or no-SQL, and a list of common operations clearly defined for the AI to look at. 

Later on when the AI is building business logic, as long as it reads this document, it'll be highly unlikely for it to hallucinate or get something totally wrong. 