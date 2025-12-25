/***************** GLOBAL *****************/
function getUser() {
  return JSON.parse(localStorage.getItem("linkmeUser"));
}

function logout() {
  localStorage.removeItem("linkmeUser");
  alert("Logged out!");
  location.reload();
}

function showSection(id) {
  document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

/***************** MARKETPLACE *****************/
function loadMarketplace() {
  const items = JSON.parse(localStorage.getItem("linkmeItems")) || [];
  const container = document.getElementById("marketItems");
  container.innerHTML = "";
  items.filter(i => i.approved).forEach(i => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <b>${i.title}</b> (${i.type})<br>Price: ${i.price} ETB
      <button onclick="previewItem('${i.title}', '${i.type}', '${i.price}')">Preview</button>
    `;
    container.appendChild(div);
  });
}

/***************** WORKERS *****************/
function loadWorkers() {
  const workers = JSON.parse(localStorage.getItem("linkmeWorkers")) || [];
  const container = document.getElementById("workerList");
  container.innerHTML = "";
  workers.forEach(w => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <b>${w.profession}</b><br>${w.name}
      <button onclick="previewWorker('${w.name}', '${w.profession}', '${w.skills}', '${w.phone}')">Preview</button>
    `;
    container.appendChild(div);
  });
}

function filterWorkers() {
  const q = document.getElementById("workerSearch").value.toLowerCase();
  document.querySelectorAll("#workerList .card").forEach(card => {
    card.style.display = card.innerText.toLowerCase().includes(q) ? "block" : "none";
  });
}

/***************** MODAL *****************/
function previewWorker(name, profession, skills, phone) {
  const modal = document.getElementById("modal");
  document.getElementById("modalBody").innerHTML = `
    <h3>${name}</h3>
    <p>Profession: ${profession}</p>
    <p>Skills: ${skills}</p>
    <p>Contact: ${phone}</p>
  `;
  modal.style.display = "block";
}

function previewItem(title, type, price) {
  const modal = document.getElementById("modal");
  document.getElementById("modalBody").innerHTML = `
    <h3>${title}</h3>
    <p>Type: ${type}</p>
    <p>Price: ${price} ETB</p>
  `;
  modal.style.display = "block";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

/***************** ORDERS *****************/
function loadOrders() {
  const user = getUser();
  const container = document.getElementById("orderHistory");
  container.innerHTML = "";
  if(!user) return;
  const orders = JSON.parse(localStorage.getItem("linkmeOrders")) || [];
  orders.filter(o => o.customerEmail === user.email)
        .forEach(o => {
          const div = document.createElement("div");
          div.className = "card";
          div.innerHTML = `
            <b>${o.date}</b><br>
            ${o.items.map(i => `${i.name} - ${i.price} ETB`).join("<br>")}
          `;
          container.appendChild(div);
        });
}
