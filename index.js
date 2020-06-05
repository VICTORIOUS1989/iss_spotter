const { fetchMyIP } = require('./iss');
const { fetcfetchCoordsByIPhMyIP } = require('./iss');
const { nextISSTimesForMyLocation } = require('./iss');

/*
fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:' , ip);
});
*/
//fetcfetchCoordsByIPhMyIP ('174.112.132.130' , callback);


nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  printPassTimes(passTimes);
});
