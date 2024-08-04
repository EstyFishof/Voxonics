export function DepartmentParse(form) {
    const dep = JSON.parse(JSON.stringify(form))
    //<<<<<<<<<<Урезаем менджеров>>>>>>>>
    const arrayMan = []
    dep.belongTo.forEach(u => {
        arrayMan.push({ userUid: u.uid, edit: !!u.option.edit })
    })
    dep.belongTo = arrayMan
    //<<<<<<<<<<Урезаем номера>>>>>>>>
    const arrayNum = []
    dep.relatedWith.externalNumberUid.forEach(n => {
        arrayNum.push(n.uid)
    })
    dep.relatedWith.externalNumberUid = arrayNum
    //<<<<<<<<<<Урезаем агентов>>>>>>>>
    const arrayAgent = []
    dep.relatedWith.userUid.forEach(a => {
        arrayAgent.push(a.uid)
    })
    dep.relatedWith.userUid = arrayAgent

    return dep
}
