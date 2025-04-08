# log service using kafka

kafka based service to process user activity logs
using docker and mongoDB

## setup commands

```bash
npm install
# Start Kafka and MongoDB
docker-compose up -d

# create kafka topic
docker exec -it kafka  /bin/bash

kafka-topics.sh --create --topic=user-activity-log --partitions=1 --replication-factor=1 --bootstrap-server=kafka:9092


```

## endpoints

| Method | Endpoint | Description                            |
| ------ | -------- | -------------------------------------- |
| `POST` | `/login` | Triggers Kafka log producer.           |
| `GET`  | `/logs`  | get logs support filter and pagination |

**`POST /login`** : requires `userId` in the request body

**`GET /logs`**: supported queries (page,limit,userId,action,status)

Example:
`GET http://localhost:3000/logs?limit=4&page=3&userId=3`
