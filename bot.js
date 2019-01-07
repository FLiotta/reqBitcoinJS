const actions = require('./actions');


setInterval(() => {
	actions.tweetBTC();

	setTimeout(() => actions.tweetNew(), 1000 * 10);
	
}, 1000 * 60 * 30);

setInterval(() => actions.tweetCryptos(), 1000 * 60 * 60);