# CSE 134B Homework 4 — Progressive Enhancement

Wenqing Deng's Homework 4 portfolio adds native and JavaScript-enhanced contact forms, persistent light/dark themes, and a View Transition API enhancement to the Homework 3 site.

## Submission links

- Repository: <https://github.com/LornaDeng/cse134b-hw4>
- Website: <https://lornadeng.github.io/cse134b-hw4/>

## Required pages

- `form-no-js.html`: semantic contact form, native constraints, CSS validation states, keyboard operation, and POST submission without JavaScript.
- `form-with-js.html`: the same working HTML foundation enhanced with accessible error feedback, a remaining-character counter, and serialized error history.

Both pages submit to `https://httpbin.org/post`. The enhanced page sends the error-history JSON through the hidden `form-errors` field.

## JavaScript enhancements

- `form.js` uses the Constraint Validation API without a framework or validation library.
- `theme.js` switches shared CSS custom properties, saves the preference in `localStorage`, handles storage failures, and uses the View Transition API when supported.
- JavaScript-only controls and information are hidden until their scripts run.
- `prefers-reduced-motion` removes the theme transition animation while preserving the theme change.

## Local testing

Serve the repository root through an HTTP server rather than opening pages with a `file:` URL. For example:

```sh
python3 -m http.server 4173
```

Then open `http://localhost:4173/`.

The two form pages were checked with a local HTML5 validator. Browser testing covered native validation with no scripts, custom validation, mouse and keyboard submission, error-history serialization, successful httpbin responses, theme persistence, light/dark readability, and a 390-pixel-wide viewport without horizontal page scrolling.

GitHub Pages publishes from the repository root on the `main` branch. No build command or framework is required.
