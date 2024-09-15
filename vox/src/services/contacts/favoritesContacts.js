import _ from 'lodash'

export const FavoritesContacts = {
    getAll() {
        const listOfFavoriteContacts = localStorage.getItem('favoritesContact')
        if(!listOfFavoriteContacts) return []
        return JSON.parse(listOfFavoriteContacts)
    },
    setCollectionOfFavoritesContacts(collectionOfFavoriteContacts) {
        return localStorage.setItem('favoritesContact', JSON.stringify(collectionOfFavoriteContacts))
    },
    favoriteContactsParser(contact, action) {
        const listOfFavoriteContacts = this.getAll()
        switch (action) {
            case 'delete':
                return this.setCollectionOfFavoritesContacts(this.deleteFavoriteContact(contact, listOfFavoriteContacts))
            case 'add':
                return this.setCollectionOfFavoritesContacts(this.addFavoriteContact(contact, listOfFavoriteContacts))
            case 'change':
                return this.setCollectionOfFavoritesContacts(this.changeFavoriteContact(contact, listOfFavoriteContacts))
            default:
                break
        }
    },
    favoriteContactsSearch(search, phoneNumberRegex, emailAddressRegex) {
        const listOfFavoriteContacts = this.getAll()
        if (phoneNumberRegex.test(search)) {
            return this.favoriteContactsSearchByPhoneNumber(search, listOfFavoriteContacts)
        }
        if (emailAddressRegex.test(search)) {
            return this.favoriteContactsSearchByEmail(search, listOfFavoriteContacts)
        }
        return this.favoriteContactsSearchByName(search, listOfFavoriteContacts)
    },
    favoriteContactsSearchByPhoneNumber(search, array) {
        return array.filter(el => el.phoneNumbers.filter(item => item.number.includes(search)).length)
    },
    favoriteContactsSearchByEmail(search, array) {
        return array.filter(el => el.emailAddresses.filter(item => item.email.includes(search)).length)
    },
    favoriteContactsSearchByName(search, array) {
        return array.filter(
            el => el.displayName.includes(search) ||
                el.familyName.includes(search) ||
                el.givenName.includes(search) ||
                el.middleName.includes(search) ||
                el.jobTitle.includes(search)
        )
    },
    getFavoritesListLenght() {
        const listOfFavoriteContacts = this.getAll()
        return listOfFavoriteContacts.length
    },
    deleteFavoriteContact(contact, list) {
        const localList = list.filter(el => el.recordID !== contact.recordID)
        return localList
    },
    addFavoriteContact(contact, list) {
        try {
            const length = this.getFavoritesListLenght()
            if (length >= 15) {
                throw Error('Quantity is limited')
            }
            return [...list, contact]
        } catch (error) {
            // store.dispatch(messageTopStringAction({ type: 'error', message: 'Quantity is limited' }))
            return list
        }
    },
    changeFavoriteContact(contact, list) {
        const localList = list.filter(el => el.recordID !== contact.recordID)
        return [...localList, contact]
    },
    isInFavorite(contact) {
        if (!contact) return false
        const listOfFavoriteContacts = this.getAll()
        return !!listOfFavoriteContacts?.find((el) => el.recordID === contact.recordID)
    },
    isDuplicate(contact) {
        const listOfFavoriteContacts = this.getAll()
        return !!listOfFavoriteContacts.find(el => JSON.stringify(_.omit(contact, ['recordID'])) === JSON.stringify(_.omit(el, ['recordID'])))
    }
}
