const express = require('express')
const apiRoutes = require('./routes/index.js');
const { ServerConfig, Logger } = require('./config/index.js');

const app = express();

app.use("/api", apiRoutes)

// http://localhost:6000/api/v1/blogs
// app.get('/api/v1/blogs',(req,res)=>{
//     res.send({
//         data :"working"
//     })
// })



app.listen(ServerConfig.PORT, () => {
    console.log(`Server is running on PORT : ${ServerConfig.PORT}`)
    Logger.info("Succesfully started the server")

})

