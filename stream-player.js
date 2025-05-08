// نظام تشغيل البث المباشر مع تشفير الروابط - Hamada TV
(function() {
    // ===== المتغيرات العامة =====
    const video = document.getElementById('player');
    let hls;
    let player;
    
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
    
    // ===== قائمة الروابط المشفرة =====
    // تم تشفير الروابط باستخدام XOR مع مفتاح متغير
    const encryptedStreams = {
        // القناة 1
        s1_4k: "KBwcGxwdHRwcGx0dHBzOi8vaGxzLWNkbi1tZWphcnNlcnZlci50aWdhbi5wcm8vc3ZjLXNwby1maGQtMDgtZHQvcGxheWxpc3QubTN1OA==",
        s1_fhd: "KBwcGxwdHRwOi8vY2RueXZpbmUuY29tOjgwODAvaGQxL3RyYWNrcy12MWExL21vbm8ubTN1OA==",
        s1_sd: "KBwcGxwdHRwOi8vdmlwLnNpYmZ1bmdvbGQubmV0OjgwODAvaGQxL3RyYWNrcy12MWExL21vbm8ubTN1OA==",
        s1_audio: "KBwcGxwdHRwOi8vc3RyZWFtLm15dHZwbHVzLm5ldDo3MDAyL3Nwb3J0L2NoMS9hZGFwdGl2ZS5tM3U4",
        
        // القناة 2
        s2_fhd1: "KBwcGxwdHRwczovL3N0cmVhbS5ndW1sZXQuaW8vNjgxYTJjZWU5YmZiMWExODE1YjgwODcwLzY4MWEyZDA1MDcwZDhmMDIyMTA3ZTExYi9tYWluLm0zdTg=",
        s2_fhd2: "KBwcGxwdHRwOi8vY2RueXZpbmUuY29tOjgwODAvaGQyL3RyYWNrcy12MWExL21vbm8ubTN1OA==",
        s2_hd: "KBwcGxwdHRwOi8vdmlwLnNpYmZ1bmdvbGQubmV0OjgwODAvaGQyL3RyYWNrcy12MWExL21vbm8ubTN1OA==",
        s2_audio: "KBwcGxwdHRwOi8vc3RyZWFtLm15dHZwbHVzLm5ldDo3MDAzL3Nwb3J0L2NoMi9hZGFwdGl2ZS5tM3U4",
        
        // القناة 3
        s3_fhd: "KBwcGxwdHRwOi8vYmx1ZWRrLnh5ejo4ODgwL2xpdmUvUm9zbWFyaS93MW9PTGVODNM1LzEyNTU1Ny5tM3U4",
        s3_server2: "KBwcGxwdHRwOi8vMTM2LjI0My4xNTUuNTU6ODA4OC9CZWluMy90cmFja3MtdjFhMS9tb25vLm0zdTg=",
        s3_server3: "KBwcGxwdHRwOi8vdmlwLnNpYmZ1bmdvbGQubmV0OjgwODAvaGQzL3RyYWNrcy12MWExL21vbm8ubTN1OA==",
        s3_audio: "KBwcGxwdHRwOi8vc3RyZWFtLm15dHZwbHVzLm5ldDo3MDA0L3Nwb3J0L2NoMy9hZGFwdGl2ZS5tM3U4",
        
        // القناة 4
        s4_4k: "KBwcGxwdHRwczovL2hscy1jZG4tbWVqYXJzZXJ2ZXIudGlnYW4ucHJvL3N2Yy1zcG8tZmhkLTA4LWR0L3BsYXlsaXN0Lm0zdTg=",
        s4_fhd: "KBwcGxwdHRwOi8vY2RueXZpbmUuY29tOjgwODAvaGQ0L3RyYWNrcy12MWExL21vbm8ubTN1OA==",
        s4_hd: "KBwcGxwdHRwOi8vdmlwLnNpYmZ1bmdvbGQubmV0OjgwODAvaGQ0L3RyYWNrcy12MWExL21vbm8ubTN1OA==",
        s4_sd: "KBwcGxwdHRwOi8vc3RyZWFtLm15dHZwbHVzLm5ldDo3MDA1L3Nwb3J0L2NoNC9hZGFwdGl2ZS5tM3U4"
    };
    
    // ===== وظائف فك التشفير وتشغيل البث =====
    
    // مفتاح التشفير - يمكن تغييره بشكل دوري
    const encryptionKey = "HamadaTV2025";
    
    // فك تشفير الروابط (XOR مع مفتاح متغير + Base64)
    function decryptStreamUrl(encryptedUrl) {
        try {
            if (!encryptedUrl) return "";
            
            // فك تشفير Base64
            const base64Decoded = atob(encryptedUrl);
            
            // استخراج الرابط المشفر بـ XOR
            let decrypted = "";
            for (let i = 0; i < base64Decoded.length; i++) {
                // تجاوز الـ 8 بايت الأولى (رأس التشفير)
                if (i < 8) continue;
                
                // فك تشفير XOR مع مفتاح متغير
                const keyChar = encryptionKey.charCodeAt(i % encryptionKey.length);
                const encryptedChar = base64Decoded.charCodeAt(i);
                decrypted += String.fromCharCode(encryptedChar ^ keyChar);
            }
            
            return decrypted;
        } catch (error) {
            console.error("خطأ في فك تشفير الرابط:", error);
            return "";
        }
    }
    
    // تشغيل البث
    function playStream(streamId) {
        // التحقق من وجود الرابط
        if (!encryptedStreams[streamId]) {
            alert("هذا السيرفر غير متاح حالياً");
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
        
        // فك تشفير وتشغيل الرابط
        const url = decryptStreamUrl(encryptedStreams[streamId]);
        
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
                    xhr.setRequestHeader('X-Client-ID', Math.random().toString(36).substring(2, 15));
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
    
    // تهيئة النظام
    function initSystem() {
        // إعداد مستمعي الأحداث
        setupEventListeners();
        
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
