//Install express server
const express = require('express');
const path = require('path');
// const cors = require('cors')

const app = express();


// CORS
// const whitelist = ['https://sea-locker-backend.herokuapp.com']; // list of allow domain
//
// const corsOptions = {
//     origin: function (origin, callback) {
//         if (!origin) {
//             return callback(null, true);
//         }
//
//         if (whitelist.indexOf(origin) === -1) {
//             var msg = 'The CORS policy for this site does not ' +
//                 'allow access from the specified Origin.';
//             return callback(new Error(msg), false);
//         }
//         return callback(null, true);
//     }
// }
//
// // end
// app.use(cors(corsOptions));
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
//   next();
// });

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/demo-tempo'));

app.get('/*', function(req,res) {

res.sendFile(path.join(__dirname+'/dist/demo-tempo/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
