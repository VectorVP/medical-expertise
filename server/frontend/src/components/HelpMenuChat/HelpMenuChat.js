import React from 'react'
import { Avatar } from '@material-ui/core'
import classes from './HelpMenuChat.module.scss'

const HelpMenuChat = () => {
    return (
        <div className={classes.helpMenuChat}>
        
        <Avatar />

            <div className={classes.helpMenuChat__info}>
                <h5> Roome name </h5>
                <p> Last message </p>
            </div>        
        </div>
    )
}

export default HelpMenuChat
        