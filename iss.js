
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






module.exports = { fetchMyIP };
module.exports = { fetcfetchCoordsByIPhMyIP };