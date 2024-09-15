const access = {
    isEditDepAndQueue(userInfo, properties, item) {
        return userInfo.manage[properties].filter(el => el.uid === item.uid && el.option.edit).length
    }
}

export default {
    install(Vue) {
        Vue.prototype.$access = access
    }
}
