function postedMovement(parent, args, context, info) {
    return context.prisma.user.findUnique({
        where: {
            id: parent.id
        }
    }).postedMovement()
}

function requestedMovement(parent, args, context, info) {
    return context.prisma.user.findUnique({
        where: {
            id: parent.id
        }
    }).requestedMovement()
}

function bookmark(parent, args, context, info) {
    return context.prisma.user.findUnique({
        where: { 
            id: parent.id
        }
    }).bookmark()
}

module.exports = {
    postedMovement,
    requestedMovement,
    bookmark,
}