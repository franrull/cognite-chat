import moment from 'moment';
import { useEffect, useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { uuid } from 'uuidv4';
import { Chat } from '../../types/Chat';
import { Message } from '../../types/Message';
import { MessageComponent } from '../message/message';

import './chat.scss';

export const ChatComponent = (props: {chat: Chat, onMessage?: (message: Message) => void }) => {
    let nameInput: HTMLInputElement | null;
    const { chat, onMessage } = props;
    const [text, setText] = useState<string>('')

    const sendMessage = () => {
        const message: Message = {
            id: uuid(),
            text,
            date: moment(),
            author: chat.id
        };  
        onMessage && onMessage(message);
        setText('');
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    }

    useEffect(() => {
        nameInput?.focus();
    }, [chat.id])
    
    return (
        <div className="chat">
            <div className="chat__message-list">
                {chat?.messages?.length > 0 && chat.messages.map(m => (
                    <MessageComponent key={m.id} message={m}/>
                ))}
            </div>
            <div className="chat__composer">
                <input className="chat__input" type="text" 
                    ref={(input) => { nameInput = input; }} 
                    value={text} onChange={evt => setText(evt.target.value)} onKeyDown={handleKeyDown}/>
                <button className="chat__send-button" onClick={() => sendMessage()}>
                    <FaCheck/>
                </button>
            </div>
        </div>
    )
}