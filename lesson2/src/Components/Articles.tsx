import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export const Articles: React.FC<{}> = props => {
    return (
        <Container maxWidth='lg'>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between'
            }}>
                <Typography
                    variant='h3'
                >
                    Articles
                </Typography>
            </Box>

        </Container>
    );
};