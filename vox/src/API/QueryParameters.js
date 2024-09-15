export default class QueryParameters {
    peerPage = 9
    sort = ''
    page = 1
    search = ''
    order = 'asc'
    role = ''
    country = ''
    number = ''
    description = ''

    constructor(config) {
        for (const [key, value] of Object.entries(config)) {
            if (value !== undefined) {
                this[key] = value
            }
        }
    }
}
