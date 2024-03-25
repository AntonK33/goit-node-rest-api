import { writeFile } from "fs/promises";
import { nanoid } from "nanoid";
import Contact from "../models/Contacts";

const contactsPath = path.resolve("db", "contacts.json");





export const getAllContacts = () => Contact.find();

export const getContactById = (id) => Contact.findById(id); 

export const addContact = (data)=> Contact.create(data);
 
export const updateContactById = (id, data) =>
  Contact.findByIdAndUpdate(id, data, { new: true, runValidators: true }); 

export const removeContact = (id) => Contact.findByIdAndDelete(id);
  
  export const updateContactStatus = (id, favorite) =>
  Contact.findByIdAndUpdate(id, favorite, { new: true, runValidators: true });
