const fetch = require('node-fetch');
const cheerio = require('cheerio');


const look = () => new Promise((resolve,reject) => {
  fetch('https://samehadaku.vip/gleipnir-episode-3/',{method: 'GET'})
  .then(res => res.text())
  .then(res => {
    const $ = cheerio.load(res);

    const arr = [];

    $('div.download-eps').each((i1,e1) => {
      const format = $(e1).find('p>b').text();
      const obj = {};

      $(e1).find('ul > li').each((i3,e3) => {
        const resolusi_video = $(e3).children('strong').text();

        $(e3).find(' span > a').each((i2,e2) => {
          const nm_link = $(e2).text(); 
          const url = $(e2).attr('href');

          
        });

      });

      arr.push(obj);
    });   

    console.log(arr);
  })
});


(async () => {
  const looklah = await look();
  // console.log(looklah);
})();