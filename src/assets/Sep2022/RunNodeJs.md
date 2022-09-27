# Express code

```typescript
  var createError = require('http-errors');
  var express = require('express');
  var path = require('path');
  var cookieParser = require('cookie-parser');
  var logger = require('morgan');

  var indexRouter = require('./routes/index');
  var usersRouter = require('./routes/users');

  var app = express();

  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'pug');

  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));
```
# Create kc Object for the valid access_token
   
```typescript
  var KiteConnect = require("kiteconnect").KiteConnect;

  var api_key = "909lcbtyglf6ks4o",
    secret = "xcmxsyn41ro183qmj4r9uzzx76xlcdf4",
    request_token = "valid-one",
    access_token = "valid-one";

  var options = {
    "api_key": api_key,
    "debug": false
  };

  let  kc = new KiteConnect(options);
```

# For Invalid Access token call a function

```typescript
  kc.setSessionExpiryHook(sessionHook);

  function sessionHook() {
    console.log("User loggedout");
  }
```