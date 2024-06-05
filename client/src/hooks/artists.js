
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { processResponse } from '../utils';

export const useArtistSearch = () => {
    const [artists, setArtists] = useState(null);
    const [query, setQuery] = useState();
    const [cookies, setCookie, removeCookie] = useCookies('token');

    useEffect(() => {
        if (!query) return;
        fetch('http://spotimeet.fedele.website/api/artist?q='+query, {
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${cookies.token}`
            }
        })
        .then(processResponse)
        .then(setArtists)
        .catch( err => Error.prototype.isPrototypeOf(err) ? null : err )
    }, [query]);

    const search = (term) => {
        setQuery(term);
    }

    return [ artists, search ];
}

export const useArtistDetails = (spotify_id) => {
    const [artist, setArtist] = useState(null);
    const [cookies, setCookie, removeCookie] = useCookies('token');

    useEffect(() => {
        if (!spotify_id) return;
        fetch('http://spotimeet.fedele.website/api/artist/'+spotify_id, {
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${cookies.token}`
            }
        })
        .then(processResponse)
        .then(setArtist)
        .catch( err => Error.prototype.isPrototypeOf(err) ? null : err )
    }, [spotify_id]);

    return artist;
}

export const useArtistGroups = (id) => {
    const [artist, setArtist] = useState(null);
    const [cookies, setCookie, removeCookie] = useCookies('token');

    useEffect(() => {
        if (!id) return;
        fetch('http://spotimeet.fedele.website/api/group/artist/'+id, {
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${cookies.token}`
            }
        })
        .then(processResponse)
        .then(setArtist)
        .catch( err => Error.prototype.isPrototypeOf(err) ? null : err )
    }, [id]);

    return artist;
}