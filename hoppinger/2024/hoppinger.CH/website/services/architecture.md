# Architecture

How tall can the building be? It depends on the foundations.

Whenever we build something complex, layered, and interconnected, "just build and see" does not work. Even a good setup can turn out to be a very costly mistake if the original architecture did not take into account all the requirements. For example, sticking to the housing construction metaphor: suppose you build a house, and then when the  new owner inspects it they decide that the bathroom should be in another room, one without plumbing ready! Then you will have to demolish and redo a lot of walls or floors, lay the plumbing, before you can even start putting down the new bathroom in the desired location.

Software is just like this. When we build an application, if we fail to take everything we know into account in terms of flexibilitywe must factor in everything that will happen in the application in terms of data sources, load, security, both now and in the future. Of course we cannot fully know the future, but very often a well thought roadmap can give us plenty of suggestions about how the system is likely to evolve (those bits need to be isolated and modular so that they can change quickly) and how the system will likely remain stable.

## Architectural elements
Whenever we design an architecture, we need to take a series of elements into account. I always like to **start with the data**, because nothing matters if the data is not in order.

Then we need a platform to host everything on...
