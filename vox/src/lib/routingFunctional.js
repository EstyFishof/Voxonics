import User from '@/API/Global.api.js'
import _ from 'lodash'
import store from '../store'

export default {
    search(bind, search = '') {
        bind.searchValue = search
        clearTimeout(bind.timer)
        bind.timer = setTimeout(() => bind.fetch(bind.activeListData, search), 800)
    },
    funScroll(bind) {
        if (bind.activeList.clientHeight + bind.activeList.scrollTop === bind.activeList.scrollHeight) {
            bind.perPage += 9
            bind.fetch(bind.activeListData, bind.activeList.querySelectorAll('input.list-related-input')[0].value)
        }
    },
    fetch(bind, prop, search = '') {
        switch (prop) {
            case 'direction':
                User.getDirections(bind.perPage, search)
                break
            case 'externalNumber':
                store.dispatch('setGlobalExternalNumbers', {peerPage: bind.perPage, number: search})
                // NumbersGettersApi.getNumbers(bind.perPage, '', '', '', search)
                break
            case 'department':
                store.dispatch('setGlobalDepartmentsList', {peerPage: bind.perPage, search})
                // if(store.getters.getPaginatorDepartment.paginator.count > bind.perPage) {
                //     store.dispatch('setGlobalDepartmentsList', {peerPage: bind.perPage, search})
                // }
                break
            case 'users':
                store.dispatch('globalUsersListRequest', {peerPage: bind.perPage, sort: '', page: 1, search})
                // if(store.getters.getPaginatorUsers.paginator.count > bind.perPage) {
                //     store.dispatch('globalUsersListRequest', {peerPage: bind.perPage, sort: '', page: 1, search})
                // }
                break
            default:
                break
        }
    },
    cancelDelete(bind) {
        bind.deleteRouteActive = {}
        bind.showDeleteComponents = false
    },
    validNewRoute(bind, item) {
        return this.externalNumberValue(item) && item.priority && item.direction.code && item.allowed !== null
    },
    setParams(bind, element, param, valueParam, type) {
        const value = type === 'number' ? +valueParam : valueParam
        element = _.set(element, param, value)
        bind.isEqual()
        bind.showList = ''
        bind.isSearch = ''
    },
    setVNumber(bind, element, type, value) {
        element.department = null
        element.externalNumber = null
        element.preferred = false
        element[type] = value
        bind.isEqual ? bind.isEqual() : null
        bind.showList = ''
    },
    setShowList(bind, param, value, prop, event) {
        bind.perPage = 9
        if (bind.activeList) bind.deleteScroll()
        if (_.get(bind, param) === value) {
            _.set(bind, param, '')
        } else {
            _.set(bind, param, value)
        }
        bind.searchValue = ''
        bind.activeListData = prop
        bind.fetch(prop)

        if (event) {
            bind.activeList = event
            bind.onscroll()
        }
    },
    externalNumberValue(element) {
        if (element.externalNumber) return element.externalNumber.number
        else if (element.department) return element.department.name
        else if (element.preferred) return 'Preferred'
        else return ''
    },
}
