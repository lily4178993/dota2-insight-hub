const generateHeroPosterlink = (imgUrl, imgExtention) => {
  const nameParam = imgUrl.split('/').pop().replace('.png?', '');
  if (imgExtention) {
    return `https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/${nameParam}.${imgExtention}`;
  }
  return `https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/${nameParam}`;
};

export default generateHeroPosterlink;
