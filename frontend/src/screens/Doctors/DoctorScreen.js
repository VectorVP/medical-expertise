import React, { useState, useEffect } from 'react'

// components
import Menu from '../../components/Menu/Menu'
import SubscribeButton from '../../components/UI/SubscribeButton/SubscribeButton'
import Button from '@material-ui/core/Button'
// redux
import { useDispatch, useSelector } from 'react-redux'
import { getDoctorById } from '../../actions/doctorsAction'

// fro button 'back'
import { Link } from 'react-router-dom'

// for flex-box cart details styles
import {Image} from 'react-bootstrap'


// scss
import classes from './DoctorScreen.module.scss'

// container
import LayoutContainer from '../../components/LayoutContainer/LayoutContainer.js'


const DoctorScreen = ({ match }) => {
    const [subscribe, setSubscribe] = useState(false)

    const id = match.params.id

    const dispatch = useDispatch()

    const doctorInfo = useSelector( state => state.doctor)
    const { doctor, error, loading } = doctorInfo

    const class1 = classes.around_news_info_subscribe
    const class2 = classes.around_news_info_subscribe_none
    
    const subscribeByClick = () => {
        console.log('subscribe')
        setSubscribe(true)
        // subscribe action 
    }

    useEffect( () => {
        dispatch(getDoctorById(id))
    }, [dispatch])
    
    return (
        <>
            <div className={classes.container}>
                <div className={classes.container_left}>
                    <Menu />
                </div>
                <LayoutContainer>
                  <div>
                    <Link className="btn btn-light my-3" to="/doctors">
                        Go back
                    </Link>
                        <>
                            { 
                               loading ?
                                <h1 style={{ paddingTop: '0px', paddingBottom:'10px' }}> Doctor ... </h1> :
                                <h1 style={{ paddingTop: '0px', paddingBottom:'10px' }}> Doctor {doctor.name} </h1>
                            }
                        
                            <div className={classes.around_news}>
                                {
                                loading ? <p> Loading... </p> :
                                    <>
                                        <div  className={classes.around_news_div}>
                                            <div className={classes.around_news_img}>  
                                                <Image src={doctor.image} style={{ border: '2px solid rgb(57, 57, 57)', borderRadius:'5px',  padding:'10px 10px', height: 'auto', maxWidth: '250px' }} alt={doctor.name} fluid />
                                            </div>
                                        
                                            <div  className={classes.around_news_info}>
                                                <div className={classes.around_news_info_into}>  Name: {doctor.name} </div>
                                                <div className={classes.around_news_info_into} > Email: {doctor.email} </div>
                                                <div className={classes.around_news_info_into}> Specialty: {doctor.specialty} </div>
                                                <div className={classes.around_news_info_into}> Qualification: {doctor.qualification} </div>
                                                <div className={classes.around_news_info_into}> Price: {doctor.price} </div>
                                                <div className={classes.around_news_info_into}> Rating: {doctor.rating}, numReviews: {doctor.numReviews} </div>
                                                <div className={subscribe ? class2 : class1}>
                                                    <SubscribeButton subscribeByClick={subscribeByClick}> Subscribe </SubscribeButton>
                                                </div>
                                                <div className={classes.around_news_info_subscribe}>
                                                    <Button variant="contained" color="primary"> 
                                                        Go to chat
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                }   
                            </div>
                        </>
                    </div>
                </LayoutContainer>
            </div>
        </>
    )
}

export default DoctorScreen
