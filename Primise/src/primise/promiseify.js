// promiseify 将回调变为promise
const fs = require('fs')

const promiseify = (fn) => {
  return function(...args) {
    const p = new Promise((resolve, reject) => {
      fn(...args, function(err, res) {
        if (err) {
          reject(err)
        } else {
          resolve(res)
        }
      })

    })

    return p
  }
}

const p = promiseify(fs.readFile)
p('./name.txt', 'utf-8').then(res => {
  console.log(res)
})