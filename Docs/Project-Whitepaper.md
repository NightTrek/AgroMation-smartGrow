#Agromation Grow room Monitoring and control application

A app which allows you to manage and control a team of industrial Grow Room data systems. will provide the user with 
the ability view data and control setpoints for a number of variales.

TODO 

#backend

 
  
* ~~create a get route to get status with current temperature.~~
* create a post route to set over temp alarm.
* create post route to  set under temp alarm.
* create post route to change UserSettings. 
* create post route start the GrowRooms.
* create a post route to stop the GrowRooms.

**moonshots**

* login with google option 0Auth.
* actually hooking up a real GrowRooms.

#front-end

- components necessary for every page: 
    - background [wrapper] (using similar color palette as logo)
    - header [nav] (dashboard, settings, sign in & sign up (or username & log out))
    - collapsible [sidebar] (quick inspection for Grow rooms)

* finish building the login page.
    - components:
        - a home page [landing] (depending on if user has visited, it would provide auth modal)
        - sign in/sign up & registration [modal] (a modal that provides prop switches)
        - use wrapper 

* finish building the sidebar menu.
    - sidebar can display quick information on available Grow rooms
        component: [status] (can be reused for dashboard)
    - clickable options: 
        - click on any information to display info pg on clicked
        - click dashboard to be taken there

* build [dashboard]
    - Primary Dashboard widget
        - Display pie charts for all rooms 
        - Slider for an individual pages current data
        - Progress bar for individual room as part of the slider
        - Alert Module which displays current rooms log along with current data.
         
* build a nice graph utility for the single grow room component.
    - manage multiple views to display different datasets with the same component

* build a User Managment page
    - easy activation and deactivation button.
    - add user
    - manage permissions for all rooms
    - 

* build a [settings] page for user settings. 
    (specifically setting your account info and notification settings like phone number.)


* create a virtual Grow room program which generates fake room data to demo the front end.
