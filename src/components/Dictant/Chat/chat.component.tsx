import React, { useEffect, useRef, useState } from 'react';
import { ScrollView } from 'react-native';

import {
    ChatContainer,
    Message,
    MessageText,
    Time,
    ChatOuterContainer
} from './chat.styles';

interface IMessage {
    time: string,
    userName: string,
    message: string
}

const dummyMessages: IMessage[] = [
    {
        time: '13:21',
        message: 'Just a long line to test how it fits or maybe it doesnt',
        userName: 'Expert'
    },
    {
        time: '13:21',
        message: 'Whatever',
        userName: 'Expert'
    },
    {
        time: '13:21',
        message: 'Whatever',
        userName: 'Expert'
    },
    {
        time: '13:21',
        message: 'Whatever',
        userName: 'Expert'
    },
    {
        time: '13:21',
        message: 'Whatever',
        userName: 'Expert'
    },
    {
        time: '13:21',
        message: 'Whatever',
        userName: 'Expert'
    },
    {
        time: '13:21',
        message: 'Whatever2',
        userName: 'Expert'
    },
]






const Chat: React.FC = () => {
    const [messages, setMessages] = useState<IMessage[]>([])
    const chatRef = useRef<ScrollView>(null)

    useEffect(() => {
        setMessages(dummyMessages)
    }, [])


    const handleScroll = () => {
        chatRef.current?.scrollToEnd()
    }

    return (
        <ChatOuterContainer>
            <ChatContainer
            showsVerticalScrollIndicator={false}
            ref={chatRef}
            onContentSizeChange={handleScroll}
            >
                {
                    messages.map((message, index) => {
                        return (
                            <Message key={index}>
                                <Time>{'['+ message.time + ']'}</Time>
                                <MessageText>{message.userName + ':' + ' ' + message.message}</MessageText>
                            </Message>
                        )
                    })
                }
            </ChatContainer>
        </ChatOuterContainer>
    )
}



export default Chat;