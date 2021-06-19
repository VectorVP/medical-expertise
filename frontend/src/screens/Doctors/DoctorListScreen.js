import React, { useEffect, useState } from 'react'
import classes from './DoctorList.module.scss'

// for flex-box building 
import { Row, Col } from 'react-bootstrap'

// redux
import { useDispatch, useSelector } from 'react-redux'
import { listDoctors } from '../../actions/doctorsAction'

// container
import LayoutContainer from '../../components/LayoutContainer/LayoutContainer.js'

// components
import Menu from '../../components/Menu/Menu'
import Doctor from '../../components/Doctor/Doctor'

const DoctorListScreen = () => {

    const styleOfCard = []

    const [hover, setHover] = useState(false)

    if (hover) {
        styleOfCard.push({ cursor:"pointer" })
    }

    const dispatch = useDispatch()

    const doctorsList = useSelector( state => state.doctors )
    const { loading, error, doctors } = doctorsList

    useEffect( () => {
        dispatch(listDoctors())
    }, [dispatch])

    return (
        <>
            {/* <div> {loading && <Loader />} </div> */}
            <div className={classes.container}>
                <div className={classes.container_left}>
                    <Menu />
                </div>

                <LayoutContainer type='doctors'>
                    <div>
                            <h1 style={{ paddingTop: '10px', paddingBottom:'10px' }}>Doctors</h1>
                            <div className={classes.around_news}>
                                {
                                loading ? <p style={{fontSize:'20px'}}> Loading... </p> :
                                <div style={{display:"flex", flexDirection:"row", justifyContent: "center", flexWrap: "wrap", width:"100%"}}>
                                    {
                                        doctors.map( (doctor) => (
                                            <>
                                                <div style={{maxWidth:"330px", margin: "20px"}}>
                                                    <Doctor doctor={doctor} />
                                                </div> 
                                                <div style={{maxWidth:"330px", margin: "20px"}}>
                                                    <Doctor doctor={doctor} />
                                                </div> 
                                                <div style={{maxWidth:"330px", margin: "20px"}}>
                                                    <Doctor doctor={doctor} />
                                                </div> 
                                            </>
                                        ))
                                    }
                                </div>
                                }
                              </div>
                        </div>
                </LayoutContainer>
            </div>
        </>
    )
}

export default DoctorListScreen
