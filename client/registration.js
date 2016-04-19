Template.register.events({
	'submit form': function(event){
		event.preventDefault();
		var email = $('[name=email]').val();
		var organization = $('[name=organization').val();
		var password = $('[name=password]').val();
		var confirmpassword = $('[name=confirmpassword').val();

		console.log("Initiated Register process");
		console.log("email is " + email);
		console.log("org is " + organization);
		console.log("pw is " + password);
		console.log("2ndpw is " + confirmpassword);
		Accounts.createUser({
			email:email,
			organization: organization,
			password: password,
			confirmpassword: confirmpassword
		}, function(error){
			if(error){
				console.log(error.reason);
				Router.go('/login');
			}else{
				Router.go('/login');
			}
		});
		//Router.go('/survey');
	}
});


