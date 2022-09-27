# Access code not present
   
    ```typescript
    if(!access_token) {
      kc.generateSession(request_token, secret)
        .then(function(response) {
          console.log("Response", response);
          init();
        })
        .catch(function(err) {
          console.log(err);
        })
    }
    ```

# Access code present

  ```typescript
  else {
    kc.setAccessToken(access_token);
    init();
  }
  ```

# Call the init function

```typescript
  function init() {
    console.log(kc.getLoginURL());

    getProfile();
    getInstruments("NFO:NIFTY22SEP17000CE");

  }
```

# implement the functions

```typescript
  function getInstruments(exchange) {
    kc.getInstruments(exchange).then(function(response) {
      console.log(response);
    }).catch(function(err) {
      console.log(err);
    })
  }
  function getProfile() {
    kc.getProfile()
      .then(function(response) {
        console.log(response)
      }).catch(function(err) {
        console.log(err);
      });
  }
```
 # Other implemented code

 ```typescript
   
    app.use('/', indexRouter);
    app.use('/users', usersRouter);

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
      next(createError(404));
    });

    // error handler
    app.use(function(err, req, res, next) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      // render the error page
      res.status(err.status || 500);
      res.render('error');
    });

    module.exports = app;

 ```