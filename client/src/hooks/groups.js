
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { processResponse } from '../utils';

export function useGroup(type, id){
    const [group, setGroup] = useState(null);
    const [cookies, setCookie, removeCookie] = useCookies('token');

    useEffect(() => {
        // fetch user info
        fetch('http://spotimeet.fedele.website/api/group/'+type+'/'+id, {
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${cookies.token}`
            }
        })
        .then(processResponse)
        .then(setGroup)
        .catch( err => { /** ignora */ } )
    }, []);

    return group
}