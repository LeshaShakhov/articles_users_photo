import React, {useContext, useEffect, useState} from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {Stack} from "@mui/material";
import Button from "@mui/material/Button";
import {Article} from "./Article";
import Grid from "@mui/material/Grid";
import {useDispatch, useSelector} from "react-redux";
import {getArticles} from "../../store/articlesSlice";
import {DispatchType, StateType} from "../../store/store";
import {APIArticleType} from "../../types/types";
import {GlobalModalContext, MODAL_TYPES, UPDATE_OR_ADD_TYPES} from "../Modals/GlobalModal";


const PORTION_SIZE = 20



export const Articles: React.FC<{}> = props => {
    const dispatch = useDispatch<DispatchType>()
    const articles = useSelector((state:StateType) => state.articles.articles)
    const [showedArticles, setShowedArticles] = useState<APIArticleType[]>([]);
    const [portionValue, setPortionValue] = useState(0);
    const { showModal } = useContext(GlobalModalContext);
    const cardSizes = {
        small: {md: 4, sm: 6},
        big: {md: 6, sm: 12}
    }
    const [cardsSize, setCardsSize] = useState({isBig:false, size: cardSizes.small});

    const onChangeCardsSize = () => {
        cardsSize.isBig
        ? setCardsSize({isBig:false, size: cardSizes.small})
        : setCardsSize({isBig:true, size: cardSizes.big})
    }
    const onShowMore = () => {
        setPortionValue(actual => actual + 1)
    }
    const showAddArticleModal = () => {
        showModal(
            MODAL_TYPES.ADD_OR_UPDATE_ARTICLE_MODAL,
            {
                modalTitle: 'Add Article',
                type: UPDATE_OR_ADD_TYPES.ADD,
                btnText: 'Create Article'
            }
        )
    }


    useEffect(()=>{
        dispatch(getArticles())
    },[])
    useEffect(() => {
        if(articles.length){
            setShowedArticles([...articles.slice(0, PORTION_SIZE)])
            setPortionValue(0)
        }
    }, [articles])

    useEffect(() => {
        if(portionValue){
            setShowedArticles(actual => {
                return [...actual, ...articles.slice(portionValue*PORTION_SIZE, (portionValue + 1)*PORTION_SIZE)]
            })
        }
    }, [portionValue])
    return (
        <Container maxWidth='lg'>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between'
            }} mt={8} mb={4}>
                <Typography
                    variant='h3'
                >
                    Articles
                </Typography>
                <Stack direction='row' alignItems="center" spacing={2}>
                    <Button size="small" variant="contained" onClick={onChangeCardsSize}>Make {cardsSize.isBig? 'small' : 'big'} cards</Button>
                    <Button onClick={showAddArticleModal} size="small" variant="contained">Add Articles</Button>
                </Stack>
            </Box>

            <Grid container spacing={4} mb={4}>
                {showedArticles.map(article => {
                    return(
                        <Grid key={article.id} item md={cardsSize.size.md} sm={cardsSize.size.sm}>
                            <Article showModal={showModal} article={article}/>
                        </Grid>
                    )
                }
            )}
            </Grid>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center'
            }}>
                {showedArticles.length < articles.length && <Button onClick={onShowMore} variant="contained" size="large">{'shown: '+showedArticles.length+'/'+articles.length} Show more</Button>}
            </Box>
        </Container>
    );
};
