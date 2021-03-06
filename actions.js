const twit = require('twit');
const config = require('./config');
const axios = require('axios');
const xml2js = require('xml2js');

var T = new twit({
	consumer_key: config.consumer_key,
	consumer_secret: config.consumer_secret,
	access_token: config.access_token,
	access_token_secret: config.access_token_secret,
});


const tweetBTC = () => {
	axios.get('https://api.coindesk.com/v1/bpi/currentprice.json')
	.then((res) => {
		const status = `
			${res.data.time.updated} \n\n$${res.data.bpi.USD.rate.split('.')[0]} USD \n€${res.data.bpi.EUR.rate.split('.')[0]} EUR \n£${res.data.bpi.GBP.rate.split('.')[0]} GBP
			\n
			#Bitcoin #BTC 🥴
			`;
		console.log("BTC Tweeted")
		T.post('statuses/update', { status }, function(err, data, response) {
			if(err)
				console.log(err);
		})
	})
	.catch(e => console.log(e));	
}

const tweetCryptos = () => {
	axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=LTC,ETH,XLM,XRP,BCH&tsyms=USD,EUR', { 
		headers: {
			apiKey: config.api_key
		}})
		.then((res) => {
			const status = `
${new Date().toISOString().replace("T", ' ').replace(/\..+/, '')} \n
#Etherum: $${res.data.ETH.USD} | €${res.data.ETH.EUR} 
#Litecoin: $${res.data.LTC.USD} | €${res.data.LTC.EUR}
#Ripple: $${res.data.XRP.USD} | €${res.data.XRP.EUR} 
#BitcoinCash: ${res.data.BCH.USD} | €${res.data.BCH.EUR}
#Stellar: $${res.data.XLM.USD} | €${res.data.XLM.EUR} 

#Cryptocurrencies prices provided by @CryptoCompare 🥴`
			console.log("Other cryptos tweeted");
			T.post('statuses/update', { status }, function(err, data, response) {
				if(err)
					console.log(err);
			})
		})
}

const tweetNew = () => {
	axios.get('https://www.ccn.com/news/feed/')
			.then((res) => {
				xml2js.parseString(res.data, (err, data) => {
					
					let status = `
${data.rss.channel[0].item[0].title}\n

${data.rss.channel[0].item[0].link}\n

`
					data.rss.channel[0].item[0].category.forEach((tag) => {
						let hashtag = "#" + tag.replace(/ /g, "");
						status = status + " " + hashtag;
					})

					T.post('statuses/update', { status }, function(err, data, response) {
						if(err)
							console.log(err);
					})

				})
			})
}

module.exports = { tweetBTC , tweetCryptos, tweetNew };