const { table, getHighScores } = require("./utils/airtable");

exports.handler = async (event, context, callback) => {
  console.log(event);
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ err: "That method is not allowed" }),
    };
  }

  const { score, name } = JSON.parse(event.body);
  if (!score || !name) {
    return {
      statusCode: 400,
      body: JSON.stringify({ err: "Bad request" }),
    };
  }

  try {
    const records = await getHighScores(false);

    const lowestRecord = records[9];
    if (
      typeof lowestRecord.fields.score === "undefined" ||
      score > lowestRecord.fields.score
    ) {
      const updatedRecord = { id: lowestRecord.id, fields: { name, score } };
      await table.update([updatedRecord]);
    }

    return {
      statusCode: 200,
      body: JSON.stringify(formattedRecords),
    };
  } catch (err) {
    return {
      statusCode: 200,
      body: JSON.stringify({}),
    };
  }
};
