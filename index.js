var LaunchDarkly = require('launchdarkly-node-server-sdk');

// TODO : Enter your LaunchDarkly SDK key here
ldclient = LaunchDarkly.init("SDK-KEY");

user = {
   "firstName":"LD",
   "lastName":"Support",
   "key":"LDSupport",
   "email":"ldsupport@ld.com",
   "custom":{
      "groups":"ld_support"
   }
};

ldclient.once('ready', function() {
  // TODO : Enter the key for your feature flag here
  // ldclient.variation("platform-is-cell-lines-enabled", user, false, function(err, showFeature) {
  //   if (showFeature) {
  //     // application code to show the feature
  //     console.log("Showing your feature to " + user.key );
  //   } else {
  //     // the code to run if the feature is off 
  //     console.log("Not showing your feature to " + user.key);
  //   }
  ldclient.allFlagsState(user, (err, flagsState) => {
    // this object can be converted to JSON or can be queried for flag values
    console.log(flagsState)
  });


    //
    // IMPORTANT: in a real application, this step is something you would only do when the application is
    // about to quit-- NOT after every call to variation(). The reason that this step is inside the variation
    // handler is flags cannot be evaluated after the SDK is closed.
    ldclient.flush(function() { // Adding flush here as close does not automatically send events in the Node.js server-side SDK.
      ldclient.close()
    })
  });
