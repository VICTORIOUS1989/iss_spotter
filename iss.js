
const request = require ('request');

const fetchMyIP = function(callback) { 
  // use request to fetch IP address from JSON API
  const url = 'https://api.ipify.org/?format=json';
  request(url, (error , response, body)=> {
    if (error) {
      callback(error, null);
      return;
    }
    
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    
    else {
      const ip = JSON.parse(body).ip;
      callback(null, ip);
        }

  });
};


const fetchCoordsByIP  = function(ip, callback) {
  request("https://ipvigilante.com/" + ip, (error, response, body) => {
    if (error) return callback(error, null);
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP.  Response: ${body}`;
      return callback(Error(msg), null);
    }
    const { latitude, longitude } = JSON.parse(body).data;
    callback(null, { latitude, longitude });
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) return callback(error, null);
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching runtimes. Response: ${body}`;
      return callback(Error(msg), null);
    }
    const runtimes = JSON.parse(body).response;
    callback(null, runtimes);
  });
};

/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results. 
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */ 

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }
    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        return callback(error, null);
      }
      fetchISSFlyOverTimes(coords, (error, runtimes) => {
        if (error) {
          return callback(error, null);
        }
        callback(null, runtimes);
      });
    });
  });
};

module.exports = { nextISSTimesForMyLocation };

module.exports = { fetchMyIP };
module.exports = { fetcfetchCoordsByIPhMyIP };