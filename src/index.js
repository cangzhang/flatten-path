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

const addToChildren = (node, arr) => {
  const hasChild = arr.children.find(i => i.path === node.path);
  if (hasChild) {
    return
  }

  arr.children.push(node)
}

const findNodeByPath = (path = ``, source) => {
  let ret = null;

  for (const c of source.children) {
    if (c.path === path) {
      ret = c
      break
    }

    if (c.children.length) {
      ret = findNodeByPath(path, c)
    }
  }

  return ret
}

const getResult = node => {
  let ret = []
  if (!node.children.length) {
    return ret.push(node.path)
  }

  if (node.children.length === 1) {
    return ret
  }

  node.children.forEach(i => {
    const arr = getResult(i);
    ret.concat(arr)
  })

  return ret
}

const convertToArr = tree => {
  const ret = tree.children.map(t => {
    const tmp = getResult(t)
    return tmp
  })

  console.log(ret)

  return ret
}

const flattenPath = (data) => {
  const paths = {
    path: ``,
    children: []
  }

  data
    .forEach((i) => {
      const arr = i.split(`/`);
      const len = arr.length;

      arr.forEach((p, idx) => {
        const parentArr = arr.slice(0, idx)
        const path = [...parentArr, p].join(`/`)

        const node = {
          path,
          children: [],
        }

        if (idx === 0) {
          addToChildren(node, paths)
          return
        }

        const parentNode = findNodeByPath(parentArr.join(`/`), paths)
        addToChildren(node, parentNode)
      })
    });

  convertToArr(paths)

  return;
}

flattenPath(rawData)

