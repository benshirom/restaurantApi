exports.sockets = (socket) => {
    socket.on("new-order",(arr)=>{
        console.log(arr)
        socket.broadcast.emit('new-order-from-server', {items:arr});
    })
    socket.on("typing-start",({roomID})=>{
        socket.to(roomID).emit("recieve-typing");
    })
    socket.on("typing-end",({roomID})=>{
        socket.to(roomID).emit("notRecieve-typing");
    })
    socket.on("join-room",({roomID})=>{
        socket.join(roomID);
    })
    socket.on('disconnect', ({messageObj , userID})=>{
        // let user = await UserModel.findById(userId).populate({path:'messages', model: "message"});
        // console.log(user);
        // let user = await UserModel.updateOne({_id: userID}).populate({path:'messages', $push: "message"});
    })
}
