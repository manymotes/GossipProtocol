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
  kendallMessages.push(bob);

  res.end();
});

app.get('/api/bob', (req, res) => {
  res.json(bobMessages);
});
//bob end

app.put('/api/items/:id', (req, res) => {
  let id = parseInt(req.params.id);
  let itemsMap = items.map(item => { return item.id; });
  let index = itemsMap.indexOf(id);
  let item = items[index];
  item.completed = req.body.completed;
  item.text = req.body.text;
  // handle drag and drop re-ordering
    if (req.body.orderChange) {
      let indexTarget = itemsMap.indexOf(req.body.orderTarget);
      items.splice(index,1);
      items.splice(indexTarget,0,item);
    }

  res.send(item);
});



app.listen(3001, () => console.log('Server listening on port 3001!'))
