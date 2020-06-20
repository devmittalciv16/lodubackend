const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    admin:{
        type:Boolean,
        default:false
    },
    id:{
        type:Number,
        required:true
    }
})

const gameSchema = new Schema({

    link:{
        type:String,
        required:true
    },
    players:[playerSchema]
});

module.exports = mongoose.model('game', gameSchema);

