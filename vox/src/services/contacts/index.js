import { FavoritesContacts } from "./favoritesContacts"
import { v4 as uuidv4 } from 'uuid';
import initialContact from "./initialContact";

export const ContactService = {
    getAll() {
        return FavoritesContacts.getAll()
    },
    search(text) {
        const phoneNumberRegex = /\b[\+]?[(]?[0-9]{2,6}[)]?[-\s\.]?[-\s\/\.0-9]{3,15}\b/m
        const emailAddressRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i
        return FavoritesContacts.favoriteContactsSearch(text, phoneNumberRegex, emailAddressRegex)
    },
    isInFavorite(contact) {
        return FavoritesContacts.isInFavorite(contact)
    },
    addContact(contactProp) {
        return FavoritesContacts.favoriteContactsParser(
            { ...contactProp, recordID: uuidv4() },
            'add'
        )
    },
    deleteContact(contactProp) {
        return FavoritesContacts.favoriteContactsParser(contactProp, 'delete')
    },
    updateContact(contactProp) {
        return FavoritesContacts.favoriteContactsParser(contactProp, 'change')
    },
    getModifiedInitialContact(obj) {
        return {...initialContact, ...obj}
    },
    isDuplicate(contact) {
        return FavoritesContacts.isDuplicate(contact)
    }
}
