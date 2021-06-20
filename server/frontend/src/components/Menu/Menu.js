import React, {useEffect, useState} from 'react'
import Button from '@material-ui/core/Button'
import {LinkContainer} from 'react-router-bootstrap'
// redux
import { useDispatch, useSelector } from 'react-redux'
import { userLogout, setNumberofLink } from '../../actions/userAction'
import classes from './Menu.module.scss'

const Menu = ({match}) => {

    const dispatch = useDispatch()

    const userLogin = useSelector( state => state.userLogin )
    const { userInfo } = userLogin

    const linkNum = useSelector( state => state.linkNumber )
    const { link } = linkNum

    const setLink = (num) => {
        dispatch(setNumberofLink(num))
    }
    console.log(link)

    useEffect( () => {

    }, [dispatch, userInfo])

    const Logout = () => {
        dispatch(userLogout())
    }

    return (
        <div className={classes.menu}>
            <h2 style={{marginBottom:'20px'}}>  </h2>
            <img src={"/images/Kvadrat.png"} style={{marginBottom:"40px", height:"50px", width:"50px", paddingLeft:"25px"}}></img>
                <div>
                     <div style={{display:"flex", alignItems: "center", paddingLeft:"25px"}}>
                        <img src={'/images/clarity_home-line.png'} style={{height:"17px", width:"17px"}}></img> 
                        <LinkContainer to="/" onClick={() => setLink(1)}>
                            <div>
                                <p className={link === 1 ? classes.link_active : classes.link}>Главная</p>
                            </div>
                        </LinkContainer>
                    </div>
                    <div style={{display:"flex", alignItems: "center", paddingLeft:"25px"}}>
                    <img src={'/images/carbon_certificate-check.png'} style={{height:"17px", width:"17px"}}></img>  
                        <LinkContainer to="/qualitycontrol"onClick={() => setLink(2)}>
                            <p className={link === 2 ? classes.link_active : classes.link}>Контроль качества</p>
                        </LinkContainer>
                    </div>
                    <div style={{display:"flex", alignItems: "center", paddingLeft:"25px"}}>
                    <img src={'/images/clarity_bar-chart-line.png'} style={{height:"17px", width:"17px"}}></img> 
                        <LinkContainer to="/analytics" onClick={() => setLink(3)}>
                            <p className={link === 3 ? classes.link_active : classes.link}>Аналитика</p>
                        </LinkContainer>
                    </div>
                    <div style={{display:"flex", alignItems: "center", paddingLeft:"25px"}}>
                    <img src={'/images/ph_notebook-light.png'} style={{height:"17px", width:"17px"}}></img> 
                        <LinkContainer to="/handbook" onClick={() => setLink(4)}>
                            <p className={link === 4 ? classes.link_active : classes.link}>Справочники</p>
                        </LinkContainer>
                    </div>
                </div> 
                <div style={{position:"absolute", bottom:"50px", left:"50%", transform:"translateX(-50%)", }}>
                    <img src={"/images/Group.png"} style={{marginBottom:"40px"}}></img>
                    { 
                    userInfo ?
                        <>
                            <Button variant="contained" color="primary" style={{backgroundColor:"#3f8cff"}} onClick={() => Logout()}> 
                                Выйти
                            </Button>
                        </>
                        :
                        <>  
                            <LinkContainer to={'/login'}>
                                <div style={{backgroundColor:"#3f8cff"}}>
                                    <Button variant="contained" color="primary" style={{backgroundColor:"#3f8cff"}}> 
                                        Войти
                                    </Button>
                                </div>
                            </LinkContainer>
                        </>
                    }
                </div>
        </div>
    )
}

export default Menu




// import classes from './Profile.module.scss'

// const ProfileInfo = ({match, history}) => {

//     const dispatch = useDispatch()

//     const userLogin = useSelector( state => state.userLogin )
//     const { userInfo } = userLogin

//     useEffect( () => {

//     }, [dispatch, userInfo])

//     const Logout = () => {
//         dispatch(userLogout())
//     }

//     return (
//         userInfo ?    
//             <div className={classes.profile}>
//                 <h2> Profile </h2>
//                 <Button variant="contained" color="primary" onClick={() => Logout()}> 
//                     Logout
//                 </Button>
//             </div> 
//              : 
//              <div className={classes.profile}>
//                 <h2> Profile </h2>
//                 <LinkContainer to={'/login'}>
//                     <Button variant="contained" color="primary"> 
//                         Login
//                     </Button>
//                 </LinkContainer>
//              </div>
//     )
// }

// export default ProfileInfo
