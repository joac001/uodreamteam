import { Button, Box, Card, CardContent, Typography, Grid, Checkbox } from "@mui/material";
import playersObject from "@/../public/players.json";
import { useEffect, useState } from "react";

export default function PromptBox({ handlePrompt, playersList, setPlayersList }) {
    // Convertir el objeto de jugadores a un array para facilitar el manejo
    const allPlayers = Object.keys(playersObject).map((key) => ({
        id: key,
        ...playersObject[key],
    }));

    // Estado para jugadores seleccionados
    const [selectedPlayerIds, setSelectedPlayerIds] = useState([]);

    const handleGenerateTeams = () => {
        setPlayersList(selectedPlayers);
    }

    useEffect(() => {
        if (playersList) {
            handlePrompt();
        }
    }, [playersList, handlePrompt]);

    // Manejar la selección/deselección de un jugador
    const handleToggleSelect = (playerId) => {
        if (selectedPlayerIds.includes(playerId)) {
            // Si ya está seleccionado, lo quitamos
            setSelectedPlayerIds(selectedPlayerIds.filter((id) => id !== playerId));
        } else {
            // Si no está seleccionado, lo añadimos
            setSelectedPlayerIds([...selectedPlayerIds, playerId]);
        }
    };

    // Filtrar jugadores seleccionados para mostrar conteo
    const selectedPlayers = allPlayers.filter((player) =>
        selectedPlayerIds.includes(player.id)
    );

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "100%",
                padding: 2,
            }}
        >
            {/* Lista de todos los jugadores */}
            <Grid container spacing={2}>
                {allPlayers.map((player) => (
                    <Grid key={player.id}>
                        <Card
                            sx={{
                                cursor: "pointer",
                                border: selectedPlayerIds.includes(player.id)
                                    ? "2px solid #2b2c2d"
                                    : "1px solid #e0e0e0",
                                backgroundColor: selectedPlayerIds.includes(player.id)
                                    ? "#2b2c2d"
                                    : "#fff",
                                transition: "all 0.3s",
                                color: selectedPlayerIds.includes(player.id) ? "#fff" : "#000",
                                userSelect: 'none',
                            }}
                            onClick={() => handleToggleSelect(player.id)}
                        >
                            <CardContent>
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <Typography variant="h6" component="div">
                                        {player.name}
                                    </Typography>
                                    <Checkbox
                                        checked={selectedPlayerIds.includes(player.id)}
                                        onChange={() => handleToggleSelect(player.id)}
                                        color="primary"
                                    />
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Botón para generar equipos */}
            <Button
                variant="contained"
                sx={{ width: "100%", marginTop: 3 }}
                onClick={handleGenerateTeams}
            >
                Generar equipos
            </Button>

            {/* Sección de confirmación */}

            <Box sx={{ marginTop: 3, textAlign: "center", minHeight: "100%", height: "100%", backgroundColor: "#f5f5f5", padding: 2, borderRadius: 2 }}>
                <Typography variant="h6">
                    {selectedPlayerIds.length} jugadores seleccionados:
                </Typography>
                <Typography variant="body1">
                    {selectedPlayers.map((p) => p.name).join(", ")}
                </Typography>
            </Box>

        </Box>
    );
}