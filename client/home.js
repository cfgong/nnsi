Template.home.events({
	'mouseover #adaptive-capacity' : function() {
        $('#rollover-text').text("Adaptive Capacity refers to the way organizations adapt to changes in their environment.");
    },
    'mouseover #board-leadership' : function() {
        $('#rollover-text').text('Board Leadership refers to board reporting, performance and decision making.');
    },
    'mouseover #external-communication' : function() {
        $('#rollover-text').text('External Communication refers to public relations activities and marketing ventures.');
    },
    'mouseover #financial-management' : function() {
        $('#rollover-text').text('Financial Management refers to the ability to accurately and completely report financial aspects of the organization, including revenue, budget, and diversified funding sources; general financial.');
    },
    'mouseover #mission-orientation' : function() {
        $('#rollover-text').text('Mission Orientation refers to the organization’s and their stakeholders’ abilities to adhere to the mission and purpose of the organization.');
    },
    'mouseover #operational-capacity' : function() {
        $('#rollover-text').text('Operational Capacity refers to the existence and use of documented procedures; ability to set goals for programs and activities, and assess their outcomes.');
    },
    'mouseover #staff-management' : function() {
        $('#rollover-text').text('Staff Management refers to the capability to train and manage competent staff; staff skills.');
    },
    'mouseover #strategic-planning' : function() {
        $('#rollover-text').text('Strategic Planning refers to creating, following and evaluating plans for the nonprofit’s future activities.');
    },
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
        Router.go('/home');
    }
});

