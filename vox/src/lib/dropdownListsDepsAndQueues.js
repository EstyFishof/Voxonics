import _ from 'lodash'
import parseCountries from '@/lib/selectedCountries'

export function dropdownListFetch(bind, response, storeArray) {
  bind.mainList.getMainList = []
  bind.mainList.topList = []
  bind.mainList.bottomList = []
  response.forEach(item => {
    let bool = false
    bind[storeArray].forEach(element => {
      if(element.uid === item.uid) {
        bool = true
      }
    })
    if(!bool) {
      bind.mainList.bottomList.push(item)
    } else {
      bind.mainList.topList.push(item)
    }
  })

  bind.mainList.getMainList = _.concat(bind.mainList.topList, bind.mainList.bottomList)
}

export function dropdownChooseItem(bind, element, storeArray, nextFunc, localChange) {
  const obj = parseCountries.changeCountry(element, bind.mainList.topList, bind.mainList.bottomList, 'uid')
  bind.mainList.topList = obj.topList
  bind.mainList.bottomList = obj.bottomList
  bind.mainList.getMainList = obj.getCountries
  let array = []
  if(bind[storeArray].filter(item => item.uid === element.uid).length) {
    array = bind[storeArray].filter(item => item.uid !== element.uid)
  } else {
    array = JSON.parse(JSON.stringify(bind[storeArray]))
    array.push(element)
  }
  localChange ? bind[storeArray] = array : null
  bind.name = ''
  bind.fetch()

  bind[nextFunc](array)
}
