var twitter = require('twitter');

var client = new twitter({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token_key: process.env.ACCESS_TOKEN_KEY,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
});

exports.handler = (event, context, callback) => {
    // callback(null, 'Hello from Lambda');
    client.post('statuses/update', {
        status: 'Hello from Lambda'
    }, (error, tweet, response) => {
        if (!error) {
            callback(null, tweet);
        } else {
            callback(null, error);
        }
    });
};
