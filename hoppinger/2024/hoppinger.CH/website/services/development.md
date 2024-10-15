# Modern software development

> The art of `1+1=3`


Modern software development is a rather interesting exercise.

There is a myriad of programming languages, tools, frameworks, and cloud solutions available, each offering a different tradeoff. It is easier to reason about what these tools can do for us if we group them into functional layers.


## The data layer
> Our journey begins with the storage and representation of data: the _data layer_!

A good data layer is capable of storing data **securely and correctly**, and retrieving data **quickly**. This "holy triad" reflects the fact that (transactional) data is often privacy-sensitive and needs proper protection, mistakes in (transactional) data can have serious real-world consequences that are often not acceptable, and finally users expect everything without waiting, so speed is of paramount importance.

A fantastic combination for the data layer is the so-called double-store, often found in combination with the CQRS design pattern. When we work following this double-store principle, we use two separate databases: one for writing data, optimized for correctness, and the other for reading data, optimized for performance.

In general, the combination of one SQL database for the writing component and one NoSQL/document database for the reading component works very well and is commonly found out there.

My personal favorite combination is to use Postgres for the writing component, and Elastic for the reading component.

Postgres is one of the best relational databases, it has a very long history, it is open source, it is packed with features, it has an amazing community, and it can compete with the best enterprise databases out there.

Elastic is a document database, it is old enough to be mature and very stable, and it features one of the most complete set of advanced search operators out there (from normal stuff like fuzzy text searching down to exotic stuff like geocoordinate and even IP-range searches).

### Modeling the flow of time

A fascinating topic when dealing with database design is how to model the flow of time. Many databases are designed with a slightly..."incomplete" focus: most of the attention goes to modeling entities correctly, and not enough goes to modeling processes as they run over time.

For example, consider sales in a webshop: sometimes we see only one `Sales` table/entity with a series of columns/fields that implicitly specify how far we are in the sales process: `proposalSent`, `orderConfirmed`, `invoiceSent`, `paymentLinkSent`, and so on. As you can imagine, the number of columns that we end up 
having in our tables will easily blow up, but there is another challenge that is even more significant: _the structure of our entities does not encode information about the process they represent_, and this means that it will become harder and harder for developers to maintain, extend, or just outright _understand_ the code just by looking at the data.

A better design would explicitly encode sequence. Every step in the sequence should be modeled as a different entity, with links (foreign keys) that denote "this step happened after that one" so that we can also audit the process and easily "go back in time". After all, sometimes complex processes might break for a reason that is outside of our control, and having a clear trace of everything that led to an invalid state is valuable. We should build systems for both correctness, as well as observability/understandability.
 

## Intelligent systems
> Data can be enriched with automated insights: let's see how!

Many people nowadays say that "data is worth its weight in gold", and they could not be more right.
Thanks to advanced algorithms, it is possible to infuse our enterprise systems with an intelligence that can create new behaviours and new insights that have never been programmed by hand into the system. These systems need to be "trained" on huge amounts of data, so that they may discover and extract new and hidden patterns.

These patterns will allow the system to better understand what end users want and do, and they will make it possible to more efficiently navigate complex domains by either anticipation, guessing, or finding the right answer without having to navigate through many options and alternatives manually.

Machine learning and modern large language models, either SaaS or self-hosted, can provide such intelligent insights to our data in a fully automated fashion!

## Backend - business rules
> We have the enriched data: let's start processing it!

The next layer in our architecture is the business rules layer. Our database(s) model the available entities and the available workflows, but now it's time to push the workflows further. The definition of the steps and conditions that move a workflow ahead are usually done in the backend, or as we can also call it - the _intermediate layer_ that provides the right data to the frontend.

The workflows can be very simple things like `send a confirmation email to a new user`, but they can also be much more complex:

```
wait for new payment confirmation
find invoice number
create new payment in ERP
link invoice to payment
mark invoice as paid
```

