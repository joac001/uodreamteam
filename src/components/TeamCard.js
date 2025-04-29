import { Box, Chip, Typography } from "@mui/material";
import Slider from "./Slider";
import { useState, useEffect } from "react";
import { teamStats } from "@/utils";

export default function TeamCard({ teamColor, team, teamName }) {
    const [averageStats, setAverageStats] = useState(null)
    const [totalStat, setTotalStat] = useState(null)

    const getStats = () => {
        const averageStats = teamStats(team);
        setAverageStats(averageStats);
        setTotalStat(Object.values(averageStats).reduce((sum, value) => sum + value, 0));
    }
    useEffect(() => {
        getStats();
    }, []);

    return (
        averageStats != null &&
        (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    backgroundColor: teamColor,
                    padding: 2,
                    borderRadius: 2,
                    color: teamColor == 'white' ? 'black' : 'white',
                    paddingX: 4,
                    margin: 1,
                    boxShadow: 3,
                }}
            >

                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography variant='h5'>Equipo {teamName}</Typography>
                    <Box sx={{ bgcolor: teamColor == 'white' ? 'black' : 'white', margin: 2, borderRadius: 2, paddingX: 1, color: teamColor }}>{totalStat ? totalStat.toFixed(2) * 10 : 0}</Box>
                </Box>

                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

                    <Typography sx={{ alignSelf: 'start', display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between' }} variant="body">
                        Velocidad/Resistencia
                        <Box sx={{ bgcolor: teamColor == 'white' ? 'black' : 'white', margin: 2, borderRadius: 2, paddingX: 1, color: teamColor }}>{averageStats['speed'] ? averageStats['speed'].toFixed(2) * 10 : 0}</Box>
                    </Typography>
                    <Slider team={teamColor} percentaje={averageStats['speed'] * 10} />

                    <Typography sx={{ alignSelf: 'start', display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between' }} variant="body">
                        Tiros al arco
                        <Box sx={{ bgcolor: teamColor == 'white' ? 'black' : 'white', margin: 2, borderRadius: 2, paddingX: 1, color: teamColor }}>{averageStats['shoot'] ? averageStats['shoot'].toFixed(2) * 10 : 0}</Box>
                    </Typography>
                    <Slider team={teamColor} percentaje={averageStats['shoot'] * 10} />

                    <Typography sx={{ alignSelf: 'start', display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between' }} variant="body">
                        Pases
                        <Box sx={{ bgcolor: teamColor == 'white' ? 'black' : 'white', margin: 2, borderRadius: 2, paddingX: 1, color: teamColor }}>{averageStats['shoot'] ? averageStats['shoot'].toFixed(2) * 10 : 0}</Box>
                    </Typography>
                    <Slider team={teamColor} percentaje={averageStats['pass'] * 10} />

                    <Typography sx={{ alignSelf: 'start', display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between' }} variant="body">
                        Dribble
                        <Box sx={{ bgcolor: teamColor == 'white' ? 'black' : 'white', margin: 2, borderRadius: 2, paddingX: 1, color: teamColor }}>{averageStats['shoot'] ? averageStats['shoot'].toFixed(2) * 10 : 0}</Box>
                    </Typography>
                    <Slider team={teamColor} percentaje={averageStats['dribble'] * 10} />

                    <Typography sx={{ alignSelf: 'start', display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between' }} variant="body">
                        Defensa
                        <Box sx={{ bgcolor: teamColor == 'white' ? 'black' : 'white', margin: 2, borderRadius: 2, paddingX: 1, color: teamColor }}>{averageStats['shoot'] ? averageStats['shoot'].toFixed(2) * 10 : 0}</Box>
                    </Typography>
                    <Slider team={teamColor} percentaje={averageStats['defense'] * 10} />
                </Box>

                <Typography variant='h5'>Jugadores</Typography>
                {
                    team.map((player, index) => (
                        <Typography key={index} variant="body">{player.name}</Typography>
                    ))
                }
            </Box >
        )

    );
}