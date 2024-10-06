# Modern software development

> The art of `1+1=3`


Modern software development is a rather interesting exercise.

There is a myriad of programming languages, tools, frameworks, and cloud solutions available, each offering a different tradeoff. It is easier to reason about what these tools can do for us if we group them into functional layers. Then it will be easier to find out what each tool can mean for us in each layer of our architecture.

Let's go for a Dantesque tour of these layers: we will move from the data layer, up to the integration layer, then the API layer, the frontend, and finally we will talk about the powerful side-tools: low-code, no-code, and SaaS.



## The data layer
> Our journey begins with the storage and representation of data: the _data layer_!

A good data layer is capable of storing data **securely and correctly**, and retrieving data **quickly**. This "holy triad" reflects the fact that (transactional) data is often privacy-sensitive and needs proper protection, mistakes in (transactional) data can have serious real-world consequences that are often not acceptable, and finally users expect everything without waiting, so speed is of paramount importance.


A fantastic combination for the data layer is the so-called double-store, often found in combination with the CQRS design pattern. When we work following this double-store principle, we use two separate databases: one for writing data, optimized for correctness, and the other for reading data, optimized for performance.


In general, the combination of one SQL database for the writing component and one NoSQL/document database for the reading component works very well and is commonly found out there.


> My personal favorite combination is to use Postgres for the writing component, and Elastic for the reading component.

> Postgres is one of the best relational databases, it has a very long history, it is open source, it is packed with features, it has an amazing community, and it can compete with the best enterprise databases out there.

> Elastic is a document database, it is old enough to be mature and very stable, and it features one of the most complete set of advanced search operators out there (from normal stuff like fuzzy text searching down to exotic stuff like geocoordinate and even IP-range searches).

> Postgres guarantees that we have one source of truth that is always up todate, and Elastic allows us to build amazing interfaces for the end user to explore, search, and filter data however they want.


When dealing with two separate databases, we need to take care of synchronization. It is of course possible to synchronize everything from the SQL to the NoSQL database at fixed intervals, depending on what delay in propagation we are willing to accept.


I prefer using a DAO, or _Data Access Object_ that acts as an interface between the application business logic and the writing operations to the database, so that whenever we write to the SQL database we can control whether or not we immediately update the corresponding entries in the NoSQL database. 


> NoSQL databases are _denormalized_, meaning they do not store each individual entity exactly once - rather, they accept duplication of data in the tradeoff towards faster retrieval speed. If we have, say, a `City` entity referred to by each `Address` in the system, for example, a change in a `City` would imply that we need to modify every `Address` referring to that `City` accordingly. Sometimes this can mean that a single write operation to the SQL database is much faster than the same write operation to the NoSQL database because of the sheer number of replicas that need to be found and adjusted.

> For this reason, the choice of which operations to synchronize immediately, and which operations to synchronize at a later time is a custom choice: there is no _one size fits all_ solution because the amount of data and the density of the interconnections dictates the ideal strategy, and this yields different results for each entity!



### Modeling the flow of time

A fascinating topic when dealing with database design is how to model the flow of time. Many databases are designed with a slightly..."incomplete" focus: most of the attention goes to modeling entities correctly, and not enough goes to modeling processes as they run over time.

For example, consider sales in a webshop: sometimes we see only one `Sales` table/entity with a series of columns/fields that implicitly specify how far we are in the sales process: `proposalSent`, `orderConfirmed`, `invoiceSent`, `paymentLinkSent`, and so on. As you can imagine, the number of columns that we end up 
having in our tables will easily blow up, but there is another challenge that is even more significant: _the structure of our entities does not encode information about the process they represent_, and this means that it will become harder and harder for developers to maintain, extend, or just outright _understand_ the code just by looking at the data.

A better design would explicitly encode sequence. Every step in the sequence should be modeled as a different entity, with links (foreign keys) that denote "this step happened after that one" so that we can also audit the process and easily "go back in time". After all, sometimes complex processes might break for a reason that is outside of our control, and having a clear trace of everything that led to an invalid state is valuable. We should build systems for both correctness, as well as observability/understandability.

