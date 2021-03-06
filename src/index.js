const rawData = [
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
  `utils/b/b.js`
];

const getLastIdxOfSame = arr => {
  const ret = []
  const len = arr.length
  let prior = -1
  while (prior < len) {
    prior++
    const cur = arr[prior]
    const next = arr[prior + 1]
    if (cur !== next) {
      ret.push(prior)
    }
  }
  return ret
}

const flatten = (data) => {
  let ret = []

  data.forEach((str, strIdx) => {
    if (!str.includes(`/`)) {
      ret[strIdx] = [str]
      return
    }

    const pathArr = str.split(`/`);
    const samePrefixArrLen = pathArr.map((p, pIdx) => {
      const cur = pathArr.slice(0, pIdx + 1).join(`/`);
      const samePrefixArr = data.filter(i => i.startsWith(`${cur}/`))
      return samePrefixArr.length
    })

    const indexes = getLastIdxOfSame(samePrefixArrLen)
    const final = indexes.map((i, idx) => {
      if (idx === 0) {
        return pathArr.slice(0, i + 1).join(`/`)
      }

      const left = indexes[idx - 1] + 1;
      const p = pathArr.slice(left, i + 1).join(`/`)
      return p
    })
    ret[strIdx] = final
  })

  return ret
}

flatten(rawData)

