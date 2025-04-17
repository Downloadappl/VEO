    // ============ حل مشكلة "The media could not be loaded" ============
    function handlePlayerError(player) {
      player.on("error", function() {
        const error = player.error();
        let errorMessage = "حدث خطأ في تحميل البث";
        
      
        
        showError(errorMessage);
        
        // إعادة المحاولة بعد 5 ثواني
        setTimeout(() => {
          if (currentChannel) {
            loadChannel(currentChannel.id, currentChannel.category);
          }
        }, 5000);
      });
    }
    
    // ============ جميع القنوات والجودات ============
    const channelsDB = {
      bein: {
        bein1: {
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
        bein2: {
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
        bein3: {
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
        bein4: {
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
        bein5: {
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
        bein6: {
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
        bein7: {
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
        bein8: {
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
        bein9: {
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
      },
      alkass: {
        alkass1: {
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
        alkass2: {
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
        alkass3: {
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
        alkass4: {
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
        alkass5: {
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
      },
      ssc: {
        ssc1: {
          name: "SSC 1",
          image: "https://i.ibb.co/jZPZqwSC/image.jpg",
          sources: {
            low: "http://s.showplustv.pro:80/live/784512589635/785412587453/70949.m3u8",
            sd: "http://s.showplustv.pro:80/live/784512589635/785412587453/102193.m3u8",
            hd: "http://s.showplustv.pro:80/live/784512589635/785412587453/60858.m3u8",
            fhd: "http://s.showplustv.pro:80/live/784512589635/785412587453/102177.m3u8",
            "4k": "http://s.showplustv.pro:80/live/784512589635/785412587453/60859.m3u8"
          }
        },
        ssc2: {
          name: "SSC 2",
          image: "https://i.ibb.co/5gFrcXVD/image.jpg",
          sources: {
            low: "http://s.showplustv.pro:80/live/784512589635/785412587453/70948.m3u8",
            sd: "http://s.showplustv.pro:80/live/784512589635/785412587453/102192.m3u8",
            hd: "http://s.showplustv.pro:80/live/784512589635/785412587453/61029.m3u8",
            fhd: "http://s.showplustv.pro:80/live/784512589635/785412587453/102176.m3u8",
            "4k": "http://s.showplustv.pro:80/live/784512589635/785412587453/61030.m3u8"
          }
        },
        ssc3: {
          name: "SSC 3",
          image: "https://i.ibb.co/F4CK2BH8/image.jpg",
          sources: {
            low: "http://s.showplustv.pro:80/live/784512589635/785412587453/70947.m3u8",
            sd: "http://s.showplustv.pro:80/live/784512589635/785412587453/102191.m3u8",
            hd: "http://s.showplustv.pro:80/live/784512589635/785412587453/62267.m3u8",
            fhd: "http://s.showplustv.pro:80/live/784512589635/785412587453/102175.m3u8",
            "4k": "http://s.showplustv.pro:80/live/784512589635/785412587453/62265.m3u8"
          }
        },
        ssc4: {
          name: "SSC 4",
          image: "https://i.ibb.co/tp1jHrbG/image.jpg",
          sources: {
            low: "http://s.showplustv.pro:80/live/784512589635/785412587453/70946.m3u8",
            sd: "http://s.showplustv.pro:80/live/784512589635/785412587453/102190.m3u8",
            hd: "http://s.showplustv.pro:80/live/784512589635/785412587453/62268.m3u8",
            fhd: "http://s.showplustv.pro:80/live/784512589635/785412587453/102174.m3u8",
            "4k": "http://s.showplustv.pro:80/live/784512589635/785412587453/62266.m3u8"
          }
        },
        ssc5: {
          name: "SSC 5",
          image: "https://i.ibb.co/PsDZMPQv/image.jpg",
          sources: {
            low: "http://s.showplustv.pro:80/live/784512589635/785412587453/70945.m3u8",
            sd: "http://s.showplustv.pro:80/live/784512589635/785412587453/102189.m3u8",
            hd: "http://s.showplustv.pro:80/live/784512589635/785412587453/61032.m3u8",
            fhd: "http://s.showplustv.pro:80/live/784512589635/785412587453/102173.m3u8",
            "4k": "http://s.showplustv.pro:80/live/784512589635/785412587453/61031.m3u8"
          }
        },
        ssc1x: {
          name: "SSC Extra 1",
          image: "https://i.ibb.co/XZkhxX4J/image.jpg",
          sources: {
            low: "http://s.showplustv.pro:80/live/784512589635/785412587453/70944.m3u8",
            sd: "http://s.showplustv.pro:80/live/784512589635/785412587453/102188.m3u8",
            hd: "http://s.showplustv.pro:80/live/784512589635/785412587453/61034.m3u8",
            fhd: "http://s.showplustv.pro:80/live/784512589635/785412587453/102172.m3u8",
            "4k": "http://s.showplustv.pro:80/live/784512589635/785412587453/61033.m3u8"
          }
        },
        ssc2x: {
          name: "SSC Extra 2",
          image: "https://i.ibb.co/XZqqGQjb/image.jpg",
          sources: {
            low: "http://s.showplustv.pro:80/live/784512589635/785412587453/70943.m3u8",
            sd: "http://s.showplustv.pro:80/live/784512589635/785412587453/102187.m3u8",
            hd: "http://s.showplustv.pro:80/live/784512589635/785412587453/61068.m3u8",
            fhd: "http://s.showplustv.pro:80/live/784512589635/785412587453/102171.m3u8",
            "4k": "http://s.showplustv.pro:80/live/784512589635/785412587453/61067.m3u8"
          }
        },
        ssc3x: {
          name: "SSC Extra 3",
          image: "https://i.ibb.co/fY6qsTy0/image.jpg",
          sources: {
            low: "http://s.showplustv.pro:80/live/784512589635/785412587453/99003.m3u8",
            sd: "http://s.showplustv.pro:80/live/784512589635/785412587453/102186.m3u8",
            hd: "http://s.showplustv.pro:80/live/784512589635/785412587453/99010.m3u8",
            fhd: "http://s.showplustv.pro:80/live/784512589635/785412587453/102170.m3u8",
            "4k": "http://s.showplustv.pro:80/live/784512589635/785412587453/99011.m3u8"
          }
        }
      }
    };

    // ============ إدارة المشغل ============
    let currentChannel = null;
    const player = videojs("video", {
      html5: {
        hls: {
          overrideNative: true,
          enableLowInitialPlaylist: true,
          smoothQualityChange: true,
          maxBufferLength: 30,
          maxMaxBufferLength: 60,
          bandwith: 4194304
        }
      },
      controls: true,
      autoplay: true,
      muted: true,
      fluid: true,
      playbackRates: [0.5, 1, 1.5, 2],
      responsive: true,
      fill: true
    });

    // حل مشكلة "The media could not be loaded"
    handlePlayerError(player);

    // ============ إدارة الواجهة ============
    function showError(message) {
      const errorElement = document.getElementById("errorMessage");
      errorElement.textContent = message;
      errorElement.style.display = "block";
      setTimeout(() => {
        errorElement.style.display = "none";
      }, 5000);
    }

    function toggleDropdown() {
      const options = document.getElementById("dropdownOptions");
      options.classList.toggle("show");
      
      const chevron = document.querySelector(".dropdown-header i");
      chevron.classList.toggle("fa-chevron-up");
      chevron.classList.toggle("fa-chevron-down");
    }

    function selectQuality(quality, displayName) {
      document.getElementById("selectedQuality").textContent = displayName;
      
      document.querySelectorAll(".dropdown-option").forEach(opt => {
        opt.classList.remove("active");
      });
      event.target.classList.add("active");
      
      if (currentChannel) {
        loadChannel(currentChannel.id, currentChannel.category);
      }
      
      toggleDropdown();
    }

    function switchCategory(category) {
      document.querySelectorAll('.channel-list').forEach(el => {
        el.classList.remove('active');
        el.classList.remove('animate__fadeIn');
      });
      
      const activeList = document.getElementById(`${category}-channels`);
      activeList.classList.add('active', 'animate__animated', 'animate__fadeIn');
      
      document.querySelectorAll('.category-tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.category === category);
      });
    }

    function loadChannel(channelId, category) {
      const quality = document.getElementById("selectedQuality").textContent.toLowerCase();
      const channel = channelsDB[category][channelId];
      
      if (!channel || !channel.sources[quality]) {
        showError("هذه الجودة غير متوفرة لهذه القناة");
        return;
      }

      currentChannel = { id: channelId, category: category };
      document.getElementById("currentChannelName").textContent = channel.name;
      document.getElementById("currentChannelName").classList.add('animate__animated', 'animate__pulse');
      setTimeout(() => {
        document.getElementById("currentChannelName").classList.remove('animate__animated', 'animate__pulse');
      }, 1000);

      player.src({
        src: channel.sources[quality],
        type: 'application/x-mpegURL'
      });
      
      player.ready(() => {
        player.play().catch(e => {
          showError("التشغيل التلقائي غير مسموح. يرجى النقر على زر التشغيل");
        });
      });
    }

    // إغلاق القائمة عند النقر خارجها
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

    // ============ تهيئة الصفحة ============
    window.onload = () => {
      // تعبئة القنوات في الواجهة
      for (const category in channelsDB) {
        const container = document.getElementById(`${category}-channels`);
        for (const channelId in channelsDB[category]) {
          const ch = channelsDB[category][channelId];
          const card = document.createElement("div");
          card.className = "channel-card animate__animated animate__fadeIn";
          card.style.animationDelay = `${Math.random() * 0.5}s`;
          card.onclick = () => loadChannel(channelId, category);
          card.innerHTML = `
            <img src="${ch.image}" alt="${ch.name}" />
            <div class="title">${ch.name}</div>
          `;
          container.appendChild(card);
        }
      }
      
      // إعداد تبويبات الأقسام
      document.querySelectorAll('.category-tab').forEach(tab => {
        tab.addEventListener('click', () => {
          switchCategory(tab.dataset.category);
        });
      });
      
      // تفعيل القسم الأول
      switchCategory('bein');
    };
