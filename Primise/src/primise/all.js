// Promise.all

const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('p1')
  }, 1000)
})
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('p2')
  }, 1500)
})

const isThenabel = p => Object.prototype.toString.call(p.then) === '[object Function]'
Promise.all = function(arr = []) {
  let times = 0
  let results = []
  const handler = function(res, i, resolve) {
    ++ times;
    results[i] = res
    if (times === arr.length) {
      resolve(results)
    }
  }

  let p = new Promise((resolve, reject) => {
    if (Array.isArray(arr)) {
      arr.forEach((item, i) => {
        if (isThenabel(item)) {
          item.then(
            (res) => handler(res, i, resolve), 
            reject
          )
        } else {
          handler(item, i)
        }
      })
    }
  })
  return p
}

const p = Promise.all([ p1, p2 ])
p.then((res) => {
  console.log(`success,${res}`)
},err => {
  console.log(`error,${err}`)
})