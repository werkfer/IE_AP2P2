const axios = require('axios');
class CryptoService {
static async getCryptoPrice(crypto) {
const response = await
axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${crypto}
&vs_currencies=usd`);
return response.data;
}
}
module.exports = CryptoService;