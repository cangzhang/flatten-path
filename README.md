# flatten-path

[![npm version](https://badgen.net/npm/v/@al-c/flatten-path)](https://www.npmjs.com/package/@al-c/flatten-path)

## how to use

```typescript
import { makeTree, flatten } from '@al-c/flatten-path';

const data = [
  `packages.json`,
  `readme.md`,
  `src/components/hold/a/a/a.js`,
  `src/components/hold/a/a/b.js`,
  `src/components/hold/b/a/b.js`,
  `src/components/kiss/a/b.js`,
  `src/components/kiss/b/a.js`,
  `src/components/a/b.js`,
  `src/another/components/a/b.js`,
  `utils/a/b.js`,
  `utils/b/b.js`,
];

console.log(flatten(data));

console.log(makeTree(data));
```
