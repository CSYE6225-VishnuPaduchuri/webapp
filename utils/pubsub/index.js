// Reference for pubsub from https://github.com/googleapis/nodejs-pubsub/blob/main/samples/publishMessage.js

import { PubSub } from "@google-cloud/pubsub";

import dotenv from "dotenv";
import { customLogger } from "../../app/index.js";

dotenv.config();

const pubSub = new PubSub();

const topicName = process.env.TOPIC_NAME;

const publishMessageToTopic = async (userObject) => {
  if (process.env.IS_TEST_ENVIROMENT === "false") {
    try {
      customLogger.info("Publishing message to topic");
      const dataBuffer = Buffer.from(JSON.stringify(userObject));
      const messageId = await pubSub.topic(topicName).publish(dataBuffer);
      customLogger.info(`PubSub Message ${messageId} published.`);
    } catch (e) {
      customLogger.error("Error in publishMessageToTopic", e);
    }
  }
  return;
};

export default publishMessageToTopic;
