// Promise.race
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('p1')
  }, 1000)
})
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('p2')
  }, 1500)
})

const isThenabel = p => Object.prototype.toString.call(p.then) === '[object Function]'
Promise.race = function(arr = []) {
  let p = new Promise((resolve, reject) => {
    if (Array.isArray(arr)) {
      arr.forEach(item => {
        if (isThenabel(item)) {
          item.then(resolve, reject)
        } else {
          resolve(item)
        }
      })
    }
  })
  return p
}

const p = Promise.race([ p1, p2 ])
p.then((res) => {
  console.log(`success,${res}`)
},err => {
  console.log(`error,${err}`)
})