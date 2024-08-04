export function AgentMapParse(map) {
    let obj = {}
    map.forEach((item, index) => {
        if (!item.notUser) {
            obj[index] = item.uid
        }
    })
    return obj
}

export function AgentPause(user) {
    return {
        uid: user.uid,
        pause: +(!user.onPause)
    }
}
