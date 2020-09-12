// 中断promise

// core
const wrap = (p1) => {
  let abort;
  let p2 = new Promise((resolve, reject) => {
    abort = reject
  })
  
  let p = Promise.race([p1, p2])
  p.abort = abort
  return p
}

const newp = wrap(new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(111)
  }, 1000)
}))
newp.then((res) => {
  console.log(`success: ${res}`)
},(err) => {
  console.log(`error: ${err}`)
})

newp.abort('中断')



