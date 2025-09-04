const express = require("express");
const router = express.Router();
const WEATHER = require("../controllers/weather.controller");

router.get("/:country", WEATHER.getWeather);


module.exports=router;