export const isTakable = (user, item) => {

    return (isTakenByMe(user, item) || !isTakenStatus(user, item))
}

export const isForMe = (user, item) => {

    return (isTakenByMe(user, item) || !isTakenStatus(user, item))
}

export const isTakenByMe = (user, item) => {
    if (item.is_taken){
        return (user.userid == item.is_taken_by.userid)
    } else {
        return true
    }
}

export const isTakenStatus = (user, item) => {

    return item.is_taken
}

export const isTakenTextButton = (user, item) => {
    if (isTakenStatus(user, item)) {
        if (isTakenByMe(user, item)) {
            return "Release"
        } else {
            return "Taken"
        } 
    } else {
        return "Take"
    }
}