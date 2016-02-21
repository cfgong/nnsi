Meteor.startup(function () {
  // 1. Set up stmp
  //   your_server would be something like 'smtp.gmail.com'
  //   and your_port would be a number like 25
  console.log("at email.js");
  process.env.MAIL_URL = 'smtp://' + 
    encodeURIComponent('northwestern.nnsi@gmail.com') + ':' + 
    encodeURIComponent('nnsitest') + '@' + 
    encodeURIComponent('smtp.gmail.com') + ':' + 587;
  
  // 2. Format the email
  //-- Set the from address
  Accounts.emailTemplates.from = 'My_Name ';

  //-- Application name
  Accounts.emailTemplates.siteName = 'My_App';

  //-- Subject line of the email.
  Accounts.emailTemplates.verifyEmail.subject = function(user) {
    return 'Confirm Your Email Address for My_App';
  };

  //-- Email text
  Accounts.emailTemplates.verifyEmail.text = function(user, url) {
    return 'Thank you for registering online to complete the Nonprofit Capacity Analytics Tool. To continue the tool online, please click here: \r\n' + url;
  };


  // 3.  Send email when account is created
  Accounts.config({
    sendVerificationEmail: true
  });
});
