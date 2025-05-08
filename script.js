// نظام حماية الروابط من السرقة
(function() {
    // المتغيرات العامة
    const securityAlert = document.getElementById('securityAlert');
    const refreshBtn = document.getElementById('refreshBtn');
    let securityCheckInterval;
    let isSecurityCompromised = false;
    
    // إعادة تحميل الصفحة عند النقر على زر التحديث
    refreshBtn.addEventListener('click', function() {
        window.location.reload();
    });
    
    // ===== الكشف عن VPN وأدوات التحليل =====
    
    // 1. فحص الاتصال بالإنترنت للكشف عن VPN
    async function checkForVPN() {
        try {
            // قياس وقت الاستجابة للكشف عن VPN
            const startTime = performance.now();
            const response = await fetch('https://www.google.com/favicon.ico', {
                mode: 'no-cors',
                cache: 'no-store'
            });
            const endTime = performance.now();
            
            // إذا كان وقت الاستجابة طويلاً جداً، فقد يكون VPN
            const responseTime = endTime - startTime;
            if (responseTime > 500) {
                return true; // احتمال وجود VPN
            }
            
            return false;
        } catch (error) {
            console.error('خطأ في فحص الاتصال:', error);
            return false;
        }
    }
    
    // 2. الكشف عن أدوات التحليل مثل HttpCanary
    function checkForDebuggingTools() {
        // التحقق من وجود أدوات التطوير المفتوحة
        const devToolsOpen = /Chrome\//.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor) && window.outerWidth - window.innerWidth > 100 || window.outerHeight - window.innerHeight > 100;
        
        // التحقق من وجود أدوات تحليل الشبكة
        const hasProxy = 'serviceWorker' in navigator && navigator.serviceWorker.controller !== null;
        
        // التحقق من تعديل الـ User-Agent
        const suspiciousUserAgent = /Fiddler|Charles|Burp|Canary|Packet|Wireshark|Proxy|VPN/i.test(navigator.userAgent);
        
        return devToolsOpen || hasProxy || suspiciousUserAgent;
    }
    
    // 3. الكشف عن تعديل الـ WebRTC (يستخدم غالباً مع VPN)
    async function checkWebRTC() {
        try {
            // محاولة الحصول على عنوان IP الحقيقي
            const pc = new RTCPeerConnection({
                iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
            });
            
            pc.createDataChannel("");
            await pc.createOffer().then(offer => pc.setLocalDescription(offer));
            
            return new Promise(resolve => {
                let hasLocalIP = false;
                
                pc.onicecandidate = (ice) => {
                    if (!ice || !ice.candidate || !ice.candidate.candidate) {
                        pc.close();
                        resolve(hasLocalIP);
                        return;
                    }
                    
                    // التحقق من وجود عنوان IP محلي
                    const candidateString = ice.candidate.candidate;
                    const ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3})/;
                    const ipMatch = ipRegex.exec(candidateString);
                    
                    if (ipMatch) {
                        const ip = ipMatch[1];
                        // التحقق مما إذا كان عنوان IP محلي
                        if (ip.startsWith('192.168.') || ip.startsWith('10.') || ip.startsWith('172.')) {
                            hasLocalIP = true;
                        }
                    }
                };
                
                // إغلاق الاتصال بعد 1 ثانية إذا لم يتم العثور على عنوان IP
                setTimeout(() => {
                    pc.close();
                    resolve(hasLocalIP);
                }, 1000);
            });
        } catch (error) {
            console.error('خطأ في فحص WebRTC:', error);
            return false;
        }
    }
    
    // 4. فحص الأمان الشامل
    async function runSecurityCheck() {
        const vpnDetected = await checkForVPN();
        const debuggingToolsDetected = checkForDebuggingTools();
        const webRTCModified = await checkWebRTC();
        
        // إذا تم اكتشاف أي من هذه الأدوات، أظهر تحذير الأمان
        if (vpnDetected || debuggingToolsDetected || webRTCModified) {
            isSecurityCompromised = true;
            securityAlert.style.display = 'flex';
            return true;
        }
        
        return false;
    }
    
    // 5. منع استخراج الروابط من خلال وحدة التحكم
    function preventConsoleInspection() {
        // إعادة تعريف console.log لمنع استخراج المعلومات
        const originalLog = console.log;
        console.log = function() {
            const args = Array.from(arguments);
            // منع تسجيل أي شيء يحتوي على روابط
            if (args.some(arg => typeof arg === 'string' && (arg.includes('http') || arg.includes('m3u8')))) {
                console.error('تم منع هذه العملية لأسباب أمنية');
                return;
            }
            originalLog.apply(console, arguments);
        };
        
        // منع استخدام أدوات المطور
        document.addEventListener('keydown', function(e) {
            // منع F12 وCtrl+Shift+I وCtrl+Shift+J
            if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j'))) {
                e.preventDefault();
                alert('تم تعطيل أدوات المطور لأسباب أمنية');
            }
        });
    }
    
    // 6. تشغيل فحص الأمان بشكل دوري
    function startSecurityMonitoring() {
        // فحص أولي
        runSecurityCheck();
        
        // فحص دوري كل 10 ثوانٍ
        securityCheckInterval = setInterval(async () => {
            await runSecurityCheck();
        }, 10000);
    }
    
    // تهيئة نظام الأمان
    function initSecurity() {
        preventConsoleInspection();
        startSecurityMonitoring();
    }
    
    // بدء تشغيل نظام الأمان
    initSecurity();
    
    // تصدير المتغيرات والدوال للاستخدام في ملفات أخرى
    window.securitySystem = {
        isCompromised: () => isSecurityCompromised,
        checkSecurity: runSecurityCheck
    };
})();

// إشعار التليجرام
function joinTelegram() {
    const btn = document.querySelector('.primary');
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري التوجيه...';
    
    setTimeout(function() {
        window.open('https://t.me/Hamada_tv1', '_blank');
        closeAlert();
    }, 500);
}

function closeAlert() {
    const alert = document.getElementById('alert');
    alert.style.opacity = '0';
    setTimeout(function() {
        alert.style.display = 'none';
    }, 300);
}

// إظهار إشعار التليجرام بعد تحميل الصفحة
window.addEventListener('load', function() {
    setTimeout(function() {
        document.getElementById('alert').style.display = 'flex';
    }, 1000);
});
