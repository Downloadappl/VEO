// نظام تشغيل البث المباشر
(function() {
    // المتغيرات العامة
    const video = document.getElementById('player');
    let hls;
    const player = new Plyr(video);
    
    // قائمة الروابط المحمية (مخفية بطريقة بسيطة)
    const streamLinks = {
        // القناة 1
        s1_4k: _decodeLink("aHR0cHM6Ly9obHMtY2RuLW1lamFyc2VydmVyLnRpZ2FuLnByby9zdmMtc3BvLWZoZC0wOC1kdC9wbGF5bGlzdC5tM3U4"),
        s1_fhd: _decodeLink("aHR0cDovL2Nkbnl2aW5lLmNvbTo4MDgwL2JuMWhkL3RyYWNrcy12MWExL21vbm8ubTN1OA=="),
        s1_sd: _decodeLink("aHR0cDovL3ZpcC5zaWJmdW5nb2xkLm5ldDo4MDgwL2xpdmUvaGZta2VsaWJpYUAvN1oyckYyZXZXS3ZuUEVLWVhWcmo1aFZQLzMyNDQubTN1OA=="),
        s1_audio: _decodeLink("aHR0cDovL3N0cmVhbS5teXR2cGx1cy5uZXQ6NzAwMi9zcG9ydC9jaDEvYWRhcHRpdmUubTN1OA=="),
        
        // القناة 2
        s2_fhd1: _decodeLink("aHR0cHM6Ly9zdHJlYW0uZ3VtbGV0LmlvLzY4MWEyY2VlOWJmYjFhMTgxNWI4MDg3MC82ODFhMmQwNTA3MGQ4ZjAyMjEwN2UxMWIvbWFpbi5tM3U4"),
        s2_fhd2: _decodeLink("aHR0cDovL2Nkbnl2aW5lLmNvbTo4MDgwL2JuMWhkL3RyYWNrcy12MWExL21vbm8ubTN1OA=="),
        s2_hd: _decodeLink("aHR0cDovL3ZpcC5zaWJmdW5nb2xkLm5ldDo4MDgwL2xpdmUvaGZta2VsaWJpYUAvN1oyckYyZXZXS3ZuUEVLWVhWcmo1aFZQLzIubTN1OA=="),
        s2_audio: _decodeLink("aHR0cDovL3N0cmVhbS5teXR2cGx1cy5uZXQ6NzAwMy9zcG9ydC9jaDIvYWRhcHRpdmUubTN1OA=="),
        
        // القناة 3
        s3_fhd: _decodeLink("aHR0cDovL2JsdWVkay54eXo6ODg4MC9saXZlL1Jvc21hcmkvdzFvT0xlTnZzNS8xMjU1NTcubTN1OA=="),
        s3_server2: _decodeLink("aHR0cDovLzEzNi4yNDMuMTU1LjU1OjgwODgvQmVpbjMvdHJhY2tzLXYxYTEvbW9uby5tM3U4"),
        s3_server3: _decodeLink("aHR0cDovL3ZpcC5zaWJmdW5nb2xkLm5ldDo4MDgwL2xpdmUvaGZta2VsaWJpYUAvN1oyckYyZXZXS3ZuUEVLWVhWcmo1aFZQLzMubTN1OA=="),
        s3_audio: _decodeLink(""),
        
        // القناة 4
        s4_4k: _decodeLink(""),
        s4_fhd: _decodeLink(""),
        s4_hd: _decodeLink(""),
        s4_sd: _decodeLink("")
    };
    
    // وظيفة فك تشفير الروابط (Base64)
    function _decodeLink(encoded) {
        try {
            // تحقق من وجود قيمة
            if (!encoded) return "";
            
            // فك تشفير Base64
            const decoded = atob(encoded);
            return decoded;
        } catch (error) {
            console.error("خطأ في فك تشفير الرابط:", error);
            return "";
        }
    }
    
    // وظيفة تغيير البث
    function changeStream(streamId) {
        // التحقق من وجود الرابط
        if (!streamLinks[streamId] || streamLinks[streamId] === "") {
            alert("هذا السيرفر غير متاح حالياً");
            return;
        }
        
        // التحقق من حالة الأمان
        if (window.securitySystem && window.securitySystem.isCompromised()) {
            return; // لا تقم بتشغيل البث إذا كان هناك مشكلة أمنية
        }
        
        // تحديث واجهة المستخدم
        document.querySelectorAll('.server-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-id') === streamId) {
                btn.classList.add('active');
                // إضافة مؤشر التحميل
                const originalText = btn.textContent;
                btn.innerHTML = originalText + ' <span class="loading"></span>';
            }
        });
        
        // الحصول على رابط البث
        const url = streamLinks[streamId];
        
        // تدمير مثيل HLS السابق إذا كان موجوداً
        if (hls) {
            hls.destroy();
        }
        
        // تحميل البث الجديد
        if (Hls.isSupported()) {
            hls = new Hls({
                xhrSetup: function(xhr, url) {
                    // إضافة رأس عشوائي لمنع التتبع
                    xhr.setRequestHeader('X-Client-ID', Math.random().toString(36).substring(2, 15));
                }
            });
            hls.loadSource(url);
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED, function() {
                video.play();
                // إزالة مؤشر التحميل
                document.querySelectorAll('.server-btn').forEach(btn => {
                    if (btn.getAttribute('data-id') === streamId) {
                        btn.innerHTML = btn.textContent.replace(' <span class="loading"></span>', '');
                    }
                });
            });
            
            // معالجة الأخطاء
            hls.on(Hls.Events.ERROR, function(event, data) {
                if (data.fatal) {
                    switch(data.type) {
                        case Hls.ErrorTypes.NETWORK_ERROR:
                            console.error("خطأ في الشبكة، جاري المحاولة مرة أخرى...");
                            hls.startLoad();
                            break;
                        case Hls.ErrorTypes.MEDIA_ERROR:
                            console.error("خطأ في الوسائط، جاري المحاولة مرة أخرى...");
                            hls.recoverMediaError();
                            break;
                        default:
                            console.error("خطأ غير قابل للإصلاح:", data);
                            break;
                    }
                }
            });
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            // للأجهزة التي تدعم HLS بشكل أصلي مثل Safari
            video.src = url;
            video.addEventListener('loadedmetadata', function() {
                video.play();
                // إزالة مؤشر التحميل
                document.querySelectorAll('.server-btn').forEach(btn => {
                    if (btn.getAttribute('data-id') === streamId) {
                        btn.innerHTML = btn.textContent.replace(' <span class="loading"></span>', '');
                    }
                });
            });
        }
    }
    
    // إضافة مستمعي الأحداث لأزرار السيرفر
    document.querySelectorAll('.server-btn').forEach(button => {
        button.addEventListener('click', function() {
            const streamId = this.getAttribute('data-id');
            changeStream(streamId);
        });
    });
    
    // تشغيل البث المباشر تلقائياً عند تحميل الصفحة
    window.addEventListener('load', function() {
        // تشغيل البث الافتراضي (القناة 1 - FHD)
        setTimeout(() => {
            changeStream('s1_fhd');
        }, 1500);
    });
    
    // منع سحب الفيديو
    video.addEventListener('dragstart', function(e) {
        e.preventDefault();
    });
    
    // منع النقر بزر الماوس الأيمن على الفيديو
    video.addEventListener('contextmenu', function(e) {
        e.preventDefault();
    });
    
    // إضافة طبقة حماية إضافية للفيديو
    const videoContainer = document.querySelector('.live-player');
    const protectionLayer = document.createElement('div');
    protectionLayer.style.position = 'absolute';
    protectionLayer.style.top = '0';
    protectionLayer.style.left = '0';
    protectionLayer.style.width = '100%';
    protectionLayer.style.height = '100%';
    protectionLayer.style.zIndex = '1';
    protectionLayer.style.pointerEvents = 'none';
    videoContainer.style.position = 'relative';
    videoContainer.appendChild(protectionLayer);
    
    // تصدير الدوال للاستخدام العام
    window.playerSystem = {
        changeStream: changeStream
    };
})();
