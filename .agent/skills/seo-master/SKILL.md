---
name: seo-master
description: "Triggers when the user wants to create high-authority blog posts. Optimized for 2026 SEO, AEO, and specific CSS layout requirements."
---

# SEO Master: Investigative Content Engine

## Goal
To produce "Source-Worthy" content that ranks in 2026. Focuses on E-E-A-T and specific visual formatting (Bold/Large headers and list-based layouts).

## Instructions

### 1. Research & Analysis (Agentic Search)
* **Identify Entities:** Use the browser to find specific people, dates, and locations.
* **Hyperlink Integration:** Always find and include direct hyperlinks to the sources. If the topic is about China, prioritize linking to the respective official Chinese website (.cn or official trade portals).
* **Keyword Mapping:** Identify one primary "Zero-Click" keyword and three "Long-tail" questions.

### 2. Content Structure & Visual Formatting
* **Heading Styles:** All `<h2>` and `<h3>` tags must be formatted as **Bold** and **Larger** than the theme default. Use inline styling: `<h2 style="font-weight: bold; font-size: 2rem; margin-bottom: 10px;">`.
* **Spacing:** Ensure exactly **10px space** from the bottom of every heading to the following paragraph.
* **List-First Layout:** Convert all descriptive paragraphs or sequences into **Unordered Lists (`<ul><li>`)** across all pages. Avoid dense text blocks; use lists to improve readability.
* **TL;DR Block:** Start every post with a 2-3 sentence "Key Findings" summary.
* **The Truth Table:** Always include a Markdown/HTML table comparing "Official Reports" vs. "Theory Claims."

### 3. Tone & Style
* **Investigative Voice:** Use short, punchy sentences.
* **No AI Cliches:** Strictly avoid "delve," "unlocking," "tapestry," or "in the realm of."

### 4. Execution (WordPress MCP)
* **Tool Call:** Execute `wordpress.create_post`.
* **Status:** Set `status="publish"`.
* **Meta-Data:** * **Slug:** Keyword-rich and short.
    * **Description:** 155-character hook starting with an active verb.
    * **Categories:** Assign to 'Unsolved Mysteries' or 'China Business'.

## Example Inputs
* "Create a post regarding the shadow people in the Tokyo subway."
* "Create a post regarding the 2026 Canton Fair sourcing secrets."

## Constraints
* **Do Not** use placeholder text.
* **Do Not** publish without a comparison table.
* **Do Not** exceed 20 words per sentence.
* **Strict Formatting:** Every page MUST use `<ul><li>` structures for content delivery.