function movement(parent, args, context, info) {
    return context.prisma.exercise.findUnique({
        where: {
            id: parent.id
        }
    }).movement()
}


module.exports = {
    movement,
}