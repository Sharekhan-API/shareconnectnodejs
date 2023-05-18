const crypto = require('crypto');

const AESbase64url = (token, key) => {
	try {
		const algorithm = 'aes-256-gcm';
		const iv = Buffer.from('AAAAAAAAAAAAAAAAAAAAAA==', 'base64url');
		const Secretkey = Buffer.from(key, 'utf-8');
		var decBytes = Buffer.from(token, 'base64url');
		var dec = decBytes.slice(0, decBytes.length - 16);
		var decipher = crypto.createDecipheriv(algorithm, Secretkey, iv);
		var txt = decipher.update(dec.toString('base64url'), 'base64url', 'utf8');
		let splitText = txt.split('|');
		let message = splitText[1] + '|' + splitText[0];
		var cipher = crypto.createCipheriv(algorithm, Secretkey, iv);
		var ciph =
			cipher.update(message, 'utf8', 'base64') + cipher.final('base64');
		var combinedBytes = [Buffer.from(ciph, 'base64'), cipher.getAuthTag()];
		var encData = Buffer.concat(combinedBytes).toString('base64url');
		return encData;
	} catch (error) {
		console.log('error:::', error);
	}
};

const AESbase64 = (token, key) => {
	try {
		const algorithm = 'aes-256-gcm';
		const iv = Buffer.from('AAAAAAAAAAAAAAAAAAAAAA==', 'base64');
		const Secretkey = Buffer.from(key, 'utf-8');
		var decBytes = Buffer.from(token, 'base64');
		var dec = decBytes.slice(0, decBytes.length - 16);
		var decipher = crypto.createDecipheriv(algorithm, Secretkey, iv);
		var txt = decipher.update(dec.toString('base64'), 'base64', 'utf8');
		let splitText = txt.split('|');
		let message = splitText[1] + '|' + splitText[0];
		var cipher = crypto.createCipheriv(algorithm, Secretkey, iv);
		var ciph =
			cipher.update(message, 'utf8', 'base64') + cipher.final('base64');
		var combinedBytes = [Buffer.from(ciph, 'base64'), cipher.getAuthTag()];
		var encData = Buffer.concat(combinedBytes).toString('base64');
		return encData;
	} catch (error) {
		console.log('error::', error);
	}
};
module.exports = { AESbase64url, AESbase64 };
