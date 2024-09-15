import store from '../store'

export default function comparator(user) {
    const result = {}
    const fields = []
    store.state.userInfo.changedFields.forEach(a => {
        if (typeof store.state.userInfo.fields[a] === 'string') {
            fields.push(store.state.userInfo.fields[a])
        } else {
            store.state.userInfo.fields[a].forEach(b => {
                if (store.getters.getInitialUser[b] !== user[b]) {
                    fields.push(b)
                }
            })
        }
    })
    fields.forEach(c => {
        if (user[c] !== null) {
            result[c] = user[c]
        }
    })
    return result
}
