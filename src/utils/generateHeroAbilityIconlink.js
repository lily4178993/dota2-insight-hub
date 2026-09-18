const generateHeroAbilityIconlink = (imgUrl, imgExtention) => {
  const nameParam = imgUrl.split('/').pop().replace('.png?', '');
  if (imgExtention) {
    return `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/abilities/${nameParam}.${imgExtention}`;
  }
  return `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/abilities/${nameParam}`;
};

export default generateHeroAbilityIconlink;
