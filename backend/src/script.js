const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
    const newUser = await prisma.user.create({
        data: {
            name: "TEST_USERNAME",
            email: "TEST_EMAIL",
            password: "1234",
        }
    })
    const allUsers = await prisma.user.findMany()
    console.log(allUsers)
}

// main()
//     .catch(e => {
//         throw e
//     })
//     .finally(async () => {
//         await prisma.$disconnect()
//     })

async function main2() {
    const newMovement = await prisma.movement.create({
        data: {
            name: "TEST_MOVEMENT_2",
            description: "TEST_DESCRIPTION_2",
            skillLevel: "TEST_SKILLLEVEL_2",
        }
    })
    const allMovements = await prisma.movement.findMany()
    console.log(allMovements)
}

// main2()
//     .catch(e => {
//         throw e
//     })
//     .finally(async () => {
//         await prisma.$disconnect()
//     })

async function main3() {
    const newMovement = await prisma.movement.delete({
            where: { id: 3 }
    })
    const allMovements = await prisma.movement.findMany()
    console.log(allMovements)
}

// main3()
//     .catch(e => {
//         throw e
//     })
//     .finally(async () => {
//         await prisma.$disconnect()
//     })