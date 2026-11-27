const mongoose = require('mongoose');
// require('dotenv').config();
const URI = process.env.MONGODB_URI
mongoose.connect(URI)

.then(() => {
    console.log('Database connected successfully'); 
})
.catch((error) => {
    console.error('Connection to Database failed:', error.message);
});