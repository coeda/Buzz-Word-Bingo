const express = require('express');
const app = express();
const PORT = 3000;
const bodyParser = require('body-parser');
const buzzword = require('./routes/buzzword.js');


app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static('public'));
app.use('/buzzword', buzzword.router);

app.get('/buzzwords', (req,res) => {
  let buzzNames = buzzword.buzzwords.map((element) => {
    return element.buzzWord;
  });
  res.send(buzzNames);
});

app.post('/reset', (req, res) => {
  if(req.body.reset === 'true'){
    buzzword.buzzwords = [];
    res.send(buzzword.buzzwords);
    console.log('true');
  } else {
    res.send('unable to reset');
    console.log('false');
  }

});

const server = app.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});