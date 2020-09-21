import React from "react"

import "./RoomCard.sass"

const RoomCard = ({switchRoom, title, users}) => {

    const formatDescription = (users) => {
        const description = users.map(user => (
            user.userId.name + " " + user.userId.surname
        ))

        return description.join(", ")
    }

    return (
        <div className="room-card__container" title={formatDescription(users)} onClick={() => switchRoom(title)}>
            <div className="room-card__title">{title}</div>
            <div className="room-card__description">{formatDescription(users)}</div>
        </div>
    )
}

export default RoomCard
