const SHOW_PAYLOAD = false;

module.exports = prefix => {
    
    var module = {
        print(msg) {
            console.log(`${prefix} ${msg}`);
        },

        printRequest(httpMethod, url, data) {
            if(data && SHOW_PAYLOAD)
                console.log(`${prefix} ${httpMethod} ${url}\n${JSON.stringify(data)}`);
            else
                console.log(`${prefix} ${httpMethod} ${url}`);
        }
    };

    return module;
}