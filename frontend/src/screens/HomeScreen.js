import React, {useEffect, useState} from 'react'
// redux
import { useDispatch, useSelector } from 'react-redux'
import { listNews } from '../actions/newsAction'
// container
import LayoutContainer from '../components/LayoutContainer/LayoutContainer.js'
import classes from './HomeScreen.module.scss'
// components
import New from '../components/New/New'
import Menu from '../components/Menu/Menu'
import HelpMenu from '../components/HelpMenu/HelpMenu'
import Loader from '../components/UI/Loader/Loader'

const HomeScreen = ({ match }) => {

    const styleOfCard = []

    const [hover, setHover] = useState(false)

    if (hover) {
        styleOfCard.push({ cursor:"pointer" })
    }

    const dispatch = useDispatch()

    const newsList = useSelector( state => state.news )
    const { loading, error, news, docs } = newsList
    console.log("news", news)
    const userLogin = useSelector( state => state.userLogin )
    const { userInfo } = userLogin
    
    useEffect( () => {
        if (userInfo) {
            dispatch(listNews())
        }
    }, [dispatch])

    return (
        <>
            <div className={classes.container}>
                <div className={classes.container_left}>
                    <Menu />
                </div>

                <LayoutContainer>
                    {
                        !userInfo ?
                        <div>
                            <h1 style={{paddingTop:'10px'}}>Главная</h1>
                            <div className={classes.around_news}>
                                <div style={{fontSize:"24px"}}> 
                                    You must be logged in to watch the news. 
                                </div>
                            </div>
                        </div>
                        :
                        <div>
                            <div>
                                <h1 style={{paddingTop:'10px'}}>Главная</h1>
                                <div className={classes.around_news}>
                                    {
                                    loading ? <p style={{fontSize:'20px'}}> Loading... </p> :
                                    news.map( singleNew => (
                                        <div key={singleNew._id} style={{width:"100%"}}>
                                            <New singleNew={singleNew} docs={docs} user={userInfo}/>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    }
                </LayoutContainer>

                <div className={classes.container_right}>
                    <HelpMenu userInfo={userInfo}/>
                </div>
            </div>
        </>
    )
}

export default HomeScreen
