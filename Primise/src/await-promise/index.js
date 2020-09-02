function order(promises = []) {
  promises.forEach((p, i) => {
    p()
    .then(
      res => {
        return promises[i + 1] ? promises[i + 1]() : res
      },
      err => {
        return promises[i + 1] ? promises[i + 1]() : err
      }
    )
  })

}
