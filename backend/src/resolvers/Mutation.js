const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('../util')
const { movement } = require('./Query')

async function signup(parent, args, context, info) {
    const password = await bcrypt.hash(args.password, 10)
    const user = await context.prisma.user.create({ 
        data: { ...args, password }
    })
    const token = jwt.sign({ 
            userId: user.id, 
            role: user.role,
        }, 
            APP_SECRET
    )
    const bookmark = await context.prisma.bookmark.create({
        data: {
            user: { connect: { id: user.id } }
        }
    })

    return {
        token,
        user,
    }
}

async function adminSignUp(parent, args, context, info) {
    if (args.adminSignupKey !== process.env.ADMIN_SIGNUP) {
        throw new Error("Incorrect sign-up key")
    }
    const password = await bcrypt.hash(args.password, 10)
    const admin = await context.prisma.admin.create({
        data: { 
            name: args.name,
            email: args.email,
            password: password,
        }
    })
    const token = jwt.sign({ 
            adminId: admin.id, 
            role: admin.role
        }, 
            APP_SECRET
    )
    
    return {
        token,
        admin,
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
    const token = jwt.sign({ 
            userId: user.id, 
            role: user.role,
        }, 
            APP_SECRET
    )

    return {
        token,
        user,
    }
}

async function adminLogin(parent, args, context, info) {
    const admin = await context.prisma.admin.findFirst({ where: { email: args.email } })
    if (!admin) {
        throw new Error("No such admin found")
    }
    const valid = await bcrypt.compare(args.password, admin.password)
    if (!valid) {
        throw new Error("Invalid Password") 
    }
    const token = jwt.sign({ 
            adminId: admin.id, 
            role: admin.role
        }, 
            APP_SECRET
    )

    return {
        token,
        admin
    }
}

async function requestMovement(parent, args, context, info) {
    if (context.payload === null) {
        throw new Error("User has not logged in or please sign up for an account")
    }
    const userId = context.payload.userId

    const newRequestMovement = await context.prisma.requestedMovement.create({
        data: {
            name: args.name,
            skillLevel: args.skillLevel,
            description: args.description,
            exercise: args.exercise,
            equipment: args.equipment,
            targetMuscle: args.targetMuscle,
            movementPattern: args.movementPattern,
            postedBy: { connect: { id: userId } }
        }
    })
    return newRequestMovement
}

async function approveRequestedMovement(parent, args, context, info) {
    const adminId = context.payload.adminId
    const role = context.payload.role
    if (role !== "Admin") {
        throw new Error("Access denied, role is not admin")
    }
    const requestedMovement = await context.prisma.requestedMovement.findMany({
        where: {
            OR: [ 
                { id: args?.requestedMovementId },
                { name: { contains: args?.requestedMovementName } },
                { description: { 
                    contains: args?.requestedMovementName,
                    mode: "insensitive", 
                } },
            ],
        }
    })
    if (requestedMovement.length == 0) {
        throw new Error("No such movement found in the requested list")
    } else if (requestedMovement.length > 1) {
        throw new Error("More than one movement is found, please specify or use requestedMovementId field")
    }

    let exercise = await context.prisma.exercise.findFirst({
        where: {
            type: requestedMovement[0].exercise
        }
    })
    if (exercise === null) {
        exercise = await context.prisma.exercise.create({
            data: {
                type: requestedMovement[0].exercise
            }
        })
    }
    let equipment = await context.prisma.equipment.findFirst({
        where: {
            type: requestedMovement[0].equipment
        }
    })
    if (equipment === null) {
        equipment = await context.prisma.equipment.create({
            data: {
                type: requestedMovement[0].equipment
            }
        })
    }
    let movementPattern = await context.prisma.movementPattern.findFirst({
        where: {
            pattern: requestedMovement[0].movementPattern
        }
    })
    if (movementPattern === null) {
        movementPattern = await context.prisma.movementPattern.create({
            data: {
                pattern: requestedMovement[0].movementPattern
            }
        })
    }
    let targetMuscle = await context.prisma.targetMuscle.findFirst({
        where: {
            part: requestedMovement[0].targetMuscle
        }
    })
    if (targetMuscle === null) {
        targetMuscle = await context.prisma.targetMuscle.create({
            data: {
                part: requestedMovement[0].targetMuscle 
            }
        })
    }

    let approvedMovement
    try { 
        approvedMovement = await context.prisma.movement.create({
            data: {
                requestedAt: requestedMovement[0].requestedAt,
                name: requestedMovement[0].name,
                skillLevel: requestedMovement[0].skillLevel,
                description: requestedMovement[0].description,
                exercise: { connect: { id: exercise.id } },
                equipment: { connect: { id: equipment.id } },
                targetMuscle: { connect: { id: targetMuscle.id } },
                movementPattern: { connect: { id: movementPattern.id } },
                postedBy: { connect: { id: requestedMovement[0].postedById } },
                postedByAdmin: { connect: { id: adminId} },
            }
        })
    } catch ({ errorType, message }){
        throw new Error(`Error occur while create new movement instance\nErrortype: ${errorType}\nMessage: ${message}`)
    }
    const deletedMovement = await context.prisma.requestedMovement.delete({
        where: {
            id: requestedMovement[0].id
        }
    })
    return approvedMovement
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

async function addBookmark(parent, args, context, info) {
    const userId = context.payload.userId
    const updatedBookmark = await context.prisma.bookmark.update({
        where: {
            userId: userId
        },
        data: {
            movement: { connect: { id: args.movementId } }
        },
    })
    return updatedBookmark
}

module.exports = {
    signup,
    login,
    addExercise,
    addTargetMuscle,
    addMovementPattern,
    addEquipment,
    requestMovement,
    addBookmark,
    adminSignUp,
    adminLogin,
    approveRequestedMovement,
}