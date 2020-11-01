pm2 start ecosystem.config.js --env production
pm2 start ecosystem.config.js --env production --watch
mysql -u root -p temp < voiceminute.sql
