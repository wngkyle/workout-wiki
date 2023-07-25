function browseUser(parent, args, context, info) {
    return context.prisma.user.findMany()
}



module.exports = {
    browseUser,
}