We use top-of-the-bill enterprise tools and frameworks such as .Net in order to implement such workflows that encode the business rules of our system.

## Backend - API
> The data lives and transforms automatically, but what does the user see?

In order to expose the system to users that will, well, use it, we need to make the data available. We do this by opening a series of "holes" in our backend: digital doors and windows of sorts. The holes can have different shapes, different keys, and different size, depending on the requirements of the application in terms of security and performance.

### Privacy and security
A system dealing with sensitive data such as commercial, transactional, or healthcare, will need to expose exactly the right data to exactly those users who are supposed to have access to it, and not indiscriminately allow everyone to see (and even worse: change!) everything, especially stuff that belongs to others. Let's dive into this.

The user needs to access a subset of the data both for reading and writing. Mind you: the subset for reading and the subset for writing will not necessarily be the same data: usually, a user can read quite a lot more data than they can modify!

The restrictions on reading and writing data are not only logical: they are the essential means by which we enforce security and integrity of the system. Each piece of data has a logical owner: be it a user or even another system (for example when we mirror data from an ERP into our own Elastic database).

Exposing the right data in the right way to the right users is the job of the API layer, which implements our model of data ownership (who owns what) and privacy (who can see what).

Drumrolls.......

Enter, the graph API, and in particular OData (the enterprise variant) and GraphQL (the hipster little brother). A graph API exposes a single endpoint which supports fetching any entity, filtered in any way we want, and sorted in any way we want.

## Frontend
> The stage is set, we are ready to roll, let's build something beautiful that our users will fall in love with.

It is now time to build the frontend of the application. A modern frontend is supposed to be hyper-fast, beautiful, intelligent, and ergonomic. And, the same user experience should be available on all platforms: browser (big and small screens), native apps, and in general anywhere users might want to run the application on.

In order to achieve this optimally, the frontend needs to be treated as an engineering system in its own regard, and the structure of its logical layers, the reusability across platforms, the error handling, and much more need to be crafted intelligently.

### Data access and business logic
The frontend journey starts with its ability to exchange data with the backend, and to process this data correctly.

Data exchange refers to the API component, which receives and sends data to the backend.

### Presentation
The most recognizable part of the fontend is of course the way things look, or the _styling_. Styling is achieved through the technical tools of HTML and CSS, which determine the position of elements on the screen, their color, background, borders, fonts, and so on.

Styling is a very rich domain that goes beyond pretty shapes and colors. The two biggest challenges when dealing with styling are responsiveness and accessibility.

From an engineering and future-proof perspective on the other hand, the ability to make use of a _design system_ will provide a series of small, reusable components that can be put together into larger compositions that will always look beautiful and logical. Such a _design system_ saves frontend developers and designers from having to redesign every single page of the application as if it were unique, and rather provides a toolkit of "Lego blocks" to compose in all sorts of ways.

Finally, the separation of the files that govern styling from the files that implement API and business logic, when done properly, provides another important advantage: different team members can work on different parts of the codebase without encountering conflicts, thereby booking higher team effectiveness through parallel work.


#### Advanced presentation (HTML5)
There is more to the presentation layer than just styling and layout. Modern web browsers support advanced features such as 2D and 3D animations (the `canvas`), and also real-time collaboration across different browsers (_websockets_). This way we can build veritable "windows into a shared virtual world" where users can see each others' activities on the screen, and co-create at the same time.

Awesome stuff!

#### Web vs native
The frontend code for API and business logic can work without any change on any platform. This way we can build omni-channel applications that work as web applications in the browser as well as native applications on a smartphone without having to maintain two separate codebases.

The presentation layer, on the other hand, is a different story, because the HTML elements that are available in the browser are not available and identical in a native app, so we need a different version of the presentation layer if we want to deploy the application on iOS and Android.

Our way of working is well prepared for this! As long as the presentation layer is neatly split from the API and business logic, which is a great practice anyway, we will be able to reuse all of the reusable components, and we will be able to turn a web application into a smartphone native app with as little effort as possible.

