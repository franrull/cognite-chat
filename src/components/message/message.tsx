import './message.scss';
import { Message } from "../../types/Message";

export const MessageComponent = (props: {message: Message}) => {
    const { message } = props;

    return (
        <div className="message">
            <div className="message__text">{message.text}</div>
            <div className="message__time">{message.date.format('hh:mm')}</div>
        </div>
    )
}