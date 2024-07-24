import React from 'react';
import './Msg.css';

interface MessageBubbleProps {
    message: string;
    sender: 'user' | 'bot';
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, sender }) => {
    const formattedMessage = message.replace(/\n/g, '<br />');
    return (
        <div className={`message-bubble ${sender}`}>
            <div
                className="message-content"
                dangerouslySetInnerHTML={{__html: formattedMessage}}
            />
        </div>
    );
};

export default MessageBubble;