> A somewhat unsung hero of databases is the ORM, or Object-Relational-Mapper.
> Most software development in the enterprise sphere is done in either .Net or Java, the two giants of enterprise software engineering.
> Writing SQL queries by hand is a risky business. First of all, not all developers are very fluent in SQL nowadays. Much more importantly though, dynamically creating an SQL query in a language like Java or C# is error-prone, but also opens the door to security attacks like SQL-injection [link to XKCD].
> The high-end of the industry actually has a solution for this: the ORM. Modern, powerful ORMs such as the amazing LINQ or Hibernate make it possible for developers to leverage the safety and power of their preferred enterprise language to translate their logical queries down into SQL without having to directly write SQL themselves, and without ever exposing their application to the risk of injection and malformed queries.
> In short: everybody should use an ORM :)
 

## Intelligent systems
> Data can be enriched with automated insights: let's see how!

Many people nowadays say that "data is worth its weight in gold", and they could not be more right.
Thanks to advanced algorithms, it is possible to infuse our enterprise systems with an intelligence that can create new behaviours and new insights that have never been programmed by hand into the system. These systems need to be "trained" on huge amounts of data, so that they may discover and extract new and hidden patterns.

These patterns will allow the system to better understand what end users want and do, and they will make it possible to more efficiently navigate complex domains by either anticipation, guessing, or finding the right answer without having to navigate through many options and alternatives manually.

Let's talk about the two main categories of this "infused intelligence" for enterprise applications: machine learning (ML), and large language models (LLM).

### ML
Machine learning is a powerful, battle-tested set of algorithms that use advanced statistics as a way to anticipate patterns. There are many sorts of ML, depending on the kind of data we have, and the kind of intelligence we want to simulate.

#### Supervised vs unsupervised learning
The first big distinction between ML models is whether or not the data has been labeled (usually by humans). Imagine having a series of weather conditions (wind, rain, temperature, etc.). Someone then labels these weather conditions by whether or not it's a good idea to play golf on that day:

**Wind**          | **Rain**          | **Temp**          | **Play golf** 
------------------|-------------------|-------------------|------------------
5km/h             | 0mm               | 22C               | **`YES`**
25km/h            | 5mm               | 14C               | **`MAYBE`**
75km/h            | 50mm              | -5C               | **`NO`**

We would then ask the ML algorithm to understand the connection between data in the first three columns (the input) and the data in the last column (the _label_) through some mathematical algorithm.

We call this _supervised learning_. The supervision here refers to the fact that a human expert has manually added the labels (in our case whether or not to play golf). The labels are usually not understood immediately from the data, hence the need for ML in order to approximate the relationship from the inputs (the weather condition) to the outputs (the decision to play golf).

Depending on the kind of data and their shape, there are many different models that we can train. The job of the ML expert is to analyze, but also experiment, with different algorithms and parameters. Among the many such algorithms, we can try a decision tree (which is one of the coolest algorithms: it produces a tree of conditions that eventually results in a choice, and the tree itself is usually interesting to read and inspect); on the other end of the spectrum are neural networks: they adjust the internal weights of a large network of links that are capable of encoding very complex, arbitrary, non-linear relations (one of the most powerful algorithm, it can achieve almost anything but the network itself is unreadable for humans).


When we can't or don't want to label data manually, we can just let the system organize itself. We call this _unsupervised learning_. For example, consider the users of a webshop:

**User**          | **Product 1**     | **Product 2**     | **Product 3** 
------------------|-------------------|-------------------|------------------
User1             | ❌                | ✅                | ✅
User2             | ❌                | ✅                | ✅
User3             | ✅                | ✅                | ❌
User4             | ✅                | ✅                | ❌

In this tiny scenario, we might want to segment users together when their behaviour is similar. Given our tiny sample, we might conclude that there are two segments, or clusters, of data: ˋ{User1, User2}ˋ and ˋ{User3, User4}ˋ.

Based on such a clustering of users, we can then decide to give different recommendations to the users of each cluster, or perhaps connect those users together in a community for after-sales sharing of experiences, etc. The possibilities are truly limitless.

