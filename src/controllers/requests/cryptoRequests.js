const baseUrl = "https://data.messari.io/api/v1";

export default class CryptoRequests {
    // https://data.messari.io/api/v2/assets?fields=id,slug,symbol,metrics/market_data/price_usd
    // https://data.messari.io/api/v1/assets/${token}/metrics/market-data

    static async GetAssetValue(token) {
        try {
            const url = `${baseUrl}/assets/${token}/metrics/market-data`;

            console.log(url);

            const response = await fetch(url);

            if (!response.ok) {
                return ({
                    status: response.status,
                    message: `[Erro] Token não esperado: ${token}`
                });
            }

            const data = await response.json();
            return (data);
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }
}