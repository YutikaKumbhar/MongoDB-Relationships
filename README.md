# Relationships

https://www.mongodb.com/company/blog/mongodb/6-rules-of-thumb-for-mongodb-schema-design

A learning demo of MongoDB Relationships that demonstrates different ways to model relationships between documents.


## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Make sure MongoDB is running locally.
3. The code connects to:
   ```bash
   mongodb://127.0.0.1:27017/relationDemo
   ```

## Run examples

Each model file executes its own MongoDB example when run:

```bash
node Models/user.js
node Models/customer.js
node Models/posts.js
```

## Notes

- This is a demo project intended for learning Mongoose relationships.
- The scripts perform inserts and reads directly when executed.
- There is no full application server or test suite in this repository yet.
