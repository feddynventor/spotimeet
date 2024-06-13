
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { processResponse, validateEmail } from '../utils';

export function useUserDetails(){
    const [user, setUser] = useState(null);
    const [cookies, setCookie, removeCookie] = useCookies('token');

    useEffect(() => {
        // fetch user info
        fetch('http://spotimeet.fedele.website/api/user/me', {
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

export function useUserFavourites(){
    const [favourites, setFavourites] = useState(null);
    const [cookies, setCookie, removeCookie] = useCookies('token');

    useEffect(() => {
        // fetch user info
        fetch('http://spotimeet.fedele.website/api/user/favourites', {
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${cookies.token}`
            }
        })
        .then(processResponse)
        .then( user => user.favourites )  //TODO: dimenticanza sul server
        .then(setFavourites)
        .catch( err => Error.prototype.isPrototypeOf(err) ? null : alert(err) )
    }, []);

    return favourites
}
