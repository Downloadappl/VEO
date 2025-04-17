// روابط القنوات مع جميع الجودات
    const channels = {
      bein: [
        {
          id: "bein1",
          name: "BeIN Sports 1",
          image: "https://i.ibb.co/5hTNGxd3/image.jpg",
          sources: {
            low: "http://s.showplustv.pro:80/live/784512589635/785412587453/44562.m3u8",
            sd: "http://s.showplustv.pro:80/live/784512589635/785412587453/40837.m3u8",
            hd: "http://s.showplustv.pro:80/live/784512589635/785412587453/31542.m3u8",
            fhd: "http://s.showplustv.pro:80/live/784512589635/785412587453/31542.m3u8",
            "4k": "http://s.showplustv.pro:80/live/784512589635/785412587453/18088.m3u8"
          }
        },
        {
          id: "bein2",
          name: "BeIN Sports 2",
          image: "https://i.ibb.co/dwhbSS9g/image.jpg",
          sources: {
            low: "http://s.showplustv.pro:80/live/784512589635/785412587453/44563.m3u8",
            sd: "http://s.showplustv.pro:80/live/784512589635/785412587453/40838.m3u8",
            hd: "http://s.showplustv.pro:80/live/784512589635/785412587453/31543.m3u8",
            fhd: "http://s.showplustv.pro:80/live/784512589635/785412587453/31543.m3u8",
            "4k": "http://s.showplustv.pro:80/live/784512589635/785412587453/18087.m3u8"
          }
        },
        {
          id: "bein3",
          name: "BeIN Sports 3",
          image: "https://i.ibb.co/9HXNtwKn/image.jpg",
          sources: {
            low: "http://s.showplustv.pro:80/live/784512589635/785412587453/44564.m3u8",
            sd: "http://s.showplustv.pro:80/live/784512589635/785412587453/40839.m3u8",
            hd: "http://s.showplustv.pro:80/live/784512589635/785412587453/31544.m3u8",
            fhd: "http://s.showplustv.pro:80/live/784512589635/785412587453/31544.m3u8",
            "4k": "http://s.showplustv.pro:80/live/784512589635/785412587453/18086.m3u8"
          }
        },
        {
          id: "bein4",
          name: "BeIN Sports 4",
          image: "https://i.ibb.co/PzJFcxqR/image.jpg",
          sources: {
            low: "http://s.showplustv.pro:80/live/784512589635/785412587453/44555.m3u8",
            sd: "http://s.showplustv.pro:80/live/784512589635/785412587453/40830.m3u8",
            hd: "http://s.showplustv.pro:80/live/784512589635/785412587453/31535.m3u8",
            fhd: "http://s.showplustv.pro:80/live/784512589635/785412587453/31535.m3u8",
            "4k": "http://s.showplustv.pro:80/live/784512589635/785412587453/18095.m3u8"
          }
        },
        {
          id: "bein5",
          name: "BeIN Sports 5",
          image: "https://i.ibb.co/C551ztYq/image.jpg",
          sources: {
            low: "http://s.showplustv.pro:80/live/784512589635/785412587453/44556.m3u8",
            sd: "http://s.showplustv.pro:80/live/784512589635/785412587453/40831.m3u8",
            hd: "http://s.showplustv.pro:80/live/784512589635/785412587453/31536.m3u8",
            fhd: "http://s.showplustv.pro:80/live/784512589635/785412587453/31536.m3u8",
            "4k": "http://s.showplustv.pro:80/live/784512589635/785412587453/18094.m3u8"
          }
        },
        {
          id: "bein6",
          name: "BeIN Sports 6",
          image: "https://i.ibb.co/TxXK7TYr/image.jpg",
          sources: {
            low: "http://s.showplustv.pro:80/live/784512589635/785412587453/44557.m3u8",
            sd: "http://s.showplustv.pro:80/live/784512589635/785412587453/40832.m3u8",
            hd: "http://s.showplustv.pro:80/live/784512589635/785412587453/31537.m3u8",
            fhd: "http://s.showplustv.pro:80/live/784512589635/785412587453/31537.m3u8",
            "4k": "http://s.showplustv.pro:80/live/784512589635/785412587453/18093.m3u8"
          }
        },
        {
          id: "bein7",
          name: "BeIN Sports 7",
          image: "https://i.ibb.co/bgk059YL/image.jpg",
          sources: {
            low: "http://s.showplustv.pro:80/live/784512589635/785412587453/44558.m3u8",
            sd: "http://s.showplustv.pro:80/live/784512589635/785412587453/40833.m3u8",
            hd: "http://s.showplustv.pro:80/live/784512589635/785412587453/31538.m3u8",
            fhd: "http://s.showplustv.pro:80/live/784512589635/785412587453/31538.m3u8",
            "4k": "http://s.showplustv.pro:80/live/784512589635/785412587453/18092.m3u8"
          }
        },
        {
          id: "bein8",
          name: "BeIN Sports 8",
          image: "https://i.ibb.co/fzyW40tj/image.jpg",
          sources: {
            low: "http://s.showplustv.pro:80/live/784512589635/785412587453/44559.m3u8",
            sd: "http://s.showplustv.pro:80/live/784512589635/785412587453/40834.m3u8",
            hd: "http://s.showplustv.pro:80/live/784512589635/785412587453/31539.m3u8",
            fhd: "http://s.showplustv.pro:80/live/784512589635/785412587453/31539.m3u8",
            "4k": "http://s.showplustv.pro:80/live/784512589635/785412587453/18091.m3u8"
          }
        },
        {
          id: "bein9",
          name: "BeIN Sports 9",
          image: "https://i.ibb.co/1YFcL0nc/image.jpg",
          sources: {
            low: "http://s.showplustv.pro:80/live/784512589635/785412587453/44560.m3u8",
            sd: "http://s.showplustv.pro:80/live/784512589635/785412587453/40835.m3u8",
            hd: "http://s.showplustv.pro:80/live/784512589635/785412587453/31540.m3u8",
            fhd: "http://s.showplustv.pro:80/live/784512589635/785412587453/31540.m3u8",
            "4k": "http://s.showplustv.pro:80/live/784512589635/785412587453/18090.m3u8"
          }
        }
      ],
      alkass: [
        {
          id: "alkass1",
          name: "Al Kass 1",
          image: "https://i.ibb.co/rG1k0d2s/image.jpg",
          sources: {
            low: "http://s.showplustv.pro:80/live/784512589635/785412587453/46761.m3u8",
            sd: "http://s.showplustv.pro:80/live/784512589635/785412587453/46761.m3u8",
            hd: "http://s.showplustv.pro:80/live/784512589635/785412587453/46761.m3u8",
            fhd: "http://s.showplustv.pro:80/live/784512589635/785412587453/46761.m3u8",
            "4k": "http://s.showplustv.pro:80/live/784512589635/785412587453/46761.m3u8"
          }
        },
        {
          id: "alkass2",
          name: "Al Kass 2",
          image: "https://i.ibb.co/j9fvPJDn/image.jpg",
          sources: {
            low: "http://s.showplustv.pro:80/live/784512589635/785412587453/46760.m3u8",
            sd: "http://s.showplustv.pro:80/live/784512589635/785412587453/46760.m3u8",
            hd: "http://s.showplustv.pro:80/live/784512589635/785412587453/46760.m3u8",
            fhd: "http://s.showplustv.pro:80/live/784512589635/785412587453/46760.m3u8",
            "4k": "http://s.showplustv.pro:80/live/784512589635/785412587453/46760.m3u8"
          }
        },
        {
          id: "alkass3",
          name: "Al Kass 3",
          image: "https://i.ibb.co/9kkKQGkh/image.jpg",
          sources: {
            low: "http://s.showplustv.pro:80/live/784512589635/785412587453/46759.m3u8",
            sd: "http://s.showplustv.pro:80/live/784512589635/785412587453/46759.m3u8",
            hd: "http://s.showplustv.pro:80/live/784512589635/785412587453/46759.m3u8",
            fhd: "http://s.showplustv.pro:80/live/784512589635/785412587453/46759.m3u8",
            "4k": "http://s.showplustv.pro:80/live/784512589635/785412587453/46759.m3u8"
          }
        },
        {
          id: "alkass4",
          name: "Al Kass 4",
          image: "https://i.ibb.co/ghnZ7Qt/image.jpg",
          sources: {
            low: "http://s.showplustv.pro:80/live/784512589635/785412587453/46757.m3u8",
            sd: "http://s.showplustv.pro:80/live/784512589635/785412587453/46757.m3u8",
            hd: "http://s.showplustv.pro:80/live/784512589635/785412587453/46757.m3u8",
            fhd: "http://s.showplustv.pro:80/live/784512589635/785412587453/46757.m3u8",
            "4k": "http://s.showplustv.pro:80/live/784512589635/785412587453/46757.m3u8"
          }
        },
        {
          id: "alkass5",
          name: "Al Kass 5",
          image: "https://i.ibb.co/1GNGYXpN/image.jpg",
          sources: {
            low: "http://s.showplustv.pro:80/live/784512589635/785412587453/113778.m3u8",
            sd: "http://s.showplustv.pro:80/live/784512589635/785412587453/113778.m3u8",
            hd: "http://s.showplustv.pro:80/live/784512589635/785412587453/113778.m3u8",
            fhd: "http://s.showplustv.pro:80/live/784512589635/785412587453/113778.m3u8",
            "4k": "http://s.showplustv.pro:80/live/784512589635/785412587453/113778.m3u8"
          }
        }
      ],
      ssc: [
        {
          id: "ssc1",
          name: "SSC 1 SPORT",
          image: "https://i.ibb.co/jZPZqwSC/image.jpg",
          sources: {
            low: "http://s.showplustv.pro:80/live/784512589635/785412587453/70949.m3u8",
            sd: "http://s.showplustv.pro:80/live/784512589635/785412587453/102193.m3u8",
            hd: "http://s.showplustv.pro:80/live/784512589635/785412587453/60858.m3u8",
            fhd: "http://s.showplustv.pro:80/live/784512589635/785412587453/102177.m3u8",
            "4k": "http://s.showplustv.pro:80/live/784512589635/785412587453/60859.m3u8"
          }
        },
        {
          id: "ssc2",
          name: "SSC 2 SPORT",
          image: "https://i.ibb.co/5gFrcXVD/image.jpg",
          sources: {
            low: "http://s.showplustv.pro:80/live/784512589635/785412587453/70948.m3u8",
            sd: "http://s.showplustv.pro:80/live/784512589635/785412587453/102192.m3u8",
            hd: "http://s.showplustv.pro:80/live/784512589635/785412587453/61029.m3u8",
            fhd: "http://s.showplustv.pro:80/live/784512589635/785412587453/102176.m3u8",
            "4k": "http://s.showplustv.pro:80/live/784512589635/785412587453/61030.m3u8"
          }
        },
        {
          id: "ssc3",
          name: "SSC 3 SPORT",
          image: "https://i.ibb.co/F4CK2BH8/image.jpg",
          sources: {
            low: "http://s.showplustv.pro:80/live/784512589635/785412587453/70947.m3u8",
            sd: "http://s.showplustv.pro:80/live/784512589635/785412587453/102191.m3u8",
            hd: "http://s.showplustv.pro:80/live/784512589635/785412587453/62267.m3u8",
            fhd: "http://s.showplustv.pro:80/live/784512589635/785412587453/102175.m3u8",
            "4k": "http://s.showplustv.pro:80/live/784512589635/785412587453/62265.m3u8"
          }
        },
        {
          id: "ssc4",
          name: "SSC 4 SPORT",
          image: "https://i.ibb.co/tp1jHrbG/image.jpg",
          sources: {
            low: "http://s.showplustv.pro:80/live/784512589635/785412587453/70946.m3u8",
            sd: "http://s.showplustv.pro:80/live/784512589635/785412587453/102190.m3u8",
            hd: "http://s.showplustv.pro:80/live/784512589635/785412587453/62268.m3u8",
            fhd: "http://s.showplustv.pro:80/live/784512589635/785412587453/102174.m3u8",
            "4k": "http://s.showplustv.pro:80/live/784512589635/785412587453/62266.m3u8"
          }
        },
        {
          id: "ssc5",
          name: "SSC 5 SPORT",
          image: "https://i.ibb.co/PsDZMPQv/image.jpg",
          sources: {
            low: "http://s.showplustv.pro:80/live/784512589635/785412587453/70945.m3u8",
            sd: "http://s.showplustv.pro:80/live/784512589635/785412587453/102189.m3u8",
            hd: "http://s.showplustv.pro:80/live/784512589635/785412587453/61032.m3u8",
            fhd: "http://s.showplustv.pro:80/live/784512589635/785412587453/102173.m3u8",
            "4k": "http://s.showplustv.pro:80/live/784512589635/785412587453/61031.m3u8"
          }
        },
        {
          id: "ssc1x",
          name: "SSC 1 Extra",
          image: "https://i.ibb.co/XZkhxX4J/image.jpg",
          sources: {
            low: "http://s.showplustv.pro:80/live/784512589635/785412587453/70944.m3u8",
            sd: "http://s.showplustv.pro:80/live/784512589635/785412587453/102188.m3u8",
            hd: "http://s.showplustv.pro:80/live/784512589635/785412587453/61034.m3u8",
            fhd: "http://s.showplustv.pro:80/live/784512589635/785412587453/102172.m3u8",
            "4k": "http://s.showplustv.pro:80/live/784512589635/785412587453/61033.m3u8"
          }
        },
        {
          id: "ssc2x",
          name: "SSC 2 Extra",
          image: "https://i.ibb.co/XZqqGQjb/image.jpg",
          sources: {
            low: "http://s.showplustv.pro:80/live/784512589635/785412587453/70943.m3u8",
            sd: "http://s.showplustv.pro:80/live/784512589635/785412587453/102187.m3u8",
            hd: "http://s.showplustv.pro:80/live/784512589635/785412587453/61068.m3u8",
            fhd: "http://s.showplustv.pro:80/live/784512589635/785412587453/102171.m3u8",
            "4k": "http://s.showplustv.pro:80/live/784512589635/785412587453/61067.m3u8"
          }
        },
        {
          id: "ssc3x",
          name: "SSC 3 Extra",
          image: "https://i.ibb.co/fY6qsTy0/image.jpg",
          sources: {
            low: "http://s.showplustv.pro:80/live/784512589635/785412587453/99003.m3u8",
            sd: "http://s.showplustv.pro:80/live/784512589635/785412587453/102186.m3u8",
            hd: "http://s.showplustv.pro:80/live/784512589635/785412587453/99010.m3u8",
            fhd: "http://s.showplustv.pro:80/live/784512589635/785412587453/102170.m3u8",
            "4k": "http://s.showplustv.pro:80/live/784512589635/785412587453/99011.m3u8"
          }
        }
      ]
    };
    
    let currentChannel = null;
    let currentQuality = "hd";
    const player = videojs("video", {
      html5: {
        hls: {
          overrideNative: true
        }
      },
      controls: true,
      autoplay: true,
      muted: true,
      fluid: true
    });
    
    // عرض رسالة الخطأ
    function showError(message) {
      const errorElement = document.getElementById("errorMessage");
      errorElement.textContent = message;
      errorElement.style.display = "block";
      setTimeout(() => {
        errorElement.style.display = "none";
      }, 5000);
    }
    
    // تبديل الأقسام
    function switchCategory(category) {
      // إخفاء جميع الأقسام
      document.querySelectorAll('.channel-list').forEach(el => {
        el.classList.remove('active');
      });
      
      // إظهار القسم المحدد
      const activeList = document.getElementById(`${category}-channels`);
      activeList.classList.add('active');
      
      // تحديث التبويبات النشطة
      document.querySelectorAll('.category-tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.category === category);
      });
    }
    
    // تحميل القناة
    function loadChannel(channelId, category) {
      const channel = channels[category].find(ch => ch.id === channelId);
      if (!channel) return;
      
      currentChannel = channel;
      const channelNameElement = document.getElementById("currentChannelName");
      channelNameElement.textContent = channel.name;
      
      const url = channel.sources[currentQuality];
      
      if (url) {
        player.src({
          src: url,
          type: "application/x-mpegURL",
          withCredentials: false
        });
        
        player.ready(() => {
          player.play().catch(error => {
            showError("تعذر التشغيل التلقائي: " + error.message);
          });
        });
      }
    }
    
    // تغيير الجودة
    function changeQuality(q) {
      currentQuality = q;
      if (!currentChannel) return;
      
      const url = currentChannel.sources[q];
      if (url) {
        player.src({
          src: url,
          type: "application/x-mpegURL",
          withCredentials: false
        });
        
        player.play().catch(error => {
          showError("تعذر تشغيل البث: " + error.message);
        });
      }
    }
    
    // Custom dropdown functions
    function toggleDropdown() {
      const options = document.getElementById("dropdownOptions");
      options.classList.toggle("show");
      
      // Rotate chevron icon
      const chevron = document.querySelector(".dropdown-header i");
      chevron.classList.toggle("fa-chevron-up");
      chevron.classList.toggle("fa-chevron-down");
    }
    
    function selectQuality(quality, displayName) {
      document.getElementById("selectedQuality").textContent = displayName;
      changeQuality(quality);
      
      // Update active option
      document.querySelectorAll(".dropdown-option").forEach(opt => {
        opt.classList.remove("active");
      });
      event.target.classList.add("active");
      
      // Close dropdown
      toggleDropdown();
    }
    
    // Close dropdown when clicking outside
    window.onclick = function(event) {
      if (!event.target.matches('.dropdown-header') && !event.target.matches('.dropdown-header *')) {
        const dropdowns = document.getElementsByClassName("dropdown-options");
        for (let i = 0; i < dropdowns.length; i++) {
          const openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
            const chevron = document.querySelector(".dropdown-header i");
            chevron.classList.remove("fa-chevron-up");
            chevron.classList.add("fa-chevron-down");
          }
        }
      }
    }
    
    // معالجة أخطاء المشغل
    player.on("error", function() {
      const error = player.error();
      let errorMessage = "حدث خطأ في تحميل الوسائط";
      
      if (error) {
        switch(error.code) {
          case 1:
            errorMessage = "تم إلغاء جلب الوسائط من قبل المستخدم";
            break;
          case 2:
            errorMessage = "خطأ في الشبكة، تأكد من اتصالك بالإنترنت";
            break;
          case 3:
            errorMessage = "خطأ في فك تشفير الوسائط، التنسيق غير مدعوم";
            break;
          case 4:
            errorMessage = "الوسائط غير مدعومة أو لا يمكن تشغيلها";
            break;
        }
      }
      
      showError(errorMessage);
    });
    
    // تهيئة الصفحة
    window.onload = () => {
      // إعداد تبويبات الأقسام
      document.querySelectorAll('.category-tab').forEach(tab => {
        tab.addEventListener('click', () => {
          switchCategory(tab.dataset.category);
        });
      });
      
      // تعبئة القنوات في كل قسم
      for (const category in channels) {
        const container = document.getElementById(`${category}-channels`);
        channels[category].forEach(ch => {
          const card = document.createElement("div");
          card.className = "channel-card";
          card.onclick = () => loadChannel(ch.id, category);
          card.innerHTML = `
            <img src="${ch.image}" alt="${ch.name}" />
            <div class="title">${ch.name}</div>
          `;
          container.appendChild(card);
        });
      }
      
      // تفعيل القسم الأول
      switchCategory('bein');
    };
