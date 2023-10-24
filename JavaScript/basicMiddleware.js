const express = require('express');
var bodyParser = require('body-parser')
const app = express();

const port = 4000;

// bodyParser returns a midddleware where it extracts the body
// It lets you extract body from request using req.body
app.use(bodyParser.json());

function middleware(req, res, next){
    console.log('from inside middleware' + req.headers.counter);
    next();    
}

app.use(middleware);

function calculateSum(counter){
    var sum = 0;
    for(var i = 0; i<=counter; i++){
        sum = sum + i;
    }

    return sum;

}

function calculateMul(counter){
    var mul = 0;
    for(var i = 1; i<counter; i++){
        mul = counter*i;
    }
    return mul;
}

// 200 - OK staus code where HTTP server sends us if everything went well and good
// 411 - went wrong especially with length
function handleFirstRequest(req, res){
    console.log(req.body);
    var counter = req.query.counter;
    if(counter < 100000){
        var calculatedSum = calculateSum(counter);
        // var answer = "the sum is " + calculatedSum;
        var calculatedMul = calculateMul(counter);
        var answerObject = {
            sum: calculatedSum,
            mul: calculatedMul
        }
        res.status(200).send(answerObject);

    }else{
        res.status(411).send('You have sent a very big number :(');
        // 2) Now we are here returning a JSON object
        // 1) what we are returning is simple text (even HTML and JSON can be returned)
    }
    

   
    
}

function givePage(req, res){
    res.sendFile(__dirname + "/ public/templates/index.html")
}


// app.post('/handleSum',handleFirstRequest);
app.get('/handleSum', handleFirstRequest);

// app.get('/hi', givePage)

function started(){
    console.log(`App listening on port ${port}`);
}

app.listen(port, started);
