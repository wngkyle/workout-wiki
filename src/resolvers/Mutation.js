const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('../util')

async function signup(parent, args, context, info) {
    const password = await bcrypt.hash(args.password, 10)
    const user = await context.prisma.user.create({ data: { ...args, password }})
    const token = jwt.sign({ userId: user.id }, APP_SECRET)

    return {
        token,
        user,
    }
}

async function login(parent, args, context, info) {
    const user = await context.prisma.user.findUnique({ where: { email: args.email } })
    if (!user) {
        throw new Error("No such user found")
    }
    const valid = await bcrypt.compare(args.password, user.password)
    if (!valid) {
        throw new Error("Invalid Password")
    }
    const token = jwt.sign({ userId: user.id }, APP_SECRET)

    return {
        token,
        user,
    }
}

async function requestMovement(parent, args, context, info) {
    const userId = context.userId

    let exercise = await context.prisma.exercise.findFirst({
        where: {
            type: args.exercise
        }
    })
    if (exercise === null) {
        exercise = await context.prisma.exercise.create({
            data: {
                type: args.exercise
            }
        })
    }
    let equipment = await context.prisma.equipment.findFirst({
        where: {
            type: args.equipment
        }
    })
    if (equipment === null) {
        equipment = await context.prisma.equipment.create({
            data: {
                type: args.equipment
            }
        })
    }
    let movementPattern = await context.prisma.movementPattern.findFirst({
        where: {
            pattern: args.movementPattern
        }
    })
    if (movementPattern === null) {
        movementPattern = await context.prisma.movementPattern.create({
            data: {
                pattern: args.movementPattern
            }
        })
    }
    let targetMuscle = await context.prisma.targetMuscle.findFirst({
        where: {
            part: args.targetMuscle
        }
    })
    if (targetMuscle === null) {
        targetMuscle = await context.prisma.targetMuscle.create({
            data: {
                part: args.targetMuscle 
            }
        })
    }
    const newMovement = await context.prisma.requestedMovement.create({
        data: {
            name: args.name,
            skillLevel: args.skillLevel,
            description: args.description,
            exercise: { connect: { id: exercise.id } },
            equipment: { connect: { id: equipment.id } },
            targetMuscle: { connect: { id: targetMuscle.id } },
            movementPattern: { connect: { id: movementPattern.id } },
            postedBy: { connect: { id: userId } }
        }
    })
    return newMovement
}

async function addExercise(parent, args, context, info) {
    const newExercise = await context.prisma.exercise.create({
        data: {
            type: args.type
        }
    })
    return newExercise
}

async function addTargetMuscle(parent, args, context, info) {
    const newTargetMuscle = await context.prisma.targetMuscle.create({
        data: {
            part: args.part
        }
    })
    return newTargetMuscle
}

async function addMovementPattern(parent, args, context, info) {
    const newMovementPattern = await context.prisma.movementPattern.create({
        data: {
            pattern: args.pattern 
        }
    })
    return newMovementPattern
}

async function addEquipment(parent, args, context, info) {
    const newEquipment = await context.prisma.equipment.create({
        data: {
            type: args.type
        }
    })
    return newEquipment
}

module.exports = {
    signup,
    login,
    addExercise,
    addTargetMuscle,
    addMovementPattern,
    addEquipment,
    requestMovement,
}
