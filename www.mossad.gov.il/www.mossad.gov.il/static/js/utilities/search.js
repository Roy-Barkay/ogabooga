export default function search(searchTerm, data) {
  if (searchTerm === "") return data;
  let filteredData = [];
  data.forEach((element) => {
    let found = false;
    Object.keys(element).forEach((key) => {
      if (!found) found = handleObject(element[key], searchTerm);
    });
    if (found) {
      filteredData.push(element);
    }
  });
  return filteredData;
}

function handleObject(elementkey, searchTerm) {
  let localfound = false;
  if (typeof elementkey === "object") {
    Object.keys(elementkey).forEach((key) => {
      if (!localfound) localfound = handleObject(elementkey[key], searchTerm);
    });
  } else {
    if (String(elementkey).includes(searchTerm)) {
      localfound = true;
    }
  }
  return localfound;
}
