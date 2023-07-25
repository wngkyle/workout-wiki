function movement(parent, args, context, info) {
    return context.prisma.bookmark.findUnique({
        where: {
            id: parent.id
        }
    }).movement()
}

module.exports = {
    movement,
}