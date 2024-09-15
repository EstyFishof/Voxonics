import { v4 as uuidv4 } from 'uuid'

export function sortedListOfScenariosByUid(scenariosArray, arrayOfUids) {
    const returnArray = []
    const notContainsArray = []

    scenariosArray.forEach(el => {
        const findIndex = arrayOfUids.findIndex(item => item === el.uid)
        if(findIndex !== -1) {
            returnArray[findIndex] = el
        } else {
            notContainsArray.push(el)
        }
    })
    return returnArray.concat(notContainsArray).filter(el => el)
}

export function getRelatedScenarios(scenariosArray, item) {
    return scenariosArray.filter(el => {
        return el.path.split('/')[1] === item.path.split('/')[1]
    })
}

export function deleteParentPartOfPath(scenariosArray) {
    const scenarios = JSON.parse(JSON.stringify(scenariosArray))
    return scenarios.map(el => {
        if(el.path.split('/').length >=2) {
            el.path = '/' + el.path.split('/')[2]
        }
        return el
    })
}

export function addItemScen(scenario, addItem, parentItem) {
  const item = getNecessaryItem(scenario, parentItem)

  if(!item) return scenario

  if(item.next) {
    item.next.push(addItem)
  } else {
    item.next = [addItem]
  } 

  return scenario
}

function getNecessaryItem(scenario, item) {
    let returnItem
    
    const getItem = (scenario) => {
        if(scenario.category === item.category) return returnItem = scenario
        if(scenario.next && scenario.next.length) {
            for(let i = 0; i < scenario.next.length; i++) {
                getItem(scenario.next[i])
            }
        }
    }
    getItem(scenario)
    return returnItem 
}

export function getParentItem(scenario, item) {
  let returnItem
  const getItem = (scenario, parentItem) => {
    if(scenario.category === item.category) return returnItem = parentItem
    if(scenario.next && scenario.next.length) {
        for(let i = 0; i < scenario.next.length; i++) {
            getItem(scenario.next[i], scenario)
        }
    }
  }

  getItem(scenario)
  return returnItem
}

export function changeScenarios(scenario, value) {
  const necessaryItem = getNecessaryItem(scenario, value)

  if(necessaryItem) {
    for(const key in value) {
        necessaryItem[key] = value[key]
    }
  }


  return scenario
}

function swapItemsProperties(currentItem, swappedItem) {
    for(const prop in currentItem) {
        if(prop !== 'next' && prop !== 'extra') {
            currentItem[prop] = swappedItem[prop]
        }
    }
}



export function swapItems(currentItem, swappedItem, scenario) {
  const scenarioLocal = JSON.parse(JSON.stringify(scenario))
  const currentItemLocal = JSON.parse(JSON.stringify(currentItem))
  const swappedItemLocal = JSON.parse(JSON.stringify(swappedItem))

  // swapItemsProperties(currentItem, swappedItemLocal)
  swapItemsProperties(getNecessaryItem(scenarioLocal.scenario, currentItem), swappedItemLocal)
  // swapItemsProperties(swappedItem, currentItemLocal)
  swapItemsProperties(getNecessaryItem(scenarioLocal.scenario, swappedItem), currentItemLocal)

  return scenarioLocal
}

export function deleteBranch(scenario, item) {
  const parent = getParentItem(scenario, item)

  if(parent) {
    parent.next = parent.next.filter(el => el.category !== item.category)
  }

  return scenario
}

export function deleteItem(scenario, item) {
    const parent = getParentItem(scenario, item)

    if(parent) {
        parent.next = parent.next.map(el => {
            if(el.category === item.category) {
                if(item.next?.length) {
                    return {...item.next[0], extra: item.extra}
                }
            }
            return el
        })
    }
  
    return scenario
}

export function deleteCategory(scenario) {

  const del = (scenario) => {
    if(scenario?.category) delete scenario.category
    if(scenario?.next && scenario?.next.length) {
        for(let i = 0; i < scenario.next.length; i++) {
            del(scenario.next[i])
        }
    }
  }

  scenario?.scenario ? del(scenario.scenario) : null
  return scenario
}

export function parseNumbers(scenario) {
  let scen = JSON.parse(JSON.stringify(scenario))
  let numbers = []
  scen?.scenario ? scen.scenario.options.externalNumbers.forEach(num => {
    if(num.number) {
      numbers.push(num.number)
    } else {
      numbers.push(num)
    }
  }) : null
  scen ? scen.externalNumbers = numbers : null
  scen?.scenario ? scen.scenario.options.externalNumbers = numbers : null
  return scen
}

