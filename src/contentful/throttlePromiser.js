// Expose an endpoint which returns a promise which will resolve 
// in the order it was made, promises will be delayed such that
// every promise will resolve after a delay.

const THROTTLE = 2000
const promises = []

function makePromise() {
  const promiseContainer = {}
  promiseContainer.promise = new Promise(resolve => {
    promiseContainer.resolve = resolve
  })
  return promiseContainer
}

function getPromise() {
  const promise = makePromise()
  promises.push(promise)
  return promise.promise
}

function resolveNextPromise() {
  if(promises.length) {
    promises.shift().resolve()
    return true
  }
  return false
}

setInterval(resolveNextPromise, THROTTLE)

export default getPromise