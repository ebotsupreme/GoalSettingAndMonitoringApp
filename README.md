# Goal Setting and Monitoring App
A progress/maintenance planning/monitoring app for physical fitness and learning goals
Track:
*1. activity/source/what is done (Main area / sub-area(s)/tasks & sub-tasks... & how quality and result measurement criteria) This would be input in the planner then tracked as items 2 to 4
	Single vs. recurring tasks vs. hrs/week tasks
	Reminder option
	Due date option (goal could be to just work on / practice something or do 1 or more things over a given time) - there’s an issue with angular & mongo date types working together (per Ivy) so store in Mongodb as string
*2. estimated time devoted each day
*3. quality/intensity (1 to 10 self rating)
*4. daily perceived result of activity  (1 to 10 self rating)

Throw in only generic advice to focus more on higher yield activities, vary activity and get enough rest, water & exercise. But avoid any success philosophy and advice. This is more for just tracking and planning. Also more for keeping on track to have a healthy balanced life where one thing doesn’t dominate.
See strava.com and other goal setting apps (ours simple like joesgoals, but different)
The multiple nesting of goals/tasks is one of the things that makes ours unique.

###See user.js file for schema


##MVP RESTful:
*CR for user
*CRUD for user’s goals/plans and progress (delete is a whole goal record delete)

##Over-MVP RESTful:
UD for user

##User Stories:
*As a user I want to be able to see other user’s public goals(all set to public for MVP) whether I’m logged in or not.
*As a user I want to be able to create an account/login and set up goals and tasks so that I can have a reminder and also track them as I go.
*As a user I want to be able to nest goals and tasks as deep as I want so that I can break things down in any way that seems appropriate.
*As a user I want to be able to select if a goal or task is a one time thing, something to repeat a finite number of times or something that I want to do as a maintenance or long term practice so that more of my meaningful activities can be represented.
*As a user I want to be able to select an optional due date if my goal/task type is a one time or finite number of times type, so that I’ll remember when I wanted to get it done.
*As a user I want to be able to set the priority of each goal/sub-goal/task in a way that is always unique and cascading so that I can remember what I think is most important.
*As a user I want to be able to keep my goals and associated progress in the system or delete them so that I can go back and see, or not.
*As a user I want to be able to update my daily status/progress: time_taken, perceived quality number(1-10), perceived feeling result number (1-10) and any perceived actual result number(1-10) plus a comment.

#Over-MVP User Stories:
*** D3 charts:
***As a user I want to be able to see my goal trees graphically…
***As a user I want to be able to see my status/progress graphically
*As a user I want to be able to update and delete my account...
*As a user I want to be able to select if each goal/task(individually in a hierarchy) is public or private so that I can allow other’s to see or not.
*As a user I want the option to archive all of my old goals and progress...
*As a user I want to be able to select friends from other users and send them messages so as to be able to collaborate better on our goals.
*As a user I want to be able to select whether I want a daily reminder so that I’ll better remember to work on my chosen goals/tasks.
*As a user I want to be able to give and receive anonymous reviews and feedback so that I can better grow as a person.
*As a user I want to be able to concurrently communicate/collaborate with other users so as to get real time feedback.

### TRACKING ON TRELLO:
https://trello.com/b/FsuLxpQI/goal-setting-and-monitoring-app

### WIREFRAMES
![Alt text](https://github.com/K-Carrington/GoalSettingAndMonitoringApp/wireframes/Homepage.png)
![Alt text](wireframes/Signup.png?raw=true)
![alt text](wireframes/login.png)
![alt text](wireframes/Profilepage.png)
![alt text](wireframes/Addagoal.png)
![alt text](wireframes/Addasubgoal.png)
![alt text](wireframes/Goalmonitoringform.png)
![alt text](wireframes/Monitorinfo.png)

https://cloud.githubusercontent.com/assets/13035354/11770971/ffe9eb06-a1be-11e5-97e0-d1e30a6b5999.png
https://cloud.githubusercontent.com/assets/13035354/11770975/05fea4e6-a1bf-11e5-8fcd-75b7302999a2.png
https://cloud.githubusercontent.com/assets/13035354/11770978/0fcdbbf6-a1bf-11e5-94eb-4780a77482fb.png
https://cloud.githubusercontent.com/assets/13035354/11770980/1890f96a-a1bf-11e5-9397-179ffad2f34a.png
https://cloud.githubusercontent.com/assets/13035354/11770984/216339cc-a1bf-11e5-96cd-99e928304c47.png
https://cloud.githubusercontent.com/assets/13035354/11770987/27030d62-a1bf-11e5-8122-e98aba094f05.png
https://cloud.githubusercontent.com/assets/13035354/11770989/2dde3468-a1bf-11e5-8d3d-280d687d49e6.png
https://cloud.githubusercontent.com/assets/13035354/11770991/33caa730-a1bf-11e5-83af-319366fb05a3.png


### Coding Style Guide:
https://github.com/felixge/node-style-guide



