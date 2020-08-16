//buat notif
if ("Notification" in window) {
requestPermission();
} 
else {
    console.error("Browser tidak mendukung notifikasi.");
}

// request permissio di awal
function requestPermission() {
Notification.requestPermission().then(function (result) {
    if (result === "denied") {
    console.log("Fitur notifikasi tidak diijinkan.");
    return;
    } else if (result === "default") {
    console.error("Pengguna menutup kotak dialog permintaan ijin.");
    return;
    }
    
    console.log("Fitur notifikasi diijinkan.");
});
}

// fungsi notifikasi untuk subscribe
function subscribePushNotifikasi() {
if (Notification.permission === 'granted') {
    if (('PushManager' in window)) {
    navigator.serviceWorker.getRegistration().then(function(registration) {
        registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array("BJ_fSZ-qRkE-SzFWZ_ZPSC1dzFsSxF4v7R15JWuMmswHxkhtJGG30_WRtkqaTiPmUUfhDlV6xdDtP4LN5t8YqV4")
        }).then(function(subscribe) {
            console.log('Berhasil melakukan subscribe dengan endpoint: ', subscribe.endpoint);
            console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(
                null, new Uint8Array(subscribe.getKey('p256dh')))));
            console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(
                null, new Uint8Array(subscribe.getKey('auth')))));
        }).catch(function(e) {
            console.error('Tidak dapat melakukan subscribe ', e.message);
        });
    });
    }
} 
else {
    console.error('FItur notifikasi tidak diijinkan.');
}
}

//mengubah key ke 8bit
function urlBase64ToUint8Array(base64String) {
const padding = '='.repeat((4 - base64String.length % 4) % 4);
const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');
const rawData = window.atob(base64);
const outputArray = new Uint8Array(rawData.length);
for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
}
return outputArray;
}

subscribePushNotifikasi();