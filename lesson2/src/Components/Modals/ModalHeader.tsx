import React from "react";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

export const ModalHeader: React.FC<{ title:string, handleModalToggle: () => void }> = ({title, handleModalToggle}) => {
    return (
        <>
            <Stack
                direction='row'
                justifyContent="space-between"
                alignItems="center"
            >
                <Typography variant='h5' id="modal-modal-title" component="h2">
                    {title}
                </Typography>
                <IconButton onClick={handleModalToggle} color="default" aria-label="close modal" component="span">
                    <CloseIcon/>
                </IconButton>
            </Stack>
            <Divider orientation="horizontal" flexItem />
        </>
    );
};