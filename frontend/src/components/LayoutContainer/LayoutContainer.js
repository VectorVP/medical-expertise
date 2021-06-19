import React from 'react'
import classes from './LayoutContainer.module.scss'

const LayoutContainer = ({ children, match, type }) => {

    const style = [classes.container]

    if (type === 'doctors') {
        style.pop()
        style.push(classes.containerDoctors)
    }

    return (
        <div className={style[0]}>
            { children }
        </div>
    )
}

export default LayoutContainer