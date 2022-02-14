/**
# Pepper sauce fulfillment

## Description

Juan Hernandez is a Shopify merchant that owns a Pepper sauce shop
with five locations: Toronto, Vancouver, Montreal, Calgary and Halifax.
He also sells online and ships his sauces across the country from one
of his brick-and-mortar locations.

The pepper sauces he sells are:

* Jalapeño (J)
* Habanero (H)
* Serrano  (S)

The inventory count for each location looks like this:

| City       |  J   |  H   |  S   |
| ---------- | ---  | ---  | ---  |
| Toronto    |  5   |  0   |  0   |
| Vancouver  | 10   |  2   |  6   |
| Montreal   |  3   |  5   |  5   |
| Calgary    |  1   | 18   |  2   |
| Halifax    | 28   |  2   | 12   |

Every time he gets an online order, he needs to figure out
which locations can fulfill that order. Write a function that
takes an order as input and outputs a list of locations which
have all the items in stock.

### Example 1:

```
Input:  {"J": 3, "H": 2, "S": 4}
Output: ["Vancouver", "Montreal", "Halifax"]
```

### Example 2:

```
Input:  {"H": 7, "S": 1}
Output: ["Calgary"]
```

### Example 3:

```
Input:  {"J": 1, "H": 1, "S": 1}
Output: ["Vancouver", "Montreal", "Calgary", "Halifax"]
```

### Example 4:

```
Input:  {"J": 4}
Output: ["Toronto", "Vancouver", "Halifax"]
```

### Example 5:

```
Input:  {"J": 6, "H": 10, "S": 8}
Output: []
```

*/

let inventory = new Map();
inventory.set('Vancouver', [{ key: 'J', qty: 10}, { key: 'H', qty: 2}, { key: 'S', qty: 6}]);
inventory.set('Toronto', [{ key: 'J', qty: 5}, { key: 'H', qty: 0}, { key: 'S', qty: 0}]);
inventory.set('Montreal', [{ key: 'J', qty: 3}, { key: 'H', qty: 5}, { key: 'S', qty: 5}]);
inventory.set('Calgary', [{ key: 'J', qty: 1}, { key: 'H', qty: 18}, { key: 'S', qty: 2}]);
inventory.set('Halifax', [{ key: 'J', qty: 28}, { key: 'H', qty: 2}, { key: 'S', qty: 12}]);

const getCities = (order) => {
  
  let keys = Object.keys(order);
  let locations = [];
  let arr = [];
  let index = 0;

  keys.forEach((key) => {
    inventory.forEach((inv, cityName) => {
        let foundSauce = inv.find((sauce) => sauce.key === key);

        if(foundSauce && order[key] <= foundSauce.qty){
            if(!locations.includes(cityName) && index == 0){ //added this line -> with that we don't have duplicates to 'locations'. I am also using index as control, so we know that any element in 'locations' have all order items.
                locations.push(cityName);
            }
        }else if(locations.includes(cityName)){ // I changed the else to an else if, so we could apply the filter function and 'remove' city names from 'locations' in case such city doesn't have the current sauce.
            locations= locations.filter(element => element !== cityName)
        }
    });
    index += 1 // added an index to control if city had all order items
  });

  return locations;
};

console.log(getCities({"J": 3, "H": 2, "S": 4}))
