import React from "react"

import "./Message.sass"

const Message = ({authorId, authorName, content}) => {

    // console.log(authorId, authorName, content)

    const isMyMessage = (authorId) => authorId === localStorage.getItem("token")

    return (
        <div className="message-item__container">
            <div className="message-item__bubble">
                {
                    isMyMessage(authorId) ?
                        <> 
                            <div className="message-item__bubble-gray">
                                {content}
                            </div>
                            <span className="message-item__bubble-gray-author">Автор: {authorName}</span>
                        </> :
                        <>
                            <div className="message-item__bubble-blue">
                                {content}
                            </div>
                            <span className="message-item__bubble-blue-author">Автор: {authorName}</span>
                        </>
                }
            </div>
        </div>
    )
}

export default Message
