const vehicleTypeElement = document.getElementById('vehicleType');
const vehicleNameElement = document.getElementById('vehicleName');

const vehicles = {
    Carro: ["estrada1", "estrada2", "estrada3"],
    Moto: ["moto1", "moto2"]
};

// Atualizar veículos disponíveis ao selecionar o tipo
vehicleTypeElement.addEventListener('change', function () {
    const selectedType = this.value;

    // Limpar lista de veículos
    vehicleNameElement.innerHTML = '<option value="">Selecione o veículo</option>';

    // Preencher lista com veículos disponíveis
    if (vehicles[selectedType]) {
        vehicles[selectedType].forEach(vehicle => {
            const option = document.createElement('option');
            option.value = vehicle;
            option.textContent = vehicle;
            vehicleNameElement.appendChild(option);
        });
    }
});

// Função para atualizar a disponibilidade do veículo no Firebase
function atualizarDisponibilidade(tipoVeiculo, nomeVeiculo) {
    const db = firebase.database();
    const veiculosRef = db.ref(`veiculos/${tipoVeiculo}/${nomeVeiculo}`);

    // Atualizar a disponibilidade para "false"
    veiculosRef.update({
        disponibilidade: false
    });
}

// Formulário de envio
document.getElementById('vehicleForm').addEventListener('submit', function (e) {
    e.preventDefault();

    
    // Obter valores do formulário
    const vehicleType = vehicleTypeElement.value;
    const vehicleName = vehicleNameElement.value;
    const driver = document.getElementById('driver').value;

    // Validar campos
    if (!vehicleType || !vehicleName || !driver) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    // Dados a serem enviados
    const reservationData = {
        tipoDeVeiculo: vehicleType,
        veiculo: vehicleName,
        equipe: driver,
        dataHora: new Date().toISOString()
    };

    // Enviar para o Firebase
    firebase.database().ref('reservas').push(reservationData)
        .then(() => {
            // Atualizar a disponibilidade do veículo no Firebase
            atualizarDisponibilidade(vehicleType, vehicleName);

            // Mostrar mensagem de sucesso
            const confirmationDiv = document.getElementById('confirmation');
            confirmationDiv.style.display = 'block';
            confirmationDiv.textContent = `O veículo ${vehicleName} com a ${driver} do tipo ${vehicleType} foi reservado com sucesso!`;

            // Resetar formulário
            document.getElementById('vehicleForm').reset();
            vehicleNameElement.innerHTML = '<option value="">Selecione o veículo</option>';
        })
        .catch(error => {
            alert('Erro ao reservar veículo: ' + error.message);
        });
});
