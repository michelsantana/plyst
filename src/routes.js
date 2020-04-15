const express = require('express');

const anvpService = require('./services/anvpService');
const bzService = require('./services/bzService');
const routes = express.Router();

routes.get('/', async (request, response) => {
   return response.render('home/index', {});
});

routes.get('/view', async (request, response) => {
   return response.render('home/index', {});
});

routes.get('/view/boruto', async (request, response) => {
   return response.render('boruto/index', {
      title: 'Plyst - Boruto',
      ModalButtons: [{type: 'secondary', dismiss: true, name: 'Fechar'}],
      lastEpisodes: await bzService.ExtractEpisodesFromSource(
         'https://animesonline.bz/episodios/boruto-naruto-next-generations'
      ),
   });
});

routes.get('/view/boruto/watch', async (request, response) => {
   var {ep} = request.query;
   return response.render('_video', {
      url: `https://ns569568.ip-51-79-82.net/Uploads/Animes/B/boruto/${ep}.mp4`,
   });
});

routes.get('/view/anvp', async (request, response) => {
   return response.render('anvp/index', {
      title: 'Plyst - Animes VIP',
      repository: 'https://animesonline.vip/os-simpsons/',
      ModalButtons: [
         {dismiss: true, className:"btn btn-secondary", name: 'Fechar'},
         {dismiss: false, className:"btn btn-link random", name: 'Aleatório '}
      ]
   });
});

routes.get('/view/anvp/list', async (request, response) => {
   var {repository} = request.query;
   const lstEpisodes = await anvpService.ExtractEpisodesFromSource(repository);
   return response.render('anvp/_list', {
      episodes: lstEpisodes
   });
});

routes.get('/view/anvp/watch', async (request, response) => {
   var {ep} = request.query;
   const videoUrl = await anvpService.ExtractVideoUrl(ep);
   return response.render('_video', {
      url: videoUrl,
   });
});

routes.get('/view/bz', async (request, response) => {
   return response.render('bz/index', {
      title: 'Plyst - Animes biz',
      repository: 'https://animesonline.bz/episodios/boruto-naruto-next-generations/',
      ModalButtons: [
         {dismiss: true, className:"btn btn-secondary", name: 'Fechar'},
         {dismiss: false, className:"btn btn-link random", name: 'Aleatório '}
      ]
   });
});

routes.get('/view/bz/list', async (request, response) => {
   var {repository} = request.query;
   const lstEpisodes = await bzService.ExtractEpisodesFromSource(repository);
   return response.render('bz/_list', {
      episodes: lstEpisodes
   });
});

routes.get('/view/bz/watch', async (request, response) => {
   var {ep} = request.query;
   const videoUrl = await bzService.ExtractVideoUrl(ep);
   return response.render('_video', {
      type: 'iframe',
      url: videoUrl
   });
});

module.exports = routes;
