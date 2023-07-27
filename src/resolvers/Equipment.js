function movement(parent, args, context, info) {
    return context.prisma.equipment.findUnique({
        where: {
            id: parent.id
        }
    }).movement()
}


module.exports = {
    movement,
}