let currentRequestId = 1; 
const requestContainer = document.getElementById('request-container');

function showAlert(message) {
    const alertBox = document.createElement('div');
    alertBox.textContent = message;
    alertBox.style.position = 'fixed';
    alertBox.style.top = '20px';
    alertBox.style.right = '20px';
    alertBox.style.backgroundColor = '#f44336';
    alertBox.style.color = 'white';
    alertBox.style.padding = '15px';
    alertBox.style.borderRadius = '5px';
    alertBox.style.zIndex = '1000';
    document.body.appendChild(alertBox);
    
    setTimeout(() => {
        alertBox.style.opacity = '0';
        setTimeout(() => {
            alertBox.remove();
        }, 1000);
    }, 3000);
}

function removeRequest(id) {
    const element = document.getElementById(`request-${id}`);
    if (element) {
        element.remove();
        showAlert(`Заявка с ID ${id} удалена.`);
    } else {
        showAlert("Заявка не найдена");
    }
}

document.getElementById("submit-request").addEventListener("click", function() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const service = document.getElementById("service").value;

    if (name && email && phone && service) {
        const requestDiv = document.createElement('div');
        requestDiv.id = `request-${currentRequestId}`;
        requestDiv.className = 'request';
        requestDiv.innerHTML = `
            <p><strong>ID:</strong> ${currentRequestId} <strong>Имя:</strong> ${name}, <strong>Email:</strong> ${email}, <strong>Телефон:</strong> ${phone}, <strong>Услуга:</strong> ${service} 
            <button onclick="removeRequest(${currentRequestId})" class="delete-button">Удалить</button></p>
        `;

        requestContainer.appendChild(requestDiv);
        document.getElementById("name").value = ""; 
        document.getElementById("email").value = ""; 
        document.getElementById("phone").value = ""; 
        document.getElementById("service").value = ""; 
        currentRequestId++; 
    } else {
        showAlert("Пожалуйста, заполните все поля заявки.");
    }
});

document.getElementById("remove-request").addEventListener("click", function() {
    const idToRemove = document.getElementById("request-id").value;
    if (idToRemove) {
        removeRequest(idToRemove);
        document.getElementById("request-id").value = ""; 
    } else {
        showAlert("Пожалуйста, введите ID заявки для удаления.");
    }
});

function createNestedList(obj) {
    const ul = document.createElement('ul');
    
    for (const key in obj) {
        const li = document.createElement('li');
        li.textContent = key;

        if (typeof obj[key] === 'object' && obj[key] !== null) {
            li.appendChild(createNestedList(obj[key]));
        } else {
            li.textContent += `: ${obj[key]}`;
        }

        ul.appendChild(li);
    }
    
    return ul;
}

const exampleData = {
    Услуги: {
        Номера: 'Двухместный, Одноместный',
        Услуги: 'Питание, Уборка, Трансфер',
    },
    Контакты: {
        Телефон: '+375 29 123-45-67',
        Email: 'info@berezka.com',
    },
};

document.addEventListener('DOMContentLoaded', () => {
    showAlert("Добро пожаловать в гостиницу Volkovysk Hotel 'Berezka'!");

    const nestedList = createNestedList(exampleData);
    document.getElementById('nested-list-container').appendChild(nestedList);

    document.getElementById("show-notification").addEventListener("click", function() {
        const notification = document.getElementById("notification");
        notification.style.display = "block"; 
    });

    document.getElementById("close-notification").addEventListener("click", function() {
        const notification = document.getElementById("notification");
        notification.style.display = "none"; 
    });
});
