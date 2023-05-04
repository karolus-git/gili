import Badge from 'react-bootstrap/Badge'

const remainingMinutes = (list) =>{
    const toMinutes = 1000 * 60;
    var currentDate = new Date()
    var expirationDate = new Date(list.expiration_date)

    var diffMinutes = Math.round((expirationDate.getTime() - currentDate.getTime()) / toMinutes);

    return diffMinutes
}

export const isMyList = (user, listuser) => {
    return (user.userid == listuser.userid)
}

export const isExpired = (list) => {
    return remainingMinutes(list) < 0
}

export const isDeleted = (list) => {
    return list.is_deleted
}

export const isShared = (list) => {
    return list.is_shared && list.is_shared_with.length > 0
}


export const badgeListShared = (list) => {
    if (isShared(list)) {
        return <i class="fa fa-people-group" style={{fontSize: 25}}></i>
    } else {
        return <i class="fa fa-person-half-dress" style={{fontSize: 25}}></i>
    }
}

export const badgeListTime = (list) => {

    var minutes = remainingMinutes(list)
    var expirationDateStr = new Date(list.expiration_date).toDateString()

    switch (true){
        case isDeleted(list):
            return <Badge bg="dark">DEL</Badge>
        case isExpired(list):
            return <Badge bg="dark">EXP {expirationDateStr}</Badge>

        case minutes <= 60:
            return <Badge bg="danger" > less than {minutes}min ! </Badge>;
        
        case minutes <= 60 * 24:
            return <Badge bg="warning">less than {Math.round(minutes / 60)}h</Badge>;
        
        case minutes <= 60 * 24 * 10:
            return <Badge bg="secondary" >ends in {Math.round(minutes / 60 / 24)} days</Badge>;
        
        default:
            return <Badge bg="success">{expirationDateStr}</Badge>

    }
}
