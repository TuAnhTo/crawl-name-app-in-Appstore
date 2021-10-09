var express = require('express');
var router = express.Router();
var axios = require('axios');
const _ = require('lodash');
const { map } = require('lodash');


/* GET home page. */
router.get('/', function (req, res, next) {
  let nameArray = [];
  let imageArray = [];


  try {
    let config = {
      method: 'get',
      url: 'https://rss.itunes.apple.com/api/v1/vn/ios-apps/top-free/all/200/explicit.json',
      headers: {}
    };

    axios(config)
      .then(function (response) {
        let result = JSON.stringify(response.data)
        let data = JSON.parse(result);

        let listItemData = data.feed.results



        let list = listItemData.map((item) => {
          // console.log(item)
          nameArray.push(item.artistName)
          imageArray.push(item.artworkUrl100)
          return item
        })

        res.render('index', { title: 'App in Apple Store', nameArray });
      })
      .catch(function (error) {
        console.log(error);
      });
  } catch (error) {
    console.log(error)
  }
});

module.exports = router;
