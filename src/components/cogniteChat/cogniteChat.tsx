import { useEffect, useState } from 'react';
import { uuid } from 'uuidv4';

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
    const [activeChatMessages, setActiveChatMessages] = useState<Message[]>([]);
    const [activeChatId, setActiveChatId] = useState<string | null>(null);

    const selectFriend = (friendId: string) => {
        const activeMessages = messages.filter(m => m.author === friendId);
        setActiveChatId(friendId)
        setActiveChatMessages([...activeMessages])
    }

    const addMessage = (message: Message) => {
        setMessages([...messages, message])
    }

    useEffect(() => {
        const activeMessages = messages.filter(m => m.author === activeChatId);
        setActiveChatMessages([...activeMessages])
    },[activeChatId, messages]);
    
    useEffect(() => {
        friends?.length && setActiveChatId(friends[0].id);
    },[]);

    return (
        <div className="cognite-chat">
            <div className="friends-list">
                {friends?.length && friends.map(f => (<FriendComponent key={f.id} friend={f} isActive={activeChatId === f.id} onClick={selectFriend}/>))}
            </div>
            <div className="current-chat">
                {activeChatId && <ChatComponent chatId={activeChatId} messages={activeChatMessages} onMessage={addMessage} />}
            </div>
        </div>
    )
}

export default CogniteChat;
