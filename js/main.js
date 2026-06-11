// =========================================
//  PLAYLIST PLAYER
// =========================================
const tracks = [
  { title:"Peak Time Techno #1", genre:"Peak Time Techno", badge:"b-tec", dur:"6:24", src:"audio/peak-time-techno-ID121.mp3" },
  { title:"Emotional Peak Time Techno", genre:"Peak Time Techno", badge:"b-tec", dur:"5:50", src:"audio/peak-time-techno-ID119.mp3" },
  { title:"Trumpsta (Contiez, Treyy G) Remix", genre:"Remix", badge:"b-min", dur:"5:38", src:"audio/trumpsta-remix-ID122.mp3" },
  { title:"Hard Dance #1", genre:"Hard Dance", badge:"b-dar", dur:"6:05", src:"audio/hard-dance-mrc.mp3" },
  { title:"Hard Dance (pre-master)", genre:"Hard Dance",      badge:"b-dar", dur:"7:12", src:"audio/hard-dance-2-mrc.mp3" },
  { title:"Melodic Techno #1", genre:"Melodic Techno",   badge:"b-ind", dur:"5:55", src:"audio/melodic-techno-alext.mp3" },
];

const mainAudio = document.getElementById("main-audio");
const trackList = document.getElementById("track-list");
const btnPlay   = document.getElementById("btn-play");
const playIc    = document.getElementById("play-ic");
const pauseIc   = document.getElementById("pause-ic");
const mainProg  = document.getElementById("main-prog");
const progWrap  = document.getElementById("main-prog-wrap");
const curT      = document.getElementById("cur-t");
const durT      = document.getElementById("dur-t");
const npTitle   = document.getElementById("np-title");
const npGenre   = document.getElementById("np-genre");
const waveform  = document.getElementById("waveform");
const volSlider = document.getElementById("vol");

let curIdx = -1, isPlaying = false;

function fmt(s){ if(!s||isNaN(s)) return"0:00"; const m=Math.floor(s/60),sec=Math.floor(s%60); return m+":"+(sec<10?"0":"")+sec; }

function buildList(){
  trackList.innerHTML="";
  tracks.forEach((t,i)=>{
    const li=document.createElement("li");
    li.className="track-item";
    li.dataset.idx=i;
    li.innerHTML=`<span class="tnum">${String(i+1).padStart(2,"0")}</span>
      <div class="tinfo"><div class="tname">${t.title}</div><div class="tgenre">${t.genre}</div></div>
      <span class="gbadge ${t.badge}">${t.genre}</span>`;
    li.addEventListener("click",()=>loadTrack(i,true));
    trackList.appendChild(li);
  });
}

function setActive(i){ document.querySelectorAll(".track-item").forEach((el,j)=>el.classList.toggle("active",j===i)); }

function loadTrack(i,auto){
  curIdx=i; const t=tracks[i];
  mainAudio.src=t.src; mainAudio.load();
  npTitle.textContent=t.title;
  npGenre.innerHTML=`<span class="gbadge ${t.badge}">${t.genre}</span>`;
  setActive(i); mainProg.style.width="0%"; curT.textContent="0:00"; durT.textContent=t.dur;
  if(auto){mainAudio.play();setPlay(true);}
}

function setPlay(s){
  isPlaying=s;
  playIc.style.display=s?"none":"block";
  pauseIc.style.display=s?"block":"none";
  waveform.classList.toggle("playing",s);
}