We call this _unsupervised learning_ because the ML algorithm gets to process (potentially huge amounts of) raw data without any human intervention. Unsupervised learning is great for capturing patterns in the data, for example clustering (of which there are many different kinds depending on size and shape and distribution of the data), but also temporal sequences in order to predict the likelihood of the next step, and so on.


### Large language models
A special mention goes to large language models, or LLMs. LLMs are a form of unsupervised learning that studies the temporal sequences of words across large bodies of text in order to learn "the most likely next word". When applied to something huge like the whole Internet, LLMs do something truly exceptional: given the context of a "conversation" so far, they use it to predict the next word, yielding results that approximate the "average" of all the texts the system has studied. Mind blowing!

> _Philosopher's corner_: of course LLMs have no understanding of, well, anything. Understanding requires an agent that exists in the world and knows that language describes the world. LLMs do not have any notion of the real world, and they exist in a Platonic reality composed only of abstract conceps. In a sense, the LLM is never really "hallucinating": it is merely offering the next likely, logical word in the sequence, and as such it is always right.

LLMs are so powerful that it is very tempting to think that they are actually capable of intelligence, but this is not really the case. This does not reduce the huge usefulness of LLMs in any way though! LLMs can perform very complex text-processing tasks, such as, for example: 
- helping users with contextual autocompletion
- rewriting text in a new style or language
- implementing advanced search

The last two examples in particular offer super-cool application possibilities. 

Consider government websites: offering a simplified version of a complex page for readers with some impairment works wonders, and the risk of mistakes is very limited because the original text is reliable and there is no "new information" to add or process.

Search on the other hand, is where LLMs really shine. Building advanced search usually requires a tedious process of manual tweaking and adjustment: marking words as more or less important, defining synonyms, and so on. The end result of advanced search with traditional tools is never completely satisfactory. LLMs can find a much better link between the words of the user query and the words of the available documents and texts, resulting in excellent matches that take into account semantic similarities instead of just matching word-by-word. Amazing!

### Available ML/AI tools
Thankfully, we don't need to reimplement all of these mathematically complex algorithms ourselves. A lot of these algorithms are available either from SaaS solutions, as self-hosted systems, or even as libraries for the major programming languages and frameworks out there.

#### SaaS solutions
The big hosting platforms, GCM, AWS, and Azure, offer excellent implementations ofAI and ML algorithms through APIs that are ready to use. You only need a credit card and you are set to go!

The big advantage to cloud solutions is evident from the start: you need to do very little in order to get started with a top-quality system. When you are experimenting with a new solution, a system still does not have many users, and in general the volume of operations is not very big, the savings of using a SaaS vs doing it yourself can be huge. 

There are disadvantages as well! The first is cost at scale. As soon as the volume of users and transactions starts to grow even a little bit, the price of SaaS can rear its ugly head. It is not uncommon to quickly go from 250$ a month to 25k.
The second disadvantage is data protection: sometimes you don't want to give sensitive data out of hand.
The last disadvantage is flexibility: SaaS products need to cater to a broad audience, so there will eventually be things that you need but the SaaS provider does not support or does not support fully.

There is no one-size-fits-all answer: as always, it's a matter of combining pragmatism with strategy and long-term vision!

#### Self-hosted
It is possible to self-host pre-built open-source systems that are capable of implementing various types of ML and AI, sometimes even connected.

A great example of this would be self-hosted Elastic cluster for advanced search capabilities. Elastic can deal with all sorts of complex data, and it provides fuzzy search results thanks to a variety of ML-powered algorithms.

We can also self-host pre-trained LLM models. In 2024, LLAMA 2 from Meta, the massive 176 billion parameter BLOOM, Google' BERT, T5, or even Salesforce' CodeGen, plus a few others can be setup with relative ease on a developer' machine or a private cloud. Each model is capable of different tasks, sometimes quite specialized: BERT targets SEO specialists and is aimed at increasing website ranking, CodeGen is focused on code, T5 is great for translation, summarization, and classification, and so on.

