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