btnPlay.addEventListener("click",()=>{
  if(curIdx===-1){loadTrack(0,true);return;}
  if(isPlaying){mainAudio.pause();setPlay(false);}else{mainAudio.play();setPlay(true);}
});
document.getElementById("btn-prev").addEventListener("click",()=>loadTrack(curIdx<=0?tracks.length-1:curIdx-1,isPlaying));
document.getElementById("btn-next").addEventListener("click",()=>loadTrack((curIdx+1)%tracks.length,isPlaying));
mainAudio.addEventListener("ended",()=>loadTrack((curIdx+1)%tracks.length,true));
mainAudio.addEventListener("timeupdate",()=>{
  if(!mainAudio.duration)return;
  mainProg.style.width=(mainAudio.currentTime/mainAudio.duration*100)+"%";
  curT.textContent=fmt(mainAudio.currentTime); durT.textContent=fmt(mainAudio.duration);
});
progWrap.addEventListener("click",e=>{
  if(!mainAudio.duration)return;
  const r=progWrap.getBoundingClientRect();
  mainAudio.currentTime=((e.clientX-r.left)/r.width)*mainAudio.duration;
});
volSlider.addEventListener("input",()=>mainAudio.volume=volSlider.value);
mainAudio.volume=0.8;
buildList();

// =========================================
//  GENRE TABS
// =========================================
document.querySelectorAll(".gtab").forEach(tab=>{
  tab.addEventListener("click",()=>{
    document.querySelectorAll(".gtab").forEach(t=>t.classList.remove("active"));
    document.querySelectorAll(".ba-panel").forEach(p=>p.classList.remove("active"));
    tab.classList.add("active");
    document.querySelector(`[data-panel="${tab.dataset.genre}"]`).classList.add("active");
    // stop any ab audio
    Object.values(abAudios).forEach(a=>{a.pause();});
  });
});

// =========================================
//  BEFORE / AFTER PLAYERS with AB SLIDER
// =========================================
const abConfigs = [
  { id:"Melodic Techno", beforeSrc:"audio/melodic-techno-ID123-before.mp3", afterSrc:"audio/melodic-techno-ID123-after.mp3",
    lblL:"lbl-techno-l", lblR:"lbl-techno-r", slider:"ab-techno-slider",
    btn:"ab-techno-btn", fill:"ab-techno-fill", timeEl:"ab-techno-time", prog:"ab-techno-prog" },
  { id:"Hard Bounce",   beforeSrc:"audio/hard-bounce-ID116-before.mp3",   afterSrc:"audio/hard-bounce-ID116-after.mp3",
    lblL:"lbl-dark-l",   lblR:"lbl-dark-r",   slider:"ab-dark-slider",
    btn:"ab-dark-btn",   fill:"ab-dark-fill",  timeEl:"ab-dark-time",   prog:"ab-dark-prog" },
  { id:"Melodic Techno #2",    beforeSrc:"audio/melodic-techno-2-ID115-before.mp3",    afterSrc:"audio/melodic-techno-2-ID115-after.mp3",
    lblL:"lbl-min-l",    lblR:"lbl-min-r",    slider:"ab-min-slider",
    btn:"ab-min-btn",    fill:"ab-min-fill",   timeEl:"ab-min-time",    prog:"ab-min-prog" },
];

const abAudios = {};

