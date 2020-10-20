import {
    ContactModel,
    DeleteContactProps,
    FetchContactProps,
    FetchContactsProps,
    SaveContactProps,
} from '../models/contact.model';

class ContactService {
    getContacts(_data: FetchContactsProps): ContactModel[] {
        return this.getContactsFromStorage();
    };

    getContact(data: FetchContactProps): ContactModel | null {
        const contacts = this.getContactsFromStorage();
        const { id } = data;

        return contacts.find((contact: ContactModel) => contact.id === +id) || null;
    };

    saveContact(data: SaveContactProps): void {
        const { id } = data;

        return id ? this.updateContact(data) : this.createContact(data);
    };

    deleteContact(data: DeleteContactProps): void {
        const contacts = this.getContactsFromStorage();
        const { id: idToDelete } = data;
        const isNotContactToDelete = (contact: ContactModel) => contact.id !== idToDelete;
        const updatedContacts = contacts.filter(isNotContactToDelete);

        this.saveContactsToStorage(updatedContacts);
    }

    private getContactsFromStorage(): ContactModel[] {
        const contactsInStorage = localStorage.getItem('contacts');

        return (contactsInStorage ? JSON.parse(contactsInStorage) : []) as ContactModel[];
    }

    private saveContactsToStorage(contacts: ContactModel[]): void {
        localStorage.setItem('contacts', JSON.stringify(contacts));
    }

    private createContact(contact: SaveContactProps) {
        const contacts = this.getContactsFromStorage();
        const newId = contacts.length ? contacts[contacts.length - 1].id + 1 : 1;

        contacts.push({ ...contact, id: newId });

        this.saveContactsToStorage(contacts);
    }

    private updateContact(contactUpdate: SaveContactProps) {
        const contacts = this.getContactsFromStorage();
        const { id: idToUpdate, ...restContactUpdate } = contactUpdate;
        const updatedContacts = contacts.map((contact: ContactModel) => {
            return contact.id === +idToUpdate! ? { ...contact, ...restContactUpdate } : contact;
        });

        this.saveContactsToStorage(updatedContacts);
    }
}

export const contactService = new ContactService();
