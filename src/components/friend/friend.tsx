import { FaPhone, FaChevronRight } from "react-icons/all";
import { AvatarGenerator } from 'random-avatar-generator';

import { Friend } from "../../types/Friend";
import './friend.scss';

export const FriendComponent = (props: {friend: Friend, isActive?: boolean, onClick?: (id: string) => void}) => {
    const {friend, isActive, onClick} = props;
    const generator = new AvatarGenerator();

    const selectFriend = (id: string) => {
        onClick && onClick(id);
    }

    return (
        <div className={`friend-item ${isActive ? '--active' : ''}`} onClick={() => selectFriend(friend.id)}>
            <div className="friend-item__avatar">
                <img src={generator.generateRandomAvatar(friend.id)} alt={friend.name}/>
            </div>
            <div className="friend-item__data">
                <div className="friend-item__name">
                    {`${friend.name} ${friend.lastName}`}
                </div>
                <div className="friend-item__phone">
                    <FaPhone/> {friend.phone}
                </div>
            </div>
            <div className="friend-item__chevron">
                <FaChevronRight/>
            </div>
        </div>
    )
}