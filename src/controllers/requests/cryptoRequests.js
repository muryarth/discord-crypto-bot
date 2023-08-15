const baseUrl = "https://data.messari.io/api/v1";

export default class CryptoRequests {

    // Pega as primeiras 20 cryptos disponíveis
    static async GetAllAssets() {
        try {
            const response = await fetch(`${baseUrl}/assets?fields=id,slug,symbol,metrics/market_data/price_usd`);

            if (response.ok) {
                const { data } = await response.json();

                const options = data.map(asset => `$crypto ${asset.symbol}`);

                const results = options.join('\n');

                return ({
                    status: response.status,
                    results: results
                });
            }

        } catch (error) {

            //Caso ocorra algum erro interno
            console.error('Fetch error:', error);

            return ({
                status: 500,
                message: `[Erro Interno] ${error.message}`
            });
        }
    }

    static async GetAssetValue(token) {
        try {
            const response = await fetch(`${baseUrl}/assets/${token}/metrics/market-data`);

            //Caso encontre a moeda
            if (response.ok) {
                const { data } = await response.json();

                const formattedPrice = data.market_data.price_usd > 1 ?
                    data.market_data.price_usd.toFixed(2) :
                    data.market_data.price_usd;

                return ({
                    status: response.status,
                    results: {
                        assetName: data.Asset.name,
                        price: formattedPrice,
                    }
                });
            }

            //Caso não encontre a moeda
            return ({
                status: response.status,
                message: `[Erro] Token não esperado: ${token}`
            });

        } catch (error) {

            //Caso ocorra algum erro interno
            console.error('Fetch error:', error);

            return ({
                status: 500,
                message: `[Erro Interno] ${error.message}`
            });
        }
    }
}