const baseURL = "https://mhw-db.com";
let Lang = "";

async function loadData() {
  const type = document.getElementById("Select").value.toLowerCase();
  const number = parseInt(document.getElementById("NumWanted").value);
  const resultDiv = document.getElementById("result");

  resultDiv.innerHTML = "<p>Chargement...</p>";

  try {
    console.log(`${baseURL}/${type}`)
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
        <h3 class="Datas">${item.name}</h3>
        <p class="Datas"><strong>Type :</strong> ${item.type}</p>
        <p class="Datas"><strong>Espèce :</strong> ${item.species}</p>
        <p class="Datas"><strong>Description :</strong> ${item.description || "Aucune description"}</p>
        <p class="Datas"><strong>Éléments :</strong> ${item.elements.join(", ") || "Aucun"}</p>
        <p class="Datas"><strong>Faiblesses :</strong> ${item.weaknesses?.map(w => w.element).join(", ") || "Aucune"}</p>
      `;
    } else if (type === "weapons") {
      html += `
        <h3 class="Datas">${item.name}</h3>
        <p class="Datas"><strong>Type d'arme :</strong> ${item.type}</p>
        <p class="Datas"><strong>Rareté :</strong> ${item.rarity}</p>
        <p class="Datas"><strong>Attaque :</strong> ${item.attack?.display || "?"}</p>
        <p class="Datas"><strong>Éléments :</strong> ${item.elements?.map(e => `${e.type} (${e.damage})`).join(", ") || "Aucun"}</p>
      `;
    } else if (type === "items") {
      html += `
        <h3 class="Datas">${item.name}</h3>
        <p class="Datas"><strong>Type :</strong> ${item.type}</p>
        <p class="Datas"><strong>Description :</strong> ${item.description || "Aucune description"}</p>
        <p class="Datas"><strong>Rareté :</strong> ${item.rarity}</p>
        <p class="Datas"><strong>Utilisable en combat :</strong> ${item.combat ? "Oui" : "Non"}</p>
      `;
    } else if (type === "ailments") {
      html += `
        <h3 class="Datas">${item.name}</h3>
      `;
    } else if (type === "armor") {
      html += `
        <h3 class="Datas">${item.name}</h3>
        <p class="Datas"><strong>Type :</strong> ${item.type}</p>
        <p class="Datas"><strong>Rareté :</strong> ${item.rarity}</p>
        <p class="Datas"><strong>Défense de base :</strong> ${item.defense.base || "?"}</p>
        <p class="Datas"><strong>Défense max :</strong> ${item.defense.max || "?"}</p>
      `;
    } else if (type === "armor/sets") {
      html += `
        <h3 class="Datas">${item.name}</h3>
        <p class="Datas"><strong>Set :</strong> ${item.pieces}</p>
        <p class="Datas"><strong>Set :</strong> ${item.pieces}</p>

      `;

      









    } else if (type === "decorations") {
      html += `
        <h3 class="Datas">${item.name}</h3>
        <p class="Datas"><strong>Type :</strong> ${item.type}</p>
        <p class="Datas"><strong>Effet :</strong> ${item.effect || "Aucun"}</p>
      `;
    } else if (type === "events") {
      html += `
        <h3 class="Datas">${item.name}</h3>
        <p class="Datas"><strong>Date :</strong> ${item.date}</p>
        <p class="Datas"><strong>Description :</strong> ${item.description || "Aucune"}</p>
      `;
    } else if (type === "charms") {
      html += `
        <h3 class="Datas">${item.name}</h3>
        <p class="Datas"><strong>Effet :</strong> ${item.effect}</p>
        <p class="Datas"><strong>Rareté :</strong> ${item.rarity}</p>
      `;
    } else if (type === "locations") {
      html += `
        <h3 class="Datas">${item.name}</h3>
        <p class="Datas"><strong>Type :</strong> ${item.type}</p>
        <p class="Datas"><strong>Description :</strong> ${item.description || "Aucune description"}</p>
      `;
    } else if (type === "motion-values") {
      html += `
        <h3 class="Datas">${item.name}</h3>
        <p class="Datas"><strong>Type :</strong> ${item.type}</p>
        <p class="Datas"><strong>Valeur :</strong> ${item.value || "Aucune valeur"}</p>
      `;
    } else if (type === "skills") {
      html += `
        <h3 class="Datas">${item.name}</h3>
        <p class="Datas"><strong>Effet :</strong> ${item.effect || "Aucun"}</p>
        <p class="Datas"><strong>Rareté :</strong> ${item.rarity}</p>
      `;
    }
  
    html += `</div>`;
  });
  
  return html;
}
