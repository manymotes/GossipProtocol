const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



app.use(express.static('public'))
let id = 0;
let joeMessages = [
  {
    userName: 'Mike',
    type: 'otherCourseScore',
    score: 7
  }
];
let kendallMessages = [];
let bobMessages = [];



app.post('api/joerumor', function(req, res) {

  //this.id = this.id + 1;
  let joe = {id:req.params.id, originator: req.params.originator, text: req.params.text};
  joeMessages.push(joe);
  console.log(req.params.text);
  res.status(200);

});

app.get('/api/joe', (req, res) => {
  res.json(joeMessages);
});


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
