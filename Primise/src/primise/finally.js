// 1. finally返回的是promise 2. cb也可能再返回一个promise 所有使用Promise.resolve包裹一下在then 保证顺序
// 3. finally中的返回值不影响下一个then的参数
Promise.prototype.finally = function(cb) {
  const p = this.constructor
  return this.then(
    (res) => p.resolve(cb()).then(() => res),
    (err) => p.resolve(cb()).then(() => { throw err })
  )
}

const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('123')
  }, 1000)
})


p1.finally(() => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('456')
    }, 1000)
  })
}).then((res) => {
  console.log(`success ${res}`)
},(err) => {
  console.log(`error ${err}`)
})


