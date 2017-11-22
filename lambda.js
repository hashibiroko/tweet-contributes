const twitter = require('twitter');
const Xray = require('x-ray');

const x = Xray();
const userName = process.env.GITHUB_USERNAME;
const url = `https://github.com/users/${userName}/contributions`;

const client = new twitter({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token_key: process.env.ACCESS_TOKEN_KEY,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
});

const tweet = (text, func) => client
    .post('statuses/update', {status: text}, (error, tweet) => func(error, tweet));

exports.handler = (event, context, callback) => {
    x(url, 'rect', [{
        count: '@data-count',
        data: '@data-date',
    }])((err, res) => {
        let yesterday = res[res.length - 2]["count"];
        let counts = res.map(value => Number(value["count"]));
        let lastYear = counts.reduce((prev, value) => prev + value);

        console.log("public contributes");
        console.log(`yesterday: ${yesterday["count"]}`);
        console.log(`last year: ${lastYear}`);

        let text = `【コントリビュート定期 : ${userName}】`;
        text += `\n　昨日は、${yesterday} 回だったよ`;
        text += `\n　年間合計は、${lastYear} 回になったよ`;
        text += `\n　https://github.com/${userName}`;

        tweet(text, (error, tweet) => {
            if (error) {
                callback(null, error);
            } else {
                callback(null, tweet);
            }
        });
    });
};
