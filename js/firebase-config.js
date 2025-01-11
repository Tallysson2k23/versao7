// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBPah1p3IHaKApNWfIVRR0OKPCazayUYRU",
    authDomain: "versao7.firebaseapp.com",
    projectId: "versao7",
    storageBucket: "versao7.firebasestorage.app",
    messagingSenderId: "881427416866",
    appId: "1:881427416866:web:f74fef26907cdaa00c477b",
    measurementId: "G-GENXF66MY8"
};

// Inicializar Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.database();
