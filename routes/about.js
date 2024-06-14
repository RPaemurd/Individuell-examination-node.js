import express from 'express';
const router = express.Router();

//const aboutDB = new nedb({ filename: 'about.db', autoload: true });



router.get('/', async (req, res) => {
  try {
    // const aboutText = await aboutDB.find({});
    console.log("Temp text", aboutText);
    res.json(aboutText);
  } catch (error) {
    console.error("Error fetching about info:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
//export { aboutDB };