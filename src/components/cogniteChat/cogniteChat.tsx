import { useEffect, useState } from 'react';
import { uuid } from 'uuidv4';

import { Chat } from '../../types/Chat';
import { Friend } from '../../types/Friend';
import { Message } from '../../types/Message';
import { ChatComponent } from '../chat/chat';
import { FriendComponent } from '../friend/friend';

import './cogniteChat.scss';

const friends: Friend[] = [
    {
        id: uuid(),
        name: 'Fran',
        lastName: 'Gonzalez Rull',
        phone: '+34 987 234 123'
    },
    {
        id: uuid(),
        name: 'Morten',
        lastName: 'Hillbom',
        phone: '+47 8745 234 232'
    },
    {
        id: uuid(),
        name: 'John',
        lastName: 'Smith',
        phone: '+1 123 555 232'
    },
    {
        id: uuid(),
        name: 'Walt',
        lastName: 'Disney',
        phone: '+41 12 324334 232'
    }
];

const CogniteChat = () => {

    const [messages, setMessages] = useState<Message[]>([]);
    const [activeChat, setActiveChat] = useState<Chat | null>(null);

    const selectFriend = (friendId: string) => {
        const activeMessages = messages.filter(m => m.author === friendId);
        const chat: Chat = {
            id: friendId,
            messages: [...activeMessages],
        };
        setActiveChat(chat)
    }

    const addMessage = (message: Message) => {
        setMessages([...messages, message])
    }

    const updateActiveChatMessages = (messages: Message[]) => {
        if(!activeChat) return;
        setActiveChat({
            id: activeChat!.id,
            messages: [...messages],
        });
    }

    useEffect(() => {
        const activeMessages = messages.filter(m => m.author === activeChat?.id);
        updateActiveChatMessages(activeMessages)
    },[messages]);
    
    useEffect(() => {
        friends?.length && selectFriend(friends[0].id);
    },[]);

    return (
        <div className="cognite-chat">
            <div className="friends-list">
                {friends?.length && friends.map(f => (<FriendComponent key={f.id} friend={f} isActive={activeChat?.id === f.id} onClick={selectFriend}/>))}
            </div>
            <div className="current-chat">
                {activeChat && <ChatComponent chat={activeChat} onMessage={addMessage} />}
            </div>
        </div>
    )
}

export default CogniteChat;
