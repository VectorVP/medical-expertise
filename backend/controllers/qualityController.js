const asyncHandler = require('express-async-handler')
const request = require('request')

// @desc    Create a new by doctor
// @route   POST /api/home/create
// @access  Doctor
const uploadFile = asyncHandler(
    async (req, res) => {
        try {
            // request('https://jsonplaceholder.typicode.com/posts/1', function (error, response, body) {
            //     console.error('error:', error); // Print the error
            //     console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            //     console.log('body:', body); // Print the data received
            //     res.send(body); //Display the response on the website
            // });  
            const file = req.files.file
            console.log("file", file)
            const body = file

              const postBody = {
                url: 'http://0.0.0.0:8080/processor',
                body: body,
                  headers: {
                    'Content-type': 'multipart/form-data',
                  },
              };
              request.post(postBody, function (error, response, body) {
                console.error('error:', error); 
                console.log('statusCode:', response && response.statusCode); 
                console.log('body:', body); 
                res.send(body); 
            });  
            // res.status(201).json("File has been sended")
        } catch (e) {
            res.status(500).json({message:`File is not added, ${e}`})
        }
     
    }
)


module.exports = { uploadFile }