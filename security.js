// نظام حماية وتشغيل البث المباشر - Hamada TV
(function() {
    // ===== المتغيرات العامة =====
    const video = document.getElementById('player');
    const securityAlert = document.getElementById('securityAlert');
    const refreshBtn = document.getElementById('refreshBtn');
    let hls;
    let player;
    let securityCheckInterval;
    let securityCompromised = false;
    let securityChecksCount = 0;
    let falsePositiveThreshold = 3; // عدد الفحوصات قبل إظهار التنبيه
    
    // ===== تهيئة المشغل =====
    if (video) {
        player = new Plyr(video, {
            controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'],
            i18n: {
                play: 'تشغيل',
                pause: 'إيقاف',
                mute: 'كتم الصوت',
                unmute: 'تشغيل الصوت'
            }
        });
    }
    
    // ===== قائمة الروابط المحمية =====
    // استخدام Base64 لإخفاء الروابط بشكل بسيط
    const streamLinks = {
        // القناة 1
        s1_4k: "aHR0cHM6Ly9obHMtY2RuLW1lamFyc2VydmVyLnRpZ2FuLnByby9zdmMtc3BvLWZoZC0wOC1kdC9wbGF5bGlzdC5tM3U4",
        s1_fhd: "aHR0cDovL2Nkbnl2aW5lLmNvbTo4MDgwL2JuMWhkL3RyYWNrcy12MWExL21vbm8ubTN1OA==",
        s1_sd: "aHR0cDovL3ZpcC5zaWJmdW5nb2xkLm5ldDo4MDgwL2xpdmUvaGZta2VsaWJpYUAvN1oyckYyZXZXS3ZuUEVLWVhWcmo1aFZQLzMyNDQubTN1OA==",
        s1_audio: "aHR0cDovL3N0cmVhbS5teXR2cGx1cy5uZXQ6NzAwMi9zcG9ydC9jaDEvYWRhcHRpdmUubTN1OA==",
        
        // القناة 2
        s2_fhd1: "aHR0cHM6Ly9zdHJlYW0uZ3VtbGV0LmlvLzY4MWEyY2VlOWJmYjFhMTgxNWI4MDg3MC82ODFhMmQwNTA3MGQ4ZjAyMjEwN2UxMWIvbWFpbi5tM3U4",
        s2_fhd2: "aHR0cDovL2Nkbnl2aW5lLmNvbTo4MDgwL2JuMWhkL3RyYWNrcy12MWExL21vbm8ubTN1OA==",
        s2_hd: "aHR0cDovL3ZpcC5zaWJmdW5nb2xkLm5ldDo4MDgwL2xpdmUvaGZta2VsaWJpYUAvN1oyckYyZXZXS3ZuUEVLWVhWcmo1aFZQLzIubTN1OA==",
        s2_audio: "aHR0cDovL3N0cmVhbS5teXR2cGx1cy5uZXQ6NzAwMy9zcG9ydC9jaDIvYWRhcHRpdmUubTN1OA==",
        
        // القناة 3
        s3_fhd: "aHR0cDovL2JsdWVkay54eXo6ODg4MC9saXZlL1Jvc21hcmkvdzFvT0xlTnZzNS8xMjU1NTcubTN1OA==",
        s3_server2: "aHR0cDovLzEzNi4yNDMuMTU1LjU1OjgwODgvQmVpbjMvdHJhY2tzLXYxYTEvbW9uby5tM3U4",
        s3_server3: "aHR0cDovL3ZpcC5zaWJmdW5nb2xkLm5ldDo4MDgwL2xpdmUvaGZta2VsaWJpYUAvN1oyckYyZXZXS3ZuUEVLWVhWcmo1aFZQLzMubTN1OA==",
        s3_audio: "aHR0cDovL3N0cmVhbS5teXR2cGx1cy5uZXQ6NzAwNC9zcG9ydC9jaDMvYWRhcHRpdmUubTN1OA==",
        
        // القناة 4
        s4_4k: "aHR0cHM6Ly9obHMtY2RuLW1lamFyc2VydmVyLnRpZ2FuLnByby9zdmMtc3BvLWZoZC0wOC1kdC9wbGF5bGlzdC5tM3U4",
        s4_fhd: "aHR0cDovL2Nkbnl2aW5lLmNvbTo4MDgwL2JuNGhkL3RyYWNrcy12MWExL21vbm8ubTN1OA==",
        s4_hd: "aHR0cDovL3ZpcC5zaWJmdW5nb2xkLm5ldDo4MDgwL2xpdmUvaGZta2VsaWJpYUAvN1oyckYyZXZXS3ZuUEVLWVhWcmo1aFZQLzQubTN1OA==",
        s4_sd: "aHR0cDovL3N0cmVhbS5teXR2cGx1cy5uZXQ6NzAwNS9zcG9ydC9jaDQvYWRhcHRpdmUubTN1OA=="
    };
    
    // ===== وظائف فك التشفير وتشغيل البث =====
    
    // فك تشفير الروابط
    function decodeStreamUrl(encodedUrl) {
        try {
            if (!encodedUrl) return "";
            return atob(encodedUrl);
        } catch (error) {
            console.error("خطأ في فك تشفير الرابط");
            return "";
        }
    }
    
    // تشغيل البث
    function playStream(streamId) {
        // التحقق من وجود الرابط
        if (!streamLinks[streamId]) {
            alert("هذا السيرفر غير متاح حالياً");
            return;
        }
        
        // التحقق من حالة الأمان (فقط إذا تم تأكيد وجود مشكلة أمنية)
        if (securityCompromised) {
            securityAlert.style.display = 'flex';
            return;
        }
        
        // تحديث واجهة المستخدم
        document.querySelectorAll('.server-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-id') === streamId) {
                btn.classList.add('active');
                // إضافة مؤشر التحميل
                const loadingSpan = document.createElement('span');
                loadingSpan.className = 'loading';
                btn.appendChild(loadingSpan);
            }
        });
        
        // الحصول على رابط البث
        const url = decodeStreamUrl(streamLinks[streamId]);
        
        // تدمير مثيل HLS السابق إذا كان موجوداً
        if (hls) {
            hls.destroy();
        }
        
        // تحميل البث الجديد
        if (Hls.isSupported()) {
            hls = new Hls({
                maxBufferLength: 30,
                maxMaxBufferLength: 60,
                xhrSetup: function(xhr) {
                    // إضافة رأس عشوائي لمنع التتبع
                    xhr.setRequestHeader('X-Client-ID', generateRandomId());
                    xhr.setRequestHeader('Referer', window.location.href);
                }
            });
            
            hls.loadSource(url);
            hls.attachMedia(video);
            
            hls.on(Hls.Events.MANIFEST_PARSED, function() {
                video.play().catch(e => console.log("تم منع التشغيل التلقائي:", e));
                
                // إزالة مؤشر التحميل
                document.querySelectorAll('.server-btn').forEach(btn => {
                    if (btn.getAttribute('data-id') === streamId) {
                        const loadingSpan = btn.querySelector('.loading');
                        if (loadingSpan) btn.removeChild(loadingSpan);
                    }
                });
            });
            
            // معالجة الأخطاء
            hls.on(Hls.Events.ERROR, function(event, data) {
                if (data.fatal) {
                    switch(data.type) {
                        case Hls.ErrorTypes.NETWORK_ERROR:
                            console.log("خطأ في الشبكة، جاري المحاولة مرة أخرى...");
                            hls.startLoad();
                            break;
                        case Hls.ErrorTypes.MEDIA_ERROR:
                            console.log("خطأ في الوسائط، جاري المحاولة مرة أخرى...");
                            hls.recoverMediaError();
                            break;
                        default:
                            console.log("خطأ غير قابل للإصلاح");
                            break;
                    }
                }
            });
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            // للأجهزة التي تدعم HLS بشكل أصلي مثل Safari
            video.src = url;
            video.addEventListener('loadedmetadata', function() {
                video.play().catch(e => console.log("تم منع التشغيل التلقائي:", e));
                
                // إزالة مؤشر التحميل
                document.querySelectorAll('.server-btn').forEach(btn => {
                    if (btn.getAttribute('data-id') === streamId) {
                        const loadingSpan = btn.querySelector('.loading');
                        if (loadingSpan) btn.removeChild(loadingSpan);
                    }
                });
            });
        }
    }
    
    // ===== نظام الأمان المحسن =====
    
    // إنشاء معرف عشوائي
    function generateRandomId() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
    
    // 1. فحص الاتصال بالإنترنت للكشف عن VPN - طريقة محسنة
    async function checkForVPN() {
        try {
            // استخدام API للكشف عن VPN (يمكن استبداله بـ API حقيقي)
            const ipCheckEndpoints = [
                'https://api.ipify.org?format=json',
                'https://ipinfo.io/json'
            ];
            
            // اختيار نقطة نهاية عشوائية
            const endpoint = ipCheckEndpoints[Math.floor(Math.random() * ipCheckEndpoints.length)];
            
            // قياس وقت الاستجابة
            const startTime = performance.now();
            const response = await fetch(endpoint, { 
                cache: 'no-store',
                headers: { 'Cache-Control': 'no-cache' }
            });
            const endTime = performance.now();
            
            // إذا كان وقت الاستجابة طويلاً جداً، فقد يكون VPN
            const responseTime = endTime - startTime;
            
            // تحليل البيانات
            const data = await response.json();
            
            // التحقق من وجود علامات VPN في البيانات
            const suspiciousIp = data.ip && (
                data.ip.startsWith('103.') || 
                data.ip.startsWith('104.') ||
                data.ip.includes('vpn') ||
                data.ip.includes('proxy')
            );
            
            // التحقق من معلومات إضافية إذا كانت متوفرة
            const suspiciousInfo = data.org && (
                data.org.toLowerCase().includes('vpn') ||
                data.org.toLowerCase().includes('proxy') ||
                data.org.toLowerCase().includes('hosting')
            );
            
            // التحقق من وقت الاستجابة (أكثر من 800 مللي ثانية قد يشير إلى VPN)
            const suspiciousResponseTime = responseTime > 800;
            
            // إذا تم اكتشاف أي من هذه العلامات، فقد يكون VPN
            return suspiciousIp || suspiciousInfo || suspiciousResponseTime;
        } catch (error) {
            // في حالة حدوث خطأ، لا نفترض وجود VPN
            console.log("خطأ في فحص VPN:", error);
            return false;
        }
    }
    
    // 2. الكشف عن أدوات التحليل مثل HttpCanary - طريقة محسنة
    function checkForDebuggingTools() {
        // التحقق من وجود أدوات التطوير المفتوحة
        const devToolsOpen = /Chrome\//.test(navigator.userAgent) && 
                            /Google Inc/.test(navigator.vendor) && 
                            (window.outerWidth - window.innerWidth > 100 || 
                             window.outerHeight - window.innerHeight > 100);
        
        // التحقق من وجود أدوات تحليل الشبكة عن طريق فحص الـ User-Agent
        const suspiciousUserAgent = /Fiddler|Charles|Burp|Canary|Packet|Wireshark|Proxy|VPN/i.test(navigator.userAgent);
        
        // التحقق من وجود تعديلات على navigator
        const navigatorTampered = (() => {
            try {
                const originalNavigator = Object.getOwnPropertyDescriptors(Navigator.prototype);
                const currentNavigator = Object.getOwnPropertyDescriptors(Object.getPrototypeOf(navigator));
                
                // مقارنة بعض الخصائص الهامة
                return originalNavigator.userAgent.get.toString() !== currentNavigator.userAgent.get.toString() ||
                       originalNavigator.platform.get.toString() !== currentNavigator.platform.get.toString();
            } catch (e) {
                return false;
            }
        })();
        
        return devToolsOpen || suspiciousUserAgent || navigatorTampered;
    }
    
    // 3. فحص الأمان الشامل - طريقة محسنة
    async function runSecurityCheck() {
        // تنفيذ الفحوصات
        const vpnDetected = await checkForVPN();
        const debuggingToolsDetected = checkForDebuggingTools();
        
        // زيادة عداد الفحوصات
        if (vpnDetected || debuggingToolsDetected) {
            securityChecksCount++;
        } else {
            // إعادة تعيين العداد إذا لم يتم اكتشاف أي مشكلة
            securityChecksCount = 0;
        }
        
        // إظهار التنبيه فقط إذا تم اكتشاف مشكلة أمنية عدة مرات متتالية
        // هذا يقلل من التنبيهات الخاطئة
        if (securityChecksCount >= falsePositiveThreshold) {
            securityCompromised = true;
            securityAlert.style.display = 'flex';
            return true;
        }
        
        return false;
    }
    
    // 4. منع استخراج الروابط من خلال وحدة التحكم
    function preventConsoleInspection() {
        // منع استخدام أدوات المطور
        document.addEventListener('keydown', function(e) {
            // منع F12 وCtrl+Shift+I وCtrl+Shift+J
            if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j'))) {
                e.preventDefault();
            }
        });
        
        // منع النقر بزر الماوس الأيمن على الفيديو
        if (video) {
            video.addEventListener('contextmenu', function(e) {
                e.preventDefault();
            });
            
            // منع سحب الفيديو
            video.addEventListener('dragstart', function(e) {
                e.preventDefault();
            });
        }
    }
    
    // 5. تشغيل فحص الأمان بشكل دوري
    function startSecurityMonitoring() {
        // فحص أولي بعد 5 ثوانٍ من تحميل الصفحة
        setTimeout(async () => {
            await runSecurityCheck();
        }, 5000);
        
        // فحص دوري كل 30 ثانية
        securityCheckInterval = setInterval(async () => {
            await runSecurityCheck();
        }, 30000);
    }
    
    // ===== تهيئة النظام =====
    
    // إضافة مستمعي الأحداث لأزرار السيرفر
    function setupEventListeners() {
        // أزرار السيرفر
        document.querySelectorAll('.server-btn').forEach(button => {
            button.addEventListener('click', function() {
                const streamId = this.getAttribute('data-id');
                playStream(streamId);
            });
        });
        
        // زر تحديث الصفحة في تنبيه الأمان
        if (refreshBtn) {
            refreshBtn.addEventListener('click', function() {
                window.location.reload();
            });
        }
    }
    
    // تهيئة النظام
    function initSystem() {
        // إعداد مستمعي الأحداث
        setupEventListeners();
        
        // تفعيل نظام الأمان
        preventConsoleInspection();
        startSecurityMonitoring();
        
        // تشغيل البث الافتراضي بعد تحميل الصفحة
        setTimeout(() => {
            playStream('s1_fhd');
        }, 1500);
    }
    
    // بدء تشغيل النظام
    initSystem();
    
    // ===== إشعار التليجرام =====
    
    // الانضمام لقناة التليجرام
    window.joinTelegram = function() {
        const btn = document.querySelector('.primary');
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري التوجيه...';
        
        setTimeout(function() {
            window.open('https://t.me/Hamada_tv1', '_blank');
            closeAlert();
        }, 500);
    };
    
    // إغلاق إشعار التليجرام
    window.closeAlert = function() {
        const alert = document.getElementById('alert');
        alert.style.opacity = '0';
        setTimeout(function() {
            alert.style.display = 'none';
        }, 300);
    };
    
    // إظهار إشعار التليجرام بعد تحميل الصفحة
    setTimeout(function() {
        const alert = document.getElementById('alert');
        if (alert) {
            alert.style.display = 'flex';
        }
    }, 1000);
})();
