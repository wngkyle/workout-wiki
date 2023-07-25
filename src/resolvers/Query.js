function browseUser(parent, args, context, info) {
    return context.prisma.user.findMany()
}

function browseMovement(parent, args, context, info) {
    return context.prisma.movement.findMany()
}

module.exports = {
    browseUser,
    browseMovement,
}