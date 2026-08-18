# Architecture

```text
TXT / Markdown → paragraph chunks → token index → TF-IDF ranking → citations
```

All processing happens in the browser. `src/search.js` is a pure, dependency-free search core that can also run in Node.js. Each result retains `documentId`, filename and paragraph number, making answers auditable instead of returning an untraceable generated response.
