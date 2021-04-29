import { Paper, Snackbar } from '@material-ui/core';
import { Button, Form, Input } from 'antd';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { MainContext } from '../../Contexts/MainContext';
import MuiAlert from '@material-ui/lab/Alert';

import { SocketContext } from '../../Contexts/socketContext';
import useStyles from './styles';

const Login = () => {
    const socket = React.useContext(SocketContext);
    const {
        name,
        setName,
        room,
        setRoom,
        setUsers,
        setOpen,
        setContent,
    } = React.useContext(MainContext);

    const history = useHistory();
    const [isError, setHideError] = React.useState(false);
    const [err, setError] = React.useState(false);

    React.useEffect(() => {
        socket.on('users', (users) => {
            setUsers(users);
        });
    });
    const handleClick = () => {
        socket.emit('join', { name, room }, (error) => {
            if (error) {
                setError(error);
                setHideError(true);

                return setTimeout(() => {
                    setHideError(false);
                }, 3000);
            } else {
                setContent(`Welcome ${name} to room ${room}`);
                setOpen(true);
                setTimeout(() => {
                    setOpen(false);
                }, 3000);
                history.push('/chat');
            }
        });
    };
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };

    const classes = useStyles();

    return (
        <Paper style={{ marginTop: 100 }}>
            <Snackbar open={isError}>
                <MuiAlert severity="error" elevation={6} variant="filled">
                    {err}
                </MuiAlert>
            </Snackbar>
            <Form
                style={{ padding: 20 }}
                name="basic"
                initialValues={{ remember: true }}
            >
                <Form.Item>
                    <img
                        className={classes.img}
                        style={{ margin: 'auto' }}
                        src="https://upload.wikimedia.org/wikipedia/vi/1/1b/T%C4%90T_logo.png"
                        alt="img"
                        height="70"
                    ></img>
                </Form.Item>
                <Form.Item
                    label="Room"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username',
                        },
                    ]}
                >
                    <Input onChange={(e) => setRoom(e.target.value)} />
                </Form.Item>

                <Form.Item
                    label="Name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password',
                        },
                    ]}
                >
                    <Input onChange={(e) => setName(e.target.value)} />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button
                        onClick={handleClick}
                        type="primary"
                        htmlType="submit"
                    >
                        Go
                    </Button>
                </Form.Item>
            </Form>
        </Paper>
    );
};

export default Login;
