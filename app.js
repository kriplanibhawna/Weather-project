const express=require ("express");
const app=express();
const https=require("https");
const bodyParser=require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
res.sendFile(__dirname+"/index.html");
 
});

app.post("/", function(req, res){
console.log(req.body.CityName);
const query=req.body.CityName;
const apiKey="b98c11fda88a4983ce376cdb0acb4b21";
const unit="metric";
const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;

https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
        const weatherData=JSON.parse(data);
        const temp=weatherData.main.temp;
        const weatherDiscription=weatherData.weather[0].description;
        const weatherIcon=weatherData.weather[0].icon;
        const weatherImage="http://openweathermap.org/img/wn/"+weatherIcon+"@2x.png";
        res.write("<p>the weather is of "+query+" is " + weatherDiscription + "</p>");
        res.write("<h1>The temperature is "+ temp + " degree celcious.</h1> ");
        res.write("<img src="+weatherImage+">");

        res.send();
    })
})


});









app.listen(3000, function(){
    console.log("server is running 3000");
});