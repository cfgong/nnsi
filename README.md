# nnsi

This uses a meteor stack with a mongoDB backend. (https://www.meteor.com/)

Structure of the app

/client

    /resourceLibrary
    - contains the text for all the resource library text
    /surveys
    - contains the frontend for the survey pages
    /views
    - more frontend pages
    
  - everything else is working logic for the frontend pages
  
/public

    /General
  
    /Homepage
  
    /MainIcons
  
    - all contain images

/server
  - collections.js merely instantiates a collection for us to use for our database
  - emails.js is meant to send emails, although this is flawed
  
nnsi.css has all the styling

routes.js has all the routing

  
How to develop locally:

    - run the command "meteor" while in the project directory
    
How to deploy to modulus:
    
    - run the command "modulus deploy" while in the project directory
