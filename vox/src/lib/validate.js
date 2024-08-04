import {UsersGettersApi} from '@/API/getters'

export default {
    checkName(obj) {
        obj.errors.name = ""
        if (
            /^[\p{L}]+[\p{L}0-9]*?([_|-| ]{0,1}[\p{L}0-9])+$/u.test(
                obj.userInfo.name
            )
        ) {
            obj.errors.name = ""
        } else {
            obj.errors.name = "name not correct"
        }
    },
    checkPhone(obj) {
        obj.errors.phone = ""
        if (obj.userInfo.phone.length >= 15) {
            if (/^\d{15}$/.test(obj.userInfo.phone)) {
                obj.errors.phone = ""
            } else {
                obj.errors.phone = "Only digits and not longer than 15"
            }
        } else if (!obj.userInfo.phone.length) {
            obj.errors.phone = ""
        } else {
            if (!/[0-9]/.test(obj.userInfo.phone)) {
                obj.errors.phone = "Only digits and not longer than 15"
            }
        }
    },
    checkEmail(obj) {
        obj.errors.email = ""
        if (obj.userInfo.email.length > 0) {
            if (
                /^\w+([/.-]?\w+)*@\w+([/.-]?\w+)*(\.\w{2,3})+$/.test(
                    obj.userInfo.email
                )
            ) {
                obj.errors.email = ""
            } else {
                obj.errors.email = "Email must contain symbol '@' and '.' "
            }
        }
    },
    checkInternalNumber(obj, userNumber) {
        obj.errors.internalNumber = ""
        if (obj.userInfo.internalNumber.length === 3) {
            obj.errors.internalNumber = ""
            if (+userNumber !== +obj.userInfo.internalNumber) {
                
                UsersGettersApi.getUsers({search: obj.userInfo.internalNumber})
                    .then((data) => {
                        if (data.data.data[0].internalNumber === +obj.userInfo.internalNumber) {
                            obj.errors.internalNumber = 'External number already exists'
                        }
                    })
            }
        } else if (obj.userInfo.internalNumber.length) {
            obj.errors.internalNumber = "Must contain 3 digits"
        }
    },
    checkPassword(obj) {
        obj.errors.password = ""
        if (/^[A-Za-z0-9]+[!@#$%^&*A-Za-z0-9]*?[A-Za-z0-9]+$/.test(obj.userInfo.password) && obj.userInfo.password.length >= 6 && obj.userInfo.password.length <= 16) {
            obj.errors.password = ""
        } else {
            obj.errors.password =
                "Must contain 6-16 symbols and do not contain special symbols "
        }
        obj.confirmPassword(obj)
    },
    confirmPassword(obj) {
        obj.errors.confirm = ""
        if (obj.userInfo.confirm.length) {
            obj.userInfo.password === obj.userInfo.confirm
                ? (obj.errors.confirm = "")
                : (obj.errors.confirm = "Does not match")
        }
    }
}
