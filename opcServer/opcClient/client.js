
 const opcua = require('node-opcua');

 const OPCUAClient = opcua.OPCUAClient;
 const MessageSecurityMode = opcua.MessageSecurityMode;
 const SecurityPolicy = opcua.SecurityPolicy;
 const AttributeIds = opcua.AttributeIds;
 const makeBrowsePath = opcua.makeBrowsePath;
 const ClientSubscription = opcua.ClientSubscription;
 const TimestampsToReturn = opcua.TimestampsToReturn;
 const MonitoringParametersOptions = opcua.MonitoringParametersOptions;
 const ReadValueIdLike = opcua.ReadValueIdLike;
 const ClientMonitoredItem = opcua.ClientMonitoredItem;
 const DataValue = opcua.DataValue;

 
 
 const connectionStrategy = {
     initialDelay: 1000,
     maxRetry: 1
 }
 const options = {
     applicationName: "MyClient",
     connectionStrategy: connectionStrategy,
     securityMode: MessageSecurityMode.None,
     securityPolicy: SecurityPolicy.None,
     endpoint_must_exist: false,
 };
 const client = OPCUAClient.create(options);
 
const endpointUrl = "opc.tcp://localhost:4334";
 async function main() {
   try {
     // step 1 : connect to
         await client.connect(endpointUrl);
         console.log("connected !");
 
     // step 2 : createSession
         const session = await client.createSession();
         console.log("session created !");
 
     // step 3 : browse
         const browseResult = await session.browse("RootFolder");
     
         console.log("references of RootFolder :");
         let c = 1;
         for(const reference of browseResult.references) {
            //  console.log(reference)
             console.log( " ns= "+ c + " -> " + reference.browseName.toString());
            c++;
             
         }
         
    //  // step 4 : read a variable with readVariableValue
    //      const dataValue2 = await session.readVariableValue("ns=3;s=Scalar_Simulation_Double");
    //      console.log(" value = " , dataValue2.toString());
         
     // step 4' : read a variable with readnpm install -g opcua-commander
         const maxAge = 0;
         const nodeToRead = {
           nodeId: "ns=1;s=London-Temperature",
           attributeId: AttributeIds.Value
         };
         const dataValue =  await session.read(nodeToRead, maxAge);
         console.log(" value " , dataValue.toString());
 
    //  // step 5: install a subscription and install a monitored item for 10 seconds
    //  const subscription = ClientSubscription.create(session, {
    //      requestedPublishingInterval: 1000,
    //      requestedLifetimeCount:      100,
    //      requestedMaxKeepAliveCount:   10,
    //      maxNotificationsPerPublish:  100,
    //      publishingEnabled: true,
    //      priority: 10
    //  });
     
    //  subscription.on("started", function() {
    //      console.log("subscription started for 2 seconds - subscriptionId=", subscription.subscriptionId);
    //  }).on("keepalive", function() {
    //      console.log("keepalive");
    //  }).on("terminated", function() {
    //     console.log("terminated");
    //  });
     
     
    //  // install monitored item
     
    //  const itemToMonitor = {
    //      nodeId: "ns=3;s=London-Temperature",
    //      attributeId: AttributeIds.Value
    //  };
    //  const parameters = {
    //      samplingInterval: 100,
    //      discardOldest: true,
    //      queueSize: 10
    //  };
     
    //  const monitoredItem  = ClientMonitoredItem.create(
    //      subscription,
    //      itemToMonitor,
    //      parameters,
    //      TimestampsToReturn.Both
    //  );
     
    //  monitoredItem.on("changed", (dataValue) => {
    //     console.log(" value has changed : ", dataValue.value.toString());
    //  });
     
     
     
    //  async function timeout(ms) {
    //      return new Promise(resolve => setTimeout(resolve, ms));
    //  }
    //  await timeout(10000);
     
    //  console.log("now terminating subscription");
    //  await subscription.terminate();
     
     
 
     // step 6: finding the nodeId of a node by Browse name
         const browsePath = makeBrowsePath("RootFolder", "/Objects/Server.ServerStatus.BuildInfo.ProductName");
     
         const result = await session.translateBrowsePath(browsePath);
         const productNameNodeId = result.targets[0].targetId;
         console.log(" Product Name nodeId = ", productNameNodeId.toString());
 
     // close session
         await session.close();
 
     // disconnecting
         await client.disconnect();
         console.log("done !");
   } catch(err) {
     console.log("An error has occured : ",err);
   }
 }
 main();