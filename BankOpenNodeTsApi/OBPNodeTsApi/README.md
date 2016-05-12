# OBPNodeTsApi
Requirements: mongo, node tools for VS (or use typescript npm cmd commands)

Functional Design
https://docs.google.com/document/d/1CRQFwJgBT08NGS3HeUvFshkHzXVHToN6E3NDot9nI8A/edit?usp=sharing

Solution for api with Node ,Typescript and Mongo

#config/ :
Has .json files. The files with the help of node "config" package can be used for static vars
Config must have mongo service connection
#implementation/ :
Has .ts files. The files contains the login af api calls
#models/ :
Has .ts files. The files with node "mongo" and "mongoose" packages can create models for the mongoo database
example --> /api/banks/set
#public/ :
Any static content like images , css
#routes/ :
Has .ts files. The files with node "express" package create a simple but worthy route system 
#scripts/ :
Has d.ts files. Manly for .ts typings
#services/ :
Has .ts files. The files with node "mongo" and "mongoose" packages can alter the mongoo database safely 
#views/ :
Has an .html file. For main page 
#views/ :
Has an .html file. For main page 
#app.ts :
Where the magic of node express is initiated
Has an .html file. For main page 
#isAuthenticated.ts.ts :
Where the auth midleware lives (until now only sample)
#package.json :
install of required packages from -npm under solution can be altered or from console

# STEPS :
----------------------------------VERSION 0.0.1---------------------------------------------------
 done 1. Create Users model - implementation
 done 2. Fix isauthenticated per cookie - ip - user and store users
 done 3. Fix more api calls branches
 done 4. Publish it to a public server (is on 47 auto deploy and node pm2 for management working)
 done 4.5. Full auto build ts on tfs
 done 5. Fix api calls Acoounts
 done 5.5 Fix all api calls 
6. Establish more complex user friendly connection with oauth admin mongo to something safer
6.2 Create help api calls like transactions
 done 6.5 Create a production enviroment 
7 Create cics connection
8 Plan a full integration with a bank 
 done 9 Create documentation on swagger 
 done 9.2 Clear a git repo for public use as sandbox
 done 9.3 add script for populate fake data
done 9.6 fix create date bug
9.9 fix required in models better
10 lock all not public methods

----------------------------------VERSION 0.1.0---------------------------------------------------
1.1 Connect real NBG data
1.2 Monitor all requests
1.3 Track all requests
2.1 Penetration tests
2.3 Oauth2 user monitor
...

----------------------------------VERSION 1.0.0---------------------------------------------------
Release for any use


# quick build example :
>install node (npm included)
>install mongo run it as a service to 27017

>go with a terminal to OBPNodeTsApi folder 
>npm install
-For build with command line
 >npm install tsc -g
 >npm install typescript@next -g
 >tsc
-For build with visual studio
 >open MS VStudio
 >intall node tools addon
 >build project or solution

# quick start example :
go with a terminal to solution folder 
>cd OBPNodeTsApi
>node app.js
>go to internet explorer get http://localhost:3005/
>use a swagger ui  import http://localhost:3005/api.json

# hints for developement 
>use MS code open folder OBPNodeTsApi for best experiance
>use tsd or typings .Commit typings you use to the repo
>use git ignore. Please be sure if you change it
>use node mongoinput* to input data care change bank and products uid with yours auto populated