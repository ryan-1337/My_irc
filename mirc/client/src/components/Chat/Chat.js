import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import InfoBar from '../InfoBar/InfoBar';
import Messages from '../Messages/Messages';
import NewRoom from '../NewRoom/NewRoom';
import Input from '../Input/Input';

import './Chat.css';

let socket;

const Chat = ({ location }) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [newRoom, setNewRoom] = useState('');
    const [message, setMessage] = useState([]);
    const [messages, setMessages] = useState([]);
    const ENDPOINT = 'localhost:5000';

    useEffect(() => {
        const {name, room} = queryString.parse(location.search);

        socket = io(ENDPOINT);

        setName(name);
        setRoom(room);

        socket.emit('join', { name, room}, () => {
            
        });


        return () => {
            socket.emit('disconnect');

            socket.off();
        }
    }, [ENDPOINT, location.seach])

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message]);
        })
    }, [messages]);

    const sendMessage = (event) => {
     event.preventDefault();

        if(message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }

    const createRoom = (event) => {
     event.preventDefault();

        if(newRoom) {
            socket.emit('createRoom', newRoom, () => setRoom(''));
        }
    }

    console.log(newRoom, setNewRoom);

    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room = {room} />
                <Messages messages={messages} name={name} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
                <div className="leftContainer">
                    <NewRoom newRoom={newRoom} setNewRoom={setNewRoom}  createRoom={createRoom}/>
                </div>
            </div>
        </div>
    )
}

export default Chat;