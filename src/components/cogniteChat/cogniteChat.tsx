import { useEffect, useState } from 'react';
import { uuid } from 'uuidv4';

import { Friend } from '../../types/Friend';
import { Message } from '../../types/Message';
import { ChatComponent } from '../chat/chat';
import { FriendComponent } from '../friend/friend';

import './cogniteChat.scss';

const hardcodedFriends: Friend[] = [
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

    const [friends, setFriends] = useState<Friend[]>([]);
    const [messages, setMessages] = useState<Message[]>([]);
    const [activeChatMessages, setActiveChatMessages] = useState<Message[]>([]);
    const [activeChatId, setActiveChatId] = useState<string | null>(null);
    const [currentFriend, setCurrentFriend] = useState<Friend | undefined>(undefined);

    const selectFriend = (friendId: string) => {
        const activeMessages = messages.filter(m => m.author === friendId);
        setActiveChatId(friendId)
        setCurrentFriend(friends.find(f => f.id === friendId));
        setActiveChatMessages([...activeMessages])
    }

    const addMessage = (message: Message) => {
        setMessages([...messages, message])
    }
    const sortFriends = (a: Friend, b: Friend) => {
        const lastmessageA = getLastMessage(a);
        const lastmessageB = getLastMessage(b);
        if(lastmessageA && lastmessageB) {
            return lastmessageB.date.unix() - lastmessageA.date.unix();
        } else if(lastmessageA && !lastmessageB) {
            return -1;
        } else if(lastmessageB && !lastmessageA){
            return 1;
        } else {
            return 0;
        }
    }
    const getLastMessage = (friend: Friend) => {
        const [lastMessage] = messages.filter(m => m.author === friend.id).sort((a, b) => b.date.unix() - a.date.unix());
        return lastMessage;
    }

    useEffect(() => {
        const activeMessages = messages.filter(m => m.author === activeChatId);
        setActiveChatMessages([...activeMessages])
    },[activeChatId, messages]);
    
    useEffect(() => {
        setFriends(hardcodedFriends);
        friends?.length && setActiveChatId(friends[0].id);
    },[]);
    
    useEffect(() => {
        if(friends?.length) {
            setFriends(friends.sort(sortFriends));
        }
    },[messages]);

    return (
        <div className="cognite-chat">
            <div className="friends-list">
                {friends?.length && friends.map(f => (
                    <FriendComponent key={f.id} friend={f} isActive={activeChatId === f.id} onClick={selectFriend}/>)
                )}
            </div>
            <div className="current-chat">
                {activeChatId && <ChatComponent chatId={activeChatId} messages={activeChatMessages} currentFriend={currentFriend} onMessage={addMessage} />}
            </div>
        </div>
    )
}

export default CogniteChat;
