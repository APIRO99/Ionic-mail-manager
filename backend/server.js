const express    = require('express');
const cors       = require('cors');
const bodyParser = require('body-parser');
const morgan     = require('morgan');
const multer     = require('multer')
const nodemailer = require('nodemailer');

const app = express();
const upload = multer({ 
  limits: { fieldSize: 25 * 1024 * 1024 },  /* mb * kb * bytes */
  dest: './uploads/' 
})

const MAIL = process.env.MAIL;
const PASSWORD = process.env.PASSWORD;


app.use(cors());
app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post( '/mail/send', upload.array('attachments'), async function(req, res, next) {
  const response = await sendEmail(req.body, req.files);
  res.send(response);
});


sendEmail = async (params, files) => {
  console.log(MAIL, PASSWORD);
  const { to, subject, body } = params;
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: MAIL, pass: PASSWORD }
  });
  
  var mailOptions = {
    from: MAIL,
    to, subject, html: body,

    attachments: files.map(file => { return {
      filename: file.originalname,
      contentType: file.mimetype,
      path: file.path,
      encoding: file.encoding
    }})
  };

  return await new Promise((resolve,reject)=>{
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        const message = 
          (error.responseCode == 552)
            ? "This message was blocked because its content presents a potential security issue."
            : "Oooops!, something went wrong. try again in a moment"
        const res = `{
          "code": ${error.responseCode},
          "message": "${message}"
        }`;
        resolve(res)
      } else {
        const res = `{
          "code": 200,
          "message": "Succesfully send the email"
        }`;
        resolve(res);
      }
      });
  });
}


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
