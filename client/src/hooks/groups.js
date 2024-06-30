
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { processResponse } from '../utils';

export function useGroup(type, id){
    const [group, setGroup] = useState(null);
    const [cookies, setCookie, removeCookie] = useCookies('token');

    useEffect(() => {
        // fetch user info
        fetch('//spotimeet.fedele.website/api/group/'+type+'/'+id, {
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

export function useGroupList(modificatore) {
    const [group, setGroup] = useState(null);
    const [cookies, setCookie, removeCookie] = useCookies('token');

    useEffect(() => {
        // fetch user info
        fetch('//spotimeet.fedele.website/api/group/' + (!!modificatore ? modificatore : ""), {
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

export const useCitySearch = () => {
    const [events, setEvents] = useState(null);
    const [query, setQuery] = useState();
    const [cookies, setCookie, removeCookie] = useCookies('token');

    useEffect(() => {
        if (!query) return;
        setEvents(null);
        fetch('//spotimeet.fedele.website/api/group/city?q='+query, {
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${cookies.token}`
            }
        })
        .then(processResponse)
        .then(setEvents)
        .catch( err => Error.prototype.isPrototypeOf(err) ? null : err )
    }, [query]);

    return [ events, setQuery ];
}