const { table, getHighScores } = require("./utils/airtable");
const {
  getAccessTokenFromHeaders,
  validateAccessToken,
} = require("./utils/auth");

exports.handler = async (event, context, callback) => {
  const token = getAccessTokenFromHeaders(event.headers);
  const user = await validateAccessToken(token);
  if (!user) {
    return {
      statusCode: 403,
      body: JSON.stringify({ err: "Unauthorized" }),
    };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ err: "That method is not allowed" }),
    };
  }

  const { score, name } = JSON.parse(event.body);
  if (typeof score === undefined || !name) {
    return {
      statusCode: 400,
      body: JSON.stringify({ err: "Bad request" }),
    };
  }

  let updatedRecord; // Define updatedRecord outside the if block

  try {
    const records = await getHighScores(false);

    const lowestRecord = records[9];
    if (
      typeof lowestRecord.fields.score === "undefined" ||
      score > lowestRecord.fields.score
    ) {
      updatedRecord = { id: lowestRecord.id, fields: { name, score } }; // Update the record
      await table.update([updatedRecord]);
    }

    return {
      statusCode: 200,
      body: JSON.stringify(updatedRecord || { message: "No update needed" }), // Return updatedRecord or a message if no update was needed
    };
  } catch (err) {
    return {
      statusCode: 500, // Use status code 500 for server errors
      body: JSON.stringify({ err: err.message || "An error occurred" }), // Return the error message
    };
  }
};
