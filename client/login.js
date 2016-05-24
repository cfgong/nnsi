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
			console.log("Initiated login process");
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
					console.log("login successful with: " + email);
					if( Origin.find({_id:user._id})){
						console.log("user alrdy exists in DB: ", user._id);
					}else{
						Origin.insert({
							_id: user._id,
							createdAt: new Date()
						});
						console.log("inserted user in dB");
					}
					// console.log("this should be false: ", Origin.find( {$and: [{_id:user._id},{isCompleted:true}] }) == true);
					isComplete = Origin.find( {$and: [{_id:user._id},{isCompleted:true}] }).fetch()[0]["isCompleted"];
					// console.log("isComplete: ", Origin.find( {$and: [{_id:user._id},{isCompleted:true}] }).fetch()[0]["isCompleted"]);
					// console.log("isComplete: ", isComplete);
					if(isComplete == true){
						Router.go('/results');
					}else{
						Router.go('/survey');
					}
				// }
				// var currentRoute = Router.current().route.getName();
				// console.log("login successful with: " + email);
				// 	Router.go('/survey');
				
			}
		});
	}
});
