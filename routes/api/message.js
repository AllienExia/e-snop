var router = require('express').Router();
const nodemailer = require('nodemailer');


router.post('/', function(req, res) {
  var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: 'contact.qotd@gmail.com',
          pass: 'agilea2016'
      }
    }
  );

  var messageContent = '<h3>Détails du message </h3>' +
  '<p><b>Message du participant : </b>' + req.body.user.firstname + ' ' + req.body.user.lastname + '</p>' +
  '<p><b>Appartenant au groupe : </b>' + req.body.user.group + '</p>' +
  '<p><b>Adresse mail du participant : </b>' + req.body.mail + '</p>' +
  '<p><b>Le message porte sur : </b>' + req.body.choice + '</p>' +
  '<p style="white-space: pre;"><b>Message :</b><br>' + req.body.message + '</p>';

  if (req.body.selectedQuestion.number) {
    messageContent += '<h3>Question en lien avec le message </h3>' +
    '<p style="white-space: pre;"><b>Numéro : </b>' + req.body.selectedQuestion.number + '</p>' +
    '<p style="white-space: pre;"><b>Titre : </b>' + req.body.selectedQuestion.title + '</p>' +
    '<p style="white-space: pre;"><b>Commentaire : </b>' + req.body.selectedQuestion.comment + '</p>' +
    '<p style="white-space: pre;"><b>A) : </b>' + req.body.selectedQuestion.answer1 + '</p>' +
    '<p style="white-space: pre;"><b>B) : </b>' + req.body.selectedQuestion.answer2 + '</p>' +
    '<p style="white-space: pre;"><b>C) : </b>' + req.body.selectedQuestion.answer3 + '</p>' +
    '<p style="white-space: pre;"><b>D) : </b>' + req.body.selectedQuestion.answer4 + '</p>' +
    '<p style="white-space: pre;"><b>Bonne réponse : </b>' + req.body.selectedQuestion.right + '</p>' +
    '<p style="white-space: pre;"><b>Réponse du candidat : </b>' + req.body.selectedQuestion.answer + '</p>'
  }

  var mailOptions = {
      from: req.body.mail,
      to: "romain.janssen@viacesi.fr",
      subject: "Question de  " + req.body.user.firstname + ' ' + req.body.user.lastname,
      html: messageContent
  };
  transporter.sendMail(mailOptions, function(error, info){
      if(error){
        res.status(400).json({message: "Une erreur est survenu"})
      } else {
        res.status(200).json({message: "Votre message a bien été envoyé"})
        console.log('Message sent: ' + info.response);
      }
  }); 
  transporter.close();
});

module.exports = router;