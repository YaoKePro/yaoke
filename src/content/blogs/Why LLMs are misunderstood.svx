---
title: Why LLMs are misunderstood
description: What does prompt engineering show us about LLMs
date: 2025-07-18
edited: 2025-07-18
tags:
  - llm
  - prompt
  - evaluation
category: coding
---
One of the most upvoted posts (21K!) in r/ChatGPT is this post titled [After 147 failed ChatGPT prompts, I had a breakdown and accidentally discovered something](https://www.reddit.com/r/ChatGPT/comments/1lnfcnt/after_147_failed_chatgpt_prompts_i_had_a/). It is essentially a prompt made to help people make prompts. A *meta-prompt*.

And it's intrinsically linked to Lex Fridman's interview with Anthropic AI researcher Amanda Askell's [description of AI personas](https://www.youtube.com/watch?v=ugvHCXCOmm4).

Let's explore the link.

I often find that people unfairly criticise AI on some fronts. Typical complaints include "it sounds generic", "it's not doing what I'm asking it to" or "why did it agree with this obviously wrong information". 

Let's take a step back and ask, "is there a human which everyone likes?". A rather philosophical question, to which the answer is, no. But why is that? 

There is an underlying social element to all human interactions. In real life, or even online, tones, gestures, facial expression and wording all shape the dynamics of our interactions. You might be polite and verbose in front of your boss, but crude and direct with your friends. This makes interactions *feel human* and is a demonstration of free-will, social skills and autonomous decision making. Beyond that, individuals have personalities, quirks, temperament, and personal life experiences that shape who we are.

LLMs however, lack these skills. By default LLM providers have to ship a "vanilla" model. It can't have political opinions, sound aggressive, hold strong opinions, or throw tantrums. In essence. It is the average of all humans. It is the average of *humanity*.

We can escape this feeling by leveraging their incredible ability of one-shot learning, where including examples or giving instructions as part of the input can trigger internal neural activations inside the model, causing it to mimic our autonomous social context. 

This is why the next decade will be the decade of **prompting**. Not because we can achieve everything just by prompting models, but because we can extract different types of performance out of existing models in completely new ways. We can turn the average of humanity into the *best* of humanity. The newest released model Kimi K2 has a whopping one **TRILLION** parameters, out of which some will activate in response to your query. Happy prompting, and stay skeptical of the conversation around AI, whether it's praise or criticism. 
