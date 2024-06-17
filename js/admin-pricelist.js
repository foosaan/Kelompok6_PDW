const plansList = document.getElementById('plans-list');
const planForm = document.getElementById('plan-form');

let plans = [];

function renderPlans() {
    plansList.innerHTML = '';
    plans.forEach((plan, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${plan.title}</td>
            <td>${plan.description}</td>
            <td>${plan.price}</td>
            <td>${plan.duration}</td>
            <td>${plan.images}</td>
            <td>${plan.locations}</td>
            <td>
                <button onclick="editPlan(${index})">Edit</button>
                <button onclick="deletePlan(${index})">Delete</button>
            </td>
        `;
        plansList.appendChild(row);
    });
}

function addPlan(plan) {
    plans.push(plan);
    renderPlans();
}

function updatePlan(index, updatedPlan) {
    plans[index] = updatedPlan;
    renderPlans();
}

function deletePlan(index) {
    plans.splice(index, 1);
    renderPlans();
}

function editPlan(index) {
    const plan = plans[index];
    planForm['title'].value = plan.title;
    planForm['description'].value = plan.description;
    planForm['price'].value = plan.price;
    planForm['duration'].value = plan.duration;
    planForm['images'].value = plan.images;
    planForm['locations'].value = plan.locations;
    planForm['index'].value = index;
}

planForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(planForm);
    const plan = {
        title: formData.get('title'),
        description: formData.get('description'),
        price: formData.get('price'),
        duration: formData.get('duration'),
        images: formData.get('images'),
        locations: formData.get('locations')
    };
    const index = formData.get('index');
    if (index) {
        updatePlan(index, plan);
    } else {
        addPlan(plan);
    }
    planForm.reset();
});

renderPlans();
