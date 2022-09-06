
const io = require("socket.io")(8000, {
    cors: {
        origin: "*",
    },
})
let users = []
const addUser = (userId, socketId) => {
    !users.some((user) => { user.userId == userId })
    users.push({ userId, socketId })
}
const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId)
}
const getuser = (userId) => {
    return users.find(user => user.userId == userId)
}
io.on("connection", (socket) => {
    console.log("Socket is running");
    socket.on("addUser", userId => {
        addUser(userId, socket.id)
        io.emit("getusers", users)

    })
    socket.on("sendMessage", ({ senderId, recieverId, text }) => {
        console.log(senderId, recieverId, text);
        const user = getuser(recieverId)
        console.log(user);
        io.to(user?.socketId).emit("getMessage", {
            senderId, text
        })
    })
    socket.on("disconnect", () => {
        console.log("user disconnected");
        removeUser(socket.id)
        io.emit("getusers", users)
    })
})
console.log(users);
