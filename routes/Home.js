const express = require("express");
const app = express();
const users = require("../users.json");
const slugify = require("slugify");
const { body, validationResult } = require("express-validator");
const { checkIfExist } = require("../middlewares/users");

app.get("/", (req, res) => {
    res.json(users);
});

app.get("/:slug", checkIfExist, (req, res) => {
    res.json(req.user);
});

app.post(
    "/new-user",
    body("name")
        .exists()
        .isLength({ min: 4 })
        .withMessage("Invalid name (required or less than 4 digit)"),
    body("password")
        .exists()
        .isLength({ min: 8 })
        .withMessage("Invalid password (required or less than 8 digit)"),
    body("city")
        .exists()
        .isIn(["Paris", "Tokyo", "Los Angeles"])
        .withMessage("Invalid city"),
    body("email").exists().isEmail().withMessage("Invalid email"),
    (req, res) => {
        const { errors } = validationResult(req);

        if (errors.length > 0) {
            res.status(400).json(errors);
        } else {
            const user = {
                name: req.body.name,
                slug: slugify(req.body.name, {
                    replacement: "-",
                    remove: /[*+~.()'"!:@]/g,
                    lower: true,
                    strict: true,
                }),
                password: req.body.password,
                email: req.body.email,
                city: req.body.city,
                profile_picture: req.body.profile_picture,
            };
            users.push(user);
            res.status(201).json(user);
        }
    }
);

module.exports = app;
