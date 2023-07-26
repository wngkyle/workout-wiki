async function user(parent, args, context, info) {
    const where = args.filter 
        ? {
            OR: [
                { name: { 
                    contains: args.filter,
                    mode: 'insensitive', 
                } },
                { email: { 
                    contains: args.filter,
                    mode: 'insensitive',
                } }
            ],
        } : {}
    const users = await context.prisma.user.findMany({
        where: where,
        skip: args.skip,
        take: args.take,
    })

    return users
}

async function movement(parent, args, context, info) {
    const where = args.filter
        ? { 
            OR: [
                { name: { 
                    contains: args.filter,
                    mode: 'insensitive', 
                } },
                { description: { 
                    contains: args.filter,
                    mode: 'insensitive', 
                } },
                { targetMuscle: { part: { 
                    contains: args.filter,
                    mode: 'insensitive', 
                } } },
            ],
        } : {}
    const movements = await context.prisma.movement.findMany({
        where,
        skip: args.skip,
        take: args.take,
    })
    
    return movements
}

async function exercise(parent, args, context, info) {
    const where = args.filter 
        ? {
            type: { 
                contains: args.filter,
                mode: 'insensitive',
            } ,
        } : {}
    const exercises = await context.prisma.exercise.findMany({
        where,
        skip: args.skip,
        take: args.take,
    })
    return exercises
}

async function targetMuscle(parent, args, context, info) {
    const where = args.filter
        ? {
            part: { 
                contains: args.filter,
                mode: 'insensitive', 
            } 
        } : {}
    const targetMuscles = await context.prisma.targetMuscle.findMany({
        where,
        skip: args.skip,
        take: args.take,
    })
    return targetMuscles
}

async function movementPattern(parent, args, context, info) {
    const where = args.filter
        ? {
            pattern: { 
                contains: args.filter,
                mode: 'insensitive',
            } 
        } : {}
    const movementPatterns = await context.prisma.movementPattern.findMany({
        where,
        skip: args.skip,
        take: args.take,
    })
    return movementPatterns
}

async function equipment(parent, args, context, info) {
    const where = args.filter
        ? {
            type: { 
                contains: args.filter,
                mode: 'insensitive',
            } 
        } : {}
    const equipments = await context.prisma.equipment.findMany({
        where,
        skip: args.skip,
        take: args.take,
    })
    return equipments
}



module.exports = {
    user,
    movement,
    exercise,
    targetMuscle,
    movementPattern,
    equipment,
}