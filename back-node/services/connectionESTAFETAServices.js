///Pending service Estafeta
const axios = require('axios');
const oauth = require('axios-oauth-client');
const getClientCredentials = oauth.client(axios.create(), {
    url: 'https://apiqa.estafeta.com:8443/auth/oauth/v2/token',
    grant_type: 'client_credentials',
    client_id: 'l75b30c5d4866942f6baa2963ba4ca2b26',
    client_secret: 'bde857125970446ba047bc4e01a902dd',
    scope: 'execute',
});

const mainUrl = "https://labelqa.estafeta.com/v1/"
const waybills = "wayBills?outputType=FILE_PDF&outputGroup=REQUEST&responseMode=SYNC_INLINE&printingTemplate=NORMAL_TIPO7_ZEBRAORI"
const rateRequest = "https://wscotizadorqa.estafeta.com/v2/FrecuenciaCotizadorOP/frecuenciacotizador"


module.exports = {
    generateLabel: async (dataToSend) => {
        const bearerToken = await getClientCredentials()
        const bearerStringWithToken = "Bearer " + bearerToken.access_token
        const config = {
            headers: {
                apiKey: "l75b30c5d4866942f6baa2963ba4ca2b26",
                Authorization: bearerStringWithToken
            }
        }
        const resolvedRequest = await axios
            .post(mainUrl + waybills, dataToSend, config
            )
            .then(res => {
                return res.data
            })
            .catch(error => {
                console.error(error);
                return error
            });
        return await resolvedRequest
    },

    getRates: async (dataToSend) => {
        const bearerToken = await getClientCredentials()
        const bearerStringWithToken = "Bearer " + bearerToken.access_token
        const config = {
            headers: {
                apiKey: "l75b30c5d4866942f6baa2963ba4ca2b26",
                Authorization: bearerStringWithToken
            }
        }
        const resolvedRequest = await axios
            .post(rateRequest, dataToSend, config)
            .then(res => {
                return res.data
            })
            .catch(error => {
                console.error(error)
                return error
            })
        return await resolvedRequest
    }
}