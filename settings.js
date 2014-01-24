//import
var twitter = require('twitter');

//settings
var bot = new twitter({
    consumer_key        : 'PLACE YOUR CONSUMER_KEY',
    consumer_secret     : 'PLACE YOUR CONSUMER_SECRET',
    access_token_key    : 'PLACE YOUR ACCESS_TOKEN_KEY',
    access_token_secret : 'PLACE YOUR ACCESS_TOKEN_SECRET'
});

//module.exports
module.exports = bot;