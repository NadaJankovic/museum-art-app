const express = require('express');
const cors = require ('cors');
const logger = require('morgan');
const app = express();
app.use(cors());
const port =  3001;
app.use(logger('dev'));

app.use(express.urlencoded({extended:true}));
app.use(express.json());
const tree= require('./tree');
const collection= require('./collection')

// get all data from tree file
app.get('/getCollection', (req, res) => {
    try{
        return res.send(tree)
    }catch(err){
        res.status(400).json({
            msg:'Some error occured'
        })
    }

})

// filter data by id from collection file
app.get('/getCollectionById/:id', (req, res) => {
    try {
        let id = req.params.id;
        let filteredItem= collection.filter(el => el.id == id);
        res.status(200).send(filteredItem)
    } catch (err) {
        res.status(400).json({
            msg: 'Some error occured.'
        })
    }
})
app.listen(port, () => {
    console.log(`App listening on port ${port}!`)
})
module.exports = app;