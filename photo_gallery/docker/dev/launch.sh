cd /main_website
forever start --minUptime 1000 --spinSleepTime 5000 -c "npm run mind" /main_website/ 
forever --minUptime 1000 --spinSleepTime 5000 "server.js"