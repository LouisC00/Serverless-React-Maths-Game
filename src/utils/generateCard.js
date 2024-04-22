import { stages } from "./stages.js"; // Import the stages configuration

const getStageSettings = (score) => {
  let applicableStage = null;

  // Iterate through each stage to find the highest qualifying stage
  for (const stage of stages) {
    if (score >= stage.scoreMin) {
      applicableStage = stage;
    } else {
      // Since stages are sorted, no need to check further
      break;
    }
  }

  // If no applicable stage is found, throw an error
  if (!applicableStage) {
    throw new Error("Invalid score: No stage configuration found.");
  }

  // Randomly select an operation from the available operations in the found stage
  const operationConfig =
    applicableStage.operations[
      Math.floor(Math.random() * applicableStage.operations.length)
    ];

  return operationConfig;
};

const generateCard = (currentScore) => {
  const { ranges, operation, defaultTime } = getStageSettings(currentScore);

  const num2 = generateRandomNumber(ranges[1]);
  const [question, answer] = generateOperation(num2, ranges[0], operation);

  return {
    id: Math.random(),
    question,
    answer: answer.toString(),
    time: defaultTime,
    defaultTime,
    typed: "",
    completed: false,
  };
};

const generateRandomNumber = (range) => {
  return Math.floor(Math.random() * (range[1] - range[0] + 1)) + range[0];
};

const generateOperation = (num2, range, operation) => {
  let question, answer;

  switch (operation) {
    case "÷":
      const [minMultiplier, maxMultiplier] = getDivisionMultipliers(
        num2,
        range
      );
      let num1 = num2 * generateRandomNumber([minMultiplier, maxMultiplier]); // Declare locally
      question = `${num1} ÷ ${num2}`;
      answer = Math.floor(num1 / num2);
      break;
    case "+":
      let num1Add = generateRandomNumber(range); // Declare locally
      question = `${num1Add} + ${num2}`;
      answer = num1Add + num2;
      break;
    case "−":
      let num1Sub = generateRandomNumber(range); // Declare locally
      if (num1Sub < num2) [num1Sub, num2] = [num2, num1Sub]; // Ensure num1Sub is larger
      question = `${num1Sub} − ${num2}`;
      answer = num1Sub - num2;
      break;
    case "×":
      let num1Mul = generateRandomNumber(range); // Declare locally
      question = `${num1Mul} × ${num2}`;
      answer = num1Mul * num2;
      break;
    default:
      throw new Error("Unsupported operation");
  }

  return [question, answer]; // Return only needed values
};

const getDivisionMultipliers = (num2, range) => {
  const minMultiplier = Math.ceil(range[0] / num2);
  const maxMultiplier = Math.floor(range[1] / num2);
  return [minMultiplier, maxMultiplier];
};

export { generateCard };
