
(function(){
var R=document.documentElement,rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
if(!rm)R.classList.add('js');
var AC='#ff6a2b',TX='#f6efe9',redraw=function(){};
function rc(){var s=getComputedStyle(R);AC=s.getPropertyValue('--ac').trim()||AC;TX=s.getPropertyValue('--tx').trim()||TX;redraw()}
function eff(){return R.getAttribute('data-theme')||(matchMedia('(prefers-color-scheme:light)').matches?'light':'dark')}
document.getElementById('tt').addEventListener('click',function(){var n=eff()==='light'?'dark':'light';R.setAttribute('data-theme',n);try{localStorage.setItem('mc3-theme',n)}catch(e){}});
new MutationObserver(rc).observe(R,{attributes:true,attributeFilter:['data-theme']});
var mq=matchMedia('(prefers-color-scheme:light)');if(mq.addEventListener)mq.addEventListener('change',rc);
/* globe */
(function(){var cv=document.getElementById('gb');if(!cv)return;
var D2=Math.PI/180,x=cv.getContext('2d'),W=0,H=0,vis=true,yaw=.5,tilt=.25,spin=0,tgt=null,tgtT=0,drag=false,act=0,lx=0,ly=0,moved=0,pos=[],dots=[],c1=1,s1=0,c2=1,s2=0;
var NODES=[
['Réseaux',25,5,'TCP/IP, VLAN, OSPF, VPN, HSRP, EtherChannel : du lab GNS3 au réseau d’entreprise Cisco.'],
['Systèmes',-15,65,'Linux et Windows Server, Active Directory, GPO, virtualisation et continuité de service.'],
['Sécurité',30,125,'Pare-feu iptables, segmentation, durcissement, supervision et analyse d’incidents.'],
['Cloud',-25,185,'AWS (EC2, IAM, EBS, EFS), certifié Cloud Practitioner et re/Start.'],
['Code',15,245,'Python, PowerShell, SQL, Bash, HTML/CSS/JS : des outils simples, testables et maintenables.'],
['Formation',-5,305,'CCNA, Python, web, Windows Server, MikroTik : transmettre ce qui fonctionne.']];
NODES.forEach(function(n){var la=n[1]*D2,lo=n[2]*D2;n.v=[Math.cos(la)*Math.sin(lo),Math.sin(la),Math.cos(la)*Math.cos(lo)]});
var ARCS=[[0,1],[1,2],[2,3],[3,4],[4,5],[5,0],[0,2],[2,4],[4,0]].map(function(p,k){var a=NODES[p[0]].v,b=NODES[p[1]].v,w=Math.acos(Math.max(-1,Math.min(1,a[0]*b[0]+a[1]*b[1]+a[2]*b[2]))),s=Math.sin(w)||1,pts=[],i,t,u,v,l;for(i=0;i<=36;i++){t=i/36;u=Math.sin((1-t)*w)/s;v=Math.sin(t*w)/s;l=1+.2*Math.sin(Math.PI*t);pts.push([(a[0]*u+b[0]*v)*l,(a[1]*u+b[1]*v)*l,(a[2]*u+b[2]*v)*l])}return{pts:pts,ph:k*.37,sp:.00008+(k%3)*.00003}});
function mk(){dots=[];var n=innerWidth<600?650:1000,i,y,r,f;for(i=0;i<n;i++){y=1-2*(i+.5)/n;r=Math.sqrt(1-y*y);f=i*2.399963;dots.push([Math.cos(f)*r,y,Math.sin(f)*r])}}
function rot(v){var x1=v[0]*c1+v[2]*s1,z1=-v[0]*s1+v[2]*c1;return[x1,v[1]*c2-z1*s2,v[1]*s2+z1*c2]}
function draw(){if(!W)return;x.clearRect(0,0,W,H);c1=Math.cos(yaw);s1=Math.sin(yaw);c2=Math.cos(tilt);s2=Math.sin(tilt);
var cx=W/2,cy=H/2,Rr=Math.min(W,H)*.36,i,p,z,r,now=performance.now();
x.lineWidth=1;x.strokeStyle=TX;x.globalAlpha=.25;x.beginPath();x.arc(cx,cy,Rr,0,6.2832);x.stroke();
x.fillStyle=TX;
for(i=0;i<dots.length;i++){p=rot(dots[i]);z=p[2];x.globalAlpha=z>0?.24+.55*z:.06;r=1.2+z*.7;x.beginPath();x.arc(cx+Rr*p[0],cy-Rr*p[1],r<.5?.5:r,0,6.2832);x.fill()}
x.strokeStyle=AC;x.fillStyle=AC;x.lineWidth=1.4;
ARCS.forEach(function(a){var q=a.pts.map(rot),j;for(j=0;j<q.length-1;j++){z=(q[j][2]+q[j+1][2])/2;if(z<-.05)continue;x.globalAlpha=.12+.6*Math.min(1,z+.2);x.beginPath();x.moveTo(cx+Rr*q[j][0],cy-Rr*q[j][1]);x.lineTo(cx+Rr*q[j+1][0],cy-Rr*q[j+1][1]);x.stroke()}
if(!rm){var t=((now*a.sp+a.ph)%1+1)%1,f=t*36,i0=Math.min(35,f|0),u=f-i0,A=q[i0],B=q[i0+1],pz=A[2]+(B[2]-A[2])*u;if(pz>0){var px=cx+Rr*(A[0]+(B[0]-A[0])*u),py=cy-Rr*(A[1]+(B[1]-A[1])*u);x.globalAlpha=.3;x.beginPath();x.arc(px,py,6,0,6.2832);x.fill();x.globalAlpha=1;x.beginPath();x.arc(px,py,2.6,0,6.2832);x.fill()}}});
pos=[];x.font='500 12px "JetBrains Mono",ui-monospace,monospace';
NODES.forEach(function(n,i){var p=rot(n.v),sx=cx+Rr*p[0],sy=cy-Rr*p[1];if(p[2]<=.05){pos[i]=null;return}pos[i]=[sx,sy];var a=i===act,al=Math.min(1,.4+p[2]),pr=a?(rm?13:13+2.5*Math.sin(now/260)):9;
x.globalAlpha=al*.35;x.beginPath();x.arc(sx,sy,pr,0,6.2832);x.fill();x.globalAlpha=al;x.beginPath();x.arc(sx,sy,a?5.5:4,0,6.2832);x.fill();
x.fillStyle=a?AC:TX;x.textAlign=sx>cx?'right':'left';x.fillText(n[0],sx+(sx>cx?-15:15),sy+4);x.fillStyle=AC});
x.globalAlpha=1}
function step(){if(drag)return;if(tgt){var dy=((tgt.y-yaw+Math.PI)%(2*Math.PI)+2*Math.PI)%(2*Math.PI)-Math.PI;yaw+=dy*.09;tilt+=(tgt.t-tilt)*.09;if(Math.abs(dy)<.004&&!tgtT)tgtT=performance.now();if(tgtT&&performance.now()-tgtT>3500){tgt=null;tgtT=0}}else{yaw+=spin;spin*=.95;yaw+=.0024;tilt+=(.25-tilt)*.02}}
function loop(){if(vis){step();draw()}requestAnimationFrame(loop)}
function once(){if(rm)requestAnimationFrame(draw)}
function rs(){var r=cv.getBoundingClientRect(),d=Math.min(devicePixelRatio||1,2);W=r.width;H=r.height;cv.width=W*d;cv.height=H*d;x.setTransform(d,0,0,d,0,0);mk();once()}
if('ResizeObserver' in window)new ResizeObserver(rs).observe(cv);else{addEventListener('resize',rs);rs()}
if('IntersectionObserver' in window)new IntersectionObserver(function(e){vis=e[0].isIntersecting}).observe(cv);
var cap=document.getElementById('cap'),cps=document.getElementById('cps'),chips=[];
function sel(i){act=i;chips.forEach(function(c,k){c.setAttribute('aria-pressed',String(k===i))});cap.textContent='';var b=document.createElement('b');b.textContent=NODES[i][0]+' · ';cap.appendChild(b);cap.appendChild(document.createTextNode(NODES[i][3]));
tgt={y:-NODES[i][2]*D2,t:Math.max(-.7,Math.min(.7,NODES[i][1]*D2))};tgtT=0;if(rm){yaw=tgt.y;tilt=tgt.t;tgt=null;once()}}
NODES.forEach(function(n,i){var b=document.createElement('button');b.type='button';b.className='cp';b.textContent=n[0];b.setAttribute('aria-pressed','false');b.addEventListener('click',function(){sel(i)});cps.appendChild(b);chips.push(b)});
function hit(e){var r=cv.getBoundingClientRect(),mx=e.clientX-r.left,my=e.clientY-r.top,b=-1,bd=700;pos.forEach(function(p,i){if(!p)return;var dx=p[0]-mx,dy=p[1]-my,d=dx*dx+dy*dy;if(d<bd){bd=d;b=i}});return b}
cv.addEventListener('pointerdown',function(e){drag=true;moved=0;lx=e.clientX;ly=e.clientY;tgt=null;tgtT=0;spin=0;try{cv.setPointerCapture(e.pointerId)}catch(_){}cv.style.cursor='grabbing'});
cv.addEventListener('pointermove',function(e){if(drag){var dx=e.clientX-lx,dy=e.clientY-ly;moved+=Math.abs(dx)+Math.abs(dy);yaw+=dx*.007;spin=dx*.0016;if(e.pointerType==='mouse')tilt=Math.max(-.8,Math.min(.8,tilt+dy*.005));lx=e.clientX;ly=e.clientY;once()}else{cv.style.cursor=hit(e)>-1?'pointer':'grab'}});
cv.addEventListener('pointerup',function(e){if(!drag)return;drag=false;cv.style.cursor='grab';if(moved<6){var h=hit(e);if(h>-1)sel(h)}});
cv.addEventListener('pointercancel',function(){drag=false;cv.style.cursor='grab'});
sel(0);redraw=once;if(!rm)loop();})();
/* apparition */
var rv=document.querySelectorAll('.rv');
if('IntersectionObserver' in window&&!rm){var io=new IntersectionObserver(function(l){l.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.1});rv.forEach(function(el,i){el.style.transitionDelay=(i%4)*70+'ms';io.observe(el)})}else{R.classList.remove('js')}
/* texte qui s’allume au défilement */
var mp=document.getElementById('mp');
if(mp&&!rm){var tx=mp.textContent.trim().split(/\s+/);mp.textContent='';var ws=tx.map(function(w){var s=document.createElement('span');s.className='w2';s.textContent=w+' ';mp.appendChild(s);return s});
var wp=function(){var r=mp.getBoundingClientRect(),vh=innerHeight,p=Math.max(0,Math.min(1,(vh*.82-r.top)/(r.height+vh*.3))),n=Math.round(p*ws.length);ws.forEach(function(s,i){s.classList.toggle('on',i<n)})};
addEventListener('scroll',wp,{passive:true});addEventListener('resize',wp);wp()}
/* halo qui suit le curseur */
var cg=document.getElementById('cg');
if(matchMedia('(hover:hover)').matches&&!rm){addEventListener('pointermove',function(e){cg.style.opacity=1;cg.style.transform='translate('+e.clientX+'px,'+e.clientY+'px)'},{passive:true})}

/* menu mobile */
var mb=document.getElementById('mb'),nv=document.getElementById('nv');
if(mb&&nv){var cm=function(){nv.classList.remove('open');mb.setAttribute('aria-expanded','false')};
mb.addEventListener('click',function(){var o=nv.classList.toggle('open');mb.setAttribute('aria-expanded',String(o))});
nv.querySelectorAll('a').forEach(function(a){a.addEventListener('click',cm)});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&nv.classList.contains('open')){cm();mb.focus()}});
document.addEventListener('click',function(e){if(nv.classList.contains('open')&&!nv.contains(e.target)&&!mb.contains(e.target))cm()})}
/* filtres projets */
var fb=[].slice.call(document.querySelectorAll('[data-filter]')),pk=[].slice.call(document.querySelectorAll('.pk[data-category]')),fc=document.getElementById('fc');
fb.forEach(function(b){b.addEventListener('click',function(){var c=b.dataset.filter,n=0;fb.forEach(function(o){o.setAttribute('aria-pressed',String(o===b))});
pk.forEach(function(k){var h=c!=='all'&&k.dataset.category!==c;k.hidden=h;if(!h)n++});if(fc)fc.textContent=n+' projet'+(n>1?'s':'')+' affiché'+(n>1?'s':'')})});
/* compteurs */
var ct=[].slice.call(document.querySelectorAll('[data-count]'));
if(ct.length&&'IntersectionObserver' in window&&!rm){var ci=new IntersectionObserver(function(l){l.forEach(function(e){if(!e.isIntersecting)return;ci.unobserve(e.target);var el=e.target,end=+el.dataset.count,t0=performance.now();(function k(n){var p=Math.min((n-t0)/1200,1);el.textContent=Math.round(end*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(k)})(t0)})},{threshold:.6});ct.forEach(function(c){ci.observe(c)})}
/* vidéo YouTube (chargée au clic) */
function yid(v){var s=(v||'').trim();if(/^[A-Za-z0-9_-]{11}$/.test(s))return s;try{var u=new URL(s),h=u.hostname.replace(/^www\.|^m\./,''),id='';
if(h==='youtu.be')id=u.pathname.slice(1).split('/')[0];else if(h.slice(-11)==='youtube.com'){id=u.searchParams.get('v')||'';if(!id){var m=u.pathname.match(/\/(?:embed|shorts|live|v)\/([A-Za-z0-9_-]{11})/);if(m)id=m[1]}}
return /^[A-Za-z0-9_-]{11}$/.test(id)?id:''}catch(e){return ''}}
var vf=document.getElementById('vf');
if(vf){var id=yid(vf.dataset.youtube),wu=id?'https://www.youtube.com/watch?v='+id:'',vl=document.getElementById('vl');
if(!id){vf.parentElement.hidden=true}else{
if(vl)vl.href=wu;
var bt=document.createElement('button');bt.type='button';bt.className='vp';bt.setAttribute('aria-label','Lire la vidéo de présentation');
var im=document.createElement('img');im.alt='';im.loading='lazy';im.src='https://i.ytimg.com/vi/'+id+'/hqdefault.jpg';im.onerror=function(){im.remove()};
var pl=document.createElement('span');pl.textContent='▶';bt.appendChild(im);bt.appendChild(pl);vf.appendChild(bt);
bt.addEventListener('click',function(){if(location.protocol==='file:'){window.open(wu,'_blank','noopener');return}
var f=document.createElement('iframe');f.src='https://www.youtube-nocookie.com/embed/'+id+'?rel=0&autoplay=1';f.title='Présentation professionnelle de Moréno CODJIA';f.allow='autoplay; encrypted-media; picture-in-picture; fullscreen';f.referrerPolicy='strict-origin-when-cross-origin';f.allowFullscreen=true;vf.replaceChildren(f)})}}
})();
