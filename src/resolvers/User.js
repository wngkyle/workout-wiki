function postedMovement(parent, args, context, info) {
    return context.prisma.user.findUnique({
        where: {
            id: parent.id
        }
    }).postedMovement()
}

module.exports = {
    postedMovement
}