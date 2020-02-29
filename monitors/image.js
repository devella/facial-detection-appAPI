const Clarifai = require('clarifai');

// API key here from Clarifai.
const app = new Clarifai.App({
    apiKey: 'a4547bc895db42f0874614febda0adb0'
   });
const handleApiCall =  (req, res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json('cannot work with the API'))
}

const handleImage = (req, res, db) => {
    const { id } = req.body;
  db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries') 
    .then(entries => {
        res.json(entries);
    })
    .catch(err => res.status(400).json('unable to get entries'))
  }
   module.exports = {
  handleImage,
  handleApiCall
   };