import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";


import { Sidebar } from "../components/Sidebar";
import { Box, CssBaseline, Paper } from "@mui/material";
import { useLoading } from "src/context/loading";
import Loading from "src/components/Loading";

export default function AdminLayout() {
    // const navigate = useNavigate();
    // const token = localStorage.getItem("token");

    // useEffect(() => {
    //     if (!token) { navigate("/login"); return; }
    // }, [token, navigate]);
    const { loading } = useLoading()
    return (
        <>
            <Loading isShow={loading} />
            <ToastContainer />
            <main>
                <Box sx={{ display: 'flex', minHeight: '100vh' }}>
                    <CssBaseline />
                    <Sidebar />
                    <Box
                        component="main"
                        sx={{
                            flexGrow: 1,
                            p: 3,
                            backgroundColor: '#f5f5f5',
                            minHeight: '100vh'
                        }}
                    >
                        <Paper elevation={3} sx={{ padding: 2 }}>
                            <Outlet />
                        </Paper>
                    </Box>
                </Box>
            </main>
        </>
    );
}