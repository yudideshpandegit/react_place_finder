import {useState, useCallback} from 'react';

export const useHttp = () => {

    let responseData, response;

    const sendRequest = useCallback(async (url, method, body, header = {}) => {
        
        try{
        console.log(header, url, method = "POST", body);
            response = await fetch(url,
                {
                method,
                body,
                headers:header
                }
            )

            responseData =  await response.json();
            console.log("Response Data",responseData, + "Response" + response);
        }catch(error){
            console.log("Error:" + error);
        }
    }, []);

    return {sendRequest, responseData};
}