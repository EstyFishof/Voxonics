export function clickCheck(bind, indexElement, refs) {
  let boolVal = false
  for (let item in refs) {
    if (indexElement === item) {
      boolVal = true
    }
  }
  if (!boolVal) {
    bind.hide()
  }
}