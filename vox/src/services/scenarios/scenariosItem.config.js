import {getParentItem} from '@/lib/parse.scenarios'
import { v4 as uuidv4 } from 'uuid'

class Item {
    constructor(config) {
        this.schema = config.schema
        this.category = config.category
        this.next = config.next ?? []
        this.extra = config.extra ?? {}
    }

    static setIVRKey(obj, parentItem) {
        if(parentItem?.schema === 'ivr') obj.extra.ivr = obj.extra.ivr ?? ''
        if(obj.schema === 'ivr') {
            obj.next.forEach(item => {
                item.extra.ivr = item.extra.ivr ?? ''
            })
        }
        return obj
    }


    static deleteIVRKeys(config) {
        if(config.schema !== 'ivr') {
            config.next = config.next.filter(el => el.schema !== 'hangup')
            if(config.next[0]) {
                config.next = [config.next[0]]
                if(config.next[0]?.extra?.ivr) {
                    delete config.next[0].extra.ivr
                }
            }
        }
        return config
    }

    static getItem(config, scenario) {
        const parentItem = getParentItem(scenario, config)
        const returnObj = new this(config)
        this.deleteIVRKeys(returnObj)
        this.setIVRKey(returnObj, parentItem)
        return returnObj
    }
}


export class DialItem extends Item {
    constructor(config) {
        super(config)
        this.options = {
            callWait: config.options?.callWait ?? false,
            moh: config.options?.moh ?? false,
            dialTime: config.options?.dialTime ?? 15,
            number: config.options?.number
        }
    }
}

export class QueueItem extends Item {
    constructor(config) {
        super(config)
        this.options = {
            maxWait: config.options?.maxWait ?? 60,
            moh: config.options?.queueMoh ?? false,
            name: config.options?.name,
            number: config.options?.number
        }
    }
}

export class VNumberItem extends Item {
    constructor(config) {
        super(config)
        this.options = {
            name: config.options?.name ?? null, 
	        externalNumbers: config.options?.externalNumbers ?? []
        }
    }
}

export class AnnouncementItem extends Item {
    constructor(config) {
        super(config)
        this.options = {
            filename: config.options?.filename ?? 'asd', 
	        filePath: config.options?.filePath ?? 'asd',
            skip: config.options?.skip ?? false
        }
    }
}

export class WaitItem extends Item {
    constructor(config) {
        super(config)
        this.options = {
            second: config.options?.second ?? 5
        }
    }
}

export class IVRItem extends Item {
    constructor(config) {
        super(config)
        this.options = {
            record: config.options?.record ?? 'asd',
            directcall: config.options?.directcall ?? true,
            timeout: config.options?.timeout ?? 5, 
            digitsTimeout: config.options?.digitsTimeout ?? 2,
            timeoutAttempts: config.options?.timeoutAttempts ?? 3,
            invalidAttempts: config.options?.invalidAttempts ?? 3,
            invalidAnnouncement: config.options?.invalidAnnouncement ?? 'asd',
            timeoutAnnouncement: config.options?.timeoutAnnouncement ?? 21,  //поменять на строку
            repeatAnnouncement: config.options?.repeatAnnouncement ?? 'asd'
        }

        const defaultIVRChildItemConfig = (key) => {
            const config = {
                category: uuidv4(),
                extra: {
                    ivr: key
                },
                schema: 'hangup',
                next: []
            }
            return new HangupItem(config)
        }

        (() => {
            if(!this.next.length) {
                this.next.push(defaultIVRChildItemConfig('timeout'))
                this.next.push(defaultIVRChildItemConfig('invalid'))
            }
            if(!this.next.filter(el => el.extra.ivr === 'timeout').length) {
                this.next.push(defaultIVRChildItemConfig('timeout'))
            }
            if(!this.next.filter(el => el.extra.ivr === 'invalid').length) {
                this.next.push(defaultIVRChildItemConfig('invalid'))
            }
        })()

    }
}

export class HangupItem extends Item {
    constructor(config) {
        super(config)
        this.next = []
        this.options = {}
    }
}
