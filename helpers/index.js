export const logApiError = error => {
  console.log('error: ', error?.response)
}

export const parsePath = asPath => {
  const pathArr = asPath.split('?')
  const fields = {}

  if (pathArr[1]) {
    const params = pathArr[1].split('&')
    params.forEach(param => {
      const result = param.split('=')
      fields[result[0]] = result[1]
    })
  }

  return {
    path: pathArr[0],
    rawQuery: pathArr[1],
    fields
  }
}
