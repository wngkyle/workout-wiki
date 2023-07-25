function movement(parent, args, context, info) {
    return context.prisma.targetMuscle.findUnique({
        where: {
            id: parent.id
        }
    }).movement()
}




module.exports = {
    movement,
}