// import React, {useEffect, useState} from 'react'
// // redux
// import { useDispatch, useSelector } from 'react-redux'
// import Menu from '../../components/Menu/Menu'
// import LayoutContainer from '../../components/LayoutContainer/LayoutContainer.js'
// import Button from '@material-ui/core/Button'
// import {createNew} from "../../actions/newsAction"
// import classes from './CreateScreen.module.scss'

// const CreateScreen = () => {
//     const dispatch = useDispatch()
//     const userLogin = useSelector( state => state.userLogin )
//     const { userInfo } = userLogin
//     const createdInfo = useSelector( state => state.createdNew )
//     const { state } = createdInfo
//     console.log("userInfo ", userInfo)
//     const [text, setText] = useState('')
//     const [descr, setDescr] = useState('')
//     const [type, setType] = useState('')

//     const onSubmitSend = (e) => {
//         e.preventDefault()
//         console.log("submit", text, descr, type)
//         dispatch(createNew("/images/3.jpg", type, descr, text, userInfo.email))
//         setText('')
//         setDescr('')
//         setType('')
//     }

//     return (
//         <>
//         {/* <div> {loading && <Loader />} </div> */}
//         <div className={classes.container}>
//             <div className={classes.container_left}>
//                 <Menu />
//             </div>

//             <LayoutContainer>
//                 <div>
//                     <h1 style={{ paddingTop: '10px', paddingBottom:'10px' }}>Create a New</h1>
//                     <form onSubmit={(e) => onSubmitSend(e)}>
//                         <div style={{display:"flex", justifyContent:"center", flexDirection:"column"}}>
//                             <label for="Descr">
//                                 <input type="text" name="descr" value={descr} required id="descr" onChange={(e) => setDescr(e.target.value)}/>
//                                 {
//                                     !descr && <div className={classes.label_text}>Description</div>
//                                 }   
//                             </label>
//                             <label for="Text">
//                                 <textarea type="text" name="text" value={text} required id="text" onChange={(e) => setText(e.target.value)}/>
//                                 {
//                                     !text && <div className={classes.label_text}>Text</div>
//                                 }  
//                             </label>
//                             <label for="Type">
//                                 <input type="text" name="type" value={type} required id="type" onChange={(e) => setType(e.target.value)}/>
//                                 {
//                                     !type &&  <div className={classes.label_text}>Type</div>
//                                 }
//                             </label>
//                             {/* <button style={{paddingTop:"30px"}} type="submit" value="send">Send</button> */}
//                             <Button style={{marginTop:"50px"}} variant="contained" color="primary" type="submit"> 
//                                 Send
//                             </Button>
//                         </div>
//                     </form>
//                 </div>
//             </LayoutContainer>
//         </div>
//     </>
//     )
// }

// export default CreateScreen
