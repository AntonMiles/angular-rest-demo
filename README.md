# angular-rest-demo
A demo of an Angular App connecting to django-rest-demo.

You need to serve this, and a relatively easy way on linux is to use http-server. Instructions are at https://www.npmjs.com/package/http-server but in short...

```
curl https://npmjs.org/install.sh | sh
npm install http-server -g
```

then run by moving to the directory in terminal, and running...

```
http-server -o
```
This (the Angular frontend) needs run after the backend is running, otherwise you might accidentally spawn this process into the wrong port. It should live at `localhost:8080`
