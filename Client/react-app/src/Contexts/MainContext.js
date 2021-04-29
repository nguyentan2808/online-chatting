import React from 'react';

const MainContext = React.createContext();

const MainProvider = ({ children }) => {
    const [name, setName] = React.useState('');
    const [room, setRoom] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [content, setContent] = React.useState('');

    const [users, setUsers] = React.useState([]);

    return (
        <MainContext.Provider
            value={{
                name,
                room,
                setName,
                setRoom,
                users,
                setUsers,
                open,
                setOpen,
                content,
                setContent,
            }}
        >
            {children}
        </MainContext.Provider>
    );
};

export { MainContext, MainProvider };
