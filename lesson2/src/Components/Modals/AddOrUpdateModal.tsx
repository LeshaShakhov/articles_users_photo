import React, {useContext, useState} from "react"
import {Modal} from "@mui/material"
import Box from "@mui/material/Box"
import {GlobalModalContext, UPDATE_OR_ADD_TYPES} from "./GlobalModal";
import {ModalHeader} from "./ModalHeader";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {useDispatch} from "react-redux";
import {addArticle, updateArticle} from '../../store/articlesSlice'
import {APIArticleType} from "../../types/types";


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



export const AddOrUpdateModal: React.FC<{}> = () => {
    const { hideModal, store } = useContext(GlobalModalContext);
    const { modalTitle, type } = store.modalProps || {};

    let article:APIArticleType;
    if(type === UPDATE_OR_ADD_TYPES.ADD){
        article = {id: Math.floor(Math.random()*10000000), userId: 2, title: '', body: ''}
    } else {
        article = store.modalProps.article
    }
    const [inputsValues, setInputsValues] = useState(article);
    const dispatch = useDispatch()
    const handleModalToggle = () => {
        hideModal();
    };
    const onChangeHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
        setInputsValues(actual => ({
           ...actual, [e.target.name]: e.target.value
        }))
    }

    const onClickHandler = () => {
        if(type === UPDATE_OR_ADD_TYPES.ADD) dispatch(addArticle({...article, ...inputsValues}))
        if(type === UPDATE_OR_ADD_TYPES.UPDATE) dispatch(updateArticle(inputsValues))
        hideModal()
    }
    return (
        <Modal
            open={true}
            onClose={handleModalToggle}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <ModalHeader handleModalToggle={handleModalToggle} title={modalTitle}/>
                <Box
                    component="form"
                    sx={{'& > :not(style)': { mt: 1, mb: 1}, display: 'flex', flexDirection: 'column', mt: 2}}
                    noValidate
                    autoComplete="off"
                >
                    <TextField fullWidth  multiline value={inputsValues.title} name='title' onChange={onChangeHandler} label="Article Title" variant="outlined" type='text'/>
                    <TextField fullWidth  multiline value={inputsValues.body} name='body' onChange={onChangeHandler} label="Article Text" variant="outlined" type='text'/>
                    <Button disabled={!(inputsValues.title.trim()) || !(inputsValues.body.trim())} onClick={onClickHandler} variant="contained">{store.modalProps.btnText}</Button>
                </Box>
            </Box>
        </Modal>
    )
}