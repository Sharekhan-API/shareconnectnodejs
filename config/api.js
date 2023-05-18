module.exports.API = {
	root: 'https://api.sharekhan.com/skapi/services',
	login: 'https://api.sharekhan.com/skapi/auth/login.html',
	debug: false,
	accessToken: 'access/token',
	getFunds: 'limitstmt',
	order: 'orders',
	cancelOrderById: 'cancelOrder/',
	allOrderDay: 'reports/',
	allTrades: 'trades/',
	holdings: 'holdings/',
	master: 'master/',
	masterCsv: 'master/csv/',
	intervalHistoric: 'historical/',
};

module.exports.STATUS = {
	OK: 200,
	CREATED: 201,
	BAD_PARAMETERS: 400,
	TOKEN_EXPIRED: 403,
	RESOURCE_NOT_FOUND: 404,
	MANY_REQUEST: 429,
	UNEXPECTED_ERROR: 500,
	SERVICE_ERROR: 502,
};
