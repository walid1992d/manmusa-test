import nodemailer from 'nodemailer';

async function regMail(name, email) {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'kartikeyarai7@gmail.com',
      pass: 'hpojpluicfjwnuty'
    }
  });

  var mailOptions = {
    from: 'kartikeyarai7@gmail.com',
    to: `${email}`,
    subject: 'Thank you for registration',
    text: `Hi ${name}, Welcome to Mansamusa. Your account has been successfully registered with us!`
  };

  await transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

export default regMail;
