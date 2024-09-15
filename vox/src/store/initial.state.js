export const user = {
    name: "",
    internalNumber: "",
    position: "",
    email: "",
    phone: "",
    avatar: "",
    location: "",
    password: "",
    confirm: "",
    secret: "",
    permission: {
        role: "",
        cdr: {
            view: "",
            listen: "",
            export: "",
            billing: ""
        },
        view: {
            billing: false
        }
    },
    relatedWith: {
        departmentUid: [],
        queueUid: [],
    },
    manage: {
        department: [],
        queue: []
    }
}

export const userReset = {
    name: "",
    internalNumber: "",
    position: "",
    email: "",
    phone: "",
    avatar: "",
    location: "",
    password: "",
    confirm: "",
    permission: {
        role: "",
        cdr: {
            view: "",
            listen: "",
            export: "",
            billing: ""
        },
        view: {
            billing: false
        }
    },
    relatedWith: {
        departmentUid: [],
        queueUid: [],
        department: [],
        queue: []
    },
    manage: {
        department: [],
        queue: []
    }
}


export const department = {
    name: "",
    relatedWith: {
        externalNumberUid: [],
        userUid: []
    },
    belongTo: []
}

export const queue = {
    name: '',
    internalNumber: '',
    strategy: '',
    timeout: '',
    ringinuse: '',
    relatedWith: {
        userUid: []
    },
    belongTo: []
}

export const newRoute = {
    direction: {},
    externalNumber: null,
    department: null,
    preferred: false,
    priority: 1,
    allowed: true,
    showAllowed: false,
    checkValid: false
}
