import store from '../store/index.js'
import _ from 'lodash'

export function clientSort(param, arrayParam, refElement, orderParam, dispatchName ) {
    let array = [],
      refArrow = refElement,
      order = ''

    if(dispatchName) {
      store.dispatch(dispatchName,  _.orderBy(arrayParam, [param], [orderParam]))
    } else {
      array =  _.orderBy(arrayParam, [param], [orderParam])
    }

    if (orderParam === 'desc') {
      order = 'asc'
      refArrow ? refArrow.style.transform = 'rotate(180deg)' : null
    } else {
      order = 'desc'
      refArrow ? refArrow.style.transform = '' : null
    }

    return {array: array, refArrow: refArrow, order: order}
}

export function serverSort(func, refElement, orderParam, ...args) {
  let refArrow = refElement,
      order = ''
  //...args = sortParam, perPage, page
  func(...args, orderParam)
  if (orderParam === 'desc') {
    order = 'asc'
    refArrow ? refArrow.style.transform = 'rotate(180deg)' : null
  } else {
    order = 'desc'
    refArrow ? refArrow.style.transform = '' : null
  }

  return {refArrow: refArrow, order: order}
}