// This script is not deployed with the website. It is within the database as an event.

exports = async function (changeEvent) {
  /*
    A Database Trigger will always call a function with a changeEvent.
    Documentation on ChangeEvents: https://docs.mongodb.com/manual/reference/change-events/

    Access the _id of the changed document:
    const docId = changeEvent.documentKey._id;

    Access the latest version of the changed document
    (with Full Document enabled for Insert, Update, and Replace operations):
    const fullDocument = changeEvent.fullDocument;

    const updateDescription = changeEvent.updateDescription;

    See which fields were changed (if any):
    if (updateDescription) {
      const updatedFields = updateDescription.updatedFields; // A document containing updated fields
    }

    See which fields were removed (if any):
    if (updateDescription) {
      const removedFields = updateDescription.removedFields; // An array of removed fields
    }

    Functions run by Triggers are run as System users and have full access to Services, Functions, and MongoDB Data.

    Access a mongodb service:
    const collection = context.services.get(<SERVICE_NAME>).db("db_name").collection("coll_name");
    const doc = collection.findOne({ name: "mongodb" });

    Note: In Atlas Triggers, the service name is defaulted to the cluster name.

    Call other named functions if they are defined in your application:
    const result = context.functions.execute("function_name", arg1, arg2);

    Access the default http client and execute a GET request:
    const response = context.http.get({ url: <URL> })

    Learn more about http client here: https://docs.mongodb.com/realm/functions/context/#context-http
  */
  const doc = changeEvent.fullDocument;
  const discord = doc.discord;
  const joinType = doc.type;
  const cmdr = doc.cmdr;
  const timeStamp = doc.timeStamp.toString();
  const embed = {
    title: '__**New Application Received**__',
    description: `**${discord}** has requested to join USC as **${joinType}** with the CMDR Name: **${cmdr}**`,
    footer: { text: timeStamp },
  };
  const webhook = '[Enter Discord Webhook here]';
  const response = await context.http.post({
    url: webhook,
    body: { embeds: [embed] },
    encodeBodyAsJSON: true,
  });
};
