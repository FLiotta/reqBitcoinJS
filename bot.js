const actions = require('./actions');

setInterval(() => {
	actions.tweet_price();
}, 1000 * 60 * 60)
