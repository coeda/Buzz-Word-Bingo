const express = require('express');
const router = express.Router();
const buzzwords = [];

let getBuzzword = (element) => {
  let selectedIndex = -1;
  buzzwords.forEach((buzz)=>{
    if(buzz.buzzWord === element.buzzWord){
      selectedIndex = buzzwords.indexOf(buzz);
    }
  });
  return selectedIndex;
};

router.route('/')
  .post((req, res) => {
    let selectedBuzzword = getBuzzword(req.body);
    if(selectedBuzzword < 0){
      buzzwords.push(req.body);
      res.send('{ "success": true }');
    } else {
      res.send('{ "success": false }');
    }
  })

  .put((req, res) => {
    let selectedBuzzword = getBuzzword(req.body);
    if(selectedBuzzword > -1){
      //do stuff
      let score = parseFloat(buzzwords[selectedBuzzword].points);
      score += parseFloat(req.body.points);
      buzzwords[selectedBuzzword].points = score;
      res.send(`{ "success": true, newScore: ${buzzwords[selectedBuzzword].points} }`);
    } else {
      res.send('{ "success": false }');
    }
  })

  .delete((req, res) => {
    let selectedBuzzword = getBuzzword(req.body);
    if(selectedBuzzword > -1){
      //delete stuff
      buzzwords.splice(selectedBuzzword, 1);
      res.send('{ "success": true }');
    } else {
      res.send('{ "success": false }');
    }
  });



module.exports = {router: router, buzzwords: buzzwords};