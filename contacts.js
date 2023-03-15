const fs = require("fs").promises;
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const products = JSON.parse(data);
  return products;
}

async function getContactById(contactId) {
  const products = await listContacts();
  const result = products.find((item) => item.id === contactId);
  if (!result) {
    return null;
  }
  return result;
}

async function removeContact(contactId) {
  const products = await listContacts();
  const idx = products.findIndex((item) => item.id === contactId);
  if (idx === -1) {
    return null;
  }
  const newProducts = products.filter((_, index) => index !== idx);
  await fs.writeFile(contactsPath, JSON.stringify(newProducts));
  return products[idx];
}

async function addContact(name, email, phone) {
  const products = await listContacts();
  const newProduct = { name, email, phone, id: v4() };
  products.push(newProduct);
  await fs.writeFile(contactsPath, JSON.stringify(products));
  return newProduct;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};