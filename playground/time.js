//Jan 1st 1970 00:00:00 am

var moment = require('moment');

var temp = moment().valueOf();
console.log(temp);

var createdAt = 1234;
var date = moment(createdAt);

console.log(date.format('h:mm a'));