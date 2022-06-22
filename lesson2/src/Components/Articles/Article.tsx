import React, {useMemo, useState} from "react";
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


export type ArticlePropsType = {
    title: string,
    body: string
}
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

export const Article: React.FC<ArticlePropsType> = ({title, body}) => {
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
                        <Button>View</Button>
                        <Button onClick={onChangeTheme}>Change Color</Button>
                    </ButtonGroup>
                </CardActions>
            </Card>
        </ThemeProvider>
    );
};