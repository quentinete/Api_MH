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
    resultDiv.innerHTML = htmlDisplay(slicedData, type);
    
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
  let html = `<h2>Résultats : ${type}</h2>`;

  data.forEach(item => {
    html += `<div class="Data">`;
    if (type === "monsters") {
      html += `
        <h3 class="Datas" >${item.name}</h3>
        <p class="Datas" ><strong>Type :</strong> ${item.type}</p>
        <p class="Datas" ><strong>Espèce :</strong> ${item.species}</p>
        <p class="Datas" ><strong>Description :</strong> ${item.description || "Aucune description"}</p>
        <p class="Datas" ><strong>Éléments :</strong> ${item.elements.join(", ") || "Aucun"}</p>
        <p class="Datas" ><strong>Faiblesses :</strong> ${item.weaknesses?.map(w => w.element).join(", ") || "Aucune"}</p>
      `;
    }
    else if (type === "weapons") {
      html += `
        <h3 class="Datas" >${item.name}</h3>
        <p class="Datas" ><strong>Type d'arme :</strong> ${item.type}</p>
        <p class="Datas" ><strong>Rareté :</strong> ${item.rarity}</p>
        <p class="Datas" ><strong>Attaque :</strong> ${item.attack?.display || "?"}</p>
        <p class="Datas" ><strong>Éléments :</strong> ${item.elements?.map(e => `${e.type} (${e.damage})`).join(", ") || "Aucun"}</p>
      `;
    }
    else if (type === "items") {
      html += `
        <h3 class="Datas" >${item.name}</h3>
        <p class="Datas" ><strong>Type :</strong> ${item.type}</p>
        <p class="Datas" ><strong>Description :</strong> ${item.description || "Aucune description"}</p>
        <p class="Datas" ><strong>Rareté :</strong> ${item.rarity}</p>
        <p class="Datas" ><strong>Utilisable en combat :</strong> ${item.combat ? "Oui" : "Non"}</p>
      `;
    }
    html += `</div>`;
  });
  return html;
}
