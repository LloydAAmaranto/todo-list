const authCollection = require('../models/authSchema');

async function addToCurrentList(email, newTask) {
  try {
    const user = await authCollection.findOneAndUpdate(
      { email: email },
      { $push: { currentList: newTask } },  // Adds newTask into the currentList array
      { new: true }  // Returns the updated document
    );

    if (user) {
      console.log('Task added item');
    }
    else{
      console.log('error adding');
    }
    
  }catch(error){
    console.error('Having troubling adding: ', error);
  }
}

module.exports = {
  addToCurrentList
};