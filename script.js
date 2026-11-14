
const P = new URLSearchParams(location.search);

const CFG = {
  name: 'Shivangi',
  from: 'Your loving brother Aman',
  tag: 'Today belongs entirely to you.',

  wishes: [
    ['My first teacher', 'You taught me so much, even without realizing it.'],
    ['My shield', 'You have always stood beside me through everything.'],
    ['My loudest cheerleader', 'Your support means more than words can say.'],
    ['My wish for you', 'May your life always be filled with happiness and love.']
  ],

  stats: [
    ['1000+', 'Beautiful Memories'],
    ['365', 'Days of Love'],
    ['1', 'Irreplaceable Sister']
  ],

  memories: [
    ['The Beginning', 'From childhood fights to countless beautiful memories.'],
    ['Growing Together', 'Every little moment became a story worth remembering.'],
    ['Forever', 'No matter where life takes us, you will always be my sister.']
  ],

  letter: [
    'Dear Shivangi Didi,',
    'Happy Birthday! ❤️',
    'We may fight, argue and annoy each other, but you will always be one of the most special people in my life.',
    'Thank you for being my sister, my guide and my support. I may not say it every day, but I love you a lot.',
    'May every dream of yours come true. Keep smiling, keep shining and always stay happy.',
    'You deserve all the happiness in this world.',
    'With lots of love,'
  ],

  gift: 'Your little brother Aman owes you one big hug, unlimited smiles and one wish that you can ask for anytime! ❤️'
};

const $ = id => document.getElementById(id);

$('name').textContent = CFG.name;
$('tag').textContent = CFG.tag;

$('wishes').innerHTML = CFG.wishes.map(([a,b]) =>
  `<article class="glass" data-r><b>${a}</b>${b}</article>`
).join('');

$('stats').innerHTML = CFG.stats.map(([a,b]) =>
  `<article class="glass" data-r><strong>${a}</strong><span>${b}</span></article>`
).join('');

$('mem').innerHTML = CFG.memories.map(([a,b]) =>
  `<li data-r><b>${a}</b><br>${b}</li>`
).join('');

$('letterText').innerHTML = CFG.letter.map(t =>
  `<p>${t}</p>`
).join('');

$('sign').textContent = CFG.from;
$('coupon').innerHTML = `<b>A Special Gift ❤️</b><p>${CFG.gift}</p>`;

const reveal = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('in');
      reveal.unobserve(entry.target);
    }
  });
},{threshold:.12});

document.querySelectorAll('[data-r],.letter').forEach(el => reveal.observe(el));

$('begin').addEventListener('click',()=>{
  document.body.classList.add('go');
  startMusic();
});

$('blow').addEventListener('click',()=>{
  document.querySelector('.cake').classList.add('out');
  $('after').textContent = 'May all your wishes come true! ❤️';
  confetti();
});

$('openGift').addEventListener('click',()=>{
  document.querySelector('.gift').classList.add('opened');
  confetti();
});

let audio, playing=false, melodyTimer;

function startMusic(){
  if(playing) return;
  try{
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audio = new AudioContext();
    audio.resume();
    playing=true;
    playMelody();
  }catch(e){
    console.log('Audio is not supported');
  }
}

function playMelody(){
  if(!playing || !audio) return;

  const notes=[523,523,587,523,698,659,523,523,587,523,784,698];
  let i=0;

  function next(){
    if(!playing) return;
    const osc=audio.createOscillator();
    const gain=audio.createGain();

    osc.type='sine';
    osc.frequency.value=notes[i%notes.length];
    gain.gain.setValueAtTime(.0001,audio.currentTime);
    gain.gain.exponentialRampToValueAtTime(.13,audio.currentTime+.04);
    gain.gain.exponentialRampToValueAtTime(.0001,audio.currentTime+.35);

    osc.connect(gain);
    gain.connect(audio.destination);
    osc.start();
    osc.stop(audio.currentTime+.36);

    i++;
    melodyTimer=setTimeout(next,420);
  }
  next();
}

$('mel').addEventListener('click',()=>{
  if(!playing){
    startMusic();
    $('mel').textContent='♫ Stop Birthday Melody';
  }else{
    playing=false;
    clearTimeout(melodyTimer);
    if(audio) audio.suspend();
    $('mel').textContent='♫ Play Birthday Melody';
  }
});

function confetti(){
  const canvas=$('fx');
  const ctx=canvas.getContext('2d');
  canvas.width=innerWidth;
  canvas.height=innerHeight;

  const pieces=Array.from({length:140},()=>({
    x:Math.random()*canvas.width,
    y:-Math.random()*canvas.height,
    s:Math.random()*5+2,
    v:Math.random()*4+2,
    a:Math.random()*6
  }));

  let frame=0;
  function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    pieces.forEach(p=>{
      p.y+=p.v;
      p.x+=Math.sin(p.a+=.04);
      ctx.fillStyle=Math.random()>.5?'#f6d77e':'#d4af37';
      ctx.fillRect(p.x,p.y,p.s,p.s);
    });
    frame++;
    if(frame<180) requestAnimationFrame(draw);
    else ctx.clearRect(0,0,canvas.width,canvas.height);
  }
  draw();
}

window.addEventListener('scroll',()=>{
  const max=document.documentElement.scrollHeight-innerHeight;
  $('prog').style.transform=`scaleX(${max>0?scrollY/max:0})`;
});

window.addEventListener('resize',()=>{
  const canvas=$('fx');
  canvas.width=innerWidth;
  canvas.height=innerHeight;
});

document.querySelectorAll('.glass').forEach(el=>{
  el.addEventListener('pointermove',e=>{
    const r=el.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width;
    const y=(e.clientY-r.top)/r.height;
    el.style.transform=`perspective(700px) rotateX(${(0.5-y)*5}deg) rotateY(${(x-0.5)*5}deg)`;
  });
  el.addEventListener('pointerleave',()=>{
    el.style.transform='';
  });
});
