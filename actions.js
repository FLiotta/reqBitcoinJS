const twit = require('twit');
const config = require('./config');
const axios = require('axios');
var T = new twit({
	consumer_key: config.consumer_key,
	consumer_secret: config.consumer_secret,
	access_token: config.access_token,
	access_token_secret: config.access_token_secret,
});

const tweet_price = () => {
	axios.get('https://api.coindesk.com/v1/bpi/currentprice.json')
	.then((res) => {
		const status = `
			${res.data.time.updated} \n\n$${res.data.bpi.USD.rate.split('.')[0]} USD \n€${res.data.bpi.EUR.rate.split('.')[0]} EUR \n£${res.data.bpi.GBP.rate.split('.')[0]} GBP
			\n
			#Bitcoin #BTC 🥴
			`;
		console.log(status)
		T.post('statuses/update', { status }, function(err, data, response) {
			if(err)
				console.log(err);
		})
	})
	.catch(e => console.log(e));	
}

const tweet_otherCryptos = () => {
	axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=LTC,ETH,XLM,XRP,BCH&tsyms=USD,EUR', { 
		headers: {
			apiKey: config.api_key
		}})
		.then((res) => {
			const status = `
${new Date().toISOString().replace("T", ' ').replace(/\..+/, '')} \n
#Etherum: $${res.data.ETH.USD} | €${res.data.ETH.EUR} \n
#Litecoin: $${res.data.LTC.USD} | €${res.data.LTC.EUR} \n
#Ripple: $${res.data.XRP.USD} | €${res.data.XRP.EUR} \n
#BitcoinCash: ${res.data.BCH.USD} | €${res.data.BCH.EUR} \n
#Stellar: $${res.data.XLM.USD} | €${res.data.XLM.EUR} \n

#Cryptocurrencies prices provided by @CryptoCompare 🥴`
			console.log(status);
		})
}

module.exports = { tweet_price, tweet_otherCryptos };