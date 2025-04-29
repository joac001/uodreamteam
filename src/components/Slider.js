import { Box } from "@mui/material";
import { useState, useEffect } from "react";

export default function Slider({ team, percentaje }) {
    const [currentPercentage, setCurrentPercentage] = useState(0);

    useEffect(() => {
        let interval;
        const animate = () => {
            interval = setInterval(() => {
                setCurrentPercentage((prev) => {
                    if (prev < percentaje) {
                        return Math.min(prev + 0.5, percentaje); // Smaller increment for smoother animation
                    } else {
                        clearInterval(interval);
                        return prev;
                    }
                });
            }, 10); // Faster update interval
        };
        animate();
        return () => clearInterval(interval);
    }, [percentaje]);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', backgroundColor: team == 'white' ? 'black' : 'white', width: '80%', borderRadius: 2, marginBottom: 1 }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', backgroundColor: '#28b84f', width: `${currentPercentage}%`, padding: '5px', borderRadius: 2 }} />
        </Box>
    );
}