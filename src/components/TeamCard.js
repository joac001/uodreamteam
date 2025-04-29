import { Box, Typography } from "@mui/material";
import Slider from "./Slider";
import { useState, useEffect } from "react";
import { teamStats } from "@/utils";

export default function TeamCard({ teamColor, team }) {
    const [averageStats, setAverageStats] = useState(null)

    const getStats = () => {
        const stats = teamStats(team);
        setAverageStats(stats);
    }
    useEffect(() => {
        getStats();
        console.log(averageStats);
        console.log(team)
    }, []);

    return (
        averageStats != null &&
        (
            <Box elevation={3}

                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    height: '100%',
                    backgroundColor: teamColor,
                    padding: 2,
                    borderRadius: 2,
                    color: teamColor == 'white' ? 'black' : 'white',
                }}
            >
                <Typography variant='h4'>Estadisticas del equipo</Typography>
                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography sx={{ alignSelf: 'start' }} variant="body">Velocidad/Resistencia</Typography>
                    <Slider team={teamColor} percentaje={averageStats['speed'] * 10} />
                    <Typography sx={{ alignSelf: 'start' }} variant="body">Tiros al arco</Typography>
                    <Slider team={teamColor} percentaje={averageStats['shoot'] * 10} />
                    <Typography sx={{ alignSelf: 'start' }} variant="body">Pases</Typography>
                    <Slider team={teamColor} percentaje={averageStats['pass'] * 10} />
                    <Typography sx={{ alignSelf: 'start' }} variant="body">Dribble</Typography>
                    <Slider team={teamColor} percentaje={averageStats['dribble'] * 10} />
                    <Typography sx={{ alignSelf: 'start' }} variant="body">Defensa</Typography>
                    <Slider team={teamColor} percentaje={averageStats['defense'] * 10} />
                </Box>

                <Typography variant='h4'>Jugadores</Typography>
                {team.map((player, index) => (
                    <Typography key={index} variant="body">{player.name}</Typography>
                ))
                }
            </Box>
        )

    );
}