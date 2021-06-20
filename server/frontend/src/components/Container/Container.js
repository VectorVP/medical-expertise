import React from 'react'
import classes from './Container.module.scss'

const Container = ({ children, match }) => {
    return (
        <div className={classes["container"]}>
            { children }
        </div>
    )
}

export default Container
