const express = require('express');
const logger = require('morgan'); 
const app = express();
const port =  3001;
app.use(logger('dev'));

const tree= require('./tree');
const collection= require('./collection')

// get all data from tree file
app.get('/getCollection', (req, res) => {
    res.send(tree)
  })

// filter data by id from collection file
app.get('/getCollectionById/:id', (req,res)=>{
    let id= req.params.id;
    let filteredItem= collection.filter(el=>el.id == id);
    res.send(filteredItem)
})

app.listen(port,()=>{
    console.log(`App listening on port ${port}!`)
})
module.exports= app;