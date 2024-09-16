<!-- theme: gaia -->
<style>
  @font-face {
    font-family: "Apercu";
    src: url(https://legacy.grandeomega.com/css/fonts/Apercu-Mono.ttf) format("truetype");
  }

  :root {
    /* --color-background: #487ced;
    --color-foreground: #ffedf5;
    --color-highlight: #ffedf5;
    --color-dimmed: #ffedf5; */
    /* --color-background: #083d34;
    --color-foreground: #e3e8e7;
    --color-highlight: #35a674;
    --color-dimmed: #35a674; */

--color-background: #3A36AE;
    --color-foreground: #FCEEF5;
    --color-highlight: #E0569B;
    --color-dimmed: #E0569B;*/

--color-background: #FCEEF5;
    --color-foreground: #3A36AE;
    --color-highlight: #E0569B;
    --color-dimmed: #E0569B;

  }

  code {
   font-family:  "Fira code";
  }  
</style>


# Modern software development
> The art of `1+1=3`

Modern software development is a rather interesting exercise.

There is a myriad of programming languages, tools, frameworks, and cloud solutions available, each offering a different tradeoff. Let's dive into what each of them can do for us by partitioning the work into layers.

We will move from the data layer, up to the integration layer, then the API layer, the frontend, and finally we will talk about the powerful side-tools: low-code, no-code, and SaaS.


## The data layer
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
A fascinating topic when dealing with database design is how to model the flow of time. Many databases are designed with a slightly..."incomplete" focus: only entities are modeled, for example ...

Databases - CQRS double store, SQL, NoSQL, DAO
  Normalisation, workflows vs entities
  The importance of ORMs for safety and productivity

ML/AI
Backend - background
Backend - API

Frontend - business logic
Frontend - styling
Frontend - web
Frontend - native

low-code, no-code, SaaS