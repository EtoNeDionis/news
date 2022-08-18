import React, {FC} from 'react';
import styles from './newscard.module.scss'
import {useNavigate} from "react-router-dom";

interface INewsCard {
    id: number
    title: string
    content: string,
    rating: number,
    image: string,
    categoryId: number,
    info: string
}

const NewsCard: FC<INewsCard> = (props) => {
    const navigate = useNavigate()
    return (
        <article>
            <div className={styles.news_card} onClick={() => navigate('/news/' + props.id)}>

                <div className={styles.picture}>
                    <img className={styles.image} src={process.env.REACT_APP_API_URL + props.image}/>
                </div>

                <div className={styles.about}>
                    <h3>{props.title}</h3>
                    {props.info}
                </div>
            </div>
        </article>
    );
};

export default NewsCard;