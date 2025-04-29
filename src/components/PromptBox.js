import { TextareaAutosize, Button, Box } from "@mui/material";

export default function PromptBox({ handlePrompt, playersList, setPlayersList }) {
    return (
        <Box>
            <TextareaAutosize
                maxRows={4}
                aria-label="Lista de jugadores"
                placeholder="Lista de jugadores"
                value={playersList}
                onChange={(e) => setPlayersList(e.target.value)}
                style={{
                    width: '100%',
                    height: '45vh',
                    borderRadius: '10px',
                    border: '1px solid #303632',
                    backgroundColor: '#303632',
                    color: 'white',
                    fontSize: '1rem',
                    padding: 10,
                }}
            />
            <Button variant="contained" sx={{ width: '100%' }} onClick={handlePrompt}>Generar equipos</Button>
        </Box>
    );
}