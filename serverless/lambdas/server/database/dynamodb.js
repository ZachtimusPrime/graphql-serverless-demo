const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient();

const NOT_FOUND = "Record does not exist."

async function getBook(id) {
  const params = {
    TableName: process.env.BOOK_TABLE,
    Key: { id: id }
  }

  try {
    let record = await dynamodb.get(params).promise();
    if (record.Item) return record.Item
    throw NOT_FOUND;
  } catch (err) {
    throw err;
  }
}

async function getBooks() {
  const params = {
    TableName: process.env.BOOK_TABLE
  }

  try {
    let record = await dynamodb.scan(params).promise();
    if (record.Items) return record.Items
  } catch (err) {
    throw err;
  }
}

async function getBooksByAuthor(id) {
  const params = {
    TableName: process.env.BOOK_TABLE,
    IndexName: "authorId-index",
    KeyConditionExpression: "#aid = :id",
    ExpressionAttributeNames: {
      "#aid": "authorId"
    },
    ExpressionAttributeValues: {
      ":id": id
    }
  }

  try {
    let record = await dynamodb.query(params).promise();
    if (record.Items) return record.Items
  } catch (err) {
    throw err;
  }
}

async function getAuthor(id) {
  const params = {
    TableName: process.env.AUTHOR_TABLE,
    Key: { id: id }
  }

  try {
    let record = await dynamodb.get(params).promise();
    if (record.Item) return record.Item
    throw NOT_FOUND;
  } catch (err) {
    throw err;
  }
}

async function getAuthors() {
  const params = {
    TableName: process.env.AUTHOR_TABLE
  }

  try {
    let record = await dynamodb.scan(params).promise();
    if (record.Items) return record.Items
  } catch (err) {
    throw err;
  }
}

module.exports = {
  getBook: getBook,
  getBooks: getBooks,
  getBooksByAuthor: getBooksByAuthor,
  getAuthor: getAuthor,
  getAuthors: getAuthors
};
