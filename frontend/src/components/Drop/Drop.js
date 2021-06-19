import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { setImage, sendQualityData } from '../../actions/qualityActions'
import axios from 'axios'
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
    const onDropHandler = async (e) => {
        e.preventDefault()
        setDrag(false)
        let files = [...e.dataTransfer.files]
        const formData = new FormData()
        formData.append('file', files[0])
        dispatch(setImage(formData))
        await dispatch(sendQualityData(image))
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
                    Перетащите файлы, чтобы загрузить
                </div>
            }
            
        </div>
    )
}

export default Drop
