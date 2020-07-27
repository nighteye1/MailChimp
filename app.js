
const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){


    res.sendFile(__dirname + "/signup.html");
});


app.post("/", function(req, res){

    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.email;

    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName, 
                    LNAME: lastName,
                }
            }
        ]
    };

    var jsonData = JSON.stringify(data);

    var options = {
        url: "https://us10.api.mailchimp.com/3.0/lists/d0e8ec3389",
        method: "POST",
        headers: {
            "Authorization": "sami1 9d7aa4eab33a9b76f8d7f0752562bdbc-us10"
        },
        body: jsonData,
    };


    request(options, function(error, response, body){
        if(error){
            res.send("There was an error!");
        }else {
            if (response.statusCode === 200){
                res.sendFile(__dirname + "/success.html");
            }
            else {
                res.sendFile(__dirname + "/failure.html");
            }
        }
    });

});

app.post("/failure", function(req, res){
    res.redirect("/");
});


app.listen(process.env.PORT || 3000, function(){
    console.log("Server listening on port 3000");
});

//9d7aa4eab33a9b76f8d7f0752562bdbc-us10

//d0e8ec3389