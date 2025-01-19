function movement(parent, args, context, info) {
    return context.prisma.bookmark.findUnique({
        where: {
            id: parent.id 
        }
    }).movement()
}

function user(parent, args, context, info) {
    return context.prisma.bookmark.findUnique({
        where: {
            id: parent.id
        }
    }).user()
}

module.exports = {
    movement,
    user,
}