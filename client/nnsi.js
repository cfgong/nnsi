Template.register.events({
	'submit form': function(event){
		event.preventDefault();
		var email = $('[name=email]').val();
		var organization = $('[name=organization').val();
		var password = $('[name=password]').val();
		var confirmpassword = $('[name=confirmpassword').val();
		Accounts.createUser({
			email:email,
			organization: organization,
			password: password,
			confirmpassword: confirmpassword
		}, function(error){
			if(error){
				console.log(error.reason);
			}else{
				Router.go('/survey');
			}
		});
		Router.go('/survey');
	}
});

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
		Meteor.loginWithPassword(email, password, function(error){
			if(error){
				console.log(error.reason);
			}else{
				Router.go('/survey');
			}
		});
	}
});