export function parseNextField(scenario) {
    let scen = JSON.parse(JSON.stringify(scenario)) 
    if(scen?.scenario) {
        !scen.scenario.next ? scen.scenario.next = [] : null
    }
    return scen
}

function ivrObjectToArray(next) {
    const returnIVRNextArray = []
    for (const value of Object.values(next)) {
        returnIVRNextArray[value.extra.index] = value
    }
    return returnIVRNextArray
}

function itemToArray(item) {
    if(item.schema !== 'ivr') {
        item.next = item.next ? [item.next] : []
        return item
    }
    item.next = ivrObjectToArray(item.next)
    return item
}

export function parseScenarioToDisplay(scenario) {
    const parse = (scenario) => {
        if(Array.isArray(scenario.extra)) scenario.extra = {}
        scenario.category = uuidv4()
        scenario = itemToArray(scenario)
        if(scenario.next && scenario.next.length) {
            for(let i = 0; i < scenario.next.length; i++) {
                parse(scenario.next[i])
            }
        }
    }
    parse(scenario)
    return scenario
}

function delCategory(item) {
    if(item?.category) {
        delete item.category
    }
    return item
}

function itemToObj(item) {
    if(item.schema !== 'ivr') {
        if(item.next?.length) {
            item.next = item.next[0]
        } else {
            item.next = null
        }
    }
    return item
}

function ivrArrayToObj(item) {
    if(item.schema === 'ivr') {
        const next = {}
        item.next.forEach((element, index) => {
            element.extra.index = index
            next[element.extra.ivr] = element
        })
        item.next = next
    }
    return item
}

export function parseScenariosToBackEnd(scenario) {
    const parse = (scenario) => {
        scenario = delCategory(scenario)
        scenario = itemToObj(scenario)
        scenario = ivrArrayToObj(scenario)
        if(scenario.schema === 'ivr') {
            for(const prop in scenario.next) {
                parse(scenario.next[prop])
            }
        } else if(scenario.next?.schema) {
            parse(scenario.next)
        }
    }

    parse(scenario.scenario)
    return scenario
}


function validIVRKeys(scenario) {
    if(scenario.schema === 'ivr') {
        for(const item of scenario.next) {
            if(!(/^[0-9*#]+$/.test(item.extra.ivr)) && item.extra.ivr !== "invalid" && item.extra.ivr !== 'timeout') {
                return 'Invalid IVR Key'
            }
            if(scenario.next.filter(el => el.extra.ivr === item.extra.ivr).length > 1) {
                return 'Duplicate IVR Keys'
            }
        }
    }
}

export function validateScenario(scenario) {
    let valid = false
    const validate = (scenario) => {
        const validIVR = validIVRKeys(scenario)
        if(validIVR) {
            valid = validIVR
            return
        } 
        if(scenario.schema === 'ivr') {
            for(const item of scenario.next) {
                validate(item)
            }
        } else if(scenario.next?.[0]?.schema) {
            validate(scenario.next[0])
        }
    }

    validate(scenario.scenario)
    return valid
}

export function setListScenarios(list) {
  let array = []
  list.forEach(element => {
    if(!array.includes(element.path.split('/')[0])) {
      array.push({mainTitle: element, secondaryList: []})
    }
  })
  array.forEach(item => {
    list.forEach(element => {
      if(item.mainTitle.path.split('/')[0] === element.path.split('/')[0]) {
        item.secondaryList.push(element)
      }
    })
  })
  return array
}

export function parseListScenarios(list) {
    return list.map(el => {return {...el, scenario: parseScenarioToDisplay(el.scenario)}} )
}

export function changeName(list, currentScenario, name) {
  let currentScen = {}
  let listScen = []
  let listToBack = []
  let path = currentScenario.path.split('/')
    if(path[2]) {
      path[2] = name
      currentScenario.path = path.join('/')
      currentScen = currentScenario
      list.forEach(el => {
        if(el.uid === currentScen.uid) {
          listScen.push(currentScen)
        } else {
          listScen.push(el)
        }
      })
    } else {
      list.forEach(el => {
        if(el.path.split('/')[1] === currentScenario.path.split('/')[1]) {
          let pathEl = el.path.split('/')
          pathEl[1] = name
          el.path = pathEl.join('/')
          if(el.uid === currentScenario.uid) {
            currentScen = el
          } else {
            listToBack.push(el)
          }
        }
        listScen.push(el)
      })
    }

  return {currentScen: currentScen, listToBack: listToBack, listScen: listScen}
}

export function changeScenarioAfterUpdateParse(list, scenario) {
  let array = []
  list.forEach(el => {
    if(el.uid === scenario.uid) {
      array.push(scenario)
    } else {
      array.push(el)
    }
  })
  return array
}
