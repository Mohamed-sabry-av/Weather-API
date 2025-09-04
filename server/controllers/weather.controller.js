const axios = require("axios");
const cache = require("../middlewares/cache.middleware");

exports.getWeather = async (req, res) => {
  const country = req.params.country;
  const cacheKey = `weather:${country}`;
  try {
    const cached = cache.get(cacheKey);
    if (cached) {
      return res.status(200).json({
        message: "cached List are :",
        source: "Cache",
        data: cached,
      });
    }
    const response = await axios.get(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${country}?key=${process.env.VisualCrossingAPI}`
    );

    const data = response.data;
    cache.set(cacheKey, data);

    console.log("data From API ");
    res.status(200).json({
      source: "API",
      data: response.data,
    });
  } catch (err) {
    console.log(err.message);
  }
};
