import React from "react";
import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import EventNoteIcon from '@material-ui/icons/EventNote';
import AssignmentIcon from '@material-ui/icons/Assignment';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import InfoIcon from '@material-ui/icons/Info';
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import {makeStyles} from "@material-ui/core/styles";
import {Link} from "react-router-dom";


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        color: '#000',
        overflow: 'auto',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    link: {
        color: '#000',
        textDecoration: 'none',
    },
}));

const SideDrawer = () => {
    const classes = useStyles();

    const path = (text) => {
        switch(text) {
            case '일기장':
                return '/diary'
            case '멘토링':
                return '/mentoring'
            case '게시판':
                return '/board'
            case 'About':
                return '/about'
            default:
                return '/'
        }
    }

    return (
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <Toolbar/>
            <div className={classes.drawerContainer}>
                <List>
                    {['일기장', '멘토링', '게시판'].map((text, index) => (
                        <Link className={classes.link} to={path(text)}>
                            <ListItem button key={text}>
                                <ListItemIcon>{text === '일기장' ? <EventNoteIcon/> :
                                    text === '멘토링' ? <SupervisedUserCircleIcon/> : <AssignmentIcon/>}</ListItemIcon>
                                <ListItemText primary={text}/>
                            </ListItem>
                        </Link>
                    ))}
                </List>
                <Divider/>
                <List>
                    {['About'].map((text, index) => (
                        <Link className={classes.link} to={path(text)}>
                            <ListItem button key={text}>
                                <ListItemIcon><InfoIcon/></ListItemIcon>
                                <ListItemText primary={text}/>
                            </ListItem>
                        </Link>
                    ))}
                </List>
            </div>
        </Drawer>
    );
}
export default SideDrawer;