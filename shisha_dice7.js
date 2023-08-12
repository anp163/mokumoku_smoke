let flavors;
let tags;
let blocklist;

document.querySelector('.btn').addEventListener('click', mixFlavors);

Promise.all([
  fetch('shisha_data.json').then(response => response.json()),
  fetch('blocklist.json').then(response => response.json())
])
  .then(([flavorsData, blocklistData]) => {
    flavors = loadFlavors(flavorsData);
    tags = loadTags(flavorsData);
    blocklist = loadBlocklist(blocklistData);

    const numDraw = 4;
    const uniqueResults = new Set();

    while (uniqueResults.size < numDraw) {
      const selectedFlavor = [...flavors].sort(() => Math.random() - 0.5).slice(0, 3);

      if (!checkExclusion(selectedFlavor, blocklist)) {
        uniqueResults.add(selectedFlavor.toString());
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

function loadFlavors(flavorsData) {
  const flavorsList = flavorsData.map(flavor => flavor.name);
  return flavorsList;
}

function loadTags(flavorsData) {
  const tagList = [];
  flavorsData.forEach(flavorData => {
    tagList.push(...flavorData.tag);
  });
  return tagList;
}

function loadBlocklist(flavorsData) {
  const blocklist = {};
  flavorsData.forEach(flavorData => {
    blocklist[flavorData.name] = flavorData.block;
  });
  return blocklist;
}

function checkExclusion(tag, blocklist) {
  for (const flavorTag of tag) {
    if (blocklist.hasOwnProperty(flavorTag)) {
      const blockedTags = blocklist[flavorTag];
      if (blockedTags.some(blockedTag => tag.includes(blockedTag))) {
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
        const selectedFlavor = [...flavors].sort(() => Math.random() - 0.5).slice(0, 3);

        if (!checkExclusion(selectedFlavor, blocklist)) {
            uniqueResults.add(selectedFlavor.toString());
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
