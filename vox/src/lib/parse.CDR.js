export default {
    chain: {},
    minSecACtive: '',
    toScalarFilterParams(obj, duration) {
        this.minSecACtive = duration
        this.chain = JSON.parse(JSON.stringify(obj))
        for (const key in this.chain) {
            if (key === 'user') {
                this.chain[key] = this.chain[key].map(item => item.uid)
            } else if (key === 'internalNumber') {
                this.chain[key] = this.chain[key].map(item => item.internalNumber.toString())
            } else if (key === 'country') {
                this.chain[key] = this.chain[key].map(item => item.iso3).join(',')
            }
        }
        return this
    },
    checkFilterParams() {
        for (const key in this.chain) {
            const type = Array.isArray(this.chain[key]) ? 'array' : typeof this.chain[key]
            switch (type) {
                case 'array':
                    if (!this.chain[key].length) delete this.chain[key]
                    break
                case 'string':
                    if (!this.chain[key]) delete this.chain[key]
                    break
                case 'object':
                    if (typeof this.chain[key].value === 'string') {
                        if (!this.chain[key].value) delete this.chain[key]
                    } else if (Array.isArray(this.chain[key].value)) {
                        if (!this.chain[key].value.filter(i => !!i)) delete this.chain[key]
                    }
                    break
                default:
                    break
            }
        }
        return this
    },
    toStringFilterParam() {
        let query = ''
        for (const key in this.chain) {
            const type = Array.isArray(this.chain[key]) ? 'array' : typeof this.chain[key]
            switch (type) {
                case 'array':
                    query += `&${key}=${JSON.stringify(this.chain[key])}`
                    break
                case 'string':
                    query += `&${key}=${this.chain[key]}`
                    break
                case 'object':
                    if (typeof this.chain[key].value === 'string') {
                        if (this.minSecACtive === 'min') {
                            query += `&${key}=${JSON.stringify({ [this.chain[key].key]: this.chain[key].value * 60 })}`
                        } else {
                            query += `&${key}=${JSON.stringify({ [this.chain[key].key]: this.chain[key].value })}`
                        }
                    } else if (Array.isArray(this.chain[key].value)) {
                        if (this.minSecACtive === 'min') {
                            query += `&${key}=${JSON.stringify({ [this.chain[key].key]: [this.chain[key].value[0] * 60, this.chain[key].value[1] * 60] })}`
                        } else {
                            query += `&${key}=${JSON.stringify({ [this.chain[key].key]: this.chain[key].value })}`
                        }
                    } else if (typeof this.chain[key].value === 'object') {
                        query += `&${key}=${JSON.stringify(this.chain[key].value)}`
                    }
                    break
                default:
                    break
            }
        }
        return query
    },
}
