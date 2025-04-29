"use client";

import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import theme from "@/Theme";
import Footer from "./Footer";

export default function ThemeRegistry({ children }) {
    return (
        <ThemeProvider theme={theme}>
            <Box style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'linear-gradient(60deg, white 50%, black 50%)',
                height: '100vh',
                paddingTop: '15vh',
            }}>
                <CssBaseline />
                {children}
                <Footer />
            </Box>
        </ThemeProvider>
    );
}