The best part is that we can combine these systems into AI-power Elastic search. Suppose the user writes a question in a prompt. We can run a search query to find some matching documents in the Elastic database, and then use the most relevant query results as the restrictive context within which the LLM is supposed to answer the question.

The results will not only feel almost like magic: they will also be accurate, because the LLM cannot hallucinate given that it's restricted only to the available documents.

Self-hosting has some disadvantages of course: we need to have our own private cloud, and we need to be able to maintain the setup of the relevant software so that it stays secure and performant. Also, self-hosting existing SaaS tools allows somewhat limited flexibility: the functinoality that comes out the box will be available, but it will not always be possible to change the core algorithms and behaviours.

The advantages though, can be huge! First of all, privacy and control of potentially sensitive data: when dealing with an organisation' or users's private data and documents, using SaaS can raise concerns, or in some cases be outright illegal. When self-hosting, we can guarantee the privacy and protection of data that is supposed to stay safe and private.

Another advantage to self-hosting is price. With self-hosting, we can save a lot in SaaS usage fees, even when the platform scales up to lots of users. This way we can focus budget on building what matters: new and exciting functionality!


#### Libraries and frameworks
The existing ML and AI SaaS and self-hosted systems are usually based on the composition of open-source frameworks and library. The most famous ecosystem for this is Python, but Python is not the only choice. For the more enterprise-framework-oriented organisations, ML.Net from Microsoft for example allows us to access a huge set of high-quality, ultra-fast algorithms directly from a .Net/C# application. Clustering, sentiment analysis, text processing, neural networks: open source frameworks offer everything conceivable and then some more!

Of course, building your own is a strategy that comes with high risk and high reward, because creating new ML or AI systems, even with the flying start provided by such frameworks, is quite a complex endeavour. Then again, the opportunities for combining models together in new and unexpected ways can produce amazing results that solve new problems in unique ways.



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

The workflows represent the beating heart of the system, but they also have a second, interesting and vital function that is less evident. Web applications that are connected to the Internet need to be as lean as possible towards the frontend. Every response must be calculated as quickly as possible, for two fundamental reason:
- user experience, because users want lighting fast responses to every action
- security, because an attacker can exploit a slow endpoint by calling it many times in a row and bringing down the application (DDoS)

In order to achieve this performance, we build our exposed API endpoints in such a way that they perform the minimal amount of computation (just enough to setup a workflow and mark the necessary entities as locked, for example a rental unit as `rented`). Then the endpoint stops processing and lets the background engine pick up the task when resources are available.

> The background engine is pretty quick. Usually, the delay between the confirmation that the user receives and the actual processing is in the order of a few seconds. When the system is under heavy load though, it might be that it takes much longer, even minutes or in an extreme case, such as when we wait for external systems like ERPs or PSPs, hours or days. The user sees clear messages about what is still processing in the UX, and the system remains blazing fast and reliable even when the queue of background jobs is filled to the brim!


## Backend - API
> The data lives and transforms automatically, but what does the user see?

In order to expose the system to users that will, well, use it, we need to make the data available. We do this by opening a series of "holes" in our backend: digital doors and windows of sorts. The holes can have different shapes, different keys, and different size, depending on the requirements of the application in terms of security and performance.

### Privacy and security
A system dealing with sensitive data such as commercial, transactional, or healthcare, will need to expose exactly the right data to exactly those users who are supposed to have access to it, and not indiscriminately allow everyone to see (and even worse: change!) everything. Let's dive into this topic.

The user needs to access a subset of the data both for reading and writing. Mind you: the subset for reading and the subset for writing will not necessarily be the same data: usually, a user can read quite a lot more data than they can modify!

For example, a user will be able to see the available products in the shop, but will not be able to make changes to them (imagine a world where we could change the price on Amazon.com before buying: intriguing, but probably not very viable for the business  in the long run!). A user will be able to write for example their own address, their payment method, or preferred delivery method, among other things.

The restrictions on reading and writing data are not only logical: they are the essential means by which we enforce security and integrity of the system. Each piece of data has a logical owner: be it a user or even another system (for example when we mirror data from an ERP into our own Elastic database).

