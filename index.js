const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());


app.use(express.json()); // To parse JSON request bodies

// POST endpoint for /bfhl
app.post("/bfhl", (req, res) => {
  try {
    const { data } = req.body;

    // Input validation
    if (!Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        message: "Invalid input format. Please provide an array of data.",
      });
    }

    // Separate numbers and alphabets
    const numbers = data.filter((item) => !isNaN(Number(item)));
    const alphabets = data.filter((item) => isNaN(Number(item)));

    // Find the highest lowercase alphabet
    const lowercaseAlphabets = alphabets.filter(
      (char) => char >= "a" && char <= "z"
    );
    const highestLowercase = lowercaseAlphabets.length
      ? [
          String.fromCharCode(
            Math.max(...lowercaseAlphabets.map((char) => char.charCodeAt(0)))
          ),
        ]
      : [];

    // Construct the user_id
    const user_id = "john_doe_17091999"; // Hardcoded for this example

    // Return the response
    res.json({
      is_success: true,
      user_id,
      email: "john@xyz.com", // Hardcoded for this example
      roll_number: "ABCD123", // Hardcoded for this example
      numbers,
      alphabets,
      highest_lowercase_alphabet: highestLowercase,
    });
  } catch (error) {
    res.status(500).json({
      is_success: false,
      message: "An error occurred. Please try again.",
    });
  }
});

// GET endpoint for /bfhl
app.get("/bfhl", (req, res) => {
  res.status(200).json({
    operation_code: 1,
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
