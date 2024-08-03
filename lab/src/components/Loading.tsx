import { FC } from "react";
import { Box, CircularProgress } from "@mui/material";
type LoadingProps = {
    isShow: boolean;
}
const Loading: FC<LoadingProps> = ({ isShow }) => {
    return (
        <>
            {isShow && (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        backgroundColor: 'rgba(255, 255, 255, 0.7)',
                        zIndex: 9999,
                    }}
                >
                    <CircularProgress />
                </Box>
            )}
        </>
    );
}
export default Loading