export default function DepartmentChangedParse(form) {
    const changedDep = {}
    //<<<<<<<<<<Урезаем менджеров>>>>>>>>
    const arrayMan = []
    form.belongTo.user.forEach(u => {
        arrayMan.push({ userUid: u.uid, edit: !!u.option.edit })
    })
    changedDep.belongTo = arrayMan

    //<<<<<<<<<<Урезаем номера>>>>>>>>
    const arrayNum = []
    form.relatedWith.externalNumber.forEach(n => {
        arrayNum.push(n.uid)
    })
    changedDep.relatedWith = { externalNumberUid: arrayNum }
    //<<<<<<<<<<Урезаем агентов>>>>>>>>
    const arrayAgent = []
    form.relatedWith.user.forEach(a => {
        arrayAgent.push(a.uid)
    })
    changedDep.relatedWith.userUid = arrayAgent
    changedDep.name = form.name
    changedDep.uid = form.uid
    return changedDep
}
