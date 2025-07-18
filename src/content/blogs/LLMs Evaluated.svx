---
title: LLMs Evaluated
description: After more than 2 years of using LLMs daily, this is my verdict in 2025
date: 2025-07-02
edited: 2025-07-08
tags:
  - llm
  - evaluation
  - pros
  - cons
category: coding
---
After talking to many of my peers from high school, uni, academics and industry software engineers, I've discovered a wide array of opinions on LLMs. On one extreme, some people refuse to use it at all. To these people, LLMs are almost sacrilegious to even mention. On the other extreme, some people believe it'll replace all human employees in the next year. 

As always, the truth is likely somewhere in between, but to find it and describe it in a useful way, we have to slice this new shiny entity in the realm of existence in as many ways as appropriate.

Below is accurate-ish as of mid-2025.
## Google Killer?

One of the most obvious use cases of LLMs, and one that lead to a panic bearish outlook on Google in 2024, is its seeming capabilities in completely replacing search engines. I actually believe with the web search improvements implemented in 2025, this is the strongest and most likely use case to realise the reality of consumer use of LLMs by far. 

There are some killer advantages of LLMs over traditional search engines:

1. True semantic search
I remember taking a workshop on how to use Google back around the 2020s. It was on how to break your search down into keywords, certain google features like search for exact quotes and so on. At the time, I thought, this is quite unintuitive and hard to learn, and alas I was never diligent enough to master the ins and outs of Google's features. Now we are seeing a *true* paradigm shift: we can search for anything semantically. This is far beyond the usefulness of keywords and page ranking. An abstract query like:

> evaluate the effects of lamb prices on the New Zealand economy?

can still be effectively understood and processed by the LLM. Even if articles on this topic is really bad or hard to find on search engines, LLMs will always deliver a decent quality response or at least understand what you are trying to ask

2. Recomposing existing concepts
LLMs can effectively re-compose the current body of human knowledge. This can lead to undesired effects of hallucinating false knowledge or create misunderstandings. But on the whole it unlocks a whole new use case considering the vast corpus of knowledge it was trained on. This is related to the previous point where, since it can now freely link previously unlinkable knowledge, it can provide insights of a decent quality all the time. Even with no trained knowledge on lamb prices and New Zealand specifically, training data on lamb prices, New Zealand and economics individually will guarantee a rather decent answer.

3. No ads, no meandering around, almost no bias
This is a rather practical feature, but one that I recently noticed had a significant effect on my personal usage of search engines, as in, turn me almost completely away from them for asking questions. LLMs do not serve ads! It reminds me of the `read mode` or something like that on Firefox where only the HTML text is preserved. How nice is it to not have 30 video dialogs flashing at you for attention. 

Then there's the matter of convenience. I no longer have to dig through 3 blog posts, 2 wikis, and 5 reddit posts to find what I want to know. Here's an oddly specific example, I was installing Windows 11 on a newly built PC when it kept failing at 13%. No error code, no message. I described the situation to ChatGPT and it told me that between 10% and 20% is when Windows copy files from the flash drive to the disk and it's likely a RAM issue, and recommended a tool I've never hear of called MemTest86 to test for this. I did as instructed, and lo and behold the ram sticks were bad. 

The take-away here is that LLMs change how we interact with knowledge, instead of mining for it and meandering around, it spoon-feeds it directly into our brain. 

They also have almost no bias, and I say almost because, everything is a little bit biased. If you go on r/Apple, it will be filled with praise for Macs, and if you express similar elements in r/linux, you'll probably be flamed. As such, LLMs really just reflect the average sentiment across the whole internet. If you ask for a certain angle or imply a certain lens, it'll happily view the world in that way, but it inherently does not push or suggest any agendas or beliefs. It's pretty spineless, and that's a feature.

## LLM as an agent

The other major use case, or rather perspective on viewing LLMs is as an agent or persona with human like qualities. I believe the true persona of LLMs is an extremely knowledgable, slightly insecure, infinitely patient, somewhat wise, emotionally neutral, spineless, not logically or creatively intelligent person. 

I say the above because of its following qualities:

1. Trained on literally every piece of human text on the internet.
Who can say they've read the entire C specification, Don Quixote and the Quran? No one. Even the most knowledgeable human experts on any topic can't remotely compete with even the most basic LLM in terms of raw knowledge and recall. And due to it's ability to actually compose existing knowledge and mimic opinions and thoughts via learnt patterns, it even exhibits signs of wisdom. Is a robot which has memorised every account of every war in human history wise? 

2. Instant, always available & never judge
This one I noticed teaching programming tutorials at the University of Sydney. Some of the students would still go to ChatGPT for questions even though I was standing right behind them. Whilst it may seem like I'm a terrible teacher (I can't prove this is not true), I believe it's due to the inherent convenience of LLMs. They do not judge you and tell you you're stupid, they never tell you they are out of time or tired, they can answer in every possible language, they are experts in every piece of human knowledge, they can instantly generate essays catered to your specific question. In some ways, it's truly the perfect teacher. 

3. Random BS go!
LLMs have no true gauge of their own confidence. Every newly generated token is just a probability logit across every single word; they produce new words based on the activation of previous words. They lack true reasoning capabilities in the mathematically rigorous sense. No true rigorous deduction and a lack of *self-awareness* means that it'll vaguely approximate humans on the internet, and just make crap up.

4. I am you
Since LLMs generate new tokens based on past tokens, and your questions are the said past tokens, they are activated/stimulated by your words. But since they do not have any built in opinions and biases (at least the foundational models hopefully don't...), they tend to agree and obey you. They are designed to follow your instructions. Sometimes I find it funny when people fault LLMs for not challenging their bad ideas, when some humans are even more egregious at being doormats. Although I can understand their frustration.

5. Using stone tools...
Nowadays there's an increased reliance on LLMs to not only talk to us, but too call tools and interact with MCP servers. This turns a passive chatting buddy into a full-blown actor who can browse the newest shoes AND buy them for you. I've been playing around with this particular feature a lot lately, and I must say it's rather uncanny to see Cursor create new files on your computer (our computer). Tools are still in their early days, sometimes it's hard to get the model to use the tools exactly the way you want, and too many tools definitely overwhelms the model.

## Conclusion
LLMs are a generational improvement on search engines, and for their improved experience on answering questions, will slice a huge chunk of traffic away from giants like Google (maybe right into their Gemini, haha). LLMs are best thought of as an extremely knowledgable, slightly insecure, infinitely patient, somewhat wise, emotionally neutral, spineless, not logically or creatively intelligent person. As such, they are immensely valuable if we ask the right questions. 
