const axios = require('axios')
//callback es el que le retorna al cliente

exports.handler = function(event, context, callback){

    const {API_URL, API_CLIENT_ID, API_CLIENT_SECRET} = process.env;
    
    const URL = `${API_URL}?client_id=${API_CLIENT_ID}&client_secret=${API_CLIENT_SECRET}`;

    //Mando los usuarios al cliente
    const send = body => {
        callback(null, {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
            },
            body: JSON.stringify(body)
        })
    }



    //Hago la llamada a la API
    const getUsers = () =>{
        axios.get(URL)
        .then(res => send(res.data))
        .catch(err => send(err))
    }
    

    //Me aseguro que el metodo es un GET
    if(event.httpMethod == 'GET')
    {
        //Run
        getUsers();
    }
    
    
    
    
    
    //Ejemplo basico:
    // const {name} = JSON.parse(event.body);

    // callback(null, {
    //     statusCode: 200,
    //     body: JSON.stringify({"msg":"Hello " + name})
    // });
}