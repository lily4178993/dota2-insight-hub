const generateHeroPosterlink = (imgUrl) => {
  const nameParam = imgUrl.split('/').pop().replace('.png?', '');
  return `https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/${nameParam}.png`;
};

export default generateHeroPosterlink;
