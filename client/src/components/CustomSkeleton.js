import { Box, Skeleton } from "@mui/material";
export default function CustomSkeleton() {
    return (
        <>
            <Skeleton variant="rounded" animation="wave" sx={{margin: 2, height: "10%", width: "50%"}} />
            <Skeleton variant="rounded" animation="wave" sx={{margin: 2, height: "5%", width: "70%"}} />
            <Skeleton variant="rounded" animation="wave" sx={{margin: 2, height: "15%", width: "30%"}} />
        </>
    )
}