const axios = require('axios');
const cheerio = require('cheerio');

const ExtractEpisodesFromSource = async (source) => {
   const result = await axios.get(source);
   const $ = cheerio.load(result.data);
   const lst = $('.video a')
      .map((i, e) => {
         return { 
            title: $(e).attr('title'),
            href: $(e).attr('href')
         }
      })
      .get();
   return lst;
};

const ExtractVideoUrl = async (episodeUrl) => {
   const result = await axios.get(episodeUrl);
   const $ = cheerio.load(result.data);

   let url = $('.content-video iframe')
      .map((i, e) => $(e).attr('src'))
      .get();
   url = url[0];
   return url;
};

module.exports = {ExtractEpisodesFromSource, ExtractVideoUrl};
