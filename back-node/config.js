const DHLAccessUser = process.env.DHLAU
const DHLAccessPass = process.env.DHLAP
const FirebaseConfigOBJ = process.env.FBCOBJ
const enviroment = process.env.ENVIROMENT


module.exports = {
    getVariables: () => {
        const secretsVariable = {
            "DHLAccessUser": DHLAccessUser,
            "DHLAccessPass": DHLAccessPass,
            "FirebaseConfigOBJ": FirebaseConfigOBJ,
            "enviroment": enviroment
        }
        return secretsVariable;
    }

}