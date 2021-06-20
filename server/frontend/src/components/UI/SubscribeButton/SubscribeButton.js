import React from 'react'
import Button from '@material-ui/core/Button'
import classes from './SubscribeButton.module.scss'

const SubscribeButton = ({children, subscribeByClick}) => {

    return (
        <div onClick={subscribeByClick} className={classes.button}>
            <Button variant="contained" color="primary"> { children } </Button>
        </div>
    )
}

export default SubscribeButton
