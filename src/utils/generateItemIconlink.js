const generateItemIconlink = (imgUrl) => {
  const nameParam = imgUrl
    .split('/')
    .pop()
    .replace(/\.png.*/, '.png');
  return `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/items/${nameParam}`;
};

export default generateItemIconlink;
