/* ===== EDIT HERE: sab details yahin se badlo ===== */
var CONFIG = {
  // Order = order of names on the card. First one is shown on top.
  couple: [
    // name = short name used across the card; fullName, parent and address show in "The Couple" section
    { name: "Abid",   role: "The Groom", fullName: "Mohd Abid Hafiz", relation: "Son of",      parent: "Late Md. Hafizur Rahman",
      address: "Raja Bari, K. Hat, Purnea" },
    { name: "Ayesha", role: "The Bride", fullName: "Ayesha Naaz",     relation: "Daughter of", parent: "Mohammad Chand",
      address: "H.No. 29/30, Muslim Basti, Golmuri, Jamshedpur (Jharkhand)" }
  ],
  // Events. "start" uses India time (+05:30). These are sample dates, change them.
  events: [
    { start: "2026-12-11T18:00:00+05:30", name: "Haldi",      desc: "An evening of colour, music and laughter with family" },
    { start: "2026-12-12T17:00:00+05:30", name: "Nikah",       desc: "The blessed solemnisation of the Nikah" },
    { start: "2026-12-13T19:30:00+05:30", name: "Taam-e-Walima", desc: "The Walima feast, hosted by the groom’s family" }
  ],
  mainEvent: "Taam-e-Walima",         // the date shown on the scratch card, countdown and footer
  durationHours: 4,                    // length of the last event, for the calendar
  venueName: "The Rose Banquet",
  venueAddress: "Madhopara, Purnea, Bihar",
  mapQuery: "The Rose Banquet, Madhopara, Purnea, Bihar",
  tagline: "Two hearts. One beautiful beginning. A lifetime, Insha’Allah.",
  welcome: "In the name of Allah, the Most Merciful, the Most Compassionate, we request the honour of your presence at the Nikah ceremony of",
  welcomeNote: "As two hearts begin a beautiful journey together, your presence and prayers will make this blessed occasion even more special.",
  // Our Story milestones (sample text, replace with your own). Add or remove items freely.
  story: [
    { when: "Chapter One",   title: "Where It Began",     text: "A few warm words about how Abid and Ayesha first met." },
    { when: "Chapter Two",   title: "Two Families, One Dua", text: "The day both families met and said yes, alhamdulillah." },
    { when: "Chapter Three", title: "Forever Begins",     text: "Now we begin our journey together, and we want you with us." }
  ],
  transport: "Parking is available at the venue. For help with rides or pickups, please contact the family.",
  accommodation: "Rooms for out-of-town guests are arranged nearby. Please let us know in advance.",
  photos: [],                          // optional photo URLs / data URIs shown after the scratch card
  hosts: "With love, the families of Abid & Ayesha"
};
/* ================================================= */

