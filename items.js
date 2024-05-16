import express from "express";
import { items } from "./fakeDb";
import { BadRequestError } from "./expressError";

const router = new express.Router();

/** GET /items: gets a list of all items in db */
router.get("", function (req, res) {
  return res.json({ items: items });
});

/** POST /items: accepts JSON: {name: "itemName", price: itemPrice}
 * Adds item to items array
 * Returns JSON: {added: {name: "itemName", price: itemPrice}}
*/
router.post("", function (req, res) {
  if (req.body === undefined) throw new BadRequestError();
  if (!(name in req.body) && !(price in req.body)) throw new BadRequestError();

  const name = req.body.name;
  const price = req.body.price;
  const item = { name, price };
  items.push(item);

  return res.json({ added: item });
});

/** GET /items/:name: get a single item by name in the items "DB"  */
router.get("/:name", function (req, res) {
  const itemName = req.params.name;

  //find index using item name
  const itemIndex = items.findIndex(item => item.name === itemName);

  if (itemIndex === -1) throw new BadRequestError();

  const foundItem = items[itemIndex];

  return res.json(foundItem);
});

/** PATCH /items/:name:
 * accepts JSON body like: {name: "new popsicle", price: 2.45}
 * Then modify item from fake "DB" or 404,
 * return JSON: {updated: {name: "new popsicle", price: 2.45}}
 */

router.patch("/:name", function (req, res) {
  if (req.body === undefined) throw new BadRequestError();

  const requestedItemName = req.params.name;

  for (const item of items) {

    if (item.name === requestedItemName) {
      //Update item in "DB"
      item.name = req.body.name;
      item.price = req.body.price;
      return res.json({ updated: item });
    }
  }

  //Only get here if we don't have an item with the requested name
  throw new BadRequestError();
});

/** DELETE /cats/:name: delete named item from the "DB".
 *
 * Returns: { message: "Deleted" }
*/
router.delete("/:name", function (req, res) {
  const requestedItemName = req.params.name;

  for (let i = 0; i < items.length; i++) {
    if (items[i].name === requestedItemName) {
      items.splice(i, 1);
      return res.json({ message: "Deleted" });
    }
  }

  throw new BadRequestError(`${requestedItemName} does not exist`);
});