const express = require("express");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();
const ALL_RESTAURANTS = require("./restaurants").restaurants;






/**
 * A list of starred restaurants.
 * In a "real" application, this data would be maintained in a database.
 */
let STARRED_RESTAURANTS = [
  {
    id: "a7272cd9-26fb-44b5-8d53-9781f55175a1",
    restaurantId: "869c848c-7a58-4ed6-ab88-72ee2e8e677c",
    comment: "Best pho in NYC",
  },
  {
    id: "8df59b21-2152-4f9b-9200-95c19aa88226",
    restaurantId: "e8036613-4b72-46f6-ab5e-edd2fc7c4fe4",
    comment: "Their lunch special is the best!",
  },
];





/**
 * Feature 6: Getting the list of all starred restaurants.
 */
router.get("/", (req, res) => {
  /**
   * We need to join our starred data with the all restaurants data to get the names.
   * Normally this join would happen in the database.
   */
  const joinedStarredRestaurants = STARRED_RESTAURANTS.map(
    (starredRestaurant) => {
      const restaurant = ALL_RESTAURANTS.find(
        (restaurant) => restaurant.id === starredRestaurant.restaurantId
      );

      return {
        id: starredRestaurant.id,
        comment: starredRestaurant.comment,
        name: restaurant.name,
      };
    }
  );

  res.json(joinedStarredRestaurants);
});





/**
 * Feature 7: Getting a specific starred restaurant.
 */
router.get("/:id", (req, res) =>{

  const { id } = req.params;

  const starredRestaurant = STARRED_RESTAURANTS.find(
    (restaurant) => restaurant.id === id
  );
  if (starredRestaurant){
    const restaurant = ALL_RESTAURANTS.find(
      (restaurant) => restaurant.id === starredRestaurant.restaurantId
    );
    if (restaurant){
      res.json({
        id: starredRestaurant.id,
        comment: starredRestaurant.comment,
        name: restaurant.name,
      });
    }else{
      res.status(404).json({error: "Restaurant not found"});
    }
  }else{
    res.status(404).json({error: "Starred restaurant not found"});
  }
})




/**
 * Feature 8: Adding to your list of starred restaurants.
 */
router.post("/", (req, res) => {
  const { restaurantId, comment} = req.body;

  const alreadyStarred = STARRED_RESTAURANTS.find(
    (restaurant) => restaurant.restaurantId === restaurantId
  );

  if(alreadyStarred){
    res.status(400).json({error: "Restaurant already starred"});
  }else{
    const newStarredRestaurant = {
      id: uuidv4(),
      restaurantId,
      comment,
    };
    STARRED_RESTAURANTS.push(newStarredRestaurant);
    res.json(newStarredRestaurant);
  }
} )



/**
 * Feature 9: Deleting from your list of starred restaurants.
 */
router.delete("/:id", (req, res) => {
  const { id} = req.params;

  const index = STARRED_RESTAURANTS.findIndex(
    (restaurant) => restaurant.id === id
  );
  if (index !== -1){
    STARRED_RESTAURANTS.splice(index, 1);
    res.json({message : "Starred restaurant deleted"});
  }else {
    res.status(404).json({error: "Starred restaurant not found"});
  }
});



/**
 * Feature 10: Updating your comment of a starred restaurant.
 */
router.put("/:id", (req, res)=> {
  const { id } = req.params;
  const { comment} = req.body;

  const restaurant = STARRED_RESTAURANTS.find(
    (restaurant)=> restaurant.id === id
  );
  if (restaurant){
    restaurant.comment = comment;
    res.json(restaurant);
  }else{
    res.status(404).json({error: "Starred restaurant not found"});
    }
})



module.exports = router;