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
        <p class="Datas"><strong>Description :</strong> ${item.description || "Aucune description"}</p>
        <p class="Datas"><strong>Rareté :</strong> ${item.rarity}</p>
        <p class="Datas"><strong>Utilisable en combat :</strong> ${item.combat ? "Oui" : "Non"}</p>
        <p class="Datas"><strong>Max :</strong> ${item.carryLimit}</p>
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
          <h3 class="ArmorSets">${item.name} (Rang : ${item.rank})</h3>
          ${item.bonus ? `<p class="ArmorSets"><strong>Bonus de set :</strong> ${item.bonus}</p>` : ""}
          <div class="ArmorSets">
            <strong>Pièces d'armure :</strong>
            <ul class="armor-list">
      `;
    
      item.pieces.forEach(piece => {
        const image = piece.assets?.imageMale || piece.assets?.imageFemale || "";
        const resistances = piece.resistances;
        const skills = piece.skills?.map(s => `${s.skillName} (niv. ${s.level})`).join(", ") || "Aucune";
    
        html += `
          <li class="ArmorSets armor-piece">
            <p><strong>Nom :</strong> ${piece.name}</p>
            <p><strong>Type :</strong> ${piece.type}</p>
            <p><strong>Défense :</strong> Base ${piece.defense.base}, Max ${piece.defense.max}, Augmentée ${piece.defense.augmented}</p>
            <p><strong>Résistances :</strong> Feu ${resistances.fire}, Eau ${resistances.water}, Glace ${resistances.ice}, Foudre ${resistances.thunder}, Dragon ${resistances.dragon}</p>
            <p><strong>Compétences :</strong> ${skills}</p>
            ${image ? `<img src="${image}" alt="${piece.name}" class="armor-image">` : ""}
          </li>
        `;
      });
    
      html += `
            </ul>
          </div>
        </div>
      `;
    } else if (type === "decorations") {
      html += `
        <h3 class="Datas">${item.name}</h3>
        <p class="Datas"><strong>Rarity :</strong> ${item.rarity}</p>
        <p class="Datas"><strong>Effet :</strong> ${item.skills[0].description || "Aucun"}</p>
      `;
    } else if (type === "events") {
      html += `
        <h3 class="Datas">${item.name}</h3>
        <p class="Datas"><strong>Date début:</strong> ${item.startTimestamp} <strong>Date fin:</strong>${item.endTimestamp}</p>
        <p class="Datas"><strong>Description :</strong> ${item.description || "Aucune"}</p>
        <p class="Datas"><strong>requirements :</strong> ${item.requirements}</p>
        <p class="Datas"><strong>successConditions :</strong> ${item.successConditions}</p>


      `;
    } else if (type === "charms") {
      html += `
        <h3 class="Datas">${item.name}</h3>
        <p class="Datas"><strong>Effet :</strong> ${item.ranks[0].rarity} <strong>name : </strong>${item.ranks[0].name} <strong>skill : </strong>${item.ranks[0].skills[0].description}</p>
        <p class="Datas"><strong>Effet :</strong> ${item.ranks[1].rarity} <strong>name : </strong>${item.ranks[1].name} <strong>skill : </strong>${item.ranks[1].skills[0].description}</p>
        <p class="Datas"><strong>Effet :</strong> ${item.ranks[2].rarity} <strong>name : </strong>${item.ranks[2].name} <strong>skill : </strong>${item.ranks[2].skills[0].description}</p>
      `;
    } else if (type === "locations") {
      html += `
        <h3 class="Datas">${item.name}</h3>

      `;
    } else if (type === "motion-values") {
      html += `
        <h3 class="Datas">${item.name}</h3>
        <p class="Datas"><strong>weaponType</strong> ${item.weaponType}</p>
      `;
    } else if (type === "skills") {
      html += `
        <h3 class="Datas">${item.name}</h3>
        <p class="Datas"><strong>description</strong> ${item.description || "Aucun"}</p>
        <p class="Datas"><strong>skill : </strong>${item.ranks[0].description}</p>
      `;
    }
  
    html += `</div>`;
  });
  
  return html;
}
