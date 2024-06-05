import React, {useEffect, useState} from "react";

const EditProfile = () => {
    const [user, setUser] = useState({});

    useEffect(() => {
        setUser({
            name: 'user',
            username: 'username',
            email: 'email'
        });
    });
        

     return (
         <div>
             <div>Name: {user.displayName}</div>
             <div>Username: {user.username}</div>
             <div>Email: {user.email}</div>
         </div>
    );
}

export default EditProfile;