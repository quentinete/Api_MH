const baseURL = "https://mhw-db.com";
let Lang = "";

async function loadData() {
  const type = document.getElementById("Select").value.toLowerCase();
  const number = parseInt(document.getElementById("NumWanted").value);
  const resultDiv = document.getElementById("result");

  resultDiv.innerHTML = "<p>Chargement...</p>";

  try {
    console.log(`${baseURL}/${Lang}${type}`)
    const response = await fetch(`${baseURL}/${Lang}${type}`);
    if (!response.ok) throw new Error("Erreur lors du chargement des données");
  
    const data = await response.json();
    const slicedData = data.slice(0, number);

    logData(slicedData, type);
    htmlDisplay(slicedData, type);
    
  } catch (error) {
    resultDiv.innerHTML = `<p style="color:red;">${error.message}</p>`;
  }
}

function Language() {
  const Langue = document.getElementById("Select-L").value.toLowerCase();

  if (Langue === "anglais") {
    Lang = "";
  } else if (Langue === "français") {
    Lang = "fr/";
  } else if (Langue === "allemand") {
    Lang = "de/";
  } else if (Langue === "chinois (simplifié)") {
    Lang = "zh/";
  } else if (Langue === "chinois (traditionnel)") {
    Lang = "zh-Hant/";
  }
}

function logData(data, type) {
  console.log(`--- Données ${type.toUpperCase()} ---`);
  console.log(data);
}

function htmlDisplay(data, type) {
  console.log("c'est bon sa marche")
}