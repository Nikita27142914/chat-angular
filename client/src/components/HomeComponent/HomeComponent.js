import React, { useState, useEffect } from "react"
import axios from "axios"
import io from "socket.io-client"
import RoomCard from "../RoomCard/RoomCard"
import MessageBox from "../MessageBox/MessageBox"

import "./HomeComponent.sass"

function HomeComponent({history}) {

    const [chats, setChats] = useState([])
    const [socket, setSocket] = useState("")
    const [room, setRoom] = useState("")
    const [messages, setMessages] = useState([])
    const [authorize, setAuthorize] = useState(false)

    useEffect(() => {
        axios.get(`http://localhost:3002/rooms`, {
            headers: { "authorization": localStorage.getItem("token") }
            }).then(res => {
                if(res.status === 200) {
                    setChats(res.data)
                    const currentSocket = !authorize ? io("http://localhost:3002") : socket
                    console.log(authorize)
                    setSocket(currentSocket)
                    !authorize && currentSocket.emit("authorisation", localStorage.getItem("token"))

                    currentSocket.on("authorisation_completed", authorize_true => setAuthorize(authorize_true))
                    
                    currentSocket.on("get_message", data => {
                        console.log(data.roomId)
                        if(data.roomId === room) {
                            const { authorId, authorName, content } = data
                            setMessages(messages.concat([{ authorId, authorName, content }]))
                        }
                    })
                }
            }).catch(err => console.log(err))
    }, [room, messages])

    const switchRoom = (title) => {
        axios.get(`http://localhost:3002/rooms/${title}`, {
            headers: { "authorization": localStorage.getItem("token") }
            }).then(res => {
                if(res.status === 200) {
                    setMessages(res.data)
                    setRoom(title)
                    history.push(`/home/${title}`)
                }
            }).catch(err => console.log(err))
    }

    const sendMessage = (messageText) => {
        const author = localStorage.getItem("token")
        const data = {messageText, room, author}
        socket.emit("send_message", data)
    }

    return (
        <div className="home-container">
            <div className="home-container__navbar">
                {
                    chats
                        &&
                    chats.length
                        &&
                    chats.map((chat, id) => {
                        const {_id, users} = chat
                        return (
                            <RoomCard key={id}
                                switchRoom={switchRoom} 
                                title={_id}
                                users={users} />
                        )
                    })
                }
            </div>
            <div className="home-container__message">
                {
                    !room ? <h1>Выберите комнату и начниете общение</h1> :
                        <MessageBox room={room} 
                            messages={messages}
                            sendMessage={sendMessage} />
                }
            </div>
        </div>
    )
}

export default HomeComponent