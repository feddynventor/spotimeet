
module.exports = {
    validateEmail: (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase())
    },
    processResponse: (response) => {
        return response
        .json()
        .then(json => {
            if (!response.ok) {
                console.log(json)
                return Promise.reject(Object.keys(json.error).length==0 ? json.message || "Errore sconosciuto" : json.error);
            }
            return json;
        })
    },
    debugChain: (dbg)=>{
        console.log(dbg)
        return dbg;
    }
}