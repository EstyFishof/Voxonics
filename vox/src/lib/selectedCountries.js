import _ from 'lodash'

export default {
    changeCountry(item, topListParam, bottomListParam, param) {
        let topList = topListParam,
            bottomList = bottomListParam,
            getCountries = []
        if (item) {
            const includes = topList.filter(c => c[param] === item[param])
            if (includes.length) {
                topList = topList.filter(c => c[param] !== item[param])
                bottomList.push(item)
            } else {
                bottomList = bottomList.filter(c => c[param] !== item[param])
                topList.push(item)
            }
            topList = _.sortBy(topList, [param])
            bottomList = _.sortBy(bottomList, [param])
            getCountries = _.concat(topList, bottomList)
        } else {
            bottomList = getCountries = _.concat(JSON.parse(JSON.stringify(topList)), JSON.parse(JSON.stringify(bottomList)))
            topList = []
        }
        return { topList, bottomList, getCountries }
    },
}
