export const allowedStatuses = ['online', 'onpause', 'paused']


export class UserDashboard {
    alwaysOnShift = false
    avatar = ''
    callIn = false
    callOut = false
    dateCreated = ''
    dateUpdated = ''
    email = null
    placeInList = 0
    internalNumber = 0
    location = null
    name = ''
    onBlock = false
    onPause = false
    onShift = false
    option = null
    phone = null
    position = ''
    secret = ''
    sip = ''
    status = ''
    statusTime = ''
    statusPhone = {
        option: null,
        sip: '',
        status: '',
        statusText: 'unavailable',
        time: 0,
        userUid: '',
    }
    talkingTo = null
    timeToView = {
        days: null,
        time: null
    }
    uid = '/'
    notUser = false

    constructor(params = {}) {
        for (const [key, value] of Object.entries(params)) {
            if (value !== undefined) {
                this[key] = value
            }
        }
    }
}

