"use client";

import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import theme from "@/Theme";
import { Padauk } from "next/font/google";

export default function ThemeRegistry({ children }) {
    return (
        <ThemeProvider theme={theme}>
            <Box style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundImage: 'linear-gradient(60deg, white 50%, black 50%)',
                minHeight: '100vh',
                padding: 10,
            }}>
                <CssBaseline />
                {children}
            </Box>
        </ThemeProvider>
    );
}