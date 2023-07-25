function movement(parent, args, context, info) {
    return context.prisma.movementPattern.findUnique({
        where: {
            id: parent.id
        }
    }).movement()
}




module.exports = {
    movement,
}