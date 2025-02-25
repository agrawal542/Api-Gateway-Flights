const express = require('express')
const morgan = require('morgan');
const apiRoutes = require('./routes/index.js');
const { ServerConfig, Logger } = require('./config/index.js');
const rateLimit = require('express-rate-limit');
const { createProxyMiddleware, fixRequestBody } = require('http-proxy-middleware');
const { UserMiddlewares } = require('./middlewares/index.js');

const app = express();


const limiter = rateLimit({
    windowMs: 2 * 60 * 1000, // 2 minutes
    max: 30, // Limit each IP to 2 requests per `window` (here, per 2 minutes)
});

app.use(morgan('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(limiter);
app.use('/flightsService', UserMiddlewares.checkAuth, createProxyMiddleware({
    target: ServerConfig.FLIGHT_SERVICE,
    changeOrigin: true,
    // pathRewrite: { '^/flightsService': '/' },
    // on: {
    //     proxyReq: fixRequestBody,
    // },
}));
app.use(
    '/bookingService',
    UserMiddlewares.checkAuth,
    createProxyMiddleware({
        target: ServerConfig.BOOKING_SERVICE,
        changeOrigin: true,
        on: {
            proxyReq: (proxyReq, req, res) => {
                // Ensure req.user is set as a header before sending the request
                if (req.user) {
                    proxyReq.setHeader('x-user-data', JSON.stringify(req.user));
                }

                // Forward request body only if necessary
                if (req.body) {
                    const bodyData = JSON.stringify(req.body);

                    // Set headers for the request body
                    proxyReq.setHeader('Content-Type', 'application/json');
                    proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));

                    // Write and end request properly
                    proxyReq.write(bodyData);
                }
            },
        },
    })
);



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