Exposing the right data in the right way to the right users is the job of the API layer, which implements our model of data ownership (who owns what) and privacy (who can see what).

Data access restrictions are eerily often (read: practically always) implemented with a _reachability model_. The reachability model states that a given non-public entity can be accessed along a _path_ from the current user down to that entity. Let me give you a few examples:

```
can edit: teacher -> teaches -> course -> class -> teaching unit
can view: student -> enrolled -> course -> class -> teaching unit
can edit: customer -> profile
```

In the above examples, the arrow `->` denotes a relational link in the database. Some special tables such as the table `teaches` or the table `enrolled` are _token_ tables that grant access to linked resources. Sometimes, token tables represent organisational, rather than physical, concepts, but of course there are other scenarios and ways to interpret them.

### Performance (both kinds)
The frontend needs to be fast. Nowadays there is no excuse for slow frontends that do not expose all data so quickly that the user does not ever feel like they are waiting.

In some markets where competition is fierce, it has even been measured how a slower application can literally cause significant loss of revenue and a flight of customers to competitors, so this topic is often on everyone's top of mind, and for good reason too.

A good API needs to allow the frontend to pull large amounts of data with a delay of a few dozens of milliseconds. Crossing over into the realm of the hundreds of milliseconds, or in some cases (gasp!) even seconds is simply not acceptable anymore as a performance norm.

There is another kind of performance though: developers' performance. 

> In the modern world of headless web development, the API is used to power different frontends. This is known as an _omnichannel_ strategy, and it allows us to offer different applications that can access exactly the same data in real-time, ideally even with the different applications talking to each other. A cool example that almost everyone knows is how Spotify will let you control whatever music another device is playing with your account!
> After all, the user does not care about whether they are using your app via a mobile phone or a desktop PC browser: they are accessing their own data in a seamless and logical manner.

Frontends are growing more and more interactive and complex, not to mention multi-platform. Frontend developers need to be able to access data however they see fit, without having to require changes to the API done by a backend team somewhere else. This can kill productivity and make delivery work a quality and organisational nightmare.

> When we are very lucky, the other team is in the same building. When the Gods of coding do not favor us, the other team is in another timezone and speaks in an incomprehensible accent. 

In short, the API must be fast and hyper flexible.


### Taming the beast
Ok, so we need security, performance, and flexibility. Sounds like we are screwed and the only reasonable course of action would be to give up software development altogether and focus on, say, goose farming, right?

Fortunately, no! There is a way. It has multiple components.

The first ingredient in order to conquer this challenge is code-generation, or as I love calling it: **scaffolding**. Data access patterns such as reachability models for access restriction can be defined declaratively with little more than the syntax that I offered a few paragraphs earlier. Instead of writing queries by hand, which is boring and error prone, we can let the system generate the right queries for us with minimal input.

> On the complete other end of the spectrum,I have seen so many systems where queries are generated procedurally at runtime with text that I sometimes must wonder why do we do this to ourselves?

A good code generator can do wonders. It can write a layer of access to our data that is guaranteed to respect our security model, which is already an amazing thing. It can also generate the synchronisation routines that keep the SQL and NoSQL stores aligned without humans needing to worry about it. But most of all, it can generate very rich API interfaces that offer huge flexibility to the frontend team.

Drumrolls.......

Enter, the graph API, and in particular OData (the enterprise variant) and GraphQL (the hipster little brother).

A battle tested system capable of scaffolding a graph API can guarantee security, performance, and flexibility out of the box. A team with such a tool in place will be able to use it for years (decades) with barely any change, thereby reducing backend work by a huge percentage (in the double digits, but obviously extremely context dependent so no further claim is possible here).

Say goodbye to hand-written SQL queries, manual authorisation checks, or tickets from the frontend team to the backend team requesting an extra filter option: we can get all of this, and more, for free, with the right architecture.

Ahhhh, I love my job.

## Frontend

### Data access and business logic

### Styling

### Advanced presentation (HTML5)

### Web vs native


## The rest of the world
low-code, no-code, BI tools

