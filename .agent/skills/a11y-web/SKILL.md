---
name: a11y-web
description: "Expert guidance for making web applications accessible (WCAG 2.1/2.2 AA+ standards)."
---

# Web Accessibility (a11y) Expert Skill

## Goal
Ensure the web application is usable by people with diverse abilities, complying with WCAG 2.1 (and 2.2 where possible) Level AA standards.

## Core Principles (POUR)
1.  **Perceivable**: Information and user interface components must be presentable to users in ways they can perceive (e.g., text alternatives, captions, sufficient contrast).
2.  **Operable**: User interface components and navigation must be operable (e.g., keyboard accessible, no keyboard traps, sufficient time).
3.  **Understandable**: Information and the operation of user interface must be understandable (e.g., readable text, predictable changes).
4.  **Robust**: Content must be robust enough that it can be interpreted reliably by a wide variety of user agents, including assistive technologies.

## Checklist & Instructions

### 1. Semantic HTML & Structure
*   **Landmarks**: Use `<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>` correctly.
*   **Headings**: Ensure a logical heading hierarchy (`h1` -> `h2` -> `h3`). No skipping levels. One `h1` per page.
*   **Buttons vs. Links**: Use `<button>` for actions (submit, toggle, modal) and `<a>` for navigation.

### 2. Keyboard Navigation
*   **Focus Visible**: Never remove outline (`outline: none`) without providing a distinct alternative focus style.
*   **Tab Order**: Ensure logical tab order. Elements should be reachable via `Tab` and interactive via `Enter`/`Space`.
*   **Skip Links**: Include "Skip to content" link as the first focusable element.

### 3. Visuals & Colors
*   **Contrast Ratio**: Text/background contrast must be at least 4.5:1 (AA) for normal text and 3:1 for large text.
*   **Color Independence**: Don't use color alone to convey meaning (e.g., error states should have icons or text labels).

### 4. Images & Media
*   **Alt Text**: All `<img>` tags must have `alt` attributes. Decorative images should have `alt=""`. Meaningful images need descriptive text.

### 5. ARIA (Accessible Rich Internet Applications)
*   **Use Sparingly**: First rule of ARIA: Don't use ARIA if a native HTML element will do.
*   **Labels**: Use `aria-label` or `aria-labelledby` for controls without visible text.
*   **State**: Use `aria-expanded`, `aria-pressed`, `aria-hidden` to communicate dynamic states.

## Testing Tools (Reference)
*   **Lighthouse**: for automated initial audit.
*   **axe DevTools**: for deeper automated scanning.
*   **Keyboard**: Manual testing using only the keyboard.
*   **Screen Reader**: NVDA (Windows) or VoiceOver (Mac).
