import React, {useContext} from "react"
import {Modal} from "@mui/material"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import CloseIcon from '@mui/icons-material/Close'
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import {GlobalModalContext} from "./GlobalModal";
import {ModalHeader} from "./ModalHeader";


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};


export const ViewModal: React.FC<{}> = props => {
    const { hideModal, store } = useContext(GlobalModalContext)
    const { modalProps } = store || {}
    const { modalTitle, title, body } = modalProps || {}
    const handleModalToggle = () => {
        hideModal()
    };

    return (
        <Modal
            open={true}
            onClose={handleModalToggle}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <ModalHeader handleModalToggle={handleModalToggle} title={modalTitle}/>

                <Typography variant='h6' id="modal-modal-description" sx={{mt: 2}}>
                    {title}
                </Typography>
                <Typography sx={{mt: 2}}>
                    {body}
                </Typography>
            </Box>
        </Modal>
    )
}