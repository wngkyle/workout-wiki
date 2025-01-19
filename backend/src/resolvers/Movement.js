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

function postedBy(parent, args, context, info) {
    return context.prisma.movement.findUnique({
        where: {
            id: parent.id
        }
    }).postedBy()
}

function postedByAdmin(parent, args, context, info) {
    return context.prisma.movement.findUnique({
        where: {
            id: parent.id
        }
    }).postedByAdmin()
}

module.exports = {
    exercise,
    targetMuscle,
    movementPattern,
    equipment,
    postedBy,
    postedByAdmin,
}