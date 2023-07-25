function user(parent, args, context, info) {
    return context.prisma.user.findMany()
}

function movement(parent, args, context, info) {
    return context.prisma.movement.findMany()
}

function exercise(parent, args, context, info) {
    return context.prisma.exercise.findMany()
}

function targetMuscle(parent, args, context, info) {
    return context.prisma.targetMuscle.findMany()
}

function movementPattern(parent, args, context, info) {
    return context.prisma.movementPattern.findMany()
}

function equipment(parent, args, context, info) {
    return context.prisma.equipment.findMany()
}

module.exports = {
    user,
    movement,
    exercise,
    targetMuscle,
    movementPattern,
    equipment,
}