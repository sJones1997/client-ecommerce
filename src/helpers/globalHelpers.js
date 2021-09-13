import {baseUrl} from '../app/App';

export const checkForSession = async (path) => {
    console.log(path)
    const data = await fetch(`${baseUrl}/auth/verify`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    const json = await data.json();
    return json;
}
