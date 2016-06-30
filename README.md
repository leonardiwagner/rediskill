# rediskill
a redis queue service for key-value messages


# Method Summary

- deleteMessage( *key* ): delete a single message by a specific key
- deleteMessages( *arrayOfKeys* ): delete multiple messages by given array of keys
- flushQueue(): delete all data from queue
- receiveMessage(): receive a message from queue. After receiving the message will be removed from queue
- receiveMessagesFromQueue( *count* ): receive multiples messages grom queue. After receiving the messages will be removed from queue
- sendMessage( *key*, *value* ): send a single message to queue
- sendMessages( *arrayOfMessages* ): send multiple messages to queue