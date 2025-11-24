 // ---------- Confetti (simple) ----------
    (function(){
      const canvas = document.getElementById('confetti');
      const ctx = canvas.getContext('2d');
      let W = canvas.width = innerWidth;
      let H = canvas.height = innerHeight;
      window.addEventListener('resize', ()=>{ W=canvas.width=innerWidth; H=canvas.height=innerHeight; });

      function random(min,max){return Math.random()*(max-min)+min}
      const particles = [];
      function makeConfetti(x,y){
        for(let i=0;i<120;i++){
          particles.push({
            x: x || W/2,
            y: y || H/3,
            vx: random(-8,8),
            vy: random(-12, -2),
            size: random(6,14),
            rot: random(0,360),
            vr: random(-8,8),
            color: ['#ff6b6b','#f59e0b','#06b6d4','#2bb24c','#7c3aed'][Math.floor(random(0,5))]
          });
        }
      }
      function update(){
        ctx.clearRect(0,0,W,H);
        for(let i=particles.length-1;i>=0;i--){
          const p = particles[i];
          p.vy += 0.45; p.x += p.vx; p.y += p.vy; p.rot += p.vr;
          ctx.save();
          ctx.translate(p.x,p.y);
          ctx.rotate(p.rot*Math.PI/180);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size*0.6);
          ctx.restore();
          if(p.y > H + 50) particles.splice(i,1);
        }
        requestAnimationFrame(update);
      }
      update();

      // trigger
      document.getElementById('cheerBtn').addEventListener('click', ()=>{
        makeConfetti();
        // small audio ding
        const a = new Audio('https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg');
        a.volume = 0.6; a.play();
      });

      document.getElementById('praiseBtn').addEventListener('click', ()=>{
        makeConfetti(Math.random()*W, Math.random()*H/2);
      });
    })();

    // ---------- Gallery slider ----------
    (function(){
      const slides = document.getElementById('slides');
      const imgs = slides.querySelectorAll('.slide');
      let idx = 0;
      function show(i){
        idx = (i + imgs.length) % imgs.length;
        slides.style.transform = `translateX(${-idx*100}%)`;
      }
      document.getElementById('prevSlide').addEventListener('click', ()=> show(idx-1));
      document.getElementById('nextSlide').addEventListener('click', ()=> show(idx+1));
      // Auto-play
      setInterval(()=> show(idx+1), 6000);
      document.getElementById('galleryOpen').addEventListener('click', ()=> {
        window.scrollTo({top: document.getElementById('gallery').offsetTop - 20, behavior:'smooth'});
      });
    })();

    // ---------- Quiz logic ----------
    (function(){
      const opts = document.querySelectorAll('#quizOptions .option');
      const result = document.getElementById('quizResult');
      function clear(){ opts.forEach(o=>{ o.classList.remove('correct','wrong'); }); result.textContent=''; }
      opts.forEach(o=>{
        o.addEventListener('click', ()=>{
          clear();
          const ok = o.dataset.correct === 'true';
          if(ok){ o.classList.add('correct'); result.textContent = 'Toʻgʻri! ✅'; 
            // small cheering
            const snd = new Audio('https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg'); snd.volume = 0.5; snd.play();
          } else { o.classList.add('wrong'); result.textContent = 'Notoʻgʻri. ❌'; }
        });
      });
      document.getElementById('nextQuestion').addEventListener('click', ()=>{
        clear();
        // simple shuffle of options text (demo)
        const parent = document.getElementById('quizOptions');
        for(let i = parent.children.length; i>=0; i--){
          parent.appendChild(parent.children[Math.random()*i|0]);
        }
      });
    })();

    // ---------- Anthem toggle ----------
    (function(){
      const anthem = document.getElementById('anthem');
      const btn = document.getElementById('anthemToggle');
      btn.addEventListener('click', ()=>{
        if(anthem.paused){ anthem.volume = 0.6; anthem.play(); btn.textContent = '🔇 Madhiyani o\'chir'; }
        else { anthem.pause(); btn.textContent = '🎵 Madhiyani yoqish'; }
      });
    })();

    // ---------- Print & Download ----------
    (function(){
      document.getElementById('printBtn').addEventListener('click', ()=> window.print());
      document.getElementById('downloadPdf').addEventListener('click', ()=>{
        alert('Brauzeringizda "Print" -> "Save as PDF" funksiyasini tanlab PDF sifatida saqlashingiz mumkin.');
        window.print();
      });
    })();

    // ---------- Fancy join button (mock) ----------
    document.getElementById('joinBtn').addEventListener('click', ()=>{
      const name = prompt("Ismingizni kiriting (sinf roʻyxatiga qoʻshamiz):");
      if(name){
        // brief praise animation & confetti
        document.getElementById('cheerBtn').click();
        alert(`Rahmat, ${name}! Endi siz 8-A ning rasmiy a'zosiz — sizni sinf do'stlaringiz maqtaydi 🎉`);
      }
    });

    // ---------- small UX extras ----------
    // keyboard: press C for confetti
    window.addEventListener('keydown', (e)=>{
      if(e.key.toLowerCase() === 'c'){ document.getElementById('cheerBtn').click(); }
    });

    // disable accidental text selection during drag
    document.addEventListener('selectstart', function(e){ /* allow normally */ });