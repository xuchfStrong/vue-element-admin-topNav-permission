const routes = require('../router/routeStrCopy')

// function myFilter(arr1, arr2) {
//   return arr1.filter((ele) => {
//     return arr2.filter((x) => x.id === ele.id).length > 0
//   })
// }

const asyncRoute = [
  { id: 1 },
  { id: 12 },
  { id: 3 },
  { id: 31 },
  { id: 33 },
  { id: 4 },
  { id: 41 }
]

// const result = myFilter(routes, asyncRoute)
// const resultJson = JSON.stringify(result)
// console.log('resultJson', resultJson)

function hasId(id, route) {
  if (route.id) {
    return route.id === id
  } else {
    return true
  }
}

function filterAsyncRouter(routes, arr2) {
  const res = []
  for (let i = 0; i < arr2.length; i++) {
    routes.forEach(route => {
      const tmp = { ...route }
      if (hasId(arr2[i].id, tmp)) {
        if (tmp.children) {
          tmp.children = filterAsyncRouter(tmp.children, arr2)
        }
        res.push(tmp)
      }
    })
  }
  return res
}

const result = filterAsyncRouter(routes, asyncRoute)
const resultJson = JSON.stringify(result)
console.log('resultJson', resultJson)
