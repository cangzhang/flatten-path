const rawData = [
  `packages.json`,
  `readme.md`,
  `src/components/hold/a/a.js`,
  `src/components/hold/a/b.js`,
  `src/components/kiss/a/b.js`,
  `src/components/kiss/b/a.js`,
  `src/components/a/b.js`,
  `src/another/components/a/b.js`,
  `utils/a/b.js`,
  `utils/b/b.js`
];

const flatten = (data) => {
  let ret = []
  const arr = data.map(i => i.split(`/`))

  arr.forEach((a, aIdx) => {
    if (!ret[aIdx]) {
      ret[aIdx] = []
    }

    const len = a.length
    if (len === 1) {
      ret[aIdx] = a
      return
    }

    ret[aIdx] = [a[len - 1]]
    for(let flag = len - 2; flag >= 0; flag--) {
      const cur = a.slice(0, flag + 1).join(`/`)
      const prev = a.slice(0, flag).join(`/`)

      const ledByCur = data.filter(i => i.startsWith(`${cur}/`))
      const ledByPrev = data.filter(i => i.startsWith(`${prev}/`))

      if (ledByCur.length === ledByPrev.length) {
        ret[aIdx] = [cur, ...ret[aIdx]]
      }
      if (ledByCur.length < ledByPrev.length) {
        ret[aIdx] = [prev, cur, ...ret[aIdx]]
      }
    }
  })

  ret = ret.map(i => [...new Set(i)])

  console.log(ret)
  return ret
}

flatten(rawData)

