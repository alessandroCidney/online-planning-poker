export function waitFor(conditionFn: () => boolean) {
  return new Promise<void>((resolve) => {
    if (conditionFn()) {
      return resolve()
    }

    setTimeout(async () => {
      await waitFor(conditionFn)

      resolve()
    }, 1000)
  })
}