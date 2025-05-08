function encryptStreamUrl(url) {
    // إضافة رأس عشوائي (8 بايت)
    let header = "";
    for (let i = 0; i < 8; i++) {
        header += String.fromCharCode(Math.floor(Math.random() * 26) + 65);
    }
    
    // تشفير الرابط باستخدام XOR
    let encrypted = header;
    for (let i = 0; i < url.length; i++) {
        const keyChar = encryptionKey.charCodeAt(i % encryptionKey.length);
        const urlChar = url.charCodeAt(i);
        encrypted += String.fromCharCode(urlChar ^ keyChar);
    }
    
    // تشفير النتيجة باستخدام Base64
    return btoa(encrypted);
}
