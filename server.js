const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



app.use(express.static('public'))
let id = 0;
let joeMessages = [];
let kendallMessages = [];
let bobMessages = [];
let map = {};



// app.put('api/joerumor', function(req, res) {

//   //this.id = this.id + 1;
//   // let joe = {id:req.params.id, originator: req.params.originator, text: req.params.text};
//   // joeMessages.push(joe);
//   console.log(req.params.text);
//   res.send("ok");

// });

app.post('/api/joerumor', function (req, res) {
 
  console.log(req.body);
  let joe = {id:req.body.id, originator: req.body.originator, text: req.body.text};
  joeMessages.push(joe);

  res.end();
});

app.get('/api/joe', (req, res) => {
  res.json(joeMessages);
});


//kendall start
app.post('/api/kendallrumor', function (req, res) {
 
  console.log(req.body);
  let kendall = {id:req.body.id, originator: req.body.originator, text: req.body.text};
  kendallMessages.push(kendall);

  res.end();
});

app.get('/api/kendall', (req, res) => {
  res.json(kendallMessages);
});
//kendall end

//bob start
app.post('/api/bobrumor', function (req, res) {
 
  console.log(req.body);
  let bob = {id:req.body.id, originator: req.body.originator, text: req.body.text};
  bobMessages.push(bob);

  res.end();
});

app.get('/api/bob', (req, res) => {
  res.json(bobMessages);
});
//bob end

//begin randoms
app.post('/api/newby', (req, res) => {
  res.json(map[req.body.user]);
});

app.post('/api/newbyrumor', (req, res) => {
  
  let newmessage = {id:req.body.id, originator: req.body.originator, text: req.body.text};
  addValueToList(req.body.user, newmessage);

  res.end();

});
//end randoms

function addValueToList(key, value) {
    //if the list is already created for the "key", then uses it
    //else creates new list for the "key" to store multiple values in it.
    map[key] = map[key] || [];
    map[key].push(value);
}


app.listen(3001, () => console.log('Server listening on port 3001!'))
