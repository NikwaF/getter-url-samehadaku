const fetch = require('node-fetch');
const cheerio = require('cheerio');
const readline = require('readline-sync');

const look = (url) => new Promise((resolve,reject) => {
  let he = [];

  fetch(url,{method: 'GET'})
  .then(res => res.text())
  .then(res => {
    const $ = cheerio.load(res);
    const arr = [];
    console.log($('h1.entry-title[itemprop="name"]').text());

    $('div.download-eps').each((i1,e1) => {
      const format = $(e1).find('p>b').text();
      const obj = {};
      obj[format] = {};
      $(e1).find('ul > li').each((i3,e3) => {
        const resolusi_video = $(e3).children('strong').text().trim();
        he = [];
        $(e3).find(' span > a').each((i2,e2) => {
          const nm_link = $(e2).text().replace(" ","_"); 
          const url = $(e2).attr('href');
          const obj = {};
          obj[nm_link] = url;
          he.push(obj);
        });
        obj[format][resolusi_video] = JSON.stringify(he);
      });
      arr.push(obj);
    });   

    resolve(arr);
  })
  .catch(err => reject(err))
});

(async () => {
  const link = readline.question('[#] Masukkan link : ');
  try{
    const looklah = await look(link);
    if(looklah.length === 0){
      console.log('Gabisa maap ehehe');
      return ;
    }
    console.log(looklah);
  } catch(err) {
    console.log('Gabisa maap ehehe');
  }

})();