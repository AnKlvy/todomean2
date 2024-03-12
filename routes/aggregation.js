const express = require("express"); 
const router = express.Router();
const Trans = require("../models/TransModel");
const Restourant = require("../models/restaurantModel");






router.get('/aggregate', async (req, res) => {
  try {
       
      const cuisineCount = await Restourant.aggregate([
          { $group: { _id: "$cuisine", count: { $sum: 1 } } }
      ]);

  
      const brooklynRestaurants = await Restourant.find({ borough: "Brooklyn" });

      
      const sortedRestaurants = await Restourant.aggregate([
          { $sort: { name: 1 } }
      ]);

      res.json({
          cuisineCount: cuisineCount,
          brooklynRestaurants: brooklynRestaurants,
          sortedRestaurants: sortedRestaurants
      });
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }
});


Restourant.ensureIndexes();
router.get('/rest', async (req, res) => {
  try { 
      const rest = await Restourant.find({});  
      res.json(rest); 
      
      Restourant.find({}).explain("executionStats", function(err, result) {
        if (err) {
            console.error(err);
        } else {
            console.log(JSON.stringify(result, null, 2));
        }
      }).then(() => {
        console.log("Explain запроса завершен");
      }).catch((err) => {
        console.error("Ошибка при выполнении explain:", err);
      });
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }
});

Restourant.collection.getIndexes(function(err, indexes) {
  if (err) {
      console.error('Ошибка при получении индексов:', err);
  } else {
      console.log('Индексы коллекции "Restourant":', indexes);
  }
});

 
module.exports = router;


