// Variables //
let employees = [];
const apiUrl = 'https://randomuser.me/api/?results=12&inc=name,picture,email,location,phone,dob&noinfo&nat=US';
const container = document.querySelector('.grid');
const overlay = document.querySelector('.bg-modal');
const modalContainer = document.querySelector('.modal-content');
const modalClose = document.querySelector('.modal-close');


// fetch employee information from API //
fetch(apiUrl)
  .then(res => res.json())
  .then(res => res.results)
  .then(displayEmployees)
  .catch(err => console.log(err))
  

// Function to display basic employee info
  function displayEmployees(employeeInfo) {
        employees = employeeInfo;
        let employeeHTML = "";
            employees.forEach((employee, index) => {
            let picture = employee.picture;
            let name = employee.name;
            let email = employee.email;
            let city = employee.location.city;
            
        employeeHTML += `
            <div class="card" data-index="${index}">
                <img class="avatar" src="${picture.large}">
                <div class="user-info">
                    <h2 class="name">${name.first} ${name.last}</h2>
                    <p class="email">${email}</p>
                    <p class="address">${city}</p>
                </div>
            </div>
      `
    });
        container.innerHTML = employeeHTML;
  };
  
 

  // Event listener to open modal//

container.addEventListener('click', e => {

  if (e.target !== container) {
    const card = e.target.closest(".card");
    const index = card.getAttribute('data-index');
    overlay.style.display = 'flex';
    displayModal(index);
  }
});

// Event listener to close modal //

document.addEventListener('click', (e) => {
  if (e.target.className == 'overlay' || e.target.className == 'modal-close') {
    overlay.classList.add('hidden');
    overlay.style.display = 'none';
  }
});

document.addEventListener('keydown', (e) =>{
  if (e.key === "Escape") {
    overlay.classList.add('hidden')
    overlay.style.display = 'none';
  }
});
  

 //Function to display extra info in a modal //
 function displayModal(index) {
  let {name, dob, phone, email, location: { city, street, state, postcode}, picture} = employees[index];

  let date = new Date(dob.date);

  const modalHTML = `
  <span class="modal-close">+</span>
  <img class="avatar-modal" src="${picture.large}" alt=""/>
  <div class="modal-info">
    <h2 class="name-modal"> ${name.first} ${name.last}</h2>
    <p class="email-modal">${email}</p>
    <p class="address-modal-city">${city}</p>
    
    <p class="tel">${phone}</p>
    <p class="address-modal">${street}, ${state} ${postcode}</p>
    <p class="birthday">Birthday:
    ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
  </div>
  `;

  overlay.classList.remove('hidden');
  modalContainer.innerHTML = modalHTML;
}
 