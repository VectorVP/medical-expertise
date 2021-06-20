const asyncHandler = require('express-async-handler')
const request = require('request')
const Report = require('../models/reportModel')
const axios = require('axios')

// @desc    Post file on flask
// @route   POST {flask}/process
// @access  -
const uploadFile = asyncHandler(
    async (req, res) => {
        
        try {
            const file = req.files.file
            console.log("filebase64", file)

            const body = file
            const response = await axios.post('https://192.168.0.209:8080/process', body, {
              headers: {
                'Content-Type': 'text/plain'
              }
          });
          res.status(201).json(response.data)
            // console.log("string ", file.data.toString('utf8'))
            //   const postBody = {
            //     url: 'http://0.0.0.0:8080/process',
            //     body: body,
            //       headers: {
            //         'Content-type': 'multipart/form-data',
            //       },
            //   };
            //   request.post(postBody, function (error, response, body) {
            //     console.error('error:', error); 
            //     console.log('statusCode:', response && response.statusCode); 
            //     console.log('body:', body); 
            //     res.send(body); 
            // });
          //   const report = await Report.create({
          //     age,
          //     type,
          //     mkb,
          // })
        } catch (e) {
            res.status(500).json({message:`File is not added, ${e}`})
        }
     
    }
)

// const sendMKBtoFlusk = asyncHandler(
//   async (req, res) => {
//       try {
//           const file = req.files.file
//           console.log("filebase64", file)

//           const body = file
//           const response = await axios.post('https://192.168.0.209:8080/process', body, {
//             headers: {
//               'Content-Type': 'text/plain'
//             }
//         });
//         res.status(201).json(response.data)
//       } catch (e) {
//         res.status(500).json({message:`File is not added, ${e}`})
//     }
 
// }
// )


module.exports = { uploadFile }