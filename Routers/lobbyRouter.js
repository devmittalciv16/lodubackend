const express = require('express');
const bodyParser = require('body-parser');
const lobbyRouter = express.Router();
const games = require('../Models/game');
const mongoose = require('mongoose');
const username = "devmittalciv16";
const password = "dev@gmail";
const connect = mongoose.connect(`mongodb+srv://${username}:${password}@cluster0-bkkbu.mongodb.net`, {
    useNewUrlParser:true
});
connect.then((db) =>{
    console.log('Connect to database');
});

lobbyRouter.use(bodyParser.json());

lobbyRouter.post('/newgame', (req, res)=>{
    res.setHeader('Content-Type', 'application/json');
    var link = req.body.link;
    var username = req.body.username;
    var admin = req.body.admin;
    var id = req.body.id;
    var newGame = games({link:link});
    newGame.save((err, doc)=>{
        games.findOne({link:link}, (err, doc)=>{
            var player = {
                username:username,
                admin:admin,
                id:id
            }
            var update = {$push:{players:player}};
            games.findOneAndUpdate({link:link}, update, (err, doc)=>{
                res.send("done");
            });
        });
    })
});

lobbyRouter.post('/addplayer', (req, res)=>{
    var link = req.body.link;
    var username = req.body.username;
    var admin = req.body.admin;
    var id = req.body.id;

    games.findOne({link:link}, (err, doc)=>{

        var player = {
            username:username,
            admin:admin,
            id:doc.players.length
        }
        var update = {$push:{players:player}};
        games.findOneAndUpdate({link:link}, update, (err, doc)=>{
            res.send(player);
        });
    });
});

lobbyRouter.post('/getplayers', (req, res)=>{
    var link = req.body.link;
    games.findOne({link:link}, (err, doc)=>{
        if(doc)res.send(doc.players);
        else{
            res.send({
                username:"nill",
                admin:"nill",
                id:"nill"
            })
        }
    });
})

lobbyRouter.get('/all', (req, res)=>{
    games.find({}, (err, doc)=>{
        res.send(doc);
    })
})

lobbyRouter.get('/removeall', (req, res)=>{
    games.deleteMany({}, (err)=>{
        console.log("All profiles deleted");
    })
})

module.exports = lobbyRouter;