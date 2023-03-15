const contsctOperations = require("./contacts");
const { Command } = require("commander");
const program = new Command();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const products = await contsctOperations.listContacts();
      console.table(products);
      break;

    case "get":
      const product = await contsctOperations.getContactById(id);
      if (!product) {
        throw new Error(`Product with id=${id} not found`);
      }
      console.log(product);
      break;

    case "add":
      const newProduct = await contsctOperations.addContact(name, email, phone);
      console.log(newProduct);
      break;

    case "remove":
      const removeProduct = await contsctOperations.removeContact(id);
      console.log(removeProduct);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();
invokeAction(argv);