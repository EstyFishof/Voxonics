export default {
  mark(itemParam, clickedArrayParam) {
    let item = JSON.parse(JSON.stringify(itemParam)),
        clickedArray = JSON.parse(JSON.stringify(clickedArrayParam))

    if(!clickedArray.filter(el => el.uid === item.uid).length && clickedArray.length < 12) {
      clickedArray.push(item)
    } else {
      clickedArray = clickedArray.filter(el => el.uid !== item.uid)
    }
    return clickedArray
  },
  markAll(arrayParam, clickedArrayParam) {
    let array = JSON.parse(JSON.stringify(arrayParam)),
        clickedArray = JSON.parse(JSON.stringify(clickedArrayParam))

    if (clickedArray.length === array.length || clickedArray.length === 12) {
      clickedArray = []
    } else {
      clickedArray = []
      for (let i = 0; i < array.length; i++) {
        clickedArray = this.mark(array[i], clickedArray)
      }
    }
    return clickedArray
  }
}
