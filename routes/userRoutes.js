const express = require('express');
const router = express.Router();
const {addToCurrentList} = require('../controllers/userController');

router.post('/add-to-current-list', async (req, res) => {
  const {email, newTask} = req.body;

  if(!email){
    return res.status(400).send('missing email or newTask');
  }

  try{
    await addToCurrentList(email, newTask);
    res.status(200).send('item added');

  }catch(error){
    res.status(500).send('error');
  }
});

module.exports = router;