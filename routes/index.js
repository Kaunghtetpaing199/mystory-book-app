const router = require("express").Router();
const { ensureGuest, ensureAuth } = require("../middlewares/auth");

router.get("/", ensureGuest, (req, res) => {
  res.render("login", { layout: "login" });
});

router.get("/dashboard", ensureAuth, async (req, res) => {
  try {
    res.render("dashboard", {
      name: req.user.firstName,
    });
  } catch (err) {
    console.log(err);
    res.render("errors/500");
  }
});

module.exports = router;
