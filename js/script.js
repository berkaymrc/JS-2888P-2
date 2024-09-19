async function getUser() {
  const spinner = document.getElementById('spinner');
  const errorMessage = document.getElementById('error-message');
  const container = document.querySelector(".container");

  try {
      
      spinner.style.display = 'block';

      
      const response = await fetch("https://jsonplaceholder.typicode.com/users");

      
      if (!response.ok) {
          throw new Error('Veri alınamadı');
      }

      
      const data = await response.json();

      
      spinner.style.display = 'none';

     
      data.forEach((user) => {
          createCards(user);
      });
  } catch (error) {
      
      spinner.style.display = 'none';
      errorMessage.textContent = `Veriler alınırken bir hata oluştu: ${error.message}`;
  }
}

function createCards(user) {
  const container = document.querySelector(".container");
  
  container.innerHTML += `
    <div class="card col-12 col-lg-6">
       <div class="userContent">
        <h4><span class="pe-4 text-danger">ID: ${user.id}</span>${user.name}</h4>
       </div>
        <div class="buttonContainer">
          <button class="addressBtn" onclick="showBtn(${user.id}, 'address')"><i class="fa-solid fa-map-location-dot"></i></button>
          <button class="companyBtn" onclick="showBtn(${user.id}, 'company')"><i class="fa-solid fa-globe"></i></button>
          <button class="contactBtn" onclick="showBtn(${user.id}, 'contact')"><i class="fa-regular fa-id-card"></i></button>
          <button onclick="openPrompt()"><i class="fa-solid fa-comments"></i></button>
        </div>
        <div class="content row">
          <div class="address display">
            Street: ${user.address.street}<br>
            Suite: ${user.address.suite}<br>
            City: ${user.address.city}<br>
            Zipcode: ${user.address.zipcode}<br>
            Geo: Lat: ${user.address.geo.lat}, Lng: ${user.address.geo.lng}
          </div>
          <div class="company display">
            Name: ${user.company.name}<br>
            CatchPhrase: ${user.company.catchPhrase}<br>
            Bs: ${user.company.bs}<br>
          </div>
          <div class="contact display">
            E-mail: ${user.email}<br>
            Phone: ${user.phone}<br>
            Website: ${user.website}<br>
          </div>
        </div>
    </div>`;
}

function showBtn(id, type) {
  const types = ["address", "company", "contact"];

  if (types.includes(type)) {
    
    types.forEach(t => {
      const elements = document.querySelectorAll(`.${t}`);
      const buttons = document.querySelectorAll(`.${t}Btn`);
      
      elements.forEach(el => {
        el.classList.remove("show");
        el.classList.add("display");
      });
      
      buttons.forEach(btn => btn.classList.remove("clickActive"));
    });

    
    const element = document.querySelectorAll(`.${type}`)[id - 1];
    const button = document.querySelectorAll(`.${type}Btn`)[id - 1];

    if (element) {
      element.classList.add("show");
      element.classList.remove("display");
      button.classList.add("clickActive");
    }
  }
}



function openPrompt() {
  const userId = prompt("Lütfen 1 ile 10 arasında bir kullanıcı ID'si girin:");
  if (!isNaN(userId) && userId >= 1 && userId <= 10) {
      window.location.href = `post.html?userId=${userId}`;
  } else {
      alert("Geçersiz kullanıcı ID'si! Lütfen 1 ile 10 arasında bir ID girin.");
  }
}


getUser();
