import React from 'react';
import {
    Badge,
    Grid,
    Menu,
    MenuItem,
    Paper,
    Snackbar,
    Typography,
} from '@material-ui/core';
import { Button, Empty, Input, PageHeader, Timeline } from 'antd';
import { GoPrimitiveDot } from 'react-icons/go';
import { GrSend } from 'react-icons/gr';
import { useHistory } from 'react-router-dom';
import ScrollToBottom from 'react-scroll-to-bottom';
import { MainContext } from '../../Contexts/MainContext';
import { SocketContext } from '../../Contexts/socketContext';
import useStyles from './styles';
import MuiAlert from '@material-ui/lab/Alert';
import moment from 'moment';

const Chat = () => {
    const {
        name,
        room,
        setName,
        setRoom,
        users,
        open,
        setOpen,
        content,
        setContent,
    } = React.useContext(MainContext);
    const socket = React.useContext(SocketContext);
    const [message, setMessage] = React.useState('');
    const [messages, setMessages] = React.useState([]);
    const [timeline, setTimeline] = React.useState([
        `${moment(Date.now()).format('LT')} You joined this room`,
    ]);
    const classes = useStyles();
    const history = useHistory();

    window.onpopstate = (e) => logout();

    React.useEffect(() => {
        if (!name) return history.push('/');
    }, [history, name]);

    const handleTimeLine = ({ description }) => {
        const text = moment(Date.now()).format('LT') + ' ' + description;
        setTimeline([...timeline, text]);
    };
    console.log('re render');

    socket.on('notification', (notification) => {
        handleTimeLine(notification);
        setContent(notification.description);
        setOpen(true);
        setTimeout(() => {
            setOpen(false);
        }, 3000);
    });

    React.useEffect(() => {
        socket.on('message', (data) => {
            setMessages((messages) => [...messages, data]);
        });
    }, [socket]);

    const handleNewMessage = () => {
        if (message !== '') {
            socket.emit('newMessage', message, () => setMessage(''));
            setMessage('');
        }
    };

    const logout = () => {
        setName('');
        setRoom('');
        history.push('/');
        history.go(0);
    };

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <div>
            <Grid container justify="center" spacing={8}>
                <Grid item>
                    <Paper className={classes.wrapper} elevation={5}>
                        <Snackbar open={open}>
                            <MuiAlert
                                severity="success"
                                elevation={6}
                                variant="filled"
                            >
                                {content}
                            </MuiAlert>
                        </Snackbar>
                        <PageHeader
                            className="site-page-header"
                            onBack={() => logout()}
                            title={room}
                            subTitle={
                                <div>
                                    {name}
                                    <GoPrimitiveDot
                                        style={{ color: 'green', marginTop: 3 }}
                                    />
                                </div>
                            }
                            extra={[
                                <Badge
                                    badgeContent={users.length}
                                    color="secondary"
                                >
                                    <Button
                                        aria-controls="simple-menu"
                                        aria-haspopup="true"
                                        onClick={handleClick}
                                    >
                                        Active users
                                    </Button>
                                </Badge>,
                                // <Statistic title="Active Users" value={users.length} />,
                            ]}
                        ></PageHeader>
                        <hr />
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            {users.map((element, index) => {
                                return (
                                    <MenuItem key={index} onClick={handleClose}>
                                        {element.name}
                                    </MenuItem>
                                );
                            })}
                        </Menu>
                        <ScrollToBottom
                            className={classes.messages}
                            debug={false}
                        >
                            {messages.length > 0 ? (
                                messages.map((element, index) =>
                                    element.creator === name ? (
                                        <div className={classes.wrapperMess}>
                                            <Button
                                                size="large"
                                                type="primary"
                                                elevation={3}
                                                key={index}
                                                className={
                                                    element.creator === name
                                                        ? classes.myMess
                                                        : classes.strangerMess
                                                }
                                            >
                                                {element.content}
                                            </Button>
                                        </div>
                                    ) : (
                                        <div
                                            className={
                                                classes.wrapperMessStranger
                                            }
                                        >
                                            <Typography
                                                variant="caption"
                                                display="block"
                                                gutterBottom
                                                color="red"
                                            >
                                                {element.creator}
                                            </Typography>
                                            <Button
                                                size="large"
                                                type="secondary"
                                                elevation={3}
                                                key={index}
                                                className={
                                                    element.creator === name
                                                        ? classes.myMess
                                                        : classes.strangerMess
                                                }
                                            >
                                                {element.content}
                                            </Button>
                                        </div>
                                    )
                                )
                            ) : (
                                <Empty
                                    style={{ paddingTop: 50 }}
                                    description="No Message"
                                />
                            )}
                        </ScrollToBottom>{' '}
                        <hr />
                        <div className="form">
                            <Input
                                type="text"
                                placeholder="Enter Message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleNewMessage();
                                    }
                                }}
                                addonAfter={
                                    <GrSend onClick={handleNewMessage} />
                                }
                            />
                        </div>
                    </Paper>
                </Grid>
                <Grid item>
                    <Timeline style={{ marginTop: 100 }} pending="Recording...">
                        <Timeline.Item>Timeline</Timeline.Item>
                        {timeline.map((element, index) => {
                            return (
                                <Timeline.Item key={index}>
                                    {element}
                                </Timeline.Item>
                            );
                        })}
                    </Timeline>
                </Grid>
            </Grid>
        </div>
    );
};

export default Chat;
