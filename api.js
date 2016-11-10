// @inparameter ○○の天気

// 文字列を受け取る　in param
// １. 数値蛇ないとき　ジオコーディングで lat long を作成する
// 2. 数値(lat/long)のとき　そのまま
// lat/long ができたら　weatherApiを呼ぶ
// responce json から必要データをマップして返す(３時間ごとのデータが５日分入ってるUTCだから9時間たしたらあってる時間　気温はケルビンなので(-273.15する))
// {
//   "dt":1478746800,
//   "main":{"temp":286.08,"temp_min":285.489,"temp_max":286.08,"pressure":1037.22,"sea_level":1038.24,"grnd_level":1037.22,"humidity":76,"temp_kf":0.59},
//   "weather":[{"id":802,"main":"Clouds","description":"scattered clouds","icon":"03d"}],
//   "clouds":{"all":44},
//   "wind":{"speed":1.11,"deg":177},
//   "rain":{},
//   "sys":{"pod":"d"},
//   "dt_txt":"2016-11-10 03:00:00"
// }

var https = require("https");
var http = require("http");
var _ = require("lodash");
var headers = { 'Content-Type':'application/json' };
var gurl = "https://maps.googleapis.com/maps/api/geocode/json?";
var wUrl = "https://api.openweathermap.org/data/2.5/weather?";
var gKey = require("./config.js").geo_api_key;
var wKey = require("./config.js").weather_api_key;
var garg = "";
var warg = "";

// inputをurlに入れる slackbotにnode api {場所}でたたかせる
gurl = gurl + "address=" + encodeURI(process.argv[2]) + "&sensor=false&key=" + gKey;
console.log(gurl);
// request option作成

// inputから緯度経度を作る
https.get(gurl, function(res) {
  console.log("aaaa!!!");
  var body = '';
  res.setEncoding('utf8');
  res.on('data', function(data) {
    body += data;
  });
  res.on('end', function(data) {
    console.log(JSON.parse(body).forecasts[0].telop);
  });
});
// http.get(gurl, function(res) {
//     var body = '';
//     res.setEncoding('utf8');
//     res.on('data', function(data) {
//         body += data;
//     });
//     console.log(body);
//     res.on('end', function(data) {
//         console.log(body);
//     });
// });
