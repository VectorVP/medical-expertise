import React, {useEffect, useState} from 'react'
// redux
import { useDispatch, useSelector } from 'react-redux'
// container
import LayoutContainer from '../../components/LayoutContainer/LayoutContainer.js'
import classes from './HandbookScreen.module.scss'
// components
import Drop from '../../components/Drop/Drop'
import Menu from '../../components/Menu/Menu'
import HelpMenu from '../../components/HelpMenu/HelpMenu.js'

const HandbookScreen = () => {
    const userLogin = useSelector( state => state.userLogin )
    const { userInfo } = userLogin
    return (
        <>
        <div className={classes.container}>
            <div className={classes.container_left}>
                <Menu />
            </div>

            <LayoutContainer>
                <div>
                <h1 style={{paddingTop:'10px'}}>Справочник</h1>
                    <div className={classes.around_info}>
                        <div style={{fontSize:"24px"}}> 
                           <Drop/>
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

export default HandbookScreen