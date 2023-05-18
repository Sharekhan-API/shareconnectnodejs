let web_socket = require('ws');

let triggers = {
	connect: [],
	tick: [],
};

let WebSocket = function (params) {
	try {
		let { access_token } = params;
		let self = this;
		let ws = null;
		let url = `wss://stream.sharekhan.com/skstream/api/stream?ACCESS_TOKEN=${access_token}`;

		this.connect = function () {
			return new Promise((resolve, reject) => {
				ws = new web_socket(url);

				ws.onmessage = function (evt) {
					let result = evt.data;

					trigger('tick', [result]);

					resolve(result);
				};

				ws.onerror = function (evt) {
					self.connect();
					reject(evt);
				};
				ws.onclose = function (evt) {};
			});
		};
		this.subscribe = function (json_req) {
			json_req.action = json_req.action || 'subscribe';
			json_req.key = json_req.key || ['feed', 'ack'];
			json_req.value = json_req.value || [''];

			ws.send(JSON.stringify(json_req));
		};
		this.fetchData = function (json_req) {
			let { action, key, value } = json_req;
			ws.send(JSON.stringify(json_req));
		};
		this.unsubscribe = function (json_req) {
			ws.send(JSON.stringify(json_req));
		};

		this.on = function (e, callback) {
			if (triggers.hasOwnProperty(e)) {
				triggers[e].push(callback);
			}
		};

		this.close = function () {
			ws.close();
		};
	} catch (error) {
		throw error;
	}
};

function trigger(e, args) {
	if (!triggers[e]) return;
	for (var n = 0; n < triggers[e].length; n++) {
		triggers[e][n].apply(triggers[e][n], args ? args : []);
	}
}

module.exports = WebSocket;
