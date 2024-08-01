# Dashboard operational strategy for the last sprints
by Giuseppe and David

## Introduction
This document describes a retrospective of the development of the first cards for the web2 dashboard.
We highlight the criticalities of the current progress.
We define the way forward.

## The goal
The business has defined the non-negotiable goal of delivering a working restyling of the dashboard, tasks overview, and new document viewer, collectively referred to from now on as _web2_, with a strict deadline on the 1st of October.
The delivery will fuel sales, as well as contract confirmations.
We need both: new sales will propel growth, but only if existing clients and their revenue are retained.
This means that we need to deliver the best possible mix of new functionality, coupled with a massive visual improvement.
If we cannot deliver, our team will need to be put under a magnifying glass, potentially even leading to restructuring.

## The status
The situation is, bluntly put, far from optimal: we are moving too slowly, the quality is not high enough, and too many things are "almost done" but completely not ready for production. 
Existing cards are taking much more time than expected to build.
What is developed contains too many mistakes and bugs that feel avoidable.
Designs are incomplete, suboptimally organized and not adequately versioned.

## Mitigating circumstances
There are mitigating circumstances. These are not an excuse not to deliver, but it is fair to mention them here.
We don't have any definition of requirements, making designs harder to complete and organize well.
We don't have complete designs, therefore the target is moving all the time.
We are learning a new standard (for our team) on how to work (our Core framework and guidelines).
There are literally hundreds of edge cases, therefore going to the complete feature takes 10x what it takes to build an MVP (minimum viable product) of that feature.
The current codebase is heavily duplicated and inconsistently organized. therefore it is hard to understand as a reference without extensive onboarding.
The current product is complex and hard to quickly understand how cards work just by using them without extensive onboarding.
The API is getting extended all the time (and is not done, meaning that we are not the only team struggling).
The API has inconsistencies and no documentation.

## The new process
We want to restructure our process, in order to deliver more intermediate releases, more gradually, as well as reducing the risk of not going live.
Starting from the 1st of August, we will start working on two tracks in parallel:
- Michal, Konrad, and Joy will restyle existing web1.0 cards. We will copy each card and all its dependencies, and only modify its HTML and CSS structure. This guarantees that we will be able to deliver a web2 (more web1.9 let's say) of the dashboard on time.
- John, David, Giuseppe will first clean up, complete, and deploy everything that is currently live: new document viewer, and then existing web2 cards. 
- After this, JDG will continue with the creation of new web2 cards, unstyled.
- After all cards are either done in web2 or restyled for web1.9, MKJ will move on to styling the new unstyled web2 cards that were built during the previous point.

## The deliverables
We aim at deploying deliverables to dev that could be put in production without further work.
The first deliverable will be the new document viewer (GD);
The second deliverable will be all the web2 cards that are currently either done or almost done (JDG);
The third deliverable will be all the web1.9 cards: as soon as one such card is done, it gets deployed to dev.
These three deliverables must, non-negotiably, be finished by the 1st of October.

The fourth, and final deliverable, will be all web2.0 cards and components. We want to deliver this before 1.10.2024 as well, so even after web1.9 is completely done, we will keep pushing to get this done.

## Conclusion
We are truly sorry to have to deliver such a harsh message. We greatly appreciate the individual passion and effort that every member of our team has put in their work. We thank you for it, and are proud to have such a motivated team.

We are confident that with this new approach we will be able to achieve the results that truly showcase our qualities, in such a way that the business can also be run successfully and profitably.


