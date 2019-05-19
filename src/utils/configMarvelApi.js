import md5 from 'crypto-js/md5';


const MARVEL_BASE_URL='https://gateway.marvel.com:443/v1/public';

const CONFIG_MARVEL_API = {
    API_PUBLIC_KEY:'481a3b9f942ef9475eaf727fd637ae59',
    API_PRIVATE_KEY:'88a174e088b7e020812532ce77a3a58707902ed2',
} 

function getParamRequest(){
    var date = new Date();
    var timestamp = date.getTime();
    
    var hash = md5(timestamp+CONFIG_MARVEL_API.API_PRIVATE_KEY+CONFIG_MARVEL_API.API_PUBLIC_KEY).toString();
    return(
        {
            ts:timestamp,
            apikey:CONFIG_MARVEL_API.API_PUBLIC_KEY,
            hash:hash
        }
    )
}

export default {getParamRequest, MARVEL_BASE_URL};
