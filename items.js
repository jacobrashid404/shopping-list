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
  const name = req.body.name;
  const price = req.body.price;
  const item = { name, price };
  items.push(item);

  return res.json({ added: item });
});

/** GET /items/:name: get a single item by name in the items "DB"  */
router.get("/:name", function (req, res) {
  const name = req.params.name;
  const foundItem = items[name];

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

  const requestedItem = req.body;
  for (const item of items) {

    if (item.name === requestedItemName) {
      //Update item in "DB"
      item.name = req.body.name;
      item.price = req.body.price;
    }
  }

  res.json({ updated: items[requestedItem] });
});

/** DELETE /cats/:name: delete named item from the "DB".
 *
 * Returns: { message: "Deleted" }
*/
router.delete("/:name", function (req, res) {

  res.json({ message: "Deleted" });
});