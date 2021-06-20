import React, {useEffect, useState} from 'react'
// redux
import { useDispatch, useSelector } from 'react-redux'
import { setPlaceSelect } from '../actions/homeActions'
// container
import LayoutContainer from '../components/LayoutContainer/LayoutContainer.js'
import classes from './HomeScreen.module.scss'
// components
import Menu from '../components/Menu/Menu'
import HelpMenu from '../components/HelpMenu/HelpMenu'
import Charts from '../components/Charts/Charts'
import Loader from '../components/UI/Loader/Loader'

const HomeScreen = ({ match }) => {

    const styleOfCard = []
    const [hover, setHover] = useState(false)

    if (hover) {
        styleOfCard.push({ cursor:"pointer" })
    }

    const dispatch = useDispatch()

    const userLogin = useSelector( state => state.userLogin )
    const { userInfo } = userLogin
    const placeStore = useSelector( state => state.place )
    const { place } = placeStore
    
    const setPlace = (value) => {
        dispatch(setPlaceSelect(value))
    }
    useEffect( () => {
        if (userInfo) {
            // подзагрузка проверок и вылеление из них количество ошибок для вывода на графике
        }
    }, [dispatch, place])
    console.log("place", place)
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
                            <h1 style={{paddingTop:'10px'}}>Аналитика контроля качества</h1>
                           
                            <div className={classes.around_info}>
                                <div style={{fontSize:"24px"}}> 
                                    Необходимо войти
                                </div>
                            </div>
                        </div>
                        :
                        <div>
                            <div>
                                <h1 style={{paddingTop:'10px'}}>Аналитика контроля качества</h1>
                                <div className={classes.around_info}>
                                <label for="Hard">
                                        <select className={classes.selectHard} value={place} onChange={(e) => setPlace(e.target.value)}> 
                                            <option value="1">ЯНАО</option> 
                                            <option value="2">Московская область</option> 
                                        </select>
                                </label>
                                    {
                                        // естественно тут нужно брать массив из областей, с уникальным id, и уникальный id области класть в select, а потом делать фильтр массива, но времени нет на это 
                                            place === 1 ?
                                            <Charts 
                                            uv1={500}
                                            pv1={500}
                                            uv2={200}
                                            pv2={900}
                                            uv3={500}
                                            pv3={499}
                                            uv4={300}
                                            pv4={212}
                                            uv5={600}
                                            pv5={121}
                                            uv6={800}
                                            pv6={414}
                                            uv7={800}
                                            pv7={414}
                                            />
                                           :
                                                <Charts 
                                                uv1={684}
                                                pv1={123}
                                                uv2={499}
                                                pv2={600}
                                                uv3={500}
                                                pv3={499}
                                                uv4={300}
                                                pv4={212}
                                                uv5={411}
                                                pv5={121}
                                                uv6={666}
                                                pv6={414}
                                                uv7={111}
                                                pv7={414}
                                                />
                                            } 
                                           
                                    
                                </div>
                            </div>
                            <div>
                                <h1 style={{paddingTop:'10px'}}>Справочники</h1>
                                <div className={classes.around_info}>
                                    <div style={{fontSize:"24px"}}>
                                        <p> <a style={{fontSize:"15px"}} href={"https://google.com"}> Приказ Минздрава России от 10.05.2017 N 203н "Об утверждении критериев оценки качества медицинской помощи". </a> </p> 
                                        <p> <a style={{fontSize:"15px"}} href={"https://google.com"}> ст.64 Федерального закона от 21.11.2011 N 323-ФЗ (ред. от 04.06.2014) "Об основах охраны здоровья граждан в Российской Федерации". </a> </p> 
                                        <p> <a style={{fontSize:"15px"}} href={"https://google.com"}> Федеральный закон от 29.11.2010 N 326-ФЗ (ред. от 10.07.2014) "Об обязательном медицинском страховании в Российской Федерации". </a> </p> 
                                        <p> <a style={{fontSize:"15px"}} href={"https://google.com"}> Приказ Минздрава России от 19.03.2021 N 231н "Об утверждении Порядка проведения контроля объемов, сроков, качества и условий предоставления медицинской помощи по обязательному медицинскому страхованию застрахованным лицам, а также ее финансового обеспечения". </a> </p> 
                                    </div>
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
