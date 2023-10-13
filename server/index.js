const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const db = require("./models/index.js");

const app = express();
app.use(express.json());
app.use(cors());

const authenticateMiddleware = (req, res, next) => {
  const token = req.header("Authorization");

  // Check if token is provided
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. Token not provided." });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, "secret"); // Replace with your actual secret key

    // Attach the decoded user to the request object for further use
    req.user = decoded.user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token." });
  }
};

app.get("/fetch-all", async (req, res) => {
  try {
    const users = await db.users.findAll();
    console.log({ users });
    res.status(200).json(users);
  } catch (err) {
    console.log("Error while fetchging all users", err);
  }
});

app.post("/login", async (req, res) => {
  // Assume you've validated the user's credentials and got the user_id
  const user_id = "some_user_id"; // Replace with the actual user_id

  // Generate a token for the user
  const token = jwt.sign({ user_id }, "secret", { expiresIn: "1h" });

  // Return the token to the client
  res.json({ token });
});

app.get("/details/:user_id", async (req, res) => {
  const user_id = req.params.user_id;

  try {
    // Fetch user details from the database based on user_id
    const userDetails = await db.users.findOne({ where: { user_id } });

    if (!userDetails) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user_details: userDetails });
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.put("/update", async (req, res) => {
  const newDetails = req.body;

  try {
    // Logic to update user details in the database based on newDetails
    await db.users.update(newDetails, {
      where: { user_id: newDetails.user_id },
    });

    // Return a success message
    res.status(200).json({ message: "User details updated successfully" });
  } catch (error) {
    console.error("Error updating user details:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/image/:user_id", async (req, res) => {
  const user_id = req.params.user_id;

  try {
    // Fetch user image URL from the database based on user_id
    const userDetails = await db.users.findOne({
      attributes: ["user_image"],
      where: { user_id },
    });

    if (!userDetails) {
      return res.status(404).json({ message: "User not found" });
    }

    const userImageURL = userDetails.user_image;

    // Return user image details as a JSON object
    res.status(200).json({ user_image: userImageURL });
  } catch (error) {
    console.error("Error fetching user image:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/insert", async (req, res) => {
  const user_details = req.body;
  console.log({ user_details });
  try {
    // Logic to insert the new user into the database based on user_details
    const newUser = await db.users.create(user_details);

    // Return a success message
    res
      .status(200)
      .json({ message: "User inserted successfully", user: newUser });
  } catch (error) {
    console.error("Error inserting user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.delete("/delete/:user_id", async (req, res) => {
  const user_id = req.params.user_id;

  try {
    // Logic to delete the user from the database based on user_id
    const deletedUser = await db.users.destroy({
      where: { user_id },
    });

    if (deletedUser === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return a success message
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(4000, () => console.log("server is listening on port 4000"));
