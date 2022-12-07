/* jshint esversion:9 */
const express = require('express');
const path = require('path');
const fs = require("fs");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({extended: false, limit: '50mb'});
const jsonParser = bodyParser.json({limit: '50mb'});
const app = express();
const server = require("http").Server(app);
const {v4: uuidv4} = require("uuid");
const admin = require("firebase-admin");
const randomString = (length) => Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
require('dotenv').config();
const fetch = require("cross-fetch");
const aws = require("aws-sdk");
const AWSAccessKeyId = process.env.AWSAccessKeyId;
const AWSSecretKey = process.env.AWSSecretKey;
aws.config.update({
    secretAccessKey: AWSSecretKey, accessKeyId: AWSAccessKeyId,
});
const sesClient = new aws.SES({region: "ap-south-1"});
const {Server} = require("socket.io");
const io = new Server(server);

// require("./subs/video")(app);

app.set("port", process.env.PORT || 8081);

app.set("views", path.join(__dirname, "Views"));
app.set("view engine", "ejs");
console.log("Editor App Started");


app.use(urlencodedParser);
app.use(jsonParser);

// app.use(video);
app.use('/style', express.static('style'));
app.use('/javascript', express.static('javascript'));
app.use('/images', express.static('images'));
app.use('/resources', express.static('resources'));
app.use('/document', express.static('document'));
app.use('/node_modules', express.static('node_modules'));


var serviceAccount = require(process.env.ServiceAccount);
// var serviceAccount = require("./resources/worqhat-app-prod.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const secondaryServiceAccount = require(process.env.ServiceAccount);
// const secondaryServiceAccount = require('./resources/firebase-adminsdk.json');
const secondaryAppConfig = {
    credential: admin.credential.cert(secondaryServiceAccount),
};
const secondary = admin.initializeApp(secondaryAppConfig, 'secondary');

var db = admin.firestore();
var auth = admin.auth();

var dbsecondary = secondary.firestore();
var authsecondary = secondary.auth();

app.set('subdomain offset', 1);
//this is used because the req.subdomains expects a .com or similar extension...this can be avoided when it is being hosted
app.use((req, res, next) => {
    if (!req.subdomains.length || req.subdomains.slice(-1)[0] === 'www') return next();
    // otherwise we have subdomain here
    var subdomain = req.subdomains.slice(-1)[0];
    // keep it
    req.subdomain = subdomain;
    next();
});


app.get("/", (req, res) => {
    res.render("new");
});

server.listen(app.get("port"), () => {
    console.log("server started at port" + app.get("port"));
});
