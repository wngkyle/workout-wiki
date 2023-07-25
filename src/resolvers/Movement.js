function exercise(parent, args, context, info) {
    return context.prisma.movement.findUnique({
        where: {
            id: parent.id
        }
    }).exercise()
}

function targetMuscle(parent, args, context, info) {
    return context.prisma.movement.findUnique({
        where: {
            id: parent.id
        }
    }).targetMuscle()
}

function movementPattern(parent, args, context, info) {
    return context.prisma.movement.findUnique({
        where: {
            id: parent.id
        }
    }).movementPattern()
}

function equipment(parent, args, context, info) {
    return context.prisma.movement.findUnique({
        where: {
            id: parent.id
        }
    }).equipment()
}

module.exports = {
    exercise,
    targetMuscle,
    movementPattern,
    equipment,
}