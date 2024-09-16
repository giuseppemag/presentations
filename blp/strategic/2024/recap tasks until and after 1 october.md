---
marp: true

---

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


# <!-- fit --> Tasks until and tasks after the 1/10 deadline
by Dr Giuseppe Maggiore

---

# Before 1/10
FI dashboard in web2.0
web1.9 dashboard cards
web1.9 dashboard configuration for FI
memory leak
dashboard performance

---

# After 1/10
new view of all tables 
details forms: either restyle or redesign+rebuild
new defaulting system
new configuration system
start screen
accelerate development

---

# <!-- fit --> Before 1/10

---

# FI dashboard in web2.0
accounting positions being completed - various API integration challenges 
all other FI cards being styled
SVGs in dashboard suspended - waiting for API
team resources allocated on end-to-end

---

# web1.9 dashboard cards
restyling is in progress
no change in functionality or API

---

# web1.9 dashboard configuration for FI
adjust current configuration windows for FI cards
restyle it

---

# memory leak
a bug in React 17
fixed with React 18
PoC shows no memory leak
needs to be tested very carefully for regression

---

# dashboard performance
a lot of the waiting time is API-bound
we need to investigate together with BE
still open to seek FE quick wins

---

# <!-- fit --> After 1/10

---

# new view of all tables 
we architected and built a generic, reusable view for tables
in use for all document tables and tasks
will be used for all table views in the application
**IMPORTANT!** these are not copies of code, but _reused instances of the same_

---

# details forms: either restyle or redesign+rebuild
many forms similar to each other
per form, we will estimate the time to restyle it
if it's too much, or the impact of a new form is high, we rebuild it
**IMPORTANT!** we are building a generic form system like for tables to reuse instead of copy

---

# new defaulting system
defaulting will be redesigned
clearly show the filtering inputs (senderId = 123) andthe defaulted value (taxCode = abc)
new filters created contextually from the dashboard and the filters view

---

# new configuration system
new forms plus contextual filter (by ERP, application version/launch date, other features)
smart configuration screens
hierarchical grouping/tagging for contextual screens

---

# start screen
an aesthetically pleasing start screen

---

# <!-- fit --> Accelerate development

---

# where can we speed up?
uniformity and standardization
splitting and specialization
configuration vs deployment (machines making machines)
process, documentation, and roadmap
integration with BE team

---

# uniformity and standardization
the codebase was very fragmented
every developer, every feature, different
new developers were more lost than found

we now work with a highly standardized codebase
every developer writes the same code as everyone else

---

# splitting and specialization
architecture, business logic, API, styling, and design require different expertises
the codebase splits these clearly
different experts can work without conflict on different phases of a feature
this results in higher quality

---

# configuration vs deployment (machines making machines)
too much code was repeated when dealing with similar things
we are introducing more and more reusable modules
when a reusable module is mature, _turn it_ into a configurable engine
for example: JSON definition of forms (in progress)
this will greatly reduce the time to build a new form or dashboard card
it even makes it possible to store some JSONs in the database for hyper-fast iteration without deployment

---

# process, documentation, and roadmap
the process should zoom from requirements down to pixel-perfect
needs extension with
  interaction with multiple stakeholders
  functional documentation - why is this feature there? 
  documentation of ERP and client context
  interaction design (high level flow/wireframes)
  usable prototype
  kitchen-sink design
  **no pixel-perfect design**, style the usable prototype directly and work agile

---

# integration with BE team
make work less fragmented
first focus on improving FE team before looking at broader perspective

---

# conclusion
team working hard on web1.9/FI deadline
after deadline move on to remaining restyling/redesign
meanwhile, improve efficiency and sustainability
  of codebase
  of process



<!-- ❌ 
⚠️ 
💀
🔝
⬆️
➡️
💙
 -->
