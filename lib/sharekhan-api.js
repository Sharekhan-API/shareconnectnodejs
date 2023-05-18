'use strict';

const axios = require('axios');
let { API } = require('../config/api');
let { AESbase64, AESbase64url } = require('../config/utils');

let SharekhanApi = function (params) {
	let self = this;

	self.api_key = params.api_key;
	self.vender_key = params.vender_key || null;
	self.state = params.state || null;
	self.access_token = params.access_token || null;
	self.customer_id = params.customer_id;
	self.default_login_uri = API.login;
	self.debug = API.debug;
	self.root = API.root;

	let requestInstance = axios.create({
		baseURL: self.root,
		timeout: self.timeout,
		headers: {
			'Content-Type': 'application / json',
		},
	});

	// Set content type as form encoded for PUT and POST
	requestInstance.defaults.headers.post['Content-Type'] = 'application/json';
	requestInstance.defaults.headers.put['Content-Type'] = 'application/json';

	requestInstance.interceptors.request.use(function (request) {
		return request;
	});

	requestInstance.interceptors.response.use(
		(response) => {
			if (response?.status === 200) {
				if (response?.data?.success || response?.data?.status) {
					return response?.data;
				} else {
					return response;
				}
			} else {
				return response;
			}
		},
		(error) => {
			let errorObj = {};

			if (error.response?.status) {
				errorObj.status = error.response?.status;
				errorObj.message = error.response?.statusText;
			} else {
				errorObj.status = 500;
				errorObj.message = 'Error';
			}

			return errorObj;
		}
	);

	/**
	 * Used to set access_token
	 * @method setAccessToken
	 * @param {string} access_token
	 */
	self.setAccessToken = function (access_token) {
		self.access_token = access_token;
	};

	/**
	 * Description
	 * @method getLoginURL
	 */
	self.getLoginURL = function () {
		return (
			self.default_login_uri +
			'?api_key=' +
			self.api_key +
			'&vender_key=' +
			self.vender_key +
			'&state=' +
			self.state
		);
	};

	/**
	 * Description
	 * @method generateSessionVersionID
	 * @param {string} request_token
	 * @param {string} secret_key
	 * @param {string} version_id
	 */
	self.generateSessionWithVersionID = async function (
		request_token,
		secret_key,
		version_id
	) {
		try {
			let token = request_token;
			let key = secret_key;
			let versionId = version_id;

			let encData = AESbase64url(token, key);
			let body = { apiKey: self.api_key, requestToken: encData };
			if (version_id) {
				body.versionId = version_id;
			}

			let sessionresponse = post_request('accessToken', body);

			sessionresponse
				.then((response) => {
					if (response.status) {
						self.setAccessToken(response?.data?.token);
					}
				})
				.catch(function (err) {
					throw err;
				});

			return sessionresponse;
		} catch (error) {
			throw error;
		}
	};

	/**
	 * Description
	 * @method generateSessionVersionID
	 * @param {string} request_token
	 * @param {string} secret_key
	 */
	self.generateSessionWithoutVersionID = async function (
		request_token,
		secret_key
	) {
		try {
			let token = request_token;
			let key = secret_key;

			let encData = AESbase64(token, key);
			let body = { apiKey: self.api_key, requestToken: encData };

			let sessionresponse = post_request('accessToken', body);

			sessionresponse
				.then((response) => {
					if (response.status) {
						self.setAccessToken(response?.data?.token);
					}
				})
				.catch(function (err) {
					throw err;
				});

			return sessionresponse;
		} catch (error) {
			throw error;
		}
	};

	/**
	 * Description
	 * @method getFundsDetails
	 * @param {string} exchange
	 */
	self.getFundsDetails = async function (exchange) {
		if (!exchange || !self.customer_id) {
			return 'Exchange type or Customer id is missing';
		}
		return get_request(
			'getFunds',
			'null',
			null,
			null,
			`/${exchange}/${self.customer_id}`
		);
	};

	/**
	 * Description
	 * @method placeOrder
	 * @param {object} params
	 */
	self.placeNewOrder = async function (params) {
		return post_request('order', params);
	};

	/**
	 * Description
	 * @method modifyOrder
	 * @param {object} params
	 */
	self.modifyOrder = async function (params) {
		return post_request('order', params);
	};

	/**
	 * Description
	 * @method cancelOrder
	 * @param {object} params
	 */
	self.cancelOrder = async function (params) {
		return post_request('order', params);
	};

	/**
	 * Description
	 * @method getAllOrdersHistoryOfDay
	 */
	self.getAllOrdersHistoryOfDay = async function () {
		return get_request('allOrderDay', null, null, null, self.customer_id);
	};

	/**
	 * Description
	 * @method getAllTradesHistory
	 */
	self.getAllTradesHistory = async function () {
		return get_request('allTrades', null, null, null, self.customer_id);
	};

	/**
	 * Description
	 * @method getHistoryByOrderID
	 * @param {string} exchange
	 * @param {long} orderId
	 */
	self.getHistoryByOrderID = async function (exchange, orderID) {
		// let { exchange, orderID } = params;
		return get_request(
			'allOrderDay',
			null,
			null,
			null,
			`${exchange}/${self.customer_id}/${orderID}`
		);
	};

	/**
	 * Description
	 * @method getTradeGeneratedByOrder
	 * @param {string} exchange
	 * @param {long} orderId
	 */
	self.getTradeGeneratedByOrder = async function (exchange, orderID) {
		let trades = 'trades';
		return get_request(
			'allOrderDay',
			null,
			null,
			null,
			`${exchange}/${self.customer_id}/${orderID}/${trades}`
		);
	};

	/**
	 * Description
	 * @method getHoldings
	 */
	self.getHoldings = async function () {
		return get_request('holdings', null, null, null, self.customer_id);
	};

	/**
	 * Description
	 * @method getActiveScriptOfDay
	 * @param {string} exchange
	 */
	self.getActiveScriptOfDay = async function (exchange) {
		return get_request('master', null, null, null, exchange);
	};

	/**
	 * Description
	 * @method getHistoricalIntervalData
	 * @param {string} exchange
	 * @param {int} scripcode
	 * @param {string} interval
	 */
	self.getHistoricalIntervalData = async function (
		exchange,
		scripcode,
		interval
	) {
		return get_request(
			'intervalHistoric',
			null,
			null,
			null,
			`${exchange}/${scripcode}/${interval}`
		);
	};

	function get_request(
		route,
		params,
		responseType,
		responseTransformer,
		endpoints
	) {
		return request_util(
			route,
			'GET',
			params || {},
			responseType,
			responseTransformer,
			endpoints
		);
	}

	function post_request(
		route,
		params,
		responseType,
		responseTransformer,
		endpoints
	) {
		return request_util(
			route,
			'POST',
			JSON.stringify(params) || {},
			responseType,
			responseTransformer,
			endpoints
		);
	}

	function request_util(
		route,
		method,
		params,
		responseType,
		responseTransformer,
		endpoints
	) {
		let url = API[route],
			payload = null;

		if (method == 'GET' && endpoints) {
			url = API[route] + endpoints;
		}

		if (method == 'POST' && endpoints) {
			url = API[route] + endpoints;
		}

		if (method !== 'GET' || method !== 'DELETE') {
			payload = params;
		}

		let options = {
			method: method,
			url: url,
			data: params,
			headers: {},
		};

		options['headers']['Content-Type'] = 'application/json';

		options['headers']['access-token'] = self.access_token;
		options['headers']['api-key'] = self.api_key;
		if (url === 'access/token') {
			delete options['headers']['access-token'];
		}

		// Set response transformer
		if (responseTransformer) {
			options.transformResponse =
				axios.defaults.transformResponse.concat(responseTransformer);
		}

		return requestInstance.request(options);
	}
};

module.exports = SharekhanApi;
