import _ from 'lodash'

export function UserParse(user) {
    const form = { ...user }
    if (form.permission.role === 'manager') {

        if (!form.manage) {
            form.manage = { department: [], queue: [] }
        }

        //<<<<<<<<<<Урезаем департаменты для менджеринга>>>>>>>>
        const arrayManDep = []
        form.manage.department.forEach(dep => {
            const d = { departmentUid: dep.uid, edit: !!dep.option.edit }
            arrayManDep.push(d)
        })
        form.manage.department = arrayManDep

        //<<<<<<<<<<Урезаем очереди для менджеринга>>>>>>>>
        const arrayManQueue = []
        form.manage.queue.forEach(queue => {
            const q = { queueUid: queue.uid, edit: !!queue.option.edit }
            arrayManQueue.push(q)
        })
        form.manage.queue = arrayManQueue
    } else {
        if (form.manage) {
            delete form.manage
        }
    }

    //<<<<<<<<<<Урезаем департаменты в которых состоит>>>>>>>>
    const arrayRelDep = []
    form.relatedWith.department.forEach(dep => {
        const d = dep.uid
        arrayRelDep.push(d)
    })
    form.relatedWith.departmentUid = arrayRelDep

    //<<<<<<<<<<Урезаем очереди в которых состоит>>>>>>>>
    const arrayRelQueue = []
    form.relatedWith.queue.forEach(queue => {
        const q = queue.uid
        arrayRelQueue.push(q)
    })
    form.relatedWith.queueUid = arrayRelQueue

    //<<<<<<<<<< Извлекаем номера >>>>>>>>
    // if (form.extra) {
    //     const externalNumber = form.extra.route[0]?.uid;
    //     form.route = [{
    //         externalNumberUid: externalNumber,
    //         directionId: '1',
    //         priority: 1,
    //         allowed: true
    //     }];
    //     delete form.extra;
    // }

    if(form.secret) {
        delete form.secret
    }

    return form
}

export function parseAgent(user) {
    const form = { ...user }
    
    delete form.secret
    delete form.manage
    delete form.route
    delete form.permission.cdr
    delete form.permission.view

    return form
}

export function parseArrayOfUsers(param) {

    let relatedWith = {
        departmentUid: [],
        queueUid: []
    }

    param.relatedWith.department.forEach(item => {
        relatedWith.departmentUid.push(item.uid)
    })

    param.relatedWith.queue.forEach(item => {
        relatedWith.queueUid.push(item.uid)
    })

    return {uid: param.uid, position: param.position, onBlock: !param.onBlock, relatedWith: relatedWith}
}

export function isEqual(initialState, currentState) {

    function mutationArrayToGetOnlyUids(array) {
        if(array) {
            return array.map(el => ({uid: el.uid, edit: el.option?.edit}))
        }
        return null
    }

    function sortByUid(array) {
        if(array) {
            return _.sortBy(array, ['uid'])
        }
        return array
    }

    function changeProperty(obj, ...args) {
        args.forEach(propName => {
            const getItem = _.get(obj, propName)
            // console.log(JSON.parse(JSON.stringify(getItem)))
            _.set(obj, propName, sortByUid(mutationArrayToGetOnlyUids(getItem)))
        })
        return obj
    }


    const initialStateWithoutObservers = JSON.parse(JSON.stringify(initialState))
    const currentStateWithoutObservers = JSON.parse(JSON.stringify(currentState))
    // console.log(initialState, currentState)
    // console.log(initialStateWithoutObservers, currentStateWithoutObservers)
    const arrayOfPropertiesName = ['relatedWith.department', 'relatedWith.queue', 'manage.department', 'manage.queue']

    
    return !_.isEqual(changeProperty(initialStateWithoutObservers, ...arrayOfPropertiesName), changeProperty(currentStateWithoutObservers, ...arrayOfPropertiesName))

}
