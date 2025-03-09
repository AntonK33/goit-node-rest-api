// import { writeFile, readFile } from "fs/promises";
// import { nanoid } from "nanoid";

// import path from 'path';
import Contact from "../models/Contact.js";

export function listContacts(filter = {}, query = {}) {
  return Contact.find(filter, "-createdAt -updatedAt", query);
}

export function addContact(data) {
  return Contact.create(data);
}

export function getContact(filter) {
  return Contact.findOne(filter);
}

export function updateOneContact(filter, data) {
  return Contact.findOneAndUpdate(filter, data, {new: true, runValidators: true});
}

export function removeContact(filter) {
  return Contact.findOneAndDelete(filter);
}
// const contactsPath = path.resolve("db", "contacts.json");



// async function listContacts() {
//   const data = await readFile(contactsPath, "utf-8");
//   return JSON.parse(data);
// }
// async function getContactById(contactId) {
//   const contacts = await listContacts();
//   const result = contacts.find((item) => item.id === contactId);
//   return result || null;
// }
// async function addContact({ name, email, phone }) {
//   const contacts = await listContacts();
//   const newContact = { id: nanoid(), name, email, phone };
//   contacts.push(newContact);
//   await writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//   return newContact;
// }
// async function updateContactById(id, data) {
//   const contacts = await listContacts();
//   const index = contacts.findIndex((item) => item.id === id);
//   if (index === -1) {
//     return null;
//   }
//   contacts[index] = { ...contacts[index], ...data };
//   await writeFile(contactsPath, JSON.stringify(contacts, null, 2));

//   return contacts[index];
// }
// async function removeContact(contactId) {
//   const contacts = await listContacts();
//   const index = contacts.findIndex((item) => item.id === contactId);
//   if (index === -1) {
//     return null;
//   }
//   const [result] = contacts.splice(index, 1);
//   await writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//   return result;
// }
// export default {
//   listContacts,
//   getContactById,
//   addContact,
//   removeContact,
//   updateContactById,
// };