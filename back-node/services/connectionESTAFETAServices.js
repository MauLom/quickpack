///Pending service Estafeta
const axios = require('axios');
const oauth = require('axios-oauth-client');
const getClientCredentials = oauth.client(axios.create(), {
    url: 'https://apiqa.estafeta.com:8443/auth/oauth/v2/token',
    grant_type: 'client_credentials',
    client_id: 'l74d310224e64a405b9624681a729c78f3',
    client_secret: '019f3631f0e04c3faa4f37c80eb12a7e',
    scope: 'execute',
});




const mainUrl = "https://labelqa.estafeta.com/v1/"
const waybills = "wayBills?outputType=FILE_PDF&outputGroup=REQUEST&responseMode=SYNC_INLINE&printingTemplate=NORMAL_TIPO7_ZEBRAORI"

module.exports = {

    generateLabel: async (dataToSend) => {
        const bearerToken = await getClientCredentials()
        const bearerStringWithToken = "Bearer " + bearerToken.access_token
        const config = {
            headers: {
                apiKey: "l74d310224e64a405b9624681a729c78f3",
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
    }
}