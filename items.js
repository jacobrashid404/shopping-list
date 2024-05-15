import express from "express"
import { items } from "./fakeDb";
import { BadRequestError } from "./expressError";

const router = new express.Router();

/** GET /items: gets a list of all items in db */
router.get("", function(req, res){
  return res.json({items: items});
});

router.get("/:name", function(req, res){
  return res.json()
});

/** POST /items: accepts JSON: {name: "itemName", price: itemPrice} 
 * Adds item to items array
 * Returns JSON: {added: {name: "itemName", price: itemPrice}}
*/
router.post("", function(req, res){
  if (req.body === undefined) throw new BadRequestError();
  const name = req.body.name;
  const price = req.body.price;
  const item = {name, price};
  items.push(item);
  
  return res.json({ added: item});
});


