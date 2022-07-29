const DHLAccessUser = process.env.DHLAU
const DHLAccessPass = process.env.DHLAP
const FirebaseConfigOBJ = process.env.FBCOBJ

module.exports = {
    getVariables: () => {
        const secretsVariable = {
            "DHLAccessUser": DHLAccessUser,
            "DHLAccessPass": DHLAccessPass,
            "FirebaseConfigOBJ": FirebaseConfigOBJ
        }
        return secretsVariable;
    }

}