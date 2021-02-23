const express    = require('express');
const cors       = require('cors');
const bodyParser = require('body-parser');
const morgan     = require('morgan');
const multer     = require('multer')
const nodemailer = require('nodemailer');

const app = express();
const upload = multer({ dest: './uploads/' })

const MAIL = process.env.MAIL;
const PASSWORD = process.env.PASSWORD;


app.use(cors());
app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post( '/mail/send', upload.array('attachments'),  function(req, res, next) {
  sendEmail(req.body, req.files);
  res.send('{ "Sent ":"Email!" }');
});


sendEmail = (params, files) => {
  console.log(MAIL, PASSWORD);
  const { to, subject, body } = params;
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: MAIL, pass: PASSWORD }
  });
  
  var mailOptions = {
    from: MAIL,
    to, subject, text: body,

    attachments: files.map(file => { return {
      filename: file.originalname,
      contentType: file.mimetype,
      path: file.path,
      encoding: file.encoding
    }})
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});