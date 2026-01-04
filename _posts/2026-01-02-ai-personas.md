---
title: AI Personas
---

I keep seeing teams lean on AI personas as if they are a substitute for sound engineering practice. The pattern is familiar: line up a "Product Manager," "Senior Engineer," and "QA" persona and let them talk it out. As much as I hate to admit it, I get the appeal. It feels like you are recreating a product team in a chat window. In practice, it rarely leads to better work.

## Personas aren't a capability upgrade

The core issue is simple: the model already has the capabilities those personas claim to represent. You do not get a smarter plan because you told the model to be a "Product Manager." You get a different tone. Maybe a different format. But you do not get new knowledge, better reasoning, or a magically realistic process. You get the same model, wearing a different hat.

People mistake narrative for rigor. The conversation feels more structured, but the output quality doesn't materially change.

## The doll analogy (in good faith)

Watching my kids play makes the analogy hard to unsee. They line up dolls, assign roles, and act out a story where each one has a job. It's creative and fun. It also doesn't constrain anything. The story works because they want it to work.

AI personas operate similarly. The model is improvising. You are telling it how to talk, not how to think. If the "Architect" tells the "Engineer" to "consider scalability," that does not mean scalability got real analysis. It means the model wrote the word "scalability."

## Where agents actually help

Agents and subagents can be valuable, but not for role-play. They help manage context. They let you isolate a slice of the problem, preserve key details, and reduce the amount of irrelevant stuff the model has to juggle. That's real leverage.

The problem is that most "persona" workflows are not doing this. They are not building a context management system. They are building a story.

## The vibe coding trap

You can see this clearly in "vibe coding" a website by spinning up a fake product team:

- Product Manager persona for requirements
- Software Architect persona for system design
- Software Engineer persona for implementation
- QA persona for testing

It's theater. The model already has those capabilities, and it's the same model in each step. You didn't create a team. You created a script.

If you want better output, focus on what actually changes the model's behavior:

- Provide tighter context, not a title.
- Ask for constraints, not ceremony.
- Break work into smaller, concrete steps.
- Specify the format and trade-offs you care about.

That is how you reduce hallucinations and improve outcomes.

## A more honest approach

If you like personas because they help you think, fine. But call it what it is: a prompt style. If you want real leverage, invest in context management and decomposition. It's less fun than pretending your AI is a team, but it's far more effective.

At some point, you have to decide whether you want a story or a result. The dolls are great for play. They are not great for work.
