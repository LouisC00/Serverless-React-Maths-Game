const { getHighScores } = require("./utils/airtable");

exports.handler = async (event, context, callback) => {
  try {
    const records = await getHighScores(true);

    return {
      statusCode: 200,
      body: JSON.stringify(records),
    };
  } catch (err) {
    return {
      statusCode: 200,
      body: JSON.stringify({ err: "Failed to query records" }),
    };
  }
};
