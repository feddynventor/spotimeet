import { useUserDetails } from "../hooks/users";
import { Box } from '@mui/material';
import CustomSkeleton from "./CustomSkeleton";
import Favourites from "./Favourites";
import UserInfo from "./UserInfo";

export default function UserProfile() {
    const utenteLoggato = useUserDetails();
    if (!utenteLoggato) return <CustomSkeleton />
    else return (
        <Box>
            {
            !!utenteLoggato 
            ? <Box>
                <UserInfo user={utenteLoggato} />
            </Box> 
            : <CustomSkeleton />
            }
            <Favourites number={10}/>
        </Box>
    )
}