# Extended team
You have an existing legacy application built in .Net, Java, or PHP. 

The business needs to keep running, so the lights must stay on at all time.

The architecture is old. The business needs new features and innovations but it just takes a lot of time to add them.

A fresh wind is needed.

This is where the extended team services come into play.

## Two tracks
We have an extensive team of highly educated architects, senior developers, and IT experts who regularly help with this sort of challenge.

We start with an audit of the application: where do we stand, what can be improved, what can we lean on.

Then we find out what are the goals of the business, and how should the software adjust to accomodate them.

We then start two parallel processes: 
- agile development of new functionality and bugfixes;
- strategic replatforming.

### Agile development
The agile development ensures that the product keeps moving and stays stable.

Agile development combines service management with delivery management. 

_Service management_ takes care of all the smaller work packages: small bugs, urgent issues, support, and even tiny features that are very time sensitive. We try to keep service management to the minimum though.

Efficiency in development is very important. After all, wasting the time and energy of a senior developer is the least we all want. For this reason, we bundle multiple requests into sprints, and we challenge the content of each sprint from a strategic perspective so that we are always sure that what we are building achieves impactful growth and business effect. We call this _delivery management_.

### Peeling the onion
The strategic replatforming ensures that the architecture improves so that the application stays maintainable, extensible, secure, and performant for the next decades (yes, decades: that is the lifecycle we should aim for).

It's way too easy, and way too lazy, to simply want to rebuild software from scratch. Many developers claim that this is the only way, but it is not.

Rebuilding software from scratch means a huge expense up front, while the business stands still because the old codebase gets no improvements and no features.

This is just a no-go.

At the same time, replatforming, especially of messy startup code or very old legacy code does need to happen, or the business will at some point stop moving because the software is just stuck, or even lose customers because of unfixable bugs and legacy functionality.

How do we cope? Simple! We peel the onion. One layer at a time. 

The _how_ depends heavily on the application of course.

For example, for a legacy a desktop application, we would introduce a web service that processes _some_ data. Maybe move the notifications functionality over to the cloud. Later, add more data to the cloud and remove data from the local database. At some point treat the local database just as a cache, and create a web or native app based on the cloud.

For example, for a legacy web application built in a hurry, we would partition the codebase into clear modules (LIBs, NPM packages, NUGet packages, etc.). We would extract reusable features, introduce common layers, standardize the API, and one by one collapse all of the duplicated functionality into reusable modules, all the while applying clearly documented practices and introducing industry best practices so that we don't need to reinvent the wheel all the time.

Many more examples are possible, but hopefully you get the gist.

# In conclusion
The lights needs to stay on, but legacy or messy applications also need some love to stay flexible, workable, and relevant.

Our extended teams are specialized in making this happen so that a legacy application can bloom to new life and quality, without any interruptions of service.
 