const actions = require('./actions');

setInterval(() => actions.tweet_price(), 1000 * 60 * 30);

setInterval(() => actions.tweet_otherCryptos(), 1000 * 60 * 60);





