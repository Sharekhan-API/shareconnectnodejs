let { SharekhanApi, WebSocket } = require('../lib');

let sharekhan_api = new SharekhanApi({
	api_key: 'YOUR_API_KEY',
	customer_id: 'YOUR_CUSTOMER_ID',
	// OPTIONAL  If user does not have valid access token then use generateSession method
	// access_token:YOUR_ACCESS_TOKEN
});

// sharekhan_api
// 	.generateSessionWithVersionID(
// 		'YOUR_REQUEST_TOKEN',
// 		'YOUR_SECRET_KEY',
// 		'VERSION_ID'
// 	)
// 	// pass request token in generateSession method as an argument
// 	.then((data) => {
// 		console.log('data::::::', data);
// 	});

// sharekhan_api
// 	.generateSessionWithoutVersionID(
// 		'YOUR_REQUEST_TOKEN',
// 		'YOUR_SECRET_KEY'
// 	)
// 	.then((data) => {
// 		console.log('data::::::', data);
// 	});

// let exchange = 'MX';
// sharekhan_api.getFundsDetails(exchange).then((fund) => {
// 	console.log('funds::', fund);
// });

// sharekhan_api
// 	.placeNewOrder({
// 		customerId: XXXX,
// 		scripCode: 10666,
// 		tradingSymbol: 'PNB',
// 		exchange: 'NC',
// 		transactionType: 'B',
// 		quantity: 1,
// 		disclosedQty: 0,
// 		price: '42.05',
// 		triggerPrice: '0',
// 		rmsCode: 'ANY',
// 		afterHour: 'N',
// 		orderType: 'NORMAL',
// 		channelUser: 'XXXX',
// 		validity: 'GFD',
// 		requestType: 'NEW',
// 		productType: 'INVESTMENT',
// 		// instrumentType: 'fs',
// 		// strikePrice: '-1',
// 		// expiry: '28/04/2023',
// 		// optionType: 'XX',
// 	})
// 	.then((fund) => {
// 		console.log('placeNewOrder::', fund);
// 	});

// sharekhan_api
// 	.modifyOrder({
// 		orderId: 'XXXX',
// 		customerId: 1487617,
// 		scripCode: 10666,
// 		tradingSymbol: 'PNB',
// 		exchange: 'NC',
// 		transactionType: 'B',
// 		quantity: 2,
// 		disclosedQty: 0,
// 		price: '42.15',
// 		triggerPrice: '0',
// 		rmsCode: 'SKNSE2',
// 		afterHour: 'N',
// 		orderType: 'NORMAL',
// 		channelUser: 'XXXX',
// 		validity: 'GFD',
// 		requestType: 'MODIFY',
// 		productType: 'INVESTMENT',
// 	})
// 	.then((data) => {
// 		console.log('modify', data);
// 	});

// sharekhan_api
// 	.cancelOrder({
// 		orderId: 'XXXX',
// 		customerId: XXXX,
// 		scripCode: 10666,
// 		tradingSymbol: 'PNB',
// 		exchange: 'NC',
// 		transactionType: 'B',
// 		quantity: 2,
// 		disclosedQty: 0,
// 		price: '42.55',
// 		triggerPrice: '0',
// 		rmsCode: 'SKNSE2',
// 		afterHour: 'N',
// 		orderType: 'NORMAL',
// 		channelUser: 'XXXX',
// 		validity: 'GFD',
// 		requestType: 'CANCEL',
// 		productType: 'INVESTMENT',
// 	})
// 	.then((data) => {
// 		console.log('Cancel', data);
// 	});

// sharekhan_api.getAllOrdersHistoryOfDay().then((data) => {
// 	console.log('orderReports', data);
// });

// sharekhan_api.getAllTradesHistory().then((data) => {
// 	console.log('position report', data);
// });

// sharekhan_api.getHistoryByOrderID('MX', '259462024').then((data) => {
// 	console.log('orderDetails', data);
// });

