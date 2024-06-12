
import { Router } from 'express';
import nedb from 'nedb-promises';

const menuDB = new nedb({ filename: 'airbean.db', autoload: true });


const router = Router();

// Route to get all menu items
router.get('/', async (req, res) => {
  try {
    const menuItems = await menuDB.find({});
    console.log("All menu items:", menuItems);
    res.json(menuItems);
  } catch (error) {
    console.error("Error fetching menu items:", error);
    res.status(500).send("Internal Server Error");
  }
});



// Route to get a specific menu item by id
router.get('/:id', async (req, res) => {
  try {
    const itemId = req.params.id;
    const menuItem = await menuDB.findOne({ _id: itemId });

    if (menuItem) {
      console.log("Menu item:", menuItem);
      res.json(menuItem);
    } else {
      res.status(404).send("Menu item not found");
    }
  } catch (error) {
    console.error("Error fetching menu item:", error);
    res.status(500).send("Internal Server Error");
  }
});


export default router;
export { menuDB };

