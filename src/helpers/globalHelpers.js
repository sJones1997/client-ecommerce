import {baseUrl} from '../app/App';

export const checkForSession = async (path) => {
    console.log(path)
    const data = await fetch(`${baseUrl}/users`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },        
        body: JSON.stringify({path: path})
    });
    const json = await data.json();
    return json;
}
