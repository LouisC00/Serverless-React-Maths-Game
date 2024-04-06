const Airtable = require("airtable");

Airtable.configure({
  apiKey: process.env.AIRTABLE_TOKEN,
});

const base = require("airtable").base("app4rRaa5uCAaQ6CZ");
const table = base.table("Table1");

exports.handler = async (event, context, callback) => {
  try {
    const records = await table.select({}).firstPage();
    const formattedRecords = records.map((record) => ({
      id: record.id,
      fields: record.fields,
    }));

    return {
      statusCode: 200,
      body: JSON.stringify(formattedRecords),
    };
  } catch (err) {
    return {
      statusCode: 200,
      body: JSON.stringify({ err: "Failed to query records" }),
    };
  }
};
