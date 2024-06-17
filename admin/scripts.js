function showCreateForm() {
    document.getElementById('form-title').innerText = 'Create New Plan';
    document.getElementById('crud-form').reset();
    document.getElementById('plan-id').value = '';
    document.getElementById('plan-image').required = true; // Require image only for creating new plans
    document.getElementById('plan-form').style.display = 'block';
}

function showEditForm(planId) {
    document.getElementById('form-title').innerText = 'Edit Plan';
    var plan = document.getElementById(planId);
    document.getElementById('plan-id').value = planId;
    document.getElementById('plan-title').value = plan.querySelector('.plan-title h4').innerText;
    document.getElementById('plan-price').value = plan.querySelector('.plan-price h4').innerText.replace('$', '');
    document.getElementById('plan-description').value = plan.querySelector('.plan-description').innerText.trim().replace(/\n/g, '\n');
    document.getElementById('plan-image').required = false; // Image is optional when editing
    document.getElementById('plan-form').style.display = 'block';
}

function hideForm() {
    document.getElementById('plan-form').style.display = 'none';
}

function deletePlan(planId) {
    document.getElementById(planId).remove();
}

document.getElementById('crud-form').addEventListener('submit', function(e) {
    e.preventDefault();
    var planId = document.getElementById('plan-id').value;
    var title = document.getElementById('plan-title').value;
    var price = document.getElementById('plan-price').value;
    var description = document.getElementById('plan-description').value;
    var imageInput = document.getElementById('plan-image');
    var imageFile = imageInput.files[0];

    var updatePlan = function(imageUrl) {
        if (planId) {
            var plan = document.getElementById(planId);
            plan.querySelector('.plan-title h4').innerText = title;
            plan.querySelector('.plan-price h4').innerText = '$' + price;
            plan.querySelector('.plan-description').innerHTML = description.replace(/\n/g, '<br>');
            if (imageUrl) {
                plan.querySelector('.plan-image img').src = imageUrl;
            }
        } else {
            var newPlanId = 'plan-' + (new Date()).getTime();
            var newPlan = `
                <div class="col-12 col-md-6 col-lg-4" id="${newPlanId}">
                    <div class="single-price-plan text-center">
                        <div class="plan-image">
                            <img src="${imageUrl}" alt="${title} Image">
                        </div>
                        <div class="plan-title">
                            <h4>${title}</h4>
                            <p>Custom description</p>
                        </div>
                        <div class="plan-price">
                            <h4>$${price}</h4>
                            <p>Per Session</p>
                        </div>
                        <div class="plan-description">
                            ${description.replace(/\n/g, '<br>')}
                        </div>
                        <div class="plan-button">
                            <button class="btn btn-warning" onclick="showEditForm('${newPlanId}')">Edit</button>
                            <button class="btn btn-danger" onclick="deletePlan('${newPlanId}')">Delete</button>
                        </div>
                    </div>
                </div>
            `;
            document.getElementById('plans-container').insertAdjacentHTML('beforeend', newPlan);
        }
        hideForm();
    };

    if (imageFile) {
        var reader = new FileReader();
        reader.onload = function(e) {
            var imageUrl = e.target.result;
            updatePlan(imageUrl);
        };
        reader.readAsDataURL(imageFile);
    } else {
        updatePlan(null);
    }
});


