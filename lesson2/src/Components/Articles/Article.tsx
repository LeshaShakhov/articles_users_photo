import React, {useState} from "react";
import {Card, Theme} from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import createTheme from "@mui/material/styles/createTheme";
import orange from "@mui/material/colors/orange";
import green from "@mui/material/colors/green";
import blue from "@mui/material/colors/blue";
import {MODAL_TYPES, UPDATE_OR_ADD_TYPES} from "../Modals/GlobalModal";
import {APIArticleType} from "../../types/types";

const themes = [createTheme({
    palette: {
        primary: orange ,
        background: {paper: orange["50"]},
        text: {primary: orange["500"]}
    },
}), createTheme({
    palette: {
        primary: green ,
        background: {paper: green["50"]},
        text: {primary: green["500"]}
    },
}), createTheme({
    palette: {
        primary: blue ,
        background: {paper: blue["50"]},
        text: {primary: blue["500"]}
    },
})]
function* createColorIterator ():IterableIterator<Theme> {
    let i = 0;
    while (i < themes.length) {
        const theme = themes[i];
        i++;
        yield theme;
    }
}
let colors = createColorIterator()
let initialColor = colors.next().value

export const Article: React.FC<ArticlePropsType> = ({article, showModal}) => {
    const { title, body } = article
    const [colorState, setColorState] = useState(initialColor);
    const onChangeTheme = () => {
        const color = colors.next()
        if(color.done){
            colors = createColorIterator()
            setColorState(colors.next().value)
        } else {
            setColorState(color.value)
        }
    }

    const createInfoModal = () => {
        showModal(MODAL_TYPES.VIEW_ARTICLE_MODAL, {
            modalTitle: 'Article Info',
            title: title,
            body: body
        });
    };

    const createUpdateModal = () => {
        showModal(
            MODAL_TYPES.ADD_OR_UPDATE_ARTICLE_MODAL,
            {
                modalTitle: 'Update Article',
                type: UPDATE_OR_ADD_TYPES.UPDATE,
                article: article,
                btnText: 'Update Article'
            }
        )
    };
    return (
        <ThemeProvider theme={colorState}>
            <Card sx={{ minWidth: 245}}>
                <CardContent>
                    <Typography variant={"h5"} gutterBottom>
                        {title}
                    </Typography>

                    <Typography variant="body2">
                        {body}
                    </Typography>
                </CardContent>
                <CardActions>
                    <ButtonGroup variant="outlined" size='small' aria-label="View Article or Change color theme">
                        <Button onClick={createInfoModal}>
                            View
                        </Button>
                        <Button onClick={createUpdateModal}>
                            Edit
                        </Button>
                        <Button onClick={onChangeTheme}>Change Color</Button>
                    </ButtonGroup>
                </CardActions>
            </Card>
        </ThemeProvider>
    );
};

type ArticlePropsType = {
    article: APIArticleType
    showModal:(modalType: string, modalProps: any) => void
}