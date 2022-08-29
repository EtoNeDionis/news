import React, {useEffect, useState} from 'react';
import styles from './adminpage.module.scss'
import {useAppDispatch, useAppSelector} from "../../hooks/useTypedSelector";
import {fetchCategories} from "../../store/reducers/category/actionCreators";
import {createNews} from "../../http/createNews";
import SimpleMde from 'react-simplemde-editor'
import "easymde/dist/easymde.min.css";
import {createCategory} from "../../http/createCategory";

const AdminPage = () => {
    const [category, setCategory] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const [content, setContent] = useState<string>('')
    const [info, setInfo] = useState<string>('')
    const [newsCategory, setNewsCategory] = useState<string>('')
    const [img, setImg] = useState('')

    const {isLoading, categories} = useAppSelector(state => state.categoryReducer)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchCategories())
    }, [])

    const submitCategory = () => {
        createCategory(category)
        setCategory('')
    }

    const submitNews = (e: any) => {
        e.preventDefault()
        const category = categories.find((category) => {
            return category.body === newsCategory
        })
        const formData = new FormData()
        formData.append('categoryId', `${category?.id}`)
        formData.append('title', title)
        formData.append('content', content)
        formData.append('info', info)
        formData.append('img', img)
        createNews(formData).then(r => alert('Новость создана'))
    }

    const selectFile =(e: any) => {
        setImg(e.target.files[0])
    }

    const options = React.useMemo(
        () => ({
            spellChecker: false,
            maxHeight: '400px',
            autofocus: true,
            placeholder: 'Введите текст...',
            status: false,
            autosave: {
                enabled: true,
                delay: 1000,
            },
        }),
        [],
    );

    return (
        <div className={styles.adminpage}>
            <div className={styles.container_category}>
                <input value={category} onChange={(e) => setCategory(e.target.value)} type={"text"}
                       placeholder={'category'}/>
                <button onClick={submitCategory}>Создать категорию</button>
            </div>
            <form>
                <input type={"text"} placeholder={'title'} value={title} onChange={(e) => setTitle(e.target.value)}/>
                {/*<textarea value={content} onChange={(e) => setContent(e.target.value)} rows={50} placeholder={'content'}/>*/}
                <SimpleMde value={content} onChange={(e) => setContent(e)}/>

                <input type={"text"} value={info} placeholder={'info'} onChange={(e) => setInfo(e.target.value)}/>
                <select value={newsCategory} onChange={(e) => setNewsCategory(e.target.value)} placeholder={'category'} name={'category'}>
                    {categories.map(category => (
                        <option key={category.id}>{category.body}</option>
                    ))}
                </select>

                <input onChange={selectFile} type={"file"}/>

                <button onClick={submitNews}>Создать новость</button>
            </form>
        </div>
    );
};

export default AdminPage;