abConfigs.forEach(cfg=>{
  const aBefore = new Audio(cfg.beforeSrc); aBefore.preload="none";
  const aAfter  = new Audio(cfg.afterSrc);  aAfter.preload="none";
  abAudios["before_"+cfg.id] = aBefore;
  abAudios["after_"+cfg.id]  = aAfter;

  const slider  = document.getElementById(cfg.slider);
  const btn     = document.getElementById(cfg.btn);
  const fillEl  = document.getElementById(cfg.fill);
  const timeEl  = document.getElementById(cfg.timeEl);
  const progEl  = document.getElementById(cfg.prog);
  const lblL    = document.getElementById(cfg.lblL);
  const lblR    = document.getElementById(cfg.lblR);

  let playing = false;
  let currentAudio = aBefore; // default: before

  function getActive(){ return parseFloat(slider.value) >= 50 ? aAfter : aBefore; }

  // slider moves → crossfade label + switch audio source preserving time
  slider.addEventListener("input",()=>{
    const val = parseFloat(slider.value);
    const newAudio = val >= 50 ? aAfter : aBefore;
    if(newAudio !== currentAudio){
      const wasPlaying = playing;
      const savedTime = currentAudio.currentTime;
      currentAudio.pause();
      currentAudio = newAudio;
      currentAudio.currentTime = Math.min(savedTime, currentAudio.duration||0);
      if(wasPlaying) currentAudio.play();
    }
    // update labels
    if(val < 50){
      lblL.style.color="var(--acid)"; lblR.style.color="var(--muted)";
      lblL.textContent="◀ RAW"; lblR.textContent="FINISHED ▶";
    } else {
      lblL.style.color="var(--muted)"; lblR.style.color="var(--acid)";
      lblL.textContent="◀ RAW"; lblR.textContent="FINISHED ▶";
    }
    // gradient track
    slider.style.background=`linear-gradient(to right,#555 0%,#555 ${val}%,rgba(227,252,2,0.3) ${val}%,rgba(227,252,2,0.3) 100%)`;
  });

  function setPState(s){
    playing=s;
    btn.innerHTML=s
      ?'<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>'
      :'<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>';
  }

  btn.addEventListener("click",()=>{
    currentAudio = getActive();
    if(playing){ currentAudio.pause(); setPState(false); return; }
    // pause all ab audios
    Object.values(abAudios).forEach(a=>a.pause());
    document.querySelectorAll(".mini-pbtn").forEach(b=>{
      b.innerHTML='<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>';
    });
    currentAudio.play(); setPState(true);
  });

  [aBefore, aAfter].forEach(a=>{
    a.addEventListener("timeupdate",()=>{
      if(a!==currentAudio) return;
      if(!a.duration) return;
      fillEl.style.width=(a.currentTime/a.duration*100)+"%";
      timeEl.textContent=fmt(a.currentTime);
    });
    a.addEventListener("ended",()=>{ setPState(false); fillEl.style.width="0%"; });
  });

  progEl.addEventListener("click",e=>{
    if(!currentAudio.duration) return;
    const r=progEl.getBoundingClientRect();
    currentAudio.currentTime=((e.clientX-r.left)/r.width)*currentAudio.duration;
  });
});

// =========================================
//  REVIEWS MARQUEE
// =========================================
const reviews = [
  "Absolute pleasure to work with Dario again. He perfectly understood what I wanted and delivered a great, energetic mix and arrangement. Definitely won't be the last time working with him.",
  "Hired him 4 times for four different songs. Every time it was a pleasant experience due to both his communication and also the quality of his work. He delivered really good work on the spot. 10/10 would rehire.",
  "Always nice to work with Dario. It's my second time working with him and he is very good at his job. Always a pleasure — I can only recommend working with him.",
  "The project turned out even better than I expected. Thank you so much.",
  "He did his absolute best to make sure the final result fully matched my vision. His sense of arrangement and creativity made the first version already near to perfect. After just a few minor tweaks we arrived at an amazing final result with a great mix & master. Will definitely come back for more!",
  "Absolutely stunning! Thank you for your help and willingness to collaborate. I will be back! Highly recommend Dario — very easy to communicate with, and he just gets you.",
  "Very happy with the work! Everything was done very professionally and the communication was super smooth and easy. I can highly recommend working with Dario.",
  "An incredible professional! I highly recommend him. I intend to do more work with him in the future. Well done!",
];

(function buildReviews(){
  const track = document.getElementById("reviews-track");
  if(!track) return;

  // duplicate array so the seamless loop always has enough cards to fill
  const doubled = [...reviews, ...reviews];

  doubled.forEach((text) => {
    const card = document.createElement("div");
    card.className = "rev-card";
    card.innerHTML = `
      <p class="rev-quote">${text}</p>
      <div class="rev-meta">
        <span class="rev-buyer">Verified Buyer</span>
        <span class="rev-badge">Via Fiverr</span>
      </div>`;
    track.appendChild(card);
  });
})();