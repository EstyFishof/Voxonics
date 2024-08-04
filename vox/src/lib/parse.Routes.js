import {newRoute} from '@/store/initial.state.js'
import _ from 'lodash'

export function parseRoutes(obj) {
    const returnObj = {}
    returnObj.externalNumberUid = obj.externalNumber?.uid || null
    returnObj.departmentUid = obj.department?.uid || null
    returnObj.preferred = obj.preferred
    returnObj.directionUid = obj.direction.uid
    returnObj.priority = obj.priority
    returnObj.allowed = obj.allowed
    
    return returnObj
}

export function updateRoutes(list, payload) {
    return list.map(item => {
        item.route = item.route.map(el => {
            if(el.uid === payload.uid) {
                el = payload
            }
            return el
        })
        item.route = _.sortBy(item.route, ['direction.code', 'priority'])
        return item
    })
}

export function createRoute(list, payload) {
    return list.map(item => {
        if(item.uid === payload.userUid) {
            item.route.push(payload.route)
            item.edit = false
            item.newRoute = JSON.parse(JSON.stringify(newRoute))
        }
        item.route = _.sortBy(item.route, ['direction.code', 'priority'])
        return item
    })
}

export function deleteRoute(list, payload) {
    return list.map(item => {
        if(item.uid === payload.userUid) {
            item.route = item.route.filter(el => el.uid !== payload.routeUid)
        }
        return item
    })
}

export function updateUsersRoute(list, payload) {
    return list.map(item => {
        if(item.uid === payload.userUid) {
            item.route = payload.routes
        }
        return item
    })
}

export function sortUsersRoutes(list) {
    return list.map(item => {
        item.route = _.sortBy(item.route, ['direction.code', 'priority'])
        return item
    })
}

export function usersForLayout(listOfUsers) {
    return listOfUsers.map(user => ({
        uid: user.uid, 
        name: user.name, 
        internalNumber: user.internalNumber, 
        departments: user.relatedWith.department, 
        route: [],
    }))
}

export function addUserRoutes(listOfUsers, {data, uid}) {
    return listOfUsers.map(user => {
        if(user.uid === uid) {
            user.route = JSON.parse(JSON.stringify(data))
        }
        return user
    })
}
