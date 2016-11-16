export interface IRequestParams {
  requesting: boolean
}

export function replaceMethod(replacer) {
  return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
    descriptor.value = replacer(descriptor.value)
    return descriptor
  }
}

export function requesting(request: IRequestParams) {
  return replaceMethod((origin) => function(...args) {
    request.requesting = true
    const promise = origin.apply(this, args)
    const stopRequesting = () => request.requesting = false
    promise.then(stopRequesting, stopRequesting)
    return promise
  })
}
