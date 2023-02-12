//SERVER DEPENDENCIES
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');

const app = express();
const port = process.env.PORT || 3001;
require('dotenv').config(); //<--- Add this to link dotenv

const routes = require('./routes');

const passport = require('passport');
const { jwtStrategy } = require('./middleware/passport');

const { handleError, convertToApiError } = require('./middleware/apiError');

const mongoUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}?retryWrites=true&w=majority`;
mongoose.connect(mongoUri);

//PARSING
app.use(bodyParser.json());

//SANITIZE - PREVENT XSS ATTACKS
app.use(xss());
app.use(mongoSanitize());

//PASSPORT
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

//ROUTES
app.use('/api', routes)

//ERROR HANDLING
app.use(convertToApiError);
app.use((err,req,res,next)=>{
    handleError(err,res)

})

app.use(express.static('client/build'));
if(process.env.NODE_ENV === 'production'){
    const path = require('path');
    app.get('./*', (req,res)=>{
        res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'))

    })

}

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})