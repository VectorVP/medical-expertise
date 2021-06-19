import React, {useEffect, useState} from 'react'
// redux
import { useDispatch, useSelector } from 'react-redux'
import {setQualityTab, sendQualityData } from '../../actions/qualityActions'
// container
import LayoutContainer from '../../components/LayoutContainer/LayoutContainer.js'
import classes from './QualityControlScreen.module.scss'
// components
import Button from '@material-ui/core/Button'
import Menu from '../../components/Menu/Menu'
import HelpMenu from '../../components/HelpMenu/HelpMenu.js'
import Drop from '../../components/Drop/Drop'
import Tabs from '../../components/Tabs/Tabs'

const QualityControlScreen = () => {
    const dispatch = useDispatch()

    const tabsNumber = useSelector(state => state.qualityNumber)
    const { tab } = tabsNumber

    const qualityImage = useSelector(state => state.qualityImage)
    const { image } = qualityImage
    
    const userLogin = useSelector( state => state.userLogin )
    const { userInfo } = userLogin

    const dataFlask = useSelector(state => state.qualityData)
    const { flaskData } = dataFlask

    console.log("tab ", tab, "image ", image, "flaskData ", flaskData)
    const [age, setAge] = useState('')
    const [hard, setHard] = useState('')
    const [MKB, setMKB] = useState('')

    const onSubmitSend = (e) => {
        e.preventDefault()
        console.log("age ", age, "hard ", hard, "MKB ", MKB)
        dispatch(setQualityTab(2))
        dispatch(sendQualityData(image))
        // dispatch(sendQualityData(image, age, hard, MKB))
        setAge('')
        setHard('')
        setMKB('')
    }

    useEffect( () => {

    }, [dispatch])


    if (tab === 1 || !tab) {
        return (
            <>
            <div className={classes.container}>
                <div className={classes.container_left}>
                    <Menu />
                </div>
    
                <LayoutContainer>
                    <div>
                    <h1 style={{paddingTop:'10px'}}>Экспертиза качества медицинской помощи</h1>
                        <div className={classes.around_tabs}>
                            <Tabs number={tab} variant="quality"/>
                        </div>
                        <div className={classes.around_info}>
                            <div style={{display:"flex", flexDirection:"column", fontSize:"24px", width:"100%"}}> 
                                <div>
                                    <p style={{color:"#3f8cff", fontSize:"24px", weight:"600"}}>Загрузите файл для проверки</p>
                                </div>
                                <div style={{display:"flex"}}>
                                    <Drop image={image}/>
                                    <Button variant="contained" color="primary" style={{marginLeft:"20px", marginTop:"0px", width:"100%", backgroundColor:"#3f8cff"}}> 
                                        Загрузить 
                                    </Button>
                                </div>
                            </div>
                            <div style={{fontSize:"24px", width:"100%"}}> 
                                <p style={{color:"#3f8cff", fontSize:"24px", weight:"600", marginTop:"40px"}}>Внесите информацию о пациенте</p>
                                <form onSubmit={(e) => onSubmitSend(e)}>
                                    <div className={classes.into_form}>
                                        <div style={{display:"flex", marginTop:"0px", marginBottom:"10px", width:"100%"}}>
                                            <label for="Age">
                                                <div className={classes.label_text}>Возраст пациента</div>
                                                <input className={classes.input_age} type="text" name="age" value={age} required id="age" onChange={(e) => setAge(e.target.value)}/>
                                            </label>
                                            <label for="Hard">
                                                <div>Сложность лечения</div>
                                                <select className={classes.selectHard} value={hard} onChange={(e) => setHard(e.target.value)}> 
                                                    <option value="1"></option> 
                                                    <option value="2">Apples</option> 
                                                </select>
                                            </label>
                                        </div>
                                        <div style={{marginTop:"0px", marginBottom:"10px", width:"100%"}}>
                                            <label for="MKB">
                                                <div>МКБ-10</div>
                                                <select className={classes.selectHard} value={MKB} onChange={(e) => setMKB(e.target.value)}>
                                                    <option value="1"></option> 
                                                    <option value="2">Apples</option> 
                                                </select>
                                            </label>
                                        </div>
                                        <div style={{width:"100%"}}>
                                            <Button variant="contained" color="primary" type="submit" style={{marginTop:"0px", width:"100%", backgroundColor:"#3f8cff"}}>
                                                ГОТОВО 
                                            </Button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </LayoutContainer>
    
                <div className={classes.container_right}>
                    <HelpMenu userInfo={userInfo}/>
                </div>
            </div>
        </>
        )
    }
    if (tab === 2) {
        return (
            <>
            <div className={classes.container}>
                <div className={classes.container_left}>
                    <Menu />
                </div>
    
                <LayoutContainer>
                    <div>
                    <h1 style={{paddingTop:'10px'}}>Экспертиза качества медицинской помощи</h1>
                        <div className={classes.around_tabs}>
                            <Tabs number={tab} variant="quality"/>
                        </div>
                        <div className={classes.around_info}>
                            результат от фласка
                        </div>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            type="submit" 
                            style={{marginTop:"0px", width:"100%", backgroundColor:"#3f8cff"}}
                            >
                            СФОРМИРОВАТЬ ОТЧЕТ
                        </Button>
                    </div>
                </LayoutContainer>
    
                <div className={classes.container_right}>
                    <HelpMenu userInfo={userInfo}/>
                </div>
            </div>
        </>
        )
    }
    if (tab === 3) {
        return (
            <>
            <div className={classes.container}>
                <div className={classes.container_left}>
                    <Menu />
                </div>
    
                <LayoutContainer>
                    <div>
                    <h1 style={{paddingTop:'10px'}}>Экспертиза качества медицинской помощи</h1>
                      Отчет
                      <Button 
                            variant="contained" 
                            color="primary" 
                            type="submit" 
                            style={{marginTop:"0px", width:"100%", backgroundColor:"#3f8cff"}}
                            >
                            ЗАВЕРШИТЬ
                        </Button>
                    </div>
                </LayoutContainer>
    
                <div className={classes.container_right}>
                    <HelpMenu userInfo={userInfo}/>
                </div>
            </div>
        </>
        )
    }
   
}

export default QualityControlScreen
