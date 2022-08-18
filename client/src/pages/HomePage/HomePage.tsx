import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/useTypedSelector";
import {fetchNews} from "../../store/reducers/news/actionCreators";
import NewsCard from "../../components/News/NewsCard";
import styles from './homepage.module.scss'
import {fetchCategories} from "../../store/reducers/category/actionCreators";

const HomePage = () => {
    const {news} = useAppSelector(state => state.newsReducer)
    const {isAuth} = useAppSelector(state => state.userReducer)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchNews())
    }, [])
    return (
        <main>
            <div className={styles.container}>
                {news.map(elem =>
                    <NewsCard
                        key={elem.id}
                        info={elem.info}
                        id={elem.id}
                        title={elem.title}
                        content={elem.content}
                        rating={elem.rating}
                        image={elem.image}
                        categoryId={elem.categoryId}/>)
                }
            </div>
        </main>
    );
};

export default HomePage;