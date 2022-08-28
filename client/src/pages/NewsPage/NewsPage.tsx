import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {fetchOneNews} from "../../store/reducers/news/actionCreators";
import {useAppDispatch, useAppSelector} from "../../hooks/useTypedSelector";
import {INews} from "../../models/INews";
import styles from './newspage.module.scss'
import {setRating} from "../../http/rating";
import ReactMarkdown from "react-markdown";

const NewsPage = () => {
    const {id} = useParams()
    const dispatch = useAppDispatch()
    const [news, setNews] = useState<INews | undefined>({} as INews)
    const [isRated, setIsRated] = useState<boolean>(false)

    useEffect(() => {
        dispatch(fetchOneNews(Number(id))).then(data => setNews(data?.data))
    }, [])

    const user = useAppSelector(state => state.userReducer.user)
    const handlePlus = () => {
        setRating(Number(id), user.user.id, +1)
        setIsRated(true)
    }
    const handleMinus = () => {
        setRating(Number(id), user.user.id, -1)
        setIsRated(true)
    }

    return (
        <div className={styles.newspage}>
            <h1>{news?.title}</h1>
            <h2>{news?.info}</h2>
            <ReactMarkdown children={news?.content || ''}/>
            {isRated && <div>Спасибо за голос</div>}
            <div className={styles.rating_container}>
                <button disabled={isRated} onClick={handlePlus} className={styles.btn__plus}>+</button>
                <div className={styles.rating}>{news?.rating}</div>
                <button disabled={isRated} onClick={handleMinus} className={styles.btn__minus}>-</button>
            </div>
        </div>
    );
};

export default NewsPage;