// let token ="YOUR_TOKEN"
// SetToken method
// sharekhan_api.setAccessToken(token);

//fundDetails method
// let exchange = 'NC';
//return sharekhan_api.getFundsDetails(exchange)

//return  sharekhan_api.placeNewOrder({
// "customerId": XXXX,
// "scripCode": 2475,
// "tradingSymbol": "ONGC",
// "exchange": "NC",
// "transactionType": "B",
// "quantity": 1,
// "disclosedQty": 0,
// "price": "92.50",
// "triggerPrice": "0",
// "rmsCode": "ANY",
// "afterHour": "N",
// "orderType": "NORMAL",
// "channelUser": "XXXXX",
// "validity": "GFD",
// "requestType": "NEW",
// "productType": "INVESTMENT"
// })

//modify order
// return sharekhan_api.modifyOrder({
// "orderId":"245744063"
// "customerId": XXXX,
// "scripCode": 2475,
// "tradingSymbol": "ONGC",
// "exchange": "NC",
// "transactionType": "B",
// "quantity": 1,
// "disclosedQty": 0,
// "executedQty":0,
// "price": "95",
// "triggerPrice": "0",
// "rmsCode": "SKSIMNSE1",
// "afterHour": "N",
// "orderType": "NORMAL",
// "channelUser": "XXXXX",
// "validity": "GFD",
// "requestType": "MODIFY",
// "productType": "INVESTMENT"
// })

//cancel order
//return  sharekhan_api.cancelOrder({
// "orderId":"245744063"
// "customerId": XXXX,
// "scripCode": 2475,
// "tradingSymbol": "ONGC",
// "exchange": "NC",
// "transactionType": "B",
// "quantity": 1,
// "disclosedQty": 0,
// "executedQty":0,
// "price": "95",
// "triggerPrice": "0",
// "rmsCode": "SKSIMNSE1",
// "afterHour": "N",
// "orderType": "NORMAL",
// "channelUser": "XXXXX",
// "validity": "GFD",
// "requestType": "CANCEL",
// "productType": "INVESTMENT"
// })

//one day trade history
//return sharekhan_api.getAllOrdersHistoryOfDay()

//all trade history
//return  sharekhan_api.getAllTradesHistory()

// let params = {
// 	exchange: 'NC',
// 	orderID: 3329341,
// };

//hitory by order id
//return  sharekhan_api.getHistoryByOrderID(params)

//trade by order id
// return sharekhan_api.getTradeGeneratedByOrder(exchange, orderID);

//holding details
//return  sharekhan_api.getHoldings()

//active script details
//return  sharekhan_api.getActiveScriptOfDay('NC')

//script details
//return  sharekhan_api.getScriptMasterCSV('NC')
//
// 		}
// 	})
// 	.catch((error) => {
// 		console.log('swnbekj', error);
// 	});

//

// ########################### Socket Sample Code Starts Here ###########################

// let ws = new WebSocket({
// 	access_token:"YOUR_ACCESS_TOKEN"
// });

// ws.connect().then(() => {
// 	let subscribe = {
// 		action: 'subscribe',
// 		key: ['feed'],
// 		value: [''],
// 	};
// 	let feedData = {
// 		action: 'feed',
// 		key: ['ltp'],
// 		value: ['MX252904'],
// 	};
// 	// let unsubscribe = {
// 	// 	action: 'subscribe',
// 	// 	key: ['feed'],
// 	// 	value: ['NC22,NF37833,NF37834'],
// 	// };

// 	let res = ws.subscribe(subscribe);
// 	console.log(res);
// 	ws.fetchData(feedData);
// 	// ws.unsubscribe(unsubscribe);

// 	ws.on('tick', receiveTick);

// 	function receiveTick(data) {
// 		console.log('receiveTick:::::', data);
// 	}
// });

// ########################### Socket Sample Code Ends Here ###########################
