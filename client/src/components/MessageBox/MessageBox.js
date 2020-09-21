import React, { useState } from "react"
import Message from "../Message/Message"

import "./MessageBox.sass"

const MessageBox = ({room, messages, sendMessage}) => {

    const [messageText, setMessageText] = useState("")

    return (
        <div className="message-box__container">
            <div className="message-box__list">
                {
                    messages
                        &&
                    messages.length
                        &&
                    messages.map((message, id) => {
                        const { authorId, authorName, content } = message
                        return (
                            <Message key={id}
                                authorId={authorId}
                                authorName={authorName}
                                content={content} />
                        )
                    })
                }
            </div>
            <div className="message-box__input">
                <input type="text"
                    placeholder="Введите сообщение..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    className="form-control message-box__input-text" />
                <div className="btn btn-primary btn-lg message-box__input-send" 
                    onClick={() => {
                        sendMessage(messageText)
                        setMessageText("")}}>Отправить</div>
            </div>
        </div>
    )
}

export default MessageBox