(function(){
  var $=function(id){return document.getElementById(id)};
  var C=CONFIG, NS="http://www.w3.org/2000/svg";
  var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  var dpr=Math.min(2,window.devicePixelRatio||1);
  var A=C.couple[0].name,B=C.couple[1].name;
  var ev=C.events.slice().sort(function(a,b){return new Date(a.start)-new Date(b.start)});
  var main=ev.filter(function(e){return e.name===C.mainEvent})[0]||ev.filter(function(e){return /nikah/i.test(e.name)})[0]||ev[0];
  var start=new Date(main.start), endAll=new Date(new Date(ev[ev.length-1].start).getTime()+C.durationHours*3600000);

  /* ---------- text ---------- */
  $('n1').textContent=A; $('n2').textContent=B; $('lt').textContent=A+" & "+B;
  /* ---------- the couple: groom card, "with" ornament, bride card ---------- */
  var PIN='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.400" aria-hidden="true"><path d="M12 21s-7-6.200-7-11.200A7 7 0 0 1 19 9.800C19 14.800 12 21 12 21z"/><circle cx="12" cy="10" r="2.500"/></svg>';
  C.couple.forEach(function(c,i){
    if(i)$('couple').insertAdjacentHTML('beforeend','<div class="with" aria-hidden="true"><span>with</span></div>');
    var d=document.createElement('div');d.className='cc';
    d.innerHTML='<div class="role"></div><div class="fn"></div><div class="rel"></div><div class="par"></div><div class="addr">'+PIN+'<span></span></div>';
    d.querySelector('.role').textContent=c.role||'';
    d.querySelector('.fn').textContent=c.fullName||c.name;
    d.querySelector('.rel').textContent=c.relation||'';
    d.querySelector('.par').textContent=c.parent||'';
    d.querySelector('.addr span').textContent=c.address||'';
    if(!c.parent){d.querySelector('.rel').hidden=true;d.querySelector('.par').hidden=true}
    if(!c.address)d.querySelector('.addr').hidden=true;
    $('couple').appendChild(d);
  });
  $('tagline').textContent=C.tagline;
  $('welcome').textContent=C.welcome; $('wNames').textContent=A+" & "+B; $('welcomeNote').textContent=C.welcomeNote;
  $('vName').textContent=C.venueName; $('vAddr').textContent=C.venueAddress;
  $('mapbtn').href="https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(C.mapQuery);
  $('transport').textContent=C.transport;
  if(C.accommodation)$('accom').textContent=C.accommodation;else $('stay').hidden=true;
  $('sign').textContent=A+" & "+B; $('hosts').textContent=C.hosts;
  document.title=A+" & "+B+" Wedding Invitation";
  (C.story||[]).forEach(function(s){var d=document.createElement('div');d.className='st';d.innerHTML='<div class="y"></div><div class="h"></div><div class="b"></div>';d.querySelector('.y').textContent=s.when;d.querySelector('.h').textContent=s.title;d.querySelector('.b').textContent=s.text;$('story').appendChild(d)});

  var months=["January","February","March","April","May","June","July","August","September","October","November","December"];
  var days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  function ist(d){return new Date(new Date(d).getTime()+330*60000)}
  function clock(d){var x=ist(d),h=x.getUTCHours(),m=x.getUTCMinutes();return (h%12||12)+":"+String(m).padStart(2,'0')+" "+(h<12?"AM":"PM")}
  var sd=ist(start);
  $('dDate').textContent=String(sd.getUTCDate()).padStart(2,'0') + " " + months[sd.getUTCMonth()] + " " + sd.getUTCFullYear();
  $('dDay').textContent=clock(start) + " · " + C.venueName;
  $('fDate').textContent=String(sd.getUTCDate()).padStart(2,'0')+" "+months[sd.getUTCMonth()]+" "+sd.getUTCFullYear()+" · "+clock(start);

  var ICONS={
    hand:'<path d="M7.500 12.500V6.800a1.250 1.250 0 0 1 2.500 0V11M10 11V4.800a1.250 1.250 0 0 1 2.500 0V11M12.500 11V5.600a1.250 1.250 0 0 1 2.500 0v5.900M15 11.500V8a1.250 1.250 0 0 1 2.500 0v5.500c0 4-2.400 7-6 7-2.600 0-4-1.300-5.300-3.400L4 13.600a1.300 1.300 0 0 1 2-1.600l1.500 1.600"/><circle cx="11.800" cy="15.600" r="1.500"/><g fill="currentColor" stroke="none"><circle cx="11.800" cy="12.700" r=".5"/><circle cx="9.200" cy="15.600" r=".5"/><circle cx="14.400" cy="15.600" r=".5"/><circle cx="11.800" cy="18.400" r=".5"/></g>',
    rings:'<circle cx="9" cy="14.500" r="5"/><circle cx="15" cy="14.500" r="5"/><path d="M15 9.500l-1.600-2.200L15 5.200l1.600 2.100z"/>',
    plate:'<circle cx="12.200" cy="13" r="5.400"/><circle cx="12.200" cy="13" r="3.200"/><path d="M3 4v4.200a1.500 1.500 0 0 0 3 0V4M4.500 9.700V21M21 4c-1.500 1-2.300 3.300-2.300 6.400H21V21"/>',
    star:'<path d="M12 3 14 10 21 12 14 14 12 21 10 14 3 12 10 10Z"/>'
  };
  function evIcon(n){return /haldi|mehndi|mayun/i.test(n)?ICONS.hand:/nikah/i.test(n)?ICONS.rings:/walima|dinner|reception/i.test(n)?ICONS.plate:ICONS.star}
  ev.forEach(function(e){
    var x=ist(e.start),el=document.createElement('div');el.className='ev';
    el.innerHTML='<div class="node"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.300" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+evIcon(e.name)+'</svg></div><div class="dt"><div class="dd"></div><div class="mm"></div></div><div><div class="n"></div><div class="t"></div><div class="d"></div></div>';
    el.querySelector('.dd').textContent=x.getUTCDate();
    el.querySelector('.mm').textContent=months[x.getUTCMonth()].slice(0,3);
    el.querySelector('.n').textContent=e.name;
    el.querySelector('.t').textContent=days[x.getUTCDay()] + " · " + clock(e.start);
    el.querySelector('.d').textContent=e.desc;
    $('events').appendChild(el);
  });

  /* ---------- timeline: gold line draws down as you scroll, icons light up ---------- */
  var evWrap=$('events');
  function tl(){
    var r=evWrap.getBoundingClientRect(),p=Math.max(0,Math.min(1,(innerHeight*.8-r.top)/r.height));
    evWrap.style.setProperty('--tl',p.toFixed(3));
    evWrap.querySelectorAll('.ev').forEach(function(e){e.classList.toggle('lit',e.offsetTop+e.offsetHeight/2<=p*r.height+2)});
  }
  if(reduce){evWrap.style.setProperty('--tl',1);evWrap.querySelectorAll('.ev').forEach(function(e){e.classList.add('lit')})}
  else{var tlq=false;addEventListener('scroll',function(){if(!tlq){tlq=true;requestAnimationFrame(function(){tlq=false;tl()})}},{passive:true});addEventListener('resize',tl);tl()}

  if(C.photos&&C.photos.length){C.photos.forEach(function(u){var i=new Image();i.src=u;i.alt="";$('galGrid').appendChild(i)});$('gal').hidden=false}

  function g(d){return d.toISOString().replace(/[-:]/g,'').replace(/\.\d+/,'')}
  $('calbtn').href="https://calendar.google.com/calendar/render?action=TEMPLATE&text="+encodeURIComponent(A+" & "+B+" Wedding")+
    "&dates="+g(new Date(ev[0].start))+"/"+g(endAll)+"&location="+encodeURIComponent(C.venueName+", "+C.venueAddress)+
    "&details="+encodeURIComponent(main.name+": "+sd.getUTCDate()+" "+months[sd.getUTCMonth()]+", "+clock(start));

  /* ---------- countdown ---------- */
  // flip card: static top = new, static bottom = old; top flap folds the old value down, bottom flap unfolds the new one
  function flipHTML(o,n){return '<span class="flip"><span class="sz">'+n+'</span><span class="h u"><span>'+n+'</span></span><span class="h l"><span>'+o+'</span></span><span class="h fu"><span>'+o+'</span></span><span class="h fl"><span>'+n+'</span></span></span>'}
  var cur={};
  function setT(id,v){
    var el=$(id),o=cur[id];if(o===v)return;cur[id]=v;
    if(o===undefined||reduce){el.innerHTML=flipHTML(v,v);return}
    el.innerHTML=flipHTML(o,v);var f=el.firstChild;void f.offsetWidth;f.classList.add('go');
    setTimeout(function(){if(cur[id]===v)el.innerHTML=flipHTML(v,v)},650);
  }
  function tick(){
    var s=Math.max(0,Math.floor((start-new Date())/1000));
    setT('cd',String(Math.floor(s/86400)));
    setT('ch',String(Math.floor(s%86400/3600)).padStart(2,'0'));
    setT('cm',String(Math.floor(s%3600/60)).padStart(2,'0'));
    setT('cs',String(s%60).padStart(2,'0'));
  }
  tick(); setInterval(tick,1000);

  /* ---------- scroll reveal ---------- */
  if(!reduce&&'IntersectionObserver' in window){
    var io=new IntersectionObserver(function(ents){
      for(var i=0;i<ents.length;i++)if(ents[i].isIntersecting)reveal(ents[i].target);
    },{threshold:.1,rootMargin:'0px 0px -9% 0px'});
    var reveal=function(t){
      if(!t.classList.contains('rv'))return;
      t.classList.add('in');io.unobserve(t);
      t.addEventListener('animationend',function done(e){
        if(e.target!==t)return;
        t.classList.remove('rv','in');t.style.animationDelay='';
        t.removeEventListener('animationend',done);
      });
    };
    document.querySelectorAll('main section, main footer').forEach(function(s){
      if(s.classList.contains('hero')||s.querySelector('.events')||s.querySelector('.count')||s.querySelector('.couple'))return;
      s.classList.add('rv');io.observe(s);
    });
    var stag={};
    document.querySelectorAll('.events .ev, .count div, .couple>*').forEach(function(el){
      var k=el.parentElement.id||'x';stag[k]=stag[k]||0;
      el.classList.add('rv');el.style.animationDelay=(stag[k]*.09)+'s';stag[k]++;
      io.observe(el);
    });
    document.querySelectorAll('.rv').forEach(function(el){
      if(el.offsetParent&&el.getBoundingClientRect().top<innerHeight*.92)reveal(el);
    });
  }

  /* ---------- section dividers draw themselves ---------- */
  var drawIO=(!reduce&&'IntersectionObserver' in window)?new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('drawn');drawIO.unobserve(e.target)}})},{threshold:.15}):null;
  document.querySelectorAll('section.rule').forEach(function(s){if(drawIO)drawIO.observe(s);else s.classList.add('drawn')});

  /* ---------- Islamic hero illustration ---------- */
  var ST='fill="none" stroke="#d9bd86" stroke-opacity=".85" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"';
  var GD='#b08d57';
  function star8(cx,cy,r,fill){
    var q=r*.7071;
    return '<g fill="'+fill+'" stroke="'+GD+'" stroke-width="1" stroke-linejoin="round"><path d="M'+cx+' '+(cy-r)+'L'+(cx+r)+' '+cy+'L'+cx+' '+(cy+r)+'L'+(cx-r)+' '+cy+'Z"/><path d="M'+(cx-q)+' '+(cy-q)+'H'+(cx+q)+'V'+(cy+q)+'H'+(cx-q)+'Z"/></g>';
  }
  function lantern(x,top,chain,k){
    var y=top+chain;
    return '<path d="M'+x+' '+top+'V'+y+'" stroke="'+GD+'" stroke-width="1" fill="none"/>'+
    '<g transform="translate('+x+' '+y+') scale('+k+')" '+ST+'>'+
    '<path d="M-6 0h12l7 11h-26z" fill="#1b3d72" stroke="'+GD+'"/>'+
    '<path d="M-18 11C-27 32 -27 52 -18 68H18C27 52 27 32 18 11Z" fill="#f0c878" fill-opacity=".28"/>'+
    '<ellipse class="lamp" cx="0" cy="44" rx="8" ry="12" fill="#ffdf94" fill-opacity=".7" stroke="none"/>'+
    '<path d="M-9 11C-14 32 -14 52 -9 68M9 11C14 32 14 52 9 68M0 11V68M-6 58V38Q0 28 6 38V58"/>'+
    '<path d="M-18 68h36l-6 9h-24z" fill="#1b3d72" stroke="'+GD+'"/>'+
    '<path d="M0 77v11" stroke="'+GD+'"/><circle cx="0" cy="91" r="2.500" fill="'+GD+'" stroke="none"/></g>';
  }
  function minaret(x){
    return '<g '+ST+'>'+
    '<path d="M'+(x-8)+' 700V572H'+(x+8)+'V700" fill="#17376a"/>'+
    '<path d="M'+(x-13)+' 572H'+(x+13)+'M'+(x-12)+' 566H'+(x+12)+'" />'+
    '<path d="M'+(x-6)+' 566V536H'+(x+6)+'V566" fill="#17376a"/>'+
    '<path d="M'+(x-9)+' 536L'+x+' 506L'+(x+9)+' 536Z" fill="#17376a"/>'+
    '<path d="M'+x+' 506V494" stroke="'+GD+'"/><circle cx="'+x+'" cy="491" r="2.500" fill="'+GD+'" stroke="none"/>'+
    '<path d="M'+(x-3)+' 640V626Q'+x+' 620 '+(x+3)+' 626V640M'+(x-3)+' 600V588Q'+x+' 583 '+(x+3)+' 588V600"/></g>';
  }
  function mosque(){
    return '<g '+ST+'>'+
    '<path d="M104 700V664H140V700M260 700V664H296V700" fill="#17376a"/>'+
    '<path d="M104 664Q122 638 140 664M260 664Q278 638 296 664" fill="#17376a"/>'+
    '<path d="M138 700V642H262V700" fill="#17376a"/>'+
    '<path d="M146 642C146 596 176 574 200 568C224 574 254 596 254 642Z" fill="#17376a"/>'+
    '<path d="M200 568V552" stroke="'+GD+'"/>'+
    '<path d="M180 700V672Q200 648 220 672V700" /><path d="M154 700V664Q162 654 170 664V700M230 700V664Q238 654 246 664V700"/>'+
    '<path d="M162 630Q200 604 238 630" opacity=".7"/>'+
    '</g>'+
    '<mask id="mkMosque"><rect width="400" height="800" fill="#000"/><circle cx="200" cy="546" r="9" fill="#17376a"/><circle cx="204" cy="543" r="8" fill="#000"/></mask><rect width="400" height="800" fill="'+GD+'" mask="url(#mkMosque)"/>'+
    minaret(66)+minaret(334);
  }
  function heroArt(){
    var s='';
    s+='<defs><linearGradient id="hg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0c1d3a" stop-opacity="0"/><stop offset="1" stop-color="#081630" stop-opacity=".85"/></linearGradient>'+
       '<radialGradient id="glow" cx=".5" cy=".4" r=".6"><stop offset="0" stop-color="#f0c878" stop-opacity=".5"/><stop offset=".5" stop-color="#c9a45f" stop-opacity=".15"/><stop offset="1" stop-color="#c9a45f" stop-opacity="0"/></radialGradient>'+
       '<mask id="mkMoon"><rect width="400" height="100" fill="#000"/><circle cx="200" cy="42" r="23" fill="#fff"/><circle cx="210" cy="36" r="19" fill="#000"/></mask>'+
       '<radialGradient id="moonG"><stop offset="0" stop-color="#ffe7ad" stop-opacity=".55"/><stop offset=".45" stop-color="#f0c878" stop-opacity=".18"/><stop offset="1" stop-color="#f0c878" stop-opacity="0"/></radialGradient>'+
       '<linearGradient id="shootG" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="-80" y2="-30"><stop offset="0" stop-color="#fff6dc"/><stop offset="1" stop-color="#fff6dc" stop-opacity="0"/></linearGradient></defs>';
    s+='<rect width="400" height="800" fill="url(#hg)"/>';
    s+='<path d="M34 700V340C34 220 150 150 200 80C250 150 366 220 366 340V700Z" fill="#1d4278" fill-opacity=".38"/>';
    s+='<ellipse cx="200" cy="360" rx="150" ry="230" fill="url(#glow)"/>';
    s+='<path d="M34 700V340C34 220 150 150 200 80C250 150 366 220 366 340V700" '+ST+' stroke-width="1.6"/>';
    s+='<path d="M48 700V340C48 232 156 166 200 104C244 166 352 232 352 340V700" '+ST+' stroke="'+GD+'" stroke-width="1"/>';
    // night sky: tiny twinkling stars, each on its own rhythm
    for(var si=0;si<46;si++)s+='<circle class="sky" cx="'+(Math.random()*400).toFixed(1)+'" cy="'+(6+Math.random()*500).toFixed(1)+'" r="'+(.5+Math.random()*1.1).toFixed(2)+'" fill="#fff3d6" style="animation-delay:-'+(Math.random()*4).toFixed(2)+'s;animation-duration:'+(2.5+Math.random()*3).toFixed(2)+'s"/>';
    s+='<g class="shoot"><path d="M0 0L-80 -30" stroke="url(#shootG)" stroke-width="1.600" stroke-linecap="round"/><circle r="1.700" fill="#fff6dc"/></g>';
    s+='<circle class="moonglow" cx="200" cy="42" r="44" fill="url(#moonG)"/>';
    s+='<rect width="400" height="100" fill="'+GD+'" mask="url(#mkMoon)"/>'+star8(234,34,8,'#e6cf9e')+'<g class="htw">'+star8(120,48,5,'#e6cf9e')+star8(22,200,5,'#e6cf9e')+'</g><g class="htw htw2">'+star8(300,62,4,'#e6cf9e')+star8(380,214,5,'#e6cf9e')+'</g>';
    s+='<g class="sway"><g class="lan-c">'+lantern(200,104,12,.72)+'</g></g>'+lantern(62,0,44,.62)+lantern(340,0,78,.55);
    s+=mosque();
    s+='<g '+ST+'><path d="M-10 700H410M-10 716H410" /></g>';
    s+=star8(120,740,6,'#e6cf9e')+star8(200,744,7,'#e6cf9e')+star8(280,740,6,'#e6cf9e');
    return s;
  }
  $('heroArt').innerHTML=heroArt();

  /* ---------- scratch card ---------- */
  function heart(w,h){
    function X(v){return (w*v/100).toFixed(2)}
    function Y(v){return (h*v/100).toFixed(2)}
    return "M "+X(50)+" "+Y(92)+
      " C "+X(20)+" "+Y(68)+" "+X(4)+" "+Y(50)+" "+X(4)+" "+Y(31)+
      " C "+X(4)+" "+Y(16)+" "+X(15)+" "+Y(6)+" "+X(28)+" "+Y(6)+
      " C "+X(38)+" "+Y(6)+" "+X(46)+" "+Y(12)+" "+X(50)+" "+Y(20)+
      " C "+X(54)+" "+Y(12)+" "+X(62)+" "+Y(6)+" "+X(72)+" "+Y(6)+
      " C "+X(85)+" "+Y(6)+" "+X(96)+" "+Y(16)+" "+X(96)+" "+Y(31)+
      " C "+X(96)+" "+Y(50)+" "+X(80)+" "+Y(68)+" "+X(50)+" "+Y(92)+" Z";
  }
  $('hp').setAttribute('d',heart(300,276));
  var sc=$('sc'),sw=$('sw'),prog=$('scProg'),ctx=sc.getContext('2d',{willReadFrequently:true}),done=false,drawing=false,last=null,W=0,H=0,coverTotal=0,lastCheck=0,heartPath=null;
  function paintCover(){
    W=sw.offsetWidth;H=sw.offsetHeight;
    sc.width=W*dpr;sc.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);
    ctx.clearRect(0,0,W,H);ctx.globalCompositeOperation='source-over';
    var p=heartPath=new Path2D(heart(W,H)),gr=ctx.createLinearGradient(0,0,W,H);
    gr.addColorStop(0,'#9b7435');gr.addColorStop(.5,'#e6cd86');gr.addColorStop(1,'#755324');
    ctx.fillStyle=gr;ctx.fill(p);
    // gold foil: soft sparkle dots + an inner heart border, like a real scratch card
    ctx.save();ctx.clip(p);ctx.fillStyle='rgba(255,255,255,.12)';
    for(var i=0;i<90;i++){ctx.beginPath();ctx.arc(Math.random()*W,Math.random()*H,Math.random()*1.5+.3,0,6.283);ctx.fill()}
    ctx.translate(W/2,H/2);ctx.scale(.86,.86);ctx.translate(-W/2,-H/2);ctx.lineWidth=1/.86;ctx.strokeStyle='rgba(50,35,12,.28)';ctx.stroke(p);
    ctx.restore();ctx.lineJoin='round';ctx.lineWidth=2;ctx.strokeStyle='rgba(255,240,200,.95)';ctx.stroke(p);
    var d=ctx.getImageData(0,0,sc.width,sc.height).data,t=0;
    for(var j=3;j<d.length;j+=64){if(d[j]>40)t++}
    coverTotal=t;prog.textContent='0% revealed';
  }
  paintCover();
  function scratch(e){
    if(!drawing||done)return;
    var r=sc.getBoundingClientRect(),k=W/r.width,x=(e.clientX-r.left)*k,y=(e.clientY-r.top)*k;
    flakes(e.clientX,e.clientY,last?2:6);
    ctx.globalCompositeOperation='destination-out';ctx.lineWidth=W*.12;ctx.lineCap='round';ctx.lineJoin='round';
    ctx.beginPath();
    if(last){ctx.moveTo(last.x,last.y);ctx.lineTo(x,y);ctx.stroke()}else{ctx.arc(x,y,W*.06,0,6.283);ctx.fill()}
    last={x:x,y:y};
    var n=Date.now();if(n-lastCheck>60){lastCheck=n;check()}
  }
  function check(){
    // count gold still left on the heart; the corners outside the heart are always transparent, so they must not count as scratched
    var d=ctx.getImageData(0,0,sc.width,sc.height).data,left=0;
    for(var i=3;i<d.length;i+=64){if(d[i]>40)left++}
    if(!coverTotal)return;
    var pct=Math.max(0,Math.min(100,Math.round((coverTotal-left)/coverTotal*100)));
    prog.textContent=pct+'% revealed';
    if(pct>=45)finish();
  }
  function finish(){
    if(done)return;done=true;
    sc.style.transition='opacity .8s';sc.style.opacity='0';sc.style.pointerEvents='none';
    sw.classList.add('revealed');prog.textContent='Revealed ✦';
    $('after').classList.add('on');burst();
  }
  // only a touch that starts on the gold heart scratches; the empty corners around it scroll the page like normal
  function inHeart(cx,cy){if(!heartPath)return false;var r=sc.getBoundingClientRect(),k=W/r.width;return ctx.isPointInPath(heartPath,(cx-r.left)*k*dpr,(cy-r.top)*k*dpr)}
  sc.addEventListener('pointerdown',function(e){if(!inHeart(e.clientX,e.clientY))return;sw.classList.add('touched');drawing=true;last=null;sc.setPointerCapture(e.pointerId);scratch(e)});
  sc.addEventListener('pointermove',scratch);
  ['pointerup','pointercancel','pointerleave'].forEach(function(t){sc.addEventListener(t,function(){drawing=false;last=null;if(!done)check()})});
  // a touch that starts on the heart scratches (page scroll held for that one gesture);
  // a touch anywhere else, or any touch after the reveal, scrolls the page normally
  var holdScroll=false;
  sc.addEventListener('touchstart',function(e){var t=e.touches[0];holdScroll=!done&&!!t&&inHeart(t.clientX,t.clientY);if(holdScroll)e.preventDefault()},{passive:false});
  sc.addEventListener('touchmove',function(e){if(holdScroll&&!done)e.preventDefault()},{passive:false});
  // mobile address bar firing resize must not repaint the cover and wipe the scratching; only a real width change does
  window.addEventListener('resize',function(){if(!done&&Math.abs(sw.offsetWidth-W)>1)paintCover()});
  sc.tabIndex=0;
  sc.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();finish()}});

  /* ---------- petals + confetti ---------- */
  var pc=$('petals'),px=pc.getContext('2d'),parts=[],running=false,fallUntil=0;
  function size(){pc.width=innerWidth*dpr;pc.height=innerHeight*dpr;px.setTransform(dpr,0,0,dpr,0,0)}
  size();addEventListener('resize',size);
  var petalCols=['#fff4e6','#f9e3e3','#f4c6c6','#e8a7a7','#f3e2b4','#d9bd86'];
  var heartCols=['#f0c878','#e6cd86','#f4c6c6','#fff4e6','#e8a7a7','#d9bd86'];
  function petal(x,y,vy,b){var c=b?heartCols:petalCols;return{x:x,y:y,vx:b?(Math.random()-.5)*9:0,vy:b?-(Math.random()*9+3):vy,r:b?Math.random()*5+4:Math.random()*5+5,a:Math.random()*6.28,va:(Math.random()-.5)*(b?.08:.04),fl:Math.random()*6.28,vfl:.02+Math.random()*.04,c:c[Math.random()*c.length|0],life:b?140:0,sw:Math.random()*6.28,burst:b}}
  function burst(){if(reduce)return;var r=sw.getBoundingClientRect();for(var i=0;i<60;i++)parts.push(petal(r.left+r.width/2,r.top+r.height*.45,0,true));run()}
  function fall(){if(reduce)return;fallUntil=Date.now()+10000;for(var i=0;i<30;i++)parts.push(petal(Math.random()*innerWidth,-Math.random()*innerHeight,Math.random()*1.1+.5,false));run()}
  function drawHeart(r){px.moveTo(0,r*.9);px.bezierCurveTo(-r*1.2,0,-r*.9,-r,0,-r*.35);px.bezierCurveTo(r*.9,-r,r*1.2,0,0,r*.9)}
  function drawPetal(r){px.moveTo(0,r);px.bezierCurveTo(r*.95,r*.55,r*.8,-r*.75,r*.18,-r);px.quadraticCurveTo(0,-r*.78,-r*.18,-r);px.bezierCurveTo(-r*.8,-r*.75,-r*.95,r*.55,0,r)}
  function run(){if(running)return;running=true;requestAnimationFrame(loop)}
  function loop(){
    px.clearRect(0,0,innerWidth,innerHeight);
    for(var i=parts.length-1;i>=0;i--){
      var p=parts[i];
      if(p.burst){p.vy+=.28;p.vx*=.985;p.life--;if(p.life<=0){parts.splice(i,1);continue}}
      else{p.sw+=.03;p.vx=Math.sin(p.sw)*.7;if(p.y>innerHeight+10){if(Date.now()>fallUntil){parts.splice(i,1);continue}p.y=-10;p.x=Math.random()*innerWidth}}
      p.x+=p.vx;p.y+=p.vy;p.a+=p.va;p.fl+=p.vfl;
      px.save();px.translate(p.x,p.y);px.rotate(p.a);px.globalAlpha=p.burst?Math.min(1,p.life/40):.9;
      px.fillStyle=p.c;px.beginPath();
      if(p.burst){drawHeart(p.r);px.fill()}
      else{px.scale(Math.cos(p.fl),1);drawPetal(p.r);px.fill();px.strokeStyle='rgba(255,255,255,.4)';px.lineWidth=.6;px.beginPath();px.moveTo(0,p.r*.8);px.quadraticCurveTo(p.r*.12,0,0,-p.r*.7);px.stroke()}
      px.restore();
    }
    if(parts.length)requestAnimationFrame(loop);else{running=false;px.clearRect(0,0,innerWidth,innerHeight)}
  }

  /* ---------- background music (assets/tere-bina-na-guzara-ae.mp3) ---------- */
  var audio=$('bgAudio'),playing=false,snd=$('sound'),VOL=.24,fadeT=null;
  function fadeTo(v,ms,cb){
    clearInterval(fadeT);var s=audio.volume,t0=Date.now();
    fadeT=setInterval(function(){var k=Math.min(1,(Date.now()-t0)/ms);audio.volume=Math.max(0,Math.min(1,s+(v-s)*k));if(k>=1){clearInterval(fadeT);cb&&cb()}},40);
  }
  function music(on){
    if(on){
      playing=true;snd.classList.remove('muted');
      audio.volume=0;var p=audio.play();fadeTo(VOL,3000);
      if(p&&p.catch)p.catch(function(){playing=false;snd.classList.add('muted')});
    }else{playing=false;snd.classList.add('muted');fadeTo(0,400,function(){if(!playing)audio.pause()})}
  }
  snd.classList.add('muted');
  snd.addEventListener('click',function(){music(!playing)});

  /* ---------- gold sparkle trail on mouse / touch ---------- */
  var sk=$('spark'),sx=sk.getContext('2d'),sp=[],srun=false,lx=-1,ly=-1;
  function skSize(){sk.width=innerWidth*dpr;sk.height=innerHeight*dpr;sx.setTransform(dpr,0,0,dpr,0,0)}
  skSize();addEventListener('resize',skSize);
  var skCols=['#ffe9b0','#f0c878','#ffffff','#d9bd86','#bcd6f5'];
  function spawn(x,y,n,big){
    for(var i=0;i<n;i++)sp.push({x:x+(Math.random()-.5)*8,y:y+(Math.random()-.5)*8,
      vx:(Math.random()-.5)*(big?5:1.4),vy:(big?(Math.random()-.5)*5:Math.random()*.9+.1),
      s:(big?4:2.5)+Math.random()*(big?6:4.5),a:1,d:.016+Math.random()*.02,r:Math.random()*6.28,vr:(Math.random()-.5)*.12,c:skCols[Math.random()*skCols.length|0]});
    if(!srun){srun=true;requestAnimationFrame(skLoop)}
  }
  // gold foil flakes that fly off the scratch card
  var flakeCols=['#e6cd86','#c9a45f','#f3e2b4','#9b7435','#fff1c7'];
  function flakes(x,y,n){
    if(reduce)return;
    for(var i=0;i<n;i++)sp.push({f:1,x:x+(Math.random()-.5)*14,y:y+(Math.random()-.5)*14,vx:(Math.random()-.5)*3.2,vy:-Math.random()*2.2-.4,
      s:1.4+Math.random()*2.6,a:1,d:.014+Math.random()*.012,r:Math.random()*6.28,vr:(Math.random()-.5)*.35,c:flakeCols[Math.random()*flakeCols.length|0]});
    if(!srun){srun=true;requestAnimationFrame(skLoop)}
  }
  function skLoop(){
    sx.clearRect(0,0,innerWidth,innerHeight);
    for(var i=sp.length-1;i>=0;i--){
      var p=sp[i];p.x+=p.vx;p.y+=p.vy;p.vy+=p.f?.17:.012;p.r+=p.vr;p.a-=p.d;
      if(p.a<=0){sp.splice(i,1);continue}
      sx.save();sx.translate(p.x,p.y);sx.rotate(p.r);sx.globalAlpha=Math.max(0,p.a);
      if(p.f){sx.fillStyle=p.c;sx.beginPath();sx.moveTo(-p.s,-p.s*.6);sx.lineTo(p.s*.8,-p.s*.4);sx.lineTo(p.s*.5,p.s*.7);sx.lineTo(-p.s*.7,p.s*.5);sx.closePath();sx.fill();sx.restore();continue}
      sx.fillStyle=p.c;sx.shadowColor='#f0c878';sx.shadowBlur=8;
      var r=p.s*(.5+p.a*.5),k=r*.28;
      sx.beginPath();sx.moveTo(0,-r);sx.lineTo(k,-k);sx.lineTo(r,0);sx.lineTo(k,k);sx.lineTo(0,r);sx.lineTo(-k,k);sx.lineTo(-r,0);sx.lineTo(-k,-k);sx.closePath();sx.fill();
      sx.restore();
    }
    if(sp.length)requestAnimationFrame(skLoop);else{srun=false;sx.clearRect(0,0,innerWidth,innerHeight)}
  }
  if(!reduce){
    addEventListener('pointermove',function(e){
      if(lx<0){lx=e.clientX;ly=e.clientY}
      var dx=e.clientX-lx,dy=e.clientY-ly,d=Math.sqrt(dx*dx+dy*dy);
      if(d>7){spawn(e.clientX,e.clientY,Math.min(3,1+(d/22|0)),false);lx=e.clientX;ly=e.clientY}
    },{passive:true});
    addEventListener('pointerdown',function(e){lx=e.clientX;ly=e.clientY;spawn(e.clientX,e.clientY,14,true)},{passive:true});
  }

  /* ---------- Islamic door ---------- */
  (function(){
    var GD='#d9bd86',GD2='#b08d57',env=$('env');
    function st8(cx,cy,r,sw,fill){var q=r*.7071;return '<g fill="'+(fill||'none')+'" stroke="'+GD+'" stroke-width="'+(sw||1)+'" stroke-linejoin="round"><path d="M'+cx+' '+(cy-r)+'L'+(cx+r)+' '+cy+'L'+cx+' '+(cy+r)+'L'+(cx-r)+' '+cy+'Z"/><path d="M'+(cx-q)+' '+(cy-q)+'H'+(cx+q)+'V'+(cy+q)+'H'+(cx-q)+'Z"/></g>'}
    function leafArt(){
      var s='<path d="M0 470V175C0 92 112 52 150 0V470Z" fill="url(#dg)" stroke="'+GD2+'" stroke-width="2.5"/>';
      s+='<path d="M0 470V175C0 92 112 52 150 0V470Z" fill="url(#lat)" opacity=".5"/>';
      s+='<path d="M11 462V178C11 104 112 66 140 20V462Z" fill="none" stroke="'+GD+'" stroke-width="1.2"/>';
      s+='<path d="M26 268V198Q26 156 78 130Q128 156 128 198V268Z" fill="rgba(8,24,52,.35)" stroke="'+GD+'" stroke-width="1.4"/>';
      s+=st8(77,206,30,1.4)+st8(77,206,19,1)+'<circle cx="77" cy="206" r="5" fill="'+GD+'"/>';
      s+='<rect x="26" y="284" width="102" height="92" rx="2" fill="rgba(8,24,52,.35)" stroke="'+GD+'" stroke-width="1.4"/>';
      s+=st8(52,330,14,1)+st8(102,330,14,1)+st8(77,330,10,.8);
      s+='<rect x="26" y="392" width="102" height="56" rx="2" fill="rgba(8,24,52,.35)" stroke="'+GD+'" stroke-width="1.4"/>';
      s+=st8(52,420,10,1)+st8(77,420,10,1)+st8(102,420,10,1);
      [[19,284],[19,376],[19,392],[19,448],[135,284],[135,376]].forEach(function(p){s+='<circle cx="'+p[0]+'" cy="'+p[1]+'" r="2.200" fill="'+GD+'"/>'});
      s+='<g class="knock" style="transform-origin:135px 330px"><circle cx="135" cy="330" r="13" fill="#14305a" stroke="'+GD+'" stroke-width="1.600"/><circle cx="135" cy="330" r="7" fill="none" stroke="'+GD+'" stroke-width="2.600"/><circle cx="135" cy="330" r="2" fill="'+GD+'"/></g>';
      return s;
    }
    var defs='<defs><linearGradient id="dg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2f5a94"/><stop offset=".55" stop-color="#1f3f70"/><stop offset="1" stop-color="#16315c"/></linearGradient>'+
      '<pattern id="lat" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M15 3 27 15 15 27 3 15ZM7.200 7.200H22.800V22.800H7.200Z" fill="none" stroke="'+GD+'" stroke-width=".5"/></pattern>'+
      '<radialGradient id="lg" cx=".5" cy=".55" r=".65"><stop offset="0" stop-color="#fff0c4"/><stop offset=".3" stop-color="#f0c878"/><stop offset=".7" stop-color="#6b5a5a"/><stop offset="1" stop-color="#16315f"/></radialGradient></defs>';
    var L='<svg viewBox="0 0 150 470" preserveAspectRatio="none" aria-hidden="true">'+defs+leafArt()+'</svg>';
    var Rr='<svg viewBox="0 0 150 470" preserveAspectRatio="none" aria-hidden="true"><g transform="translate(150 0) scale(-1 1)">'+leafArt()+'</g></svg>';
    $('leafL').innerHTML=L; $('leafR').innerHTML=Rr;
    $('doorLight').innerHTML='<svg viewBox="0 0 300 470" preserveAspectRatio="none" aria-hidden="true"><path d="M0 470V175C0 92 112 52 150 0C188 52 300 92 300 175V470Z" fill="url(#lg)"/><g opacity=".5">'+st8(150,235,70,1.2)+st8(150,235,48,1)+'</g></svg>';
    $('doorGlow').innerHTML='<svg viewBox="0 0 300 470" preserveAspectRatio="none" aria-hidden="true"><path d="M0 470V175C0 92 112 52 150 0C188 52 300 92 300 175V470Z" fill="none" stroke="#f3e6c8" stroke-width="3"/></svg>';
    var fr=document.createElement('div');fr.className='frame';
    fr.innerHTML='<svg viewBox="0 0 330 490" preserveAspectRatio="none" aria-hidden="true"><path d="M2 490V190C2 98 124 56 165 0C206 56 328 98 328 190V490" fill="none" stroke="'+GD2+'" stroke-width="3"/><path d="M12 490V192C12 106 128 66 165 14C202 66 318 106 318 192V490" fill="none" stroke="'+GD+'" stroke-width="1.200"/>'+st8(165,30,0.01)+'</svg>';
    $('envelope').insertBefore(fr,$('envelope').firstChild);
    for(var i=0;i<34;i++){var t=document.createElement('span');t.className='tw';
      t.style.left=(Math.random()*96)+'%';t.style.top=(Math.random()*96)+'%';
      var z=4+Math.random()*8;t.style.width=t.style.height=z+'px';t.style.animationDelay=(Math.random()*3)+'s';env.insertBefore(t,env.firstChild)}
  })();

  /* ---------- gold dust rising across the page ---------- */
  if(!reduce){
    for(var di=0;di<34;di++){var dz=document.createElement('i'),dsz=(1.5+Math.random()*2).toFixed(1)+'px';
      dz.style.left=(Math.random()*100).toFixed(1)+'%';dz.style.width=dz.style.height=dsz;
      dz.style.setProperty('--dx',((Math.random()-.5)*120).toFixed(0)+'px');
      dz.style.animationDuration=(12+Math.random()*12).toFixed(1)+'s';dz.style.animationDelay='-'+(Math.random()*24).toFixed(1)+'s';
      $('dust').appendChild(dz)}
  }

  document.body.classList.add('locked');
  var opened=false;
  function open(){
    if(opened)return;opened=true;
    $('env').classList.add('opening');
    $('envelope').classList.add('open');
    music(true);
    setTimeout(function(){document.body.classList.add('entered')},reduce?0:1700);
    setTimeout(function(){$('env').classList.add('gone');document.body.classList.remove('locked');scrollTo(0,0);snd.classList.add('on');fall()},reduce?50:1800);
  }
  $('envelope').addEventListener('click',open);
})();










