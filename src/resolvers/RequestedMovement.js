function postedBy(parent, args, context, info) {
    return context.prisma.requestedMovement.findUnique({
        where: {
            id: parent.id
        }
    }).postedBy()
}

module.exports = {
    postedBy,
}