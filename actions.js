const twit = require('twit');
const config = require('./config');
const axios = require('axios');
var T = new twit(config);

const tweet_price = () => {
	axios.get('https://api.coindesk.com/v1/bpi/currentprice.json')
	.then((res) => {
		const status = `
			${res.data.time.updated} \n\n$${res.data.bpi.USD.rate.split('.')[0]} USD \n€${res.data.bpi.EUR.rate.split('.')[0]} EUR \n£${res.data.bpi.GBP.rate.split('.')[0]} GBP
			\n
			#Bitcoin #BTC
			`;
		console.log(status)
		T.post('statuses/update', { status }, function(err, data, response) {
			if(err)
				console.log(err);
		})
	})
	.catch(e => console.log(e));	
}

module.exports = { tweet_price };