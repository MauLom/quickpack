const axios = require('axios');
const urlRequestZone = "https://quickpack-back-al2vij23ta-uc.a.run.app/getZoneRequest"


module.exports = {
    getZone: async (originZip, destinyZip) => {
        const resolvedZone = await axios
            .get(urlRequestZone, { params: { AA01: originZip, BB01: destinyZip } })
            .then(res => {
                return res.data
            })
            .catch(error => {

                return error
            })
        return resolvedZone
    }
}