#!/usr/bin/env node

'use strict';

const customers = require("./data/customers.json");
const _ = require("lodown-lindseyacason");

/**
 * 1. Import your lodown module using the require() method, 
 *    using the string 'lodown-<my-username>', or whatever 
 *    name with which you published your npm lodown project.
 * 
 * 2. Solve all problems as outlined in the README.
 */



/////////////////////////////////////////
//Find the number of males ->3

function males(customers) {
    var count = 0;
_.each(customers, function(element, index, collection) {
    if (element.gender === "male") {
        count += 1;
    }
    });
    return count;
};
console.log(males(customers));


/////////////////////////////////////////////////////
//Find the number of females ->4

 
function female(customers) {
    var count = 0;
_.each(customers, function(element, index, collection) {
    if (element.gender === "female") {
        count += 1;
    }
    });
    return count;
};
console.log(female(customers));

////////////////////////////////////////////////////
//Find the name and age of the oldest customer.
//set Var to store a value
//find property age in each object
//find property age with highest value 
//set var to value of highest age value
//return element age value
//if element age = oldes value
//return name

        var highestAge = 0;
        var highestName= "";
    function highest(customers) {
        _.each(customers, function(element, index, collection) {
            if(element.age >= highestAge) {
                highestAge = element.age;
            }if(highestAge === element.age) {
                highestName = element.name;
            }

        });
        return highestName + ", " + highestAge;
    }
        console.log(highest(customers));
        
/////////////////////////////////////
//Find the name and age of the youngest customer.

// function lowest(customers) {
//     var youngestAge = [];
//     var youngestName = [];
//   var ages = _.pluck(customers, 'age');
//         var sort2 = function numberAs(a,b) {
//             return a-b;
//         };
        
//      var lowestAge = ages.sort(sort2);
//      lowestAge = lowestAge[0];
     
//      _.each(customers, function(element, index, collection) {
//         if(element.age === lowestAge) {
//             youngestName.push(element.name)// + (element.age);
//             youngestAge.push(element.age);
//         }
//         });
//             return youngestName + ", " + youngestAge;
// }    
// console.log(lowest(customers));
/////////////////////////////////////////////////////////////////////



function youngestCustomer(collection) {
    let customersAges = [];
    let customersName = [];
    let youngCustomer = {};
    _.each(collection, function(element, i, collection) {
      customersAges.push(element.age); 
    });
    customersAges.sort(function(a, b){return a-b});
    youngCustomer.age = _.first(customersAges, 1);
    _.each(collection, function(element, i, collection) {
        if (element.age === customersAges[0]) {
            customersName.push(element.name);
        }
    });
    youngCustomer.name = customersName;
    return youngCustomer;
};
console.log(youngestCustomer(customers));



/////////////////////////////////////////////////
function average(customers) {
    var a = customers.map(function(e,i,c) {
    return e.balance;
});

var b = a.map(function(e, i, c) {
  return a[i].replace('$', "");

});

var c = b.map(function(e,i,c) {
  return b[i].replace(',', "");
});

var d = c.map(function(e,i,c){
  return parseFloat(e);
});

var averagedWhole = d.reduce(function(sum, e, i, array){
  return (sum + e);
}, 1);

var averagedResult = averagedWhole/customers.length;
var resultsDecimal = averagedResult.toFixed(2);

console.log(resultsDecimal);
}
average(customers);

////////////////////////////////////////////////////
//6. Find how many customers' names begin with an arbitrary letter.
//Write a function to answer this question, then log an answer.

function nameStartsWith(customers, letter) {
    var count= 0;
    
    _.each(customers, function(element, index, collection) {
        var littleName = element.name.toLowerCase();
        var bigName = element.name.toUpperCase();
        
        if(element.name[0] == letter) {
            count += 1;
        }else if (littleName[0] == letter){
            count +=1;
        }else if (bigName[0] == letter) {
            count +=1
        }
    });
    return count;
}



console.log(nameStartsWith(customers, 's'));

//////////////////////////////////////////////////////
// 7. Find how many customers' _friends'_ names begin with an
// arbitrary letter. Write a function to answer this question,
// // then log an answer.

var friendsNamesStartWith = function(collection, letter) {
    let allFriendsNames = [];
    let allFriends = [];
    let count = 0;
    _.each(collection, function(e, i, a) {
        let customersFriends =[];
        _.each(e.friends, function(e, i, a) {
            customersFriends.push(e.name);
        });
        allFriendsNames.push(customersFriends);
    });
    allFriends = [].concat.apply([],allFriendsNames);


   var noDups = _.unique(allFriends);

    _.each(allFriends, function(element, index, collection) {
        var littleNames = element.toLowerCase();
        var bigNames = element.toUpperCase();
        
        if(element[0] == letter) {
            count += 1;
        }else if (littleNames[0] == letter){
            count +=1;
        }else if (bigNames[0] == letter) {
            count +=1;
        }

    });
    return count;

   
   
   
};
console.log(friendsNamesStartWith(customers, "m"));
    
    
    
    
    
    
    
////////////////////////////////////////////////////
// 8. Find the names of all customers who are friend
// with a given customer (by name). i.e. Which customers
// have that customer's name in their friends list?
//
//Loop over the customers
//Then loop through the friends of customers
//condition if name == "Smith Smith" {
// push the customers name into an array.
//return arrray.length.


//console.log(customers[0].friends[0].name);

function friendsWith(customers, name) {
    var customersWhoAreFriendsWithX = [];
    _.each(customers, function(e, i, c) {
        var chicken = _.pluck(e.friends,"name");
        if(_.contains(chicken, name)){
            customersWhoAreFriendsWithX.push(e.name);
        }
        } 
    );
    return customersWhoAreFriendsWithX;
    }
    
console.log(friendsWith(customers, "Cooley Jimenez"));

    
///////////////////////////////////////////////////


///////////////////////////////////////////////////
// //9. Find the top 3 most common tags among the customers.
function topThreeTags(collection) {
    var commonTags = [];
    var allTags = [];
    _.each(collection, function (e,i,c) {
        commonTags.push(e.tags);
    });
    allTags = [].concat.apply([],commonTags);
    
    let count = allTags.reduce(function(num, tag){
    num[tag] = (num[tag] || 0) + 1;
    return num;
    } , {});
    
    let resultArray = [];
    
    for (var key in count) {
        if (count[key] > 2) {
            resultArray.push(key);
        }
    }
    return resultArray.slice(0,3);
}

console.log(topThreeTags(customers));





///////////////////////////////////////

//10.

function genders(customers) {
    var chickens = _.pluck(customers, "gender");
    const count = chickens.reduce(function(num, sex){
  num[sex] = (num[sex] || 0) + 1;
  return num;
} , {});
return count;


}console.log(genders(customers));









