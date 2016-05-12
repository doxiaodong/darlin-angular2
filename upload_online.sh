tar czf darlin_me.tar.gz dist
scp darlin_me.tar.gz root@darlin.me:/var/www/darlin-angular2
rm darlin_me.tar.gz

ssh root@darlin.me 'cd /var/www/darlin-angular2;rm -rf dist;tar xvzf darlin_me.tar.gz'
