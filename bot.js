const actions = require('./actions');

setInterval(() => actions.tweetBTC(), 1000 * 60 * 30);

setInterval(() => actions.tweetCryptos(), 1000 * 60 * 60);





