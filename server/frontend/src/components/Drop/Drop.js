import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { setImage, sendQualityData } from '../../actions/qualityActions'
import classes from './Drop.module.scss'

const Drop = ({image}) => {
    const dispatch = useDispatch()
    const [drag, setDrag] = useState(false)
    const dragStartHandler = (e) => {
        e.preventDefault()
        setDrag(true)
    }
    const dragLeaveHandler = (e) => {
        e.preventDefault()
        setDrag(false)
    }

    // const toBase64 = file => {
    //     const reader = new FileReader();
    //     reader.readAsDataURL(file);
    //     reader.onload = () => reader.result;
    //     return reader.result
    // }
    const onDropHandler = async (e) => {
        e.preventDefault()
        setDrag(false)
        let files = [...e.dataTransfer.files]
        const formData = new FormData()
        formData.append('epikris', files[0])
        dispatch(setImage(formData))
        console.log("files", files)
    }
    return (
        <div className={classes.around_drop}>
            {drag
                ?
                <div 
                className={classes.drop_area}
                onDragStart={e => dragStartHandler(e)}
                onDragLeave={e => dragLeaveHandler(e)}
                onDragOver={e => dragStartHandler(e)}
                onDrop={e => onDropHandler(e)}
                > 
                    Отпустите файлы для загрузки 
                </div>
                :
                <div
                 className={classes.drop}
                 onDragStart={e => dragStartHandler(e)}
                 onDragLeave={e => dragLeaveHandler(e)}
                 onDragOver={e => dragStartHandler(e)}
                 >
                   <p style={{fontSize:"18px"}}> Перетащите файлы, чтобы загрузить или нажмите на кнопку </p>
                </div>
            }
            
        </div>
    )
}

export default Drop
