const axios = require('axios');
const cheerio = require('cheerio');

const ExtractEpisodesFromSource = async (source) => {
   const result = await axios.get(source);
   const $ = cheerio.load(result.data);
   const lst = $('.episodios li a')
      .map((i, e) => {
         return $(e).attr('href');
      })
      .get();
   return lst.reverse();
};

const ExtractVideoTag = async (episodeUrl) => {
   const result = await axios.get(episodeUrl);
   const $ = cheerio.load(result.data);

   let html = $('#video')
      .closest('div')
      .map((i, e) => $(e).html())
      .get();
   html = html[0];
   return html;
};

const ExtractVideoUrl = async (episodeUrl) => {
   const result = await axios.get(episodeUrl);
   const $ = cheerio.load(result.data);

   let url = $('#video source')
      .map((i, e) => $(e).attr('src'))
      .get();
   url = url[0];
   return url;
};

module.exports = {ExtractEpisodesFromSource, ExtractVideoUrl, ExtractVideoTag};
