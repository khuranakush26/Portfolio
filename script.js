const typing = document.getElementById("typing");
const words = ["Aspiring AI Engineer", "Python Developer", "B.Tech AI Student", "Future AI Builder"];
let wi = 0, ci = 0, deleting = false;

function typeLoop(){
  const word = words[wi];
  typing.textContent = word.slice(0, ci);
  if(!deleting){
    ci++;
    if(ci > word.length){ deleting = true; setTimeout(typeLoop, 1200); return; }
  }else{
    ci--;
    if(ci < 0){ deleting = false; ci = 0; wi = (wi+1)%words.length; }
  }
  setTimeout(typeLoop, deleting ? 45 : 80);
}
typeLoop();

// Particle field
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
let particles = [];
function resize(){canvas.width=innerWidth*devicePixelRatio;canvas.height=innerHeight*devicePixelRatio;ctx.scale(devicePixelRatio,devicePixelRatio);particles=[];for(let i=0;i<Math.min(90,innerWidth/12);i++)particles.push({x:Math.random()*innerWidth,y:Math.random()*innerHeight,vx:(Math.random()-.5)*.25,vy:(Math.random()-.5)*.25,r:Math.random()*1.5+.3});}
resize(); addEventListener("resize",resize);
function animate(){
  ctx.clearRect(0,0,innerWidth,innerHeight);
  for(const p of particles){p.x+=p.vx;p.y+=p.vy;if(p.x<0)p.x=innerWidth;if(p.x>innerWidth)p.x=0;if(p.y<0)p.y=innerHeight;if(p.y>innerHeight)p.y=0;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle="rgba(75,170,255,.55)";ctx.fill();}
  for(let i=0;i<particles.length;i++)for(let j=i+1;j<particles.length;j++){let a=particles[i],b=particles[j],d=Math.hypot(a.x-b.x,a.y-b.y);if(d<115){ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.strokeStyle=`rgba(50,130,220,${.12*(1-d/115)})`;ctx.stroke();}}
  requestAnimationFrame(animate);
}
animate();

// Custom cursor
const cursor=document.getElementById("cursor"), dot=document.getElementById("cursor-dot");
let mx=innerWidth/2,my=innerHeight/2,cx=mx,cy=my;
addEventListener("mousemove",e=>{mx=e.clientX;my=e.clientY;dot.style.left=mx+"px";dot.style.top=my+"px"});
function cursorLoop(){cx+=(mx-cx)*.12;cy+=(my-cy)*.12;cursor.style.left=cx+"px";cursor.style.top=cy+"px";requestAnimationFrame(cursorLoop)} cursorLoop();

// Cursor styles injected for easy customization
const cursorStyle=document.createElement("style");
cursorStyle.textContent=`#cursor{position:fixed;width:34px;height:34px;border:1px solid rgba(70,170,255,.7);border-radius:50%;pointer-events:none;z-index:100;transform:translate(-50%,-50%);transition:width .2s,height .2s,background .2s}#cursor-dot{position:fixed;width:5px;height:5px;background:#62d7ff;border-radius:50%;pointer-events:none;z-index:101;transform:translate(-50%,-50%);box-shadow:0 0 12px #248cff}@media(max-width:900px){#cursor,#cursor-dot{display:none}}`;
document.head.appendChild(cursorStyle);

// 3D tilt cards
document.querySelectorAll(".tilt").forEach(card=>{
  card.addEventListener("mousemove",e=>{
    const r=card.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
    card.style.transform=`perspective(800px) rotateX(${-y*8}deg) rotateY(${x*10}deg) translateZ(4px)`;
  });
  card.addEventListener("mouseleave",()=>card.style.transform="");
});

// Reveal on scroll
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("show")}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

// Nav active-ish scrolling
document.querySelectorAll(".nav nav a").forEach(a=>{
  a.addEventListener("click",()=>document.querySelector(".nav nav").classList.remove("open"));
});
