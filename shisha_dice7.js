let flavors;
let tags;
let blocklist;

document.querySelector('.btn').addEventListener('click', mixFlavors);

Promise.all([
  fetch('shisha_data.json').then(response => response.json()),
  fetch('blocklist.json').then(response => response.json())
])
  .then(([flavorsData, blocklistData]) => {
    flavors = flavorsData;
    tags = loadTags(flavorsData);
    blocklist = loadBlocklist(blocklistData);

    const numDraw = 4;
    const uniqueResults = new Set();

    while (uniqueResults.size < numDraw) {
      const selectedFlavor = getRandomElements(flavors, 3);
      const selectedTags = selectedFlavor.flatMap(flavor => flavor.tag);

      if (!checkExclusion(selectedTags, blocklist)) {
        uniqueResults.add(selectedFlavor.map(flavor => flavor.name).toString());
      }
    }

    const resultsContainer = document.querySelector('.results');
    resultsContainer.innerHTML = '';

    uniqueResults.forEach(result => {
      const resultArray = result.split(',');
      const resultElement = document.createElement('div');
      resultElement.textContent = resultArray.join(', ');
      resultsContainer.appendChild(resultElement);
    });
  });

function loadTags(flavorsData) {
  const tagSet = new Set();
  flavorsData.forEach(flavorData => {
    tagSet.add(...flavorData.tag);
  });
  return Array.from(tagSet);
}

function loadBlocklist(blocklistData) {
  const blocklist = {};
  Object.keys(blocklistData).forEach(flavorName => {
    blocklist[flavorName] = blocklistData[flavorName];
  });
  return blocklist;
}

function getRandomElements(arr, count) {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function checkExclusion(tags, blocklist) {
  for (const flavorTag of tags) {
    if (blocklist.hasOwnProperty(flavorTag)) {
      const blockedTags = blocklist[flavorTag];
      if (blockedTags.some(blockedTag => tags.includes(blockedTag))) {
        return true;
      }
    }
  }
  return false;
}

function mixFlavors() {
  if (!flavors || !tags || !blocklist) {
    console.log("Data not loaded yet.");
    return;
  }
  const numDraw = 4; 
  const uniqueResults = new Set();

  while (uniqueResults.size < numDraw) {
    const selectedFlavor = getRandomElements(flavors, 3);
    const selectedTags = selectedFlavor.flatMap(flavor => flavor.tag);

    if (!checkExclusion(selectedTags, blocklist)) {
      uniqueResults.add(selectedFlavor.map(flavor => flavor.name).toString());
    }
  }

  const resultsContainer = document.querySelector('.results');
  resultsContainer.innerHTML = ''; 

  uniqueResults.forEach(result => {
    const resultArray = result.split(',');
    const resultElement = document.createElement('div');
    resultElement.textContent = resultArray.join(', ');
    resultsContainer.appendChild(resultElement);
  });
}
