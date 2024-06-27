
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { processResponse, validateEmail } from '../utils';

export function useUserDetails(){
    const [user, setUser] = useState(null);
    const [cookies, setCookie, removeCookie] = useCookies('token');

    useEffect(() => {
        // fetch user info
        fetch('//spotimeet.fedele.website/api/user/me', {
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${cookies.token}`
            }
        })
        .then(processResponse)
        .then(setUser)
        .catch( err => { /** ignora */ } )
    }, []);

    return user
}

export function useUserFavourites(limit){
    const [favourites, setFavourites] = useState(null);
    const [cookies, setCookie, removeCookie] = useCookies('token');
    if (!limit) limit = 20
    useEffect(() => {
        // fetch user info
        fetch('//spotimeet.fedele.website/api/user/favourites?limit='+limit, {
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${cookies.token}`
            }
        })
        .then(processResponse)
        .then(setFavourites)
        .catch( err => Error.prototype.isPrototypeOf(err) ? null : alert(err) )
    }, []);

    return favourites
}
