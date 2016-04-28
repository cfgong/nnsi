Template.logout.events({
	'click .logout': function(event){
		event.preventDefault();
		Meteor.logout();
		Router.go('/');
	}
})

Template.login.events({
	'submit form': function(event){
		event.preventDefault();
		var email = $('[name=email]').val();
		var password = $('[name=password]').val();
		var user= Meteor.users.findOne({"emails.address": email});
		if(user){
			var isVerified = user.emails[0].verified;
		}
		Meteor.loginWithPassword(email, password, function(error){
			console.log("Initiaited login process");
			if(error){
				console.log(error.reason);
				if(error.reason=="Incorrect password"){
					$("#incorrect").text("Incorrect password");
					$("#incorrect").show();
				}else if(error.reason=="User not found"){
					$("#incorrect").text("User not found");
					$("#incorrect").show();
				}
			}
			else{
				// if(user && !isVerified){
				// 		$("#incorrect").text("Please check your email and verify your email");
				// 		$("#incorrect").show();
				// }else{
				// 	console.log("login successful with: " + email);
				// 	Router.go('/survey');
				// }
				console.log("login successful with: " + email);
					Router.go('/survey');
				
			}
		});
	}
});
