export function QueuesParse({uid, name, internalNumber, strategy, timeout, retry, ringinuse, maxlen, music, weight, joinempty, leavewhenempty, penaltymemberslimit, relatedWith, belongTo}) {
    //<<<<<<<<<<Урезаем очередь>>>>>>>>
    const queue = {uid, name, internalNumber, strategy, timeout, retry, ringinuse, maxlen, music, weight, joinempty, leavewhenempty, penaltymemberslimit, relatedWith, belongTo}

    //<<<<<<<<<<Урезаем юзеров в RelatedWith>>>>>>>>
    const arrayRelatedWith = []
    queue.relatedWith.user.forEach(q => {
        arrayRelatedWith.push(q.uid)
    })
    queue.relatedWith.user = arrayRelatedWith

    //<<<<<<<<<<Урезаем юзеров в BelongTo>>>>>>>>
    const arrayBelongTo = []
    queue.belongTo.user.forEach(q => {
        arrayBelongTo.push({userUid: q.uid, edit: false})
    })
    queue.belongTo = arrayBelongTo

    return queue
}

export function CreateQueueParse(queue) {
    const form = JSON.parse(JSON.stringify(queue))
    //<<<<<<<<<<Приводим к нижнему регистру и убираем пробелы>>>>>>>>
    form.strategy  = form.strategy.toLowerCase().split(' ').join('')

    //<<<<<<<<<<Приводим к нижнему регистру>>>>>>>>
    form.ringinuse = form.ringinuse.toLowerCase()

    //<<<<<<<<<<Урезаем менджеров>>>>>>>>
    const arrayMan = []
    form.belongTo.forEach(u => {
        arrayMan.push({ userUid: u.uid, edit: !!u.option.edit })
    })
    form.belongTo = arrayMan

    //<<<<<<<<<<Урезаем агентов>>>>>>>>
    const arrayAgent = []
    if(form.relatedWith.userUid) {
        form.relatedWith.userUid.forEach((a, i) => {
            arrayAgent.push({userUid: a.uid, position: i + 1})
        })
    } else {
        form.relatedWith.forEach((a, i) => {
            arrayAgent.push({userUid: a.uid, position: i + 1})
        })
    }
    form.relatedWith = arrayAgent

    return form
}

export function QueueSettings({uid, name, internalNumber, strategy, timeout, retry, ringinuse, maxlen, music, weight, joinempty, leavewhenempty, penaltymemberslimit, relatedWith, belongTo}) {
    //<<<<<<<<<<Урезаем очередь>>>>>>>>
    const queue = {uid, name, internalNumber, strategy, timeout, retry, ringinuse, maxlen, music, weight, joinempty, leavewhenempty, penaltymemberslimit, relatedWith, belongTo}


    //<<<<<<<<<<Урезаем юзеров в RelatedWith>>>>>>>>
    const objRelatedWith = []
    queue.relatedWith.forEach((val, index) => {
        objRelatedWith.push({userUid: val.uid, position: index + 1, name: val.name})
    })

    queue.relatedWith = objRelatedWith

    //<<<<<<<<<<Урезаем юзеров в BelongTo>>>>>>>>
    const arrayBelongTo = []
    queue.belongTo.forEach(q => {
        arrayBelongTo.push({userUid: q.uid, edit: q.option.edit})
    })

    queue.belongTo = arrayBelongTo
    return queue
}
