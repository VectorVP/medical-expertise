import React from 'react'
import classes from './HelpMenu.module.scss'
import './HelpMenuCss.css'
import HelpMenuChat from '../HelpMenuChat/HelpMenuChat'
import { LinkContainer } from 'react-router-bootstrap'
import ChatIcon from '@material-ui/icons/Chat'
import SearchIcon from '@material-ui/icons/Search'
import DonutLargeIcon from '@material-ui/icons/DonutLarge'
import SearchOutlined from '@material-ui/icons/SearchOutlined'
import AddBoxIcon from '@material-ui/icons/AddBox';
import { Avatar, IconButton } from '@material-ui/core'

const HelpMenu = ({ match, type, userInfo }) => {

    if (type === "messenger") {
        return (
            <div className={classes.helpMenu}>
                <h4> Chat List </h4>
                <hr />
                 <div className={classes.helpMenu__chat}>
                    <div className={classes.helpMenu__chat_header}>
                        <Avatar src='data:image/jpeg;base64,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'/>
                        <div className={classes.helpMenu__chat_header__right}>
                            <IconButton style={{backgroundColor: "white"}}>
                                <DonutLargeIcon />
                            </IconButton>
                            <IconButton style={{backgroundColor: "white"}}>
                                <ChatIcon/>
                            </IconButton>
                            <IconButton style={{backgroundColor: "white"}}>
                                <SearchIcon/>
                            </IconButton>
                        </div>
                    </div>
                    <div className={classes.helpMenu__chat__search}>
                        <div className={classes.helpMenu__chat__searchContainer}>
                            <SearchOutlined  />
                            <input placeholder="Search or start new chat" type="text" />
                        </div>
                    </div>
                    <div className={classes.helpMenu__chats}>
                        <HelpMenuChat />
                        <HelpMenuChat />
                        <HelpMenuChat />
                        <HelpMenuChat />
                        <HelpMenuChat />
                    </div>
                </div>
            </div>
        )
    }
    if (userInfo && userInfo.isDoc) {
        return (
            <div className={classes.helpMenu}>
                <h2> Help Menu </h2>
                <div style={{display:"flex", textAlign:"center", justifyContent:"center", verticalAlign:"middle"}}>
                    <p style={{fontSize:"22px"}}> Create a new </p>
                    <div>
                    <LinkContainer to="/home/create" style={{cursor: "pointer", paddingTop:"50%", paddingLeft:"5px"}}>
                        <AddBoxIcon  fontSize="large"/>
                    </LinkContainer>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className={classes.helpMenu}>
            <h2>  </h2>
        </div>
    )

}

export default HelpMenu
