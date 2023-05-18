# Sharekhan Javascript Client SDK

```bash
sharekhan-api is a NodeJS library that provides a set of tools and functionalities for interacting with the Sharekhan trading platform.
With sharekhan-api, users can access a variety of trading-related information such as stock prices, market trends, historical data,
stream live market data (WebSockets), and more.It also provides the ability to execute trades and orders in real time.
```

## Installation

Install via [npm](https://www.npmjs.com/package/sharekhan-api)

```bash
npm i sharekhan-api
```

## Usage

```javascript

// package import
let { SharekhanApi, WebSocket } = require("sharekhan-api"));


// Creating an Instance
let sharekhan_api = new SharekhanApi({
	api_key: 'YOUR_API_KEY',
	customer_id: 'YOUR_CUSTOMER_ID',
	// OPTIONAL  If user does not have valid access token then use generateSession method
	// access_token:YOUR_ACCESS_TOKEN
});

// If user does not have valid access token then use generateSessionWithVersionID method to get access token with version ID
sharekhan_api
	.generateSessionWithVersionID(
		'YOUR_REQUEST_TOKEN',
		'YOUR_SECRET_KEY'
    'YOUR_VERSION_ID'
	)
  // If user does not have valid access token and version ID then use generateSessionWithoutVersionID method to get access token
	// pass request token in generateSession method as an argument
  .generateSessionWithoutVersionID(
		'YOUR_REQUEST_TOKEN',
		'YOUR_SECRET_KEY'
	)
	.then((data) => {
		console.log('data::::::', data);

    // let token ="YOUR_TOKEN"
    // SetToken method
    sharekhan_api.setAccessToken(token);

    //Retrieve fundDetails
    let exchange = 'NC';
    return sharekhan_api.getFundsDetails(exchange)

    // to place new order
    return  sharekhan_api.placeNewOrder({
    "customerId": XXXX,
    "scripCode": 2475,
    "tradingSymbol": "ONGC",
    "exchange": "NC",
    "transactionType": "B",
    "quantity": 1,
    "disclosedQty": 0,
    "price": "92.50",
    "triggerPrice": "0",
    "rmsCode": "ANY",
    "afterHour": "N",
    "orderType": "NORMAL",
    "channelUser": "XXXXX",
    "validity": "GFD",
    "requestType": "NEW",
    "productType": "INVESTMENT"
    })

    // to modify order
    return sharekhan_api.modifyOrder({
    "orderId":"XXXX"
    "customerId": XXXX,
    "scripCode": 2475,
    "tradingSymbol": "ONGC",
    "exchange": "NC",
    "transactionType": "B",
    "quantity": 1,
    "disclosedQty": 0,
    "executedQty":0,
    "price": "95",
    "triggerPrice": "0",
    "rmsCode": "SKSIMNSE1",
    "afterHour": "N",
    "orderType": "NORMAL",
    "channelUser": "XXXXX",
    "validity": "GFD",
    "requestType": "MODIFY",
    "productType": "INVESTMENT"
    })

    //to cancel order
    return  sharekhan_api.cancelOrder({
    "orderId":"XXXX"
    "customerId": XXXX,
    "scripCode": 2475,
    "tradingSymbol": "ONGC",
    "exchange": "NC",
    "transactionType": "B",
    "quantity": 1,
    "disclosedQty": 0,
    "executedQty":0,
    "price": "95",
    "triggerPrice": "0",
    "rmsCode": "SKSIMNSE1",
    "afterHour": "N",
    "orderType": "NORMAL",
    "channelUser": "XXXXX",
    "validity": "GFD",
    "requestType": "CANCEL",
    "productType": "INVESTMENT"
    })

    //Retrieve one day trade history
    return sharekhan_api.getAllOrdersHistoryOfDay()

    //Retrieve all trade history
    return  sharekhan_api.getAllTradesHistory()



    //Retrieve history by order id
    return  sharekhan_api.getHistoryByOrderID(exchange, orderID)



    //Retrieve trade by order id
    return  sharekhan_api.getTradeGeneratedByOrder(exchange, orderID)

    //Retrieve holding details
    return  sharekhan_api.getHoldings()

    //active script details
    return  sharekhan_api.getActiveScriptOfDay(exchange)


// 	})
// 	.catch((error) => {
            //Log error

// 	});

//

// ########################### Socket Sample Code Starts Here ###########################

let ws = new WebSocket({
	access_token:"YOUR_ACCESS_TOKEN"
});

ws.connect().then(() => {
	let subscribe = {
		action: 'subscribe',
		key: ['feed'],
		value: [''],
	};
	let feedData = {
		action: 'feed',
		key: ['ltp'],
		value: ['NC22,NF37833,NF37834'],
	};
	let unsubscribe = {
		action: 'subscribe',
		key: ['feed'],
		value: ['NC22,NF37833,NF37834'],
	};

	let res = ws.subscribe(subscribe);
	console.log(res);
	ws.fetchData(feedData);
	ws.unsubscribe(unsubscribe);

	ws.on('tick', receiveTick);

	function receiveTick(data) {
		console.log('receiveTick:::::', data);
	}
});

// ########################### Socket Sample Code Ends Here ###########################
```
