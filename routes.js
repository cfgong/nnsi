Router.configure({
  // Render login form
  authTemplate: 'login',
  // Redirect to login form, by exact route or route-name
  // authRoute: '/admin/login',
  // Deny access for unauthorized users on all routes
  "protected": true,
  // Restrict access by array of roles on all routes
  allowedRoles: ['admin'],
  // Restrict access by role and role-group. 
  // Use only with `allowedRoles` property, otherwise check on group is omitted
  // allowedGroup: Roles.GLOBAL_GROUP,
  // This callback triggered each time when access is granted or forbidden for user
  authCallback: function(error, isGranted) {
    return console.log(error, isGranted);
  },

  // Common options:
  layoutTemplate: 'main',
  notFoundTemplate: 'home',
  loadingTemplate: 'home'
});


Router.route('/', {
    template: 'home'
});


Router.route('/register');
Router.route('/logout');
Router.route('/login');
Router.route('/deadend');

Router.route('/survey',{
	onBeforeAction: function(){
        var currentUser = Meteor.userId();
        if(currentUser){
            // logged-in
            this.next();
        } else {
            // not logged-in
            this.render('login');
        }
    }
});
Router.route('/survey3',{
	onBeforeAction: function(){
        var currentUser = Meteor.userId();
        if(currentUser){
            // logged-in
            this.next();
        } else {
            // not logged-in
            this.render('login');
        }
    }
});
Router.route('/survey4',{
	onBeforeAction: function(){
        var currentUser = Meteor.userId();
        if(currentUser){
            // logged-in
            this.next();
        } else {
            // not logged-in
            this.render('login');
        }
    }
});
Router.route('/survey5',{
	onBeforeAction: function(){
        var currentUser = Meteor.userId();
        if(currentUser){
            // logged-in
            this.next();
        } else {
            // not logged-in
            this.render('login');
        }
    }
});
Router.route('/survey6',{
	onBeforeAction: function(){
        var currentUser = Meteor.userId();
        if(currentUser){
            // logged-in
            this.next();
        } else {
            // not logged-in
            this.render('login');
        }
    }
});
Router.route('/survey7',{
	onBeforeAction: function(){
        var currentUser = Meteor.userId();
        if(currentUser){
            // logged-in
            this.next();
        } else {
            // not logged-in
            this.render('login');
        }
    }
});
Router.route('/survey8',{
	onBeforeAction: function(){
        var currentUser = Meteor.userId();
        if(currentUser){
            // logged-in
            this.next();
        } else {
            // not logged-in
            this.render('login');
        }
    }
});
Router.route('/survey9',{
	onBeforeAction: function(){
        var currentUser = Meteor.userId();
        if(currentUser){
            // logged-in
            this.next();
        } else {
            // not logged-in
            this.render('login');
        }
    }
});
Router.route('/survey10',{
	onBeforeAction: function(){
        var currentUser = Meteor.userId();
        if(currentUser){
            // logged-in
            this.next();
        } else {
            // not logged-in
            this.render('login');
        }
    }
});
Router.route('/survey11',{
	onBeforeAction: function(){
        var currentUser = Meteor.userId();
        if(currentUser){
            // logged-in
            this.next();
        } else {
            // not logged-in
            this.render('login');
        }
    }
});
Router.route('/survey12',{
	onBeforeAction: function(){
        var currentUser = Meteor.userId();
        if(currentUser){
            // logged-in
            this.next();
        } else {
            // not logged-in
            this.render('login');
        }
    }
});
Router.route('/survey13',{
	onBeforeAction: function(){
        var currentUser = Meteor.userId();
        if(currentUser){
            // logged-in
            this.next();
        } else {
            // not logged-in
            this.render('login');
        }
    }
});
Router.route('/survey14',{
	onBeforeAction: function(){
        var currentUser = Meteor.userId();
        if(currentUser){
            // logged-in
            this.next();
        } else {
            // not logged-in
            this.render('login');
        }
    }
});
Router.route('/survey15',{
	onBeforeAction: function(){
        var currentUser = Meteor.userId();
        if(currentUser){
            // logged-in
            this.next();
        } else {
            // not logged-in
            this.render('login');
        }
    }
});
Router.route('/survey16',{
	onBeforeAction: function(){
        var currentUser = Meteor.userId();
        if(currentUser){
            // logged-in
            this.next();
        } else {
            // not logged-in
            this.render('login');
        }
    }
});
Router.route('/complete',{
	onBeforeAction: function(){
        var currentUser = Meteor.userId();
        if(currentUser){
            // logged-in
            this.next();
        } else {
            // not logged-in
            this.render('login');
        }
    }
});
Router.route('/results',{
	onBeforeAction: function(){
        var currentUser = Meteor.userId();
        if(currentUser){
            // logged-in
            this.next();
        } else {
            // not logged-in
            this.render('login');
        }
    }
});
Router.route('/thankyou',{
	onBeforeAction: function(){
        var currentUser = Meteor.userId();
        if(currentUser){
            // logged-in
            this.next();
        } else {
            // not logged-in
            this.render('login');
        }
    }
});
Router.route('/accountResults',{
    onBeforeAction: function(){
        var currentUser = Meteor.userId();
        if(currentUser){
            // logged-in
            this.next();
        } else {
            // not logged-in
            this.render('login');
        }
    }
});


Router.route('/adaptiveCapacity');
Router.route('/operationalCapacity');
Router.route('/missionOrientation');
Router.route('/financialManagement');
Router.route('/externalCommunication');
Router.route('/staffManagement');
Router.route('/strategicPlanning');
Router.route('/boardLeadership');

