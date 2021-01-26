import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { uuid } from 'uuidv4';
import { Friend } from '../../types/Friend';
import { Message } from '../../types/Message';
import { MessageComponent } from '../message/message';

import './chat.scss';

export const ChatComponent = (props: {chatId: string, messages: Message[], currentFriend: Friend | undefined, onMessage?: (message: Message) => void }) => {
    let nameInput: HTMLInputElement | null = null;
    const { chatId, currentFriend, messages, onMessage } = props;
    const [text, setText] = useState<string>('')
    const [animate, setAnimate] = useState<boolean>(false)

    const sendMessage = () => {
        const message: Message = {
            id: uuid(),
            text,
            date: moment(),
            author: chatId
        };  
        onMessage && onMessage(message);

        setAnimate(true)
        setTimeout(()=>{
            setAnimate(false)
        },500)

        setText('');
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    }

    useEffect(() => {
        nameInput?.focus();
    }, [nameInput, chatId])

    useEffect(() => {
        currentFriend?.currentMessage ? setText(currentFriend?.currentMessage) : setText('');
    }, [currentFriend])

    useEffect(() => {
        if(currentFriend) {
            currentFriend.currentMessage = text;
        }
    }, [currentFriend, text])
    
    return (
        <div className="chat">
            <div className="chat__message-list">
                {messages?.length > 0 && messages.map(m => (
                    <MessageComponent key={m.id} message={m}/>
                ))}
            </div>
            <div className="chat__composer">
                <input className="chat__input" type="text" 
                    ref={(input) => { nameInput = input; }} 
                    value={text} onChange={evt => setText(evt.target.value)} onKeyDown={handleKeyDown}/>
                <button className={`chat__send-button ${animate ? 'animate' : ''}`} onClick={() => sendMessage()}>
                    <FaCheck/>
                </button>
            </div>
        </div>
    )
}