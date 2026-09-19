/* FieldSketch planar geometry. Units are SLD99 metres except the screen snap index. */
(function(root,factory){const api=factory();if(typeof module==='object')module.exports=api;else root.SketchGeometry=api})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  const EPS=1e-7, PERCH=25.29285264;
  const dist=(a,b)=>Math.hypot(a[0]-b[0],a[1]-b[1]);
  const cross=(a,b,p)=>(b[0]-a[0])*(p[1]-a[1])-(b[1]-a[1])*(p[0]-a[0]);
  const lerp=(a,b,t)=>[a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t];
  const length=c=>c.slice(1).reduce((s,p,i)=>s+dist(c[i],p),0);
  function signedArea(c){if(c.length<3)return 0;const o=c[0];let s=0;for(let i=1;i<c.length-1;i++)s+=cross(o,c[i],c[i+1]);return s/2}
  const area=c=>Math.abs(signedArea(c));
  function arp(m){const hundredths=Math.round(Math.max(0,m)/PERCH*100),a=Math.floor(hundredths/16000),r=Math.floor((hundredths-a*16000)/4000),p=(hundredths-a*16000-r*4000)/100;return`${a}A ${r}R ${p.toFixed(2)}P`}
  function nearest(p,a,b,clamp=true){const dx=b[0]-a[0],dy=b[1]-a[1],n=dx*dx+dy*dy;let t=n?((p[0]-a[0])*dx+(p[1]-a[1])*dy)/n:0;if(clamp)t=Math.max(0,Math.min(1,t));const point=lerp(a,b,t);return{point,t,d:dist(p,point)}}
  function intersection(a,b,c,d){const ux=b[0]-a[0],uy=b[1]-a[1],vx=d[0]-c[0],vy=d[1]-c[1],den=ux*vy-uy*vx;if(Math.abs(den)<1e-12)return null;const wx=c[0]-a[0],wy=c[1]-a[1],t=(wx*vy-wy*vx)/den,u=(wx*uy-wy*ux)/den;if(t<-EPS||t>1+EPS||u<-EPS||u>1+EPS)return null;return{point:lerp(a,b,Math.max(0,Math.min(1,t))),t,u}}
  function inside(p,c,boundary=true){let yes=false;for(let i=0,j=c.length-1;i<c.length;j=i++){const a=c[j],b=c[i];if(boundary&&nearest(p,a,b).d<EPS)return true;if((a[1]>p[1])!==(b[1]>p[1])&&p[0]<(b[0]-a[0])*(p[1]-a[1])/(b[1]-a[1])+a[0])yes=!yes}return yes}
  function clean(c){const out=[];for(const p of c)if(!out.length||dist(p,out.at(-1))>EPS)out.push(p.slice());if(out.length>1&&dist(out[0],out.at(-1))<EPS)out.pop();return out}
  function validate(c,polygon=true){if(!Array.isArray(c)||c.some(p=>!Array.isArray(p)||p.length<2||!p.every(Number.isFinite)))return'Invalid coordinates';if(c.length<(polygon?3:2))return`Need ${polygon?3:2} or more vertices`;const n=polygon?c.length:c.length-1;for(let i=0;i<n;i++){if(dist(c[i],c[(i+1)%c.length])<EPS)return'Repeated / zero-length boundary edge';for(let j=i+1;j<n;j++){if(j===i+1||(polygon&&i===0&&j===n-1))continue;const a=c[i],b=c[(i+1)%c.length],d=c[j],e=c[(j+1)%c.length];if(intersection(a,b,d,e))return'Boundary crosses or touches itself';if(nearest(a,d,e).d<EPS||nearest(b,d,e).d<EPS||nearest(d,a,b).d<EPS||nearest(e,a,b).d<EPS)return'Overlapping boundary edges'}}if(polygon&&area(c)<.001)return'Polygon has no usable area';return null}
  function labelPoint(c,holes=[]){if(c.length<3)return c[0];const valid=p=>inside(p,c,false)&&!holes.some(h=>inside(p,h)),center=c.reduce((s,p)=>[s[0]+p[0]/c.length,s[1]+p[1]/c.length],[0,0]);if(valid(center))return center;const rings=[c,...holes],ys=[...new Set(rings.flat().map(p=>p[1]))].sort((a,b)=>a-b);let best=c[0],width=-1;for(let k=1;k<ys.length;k++){const y=(ys[k-1]+ys[k])/2,xs=[];for(const ring of rings)for(let i=0;i<ring.length;i++){const a=ring[i],b=ring[(i+1)%ring.length];if((a[1]>y)!==(b[1]>y))xs.push(a[0]+(y-a[1])*(b[0]-a[0])/(b[1]-a[1]))}xs.sort((a,b)=>a-b);for(let i=0;i+1<xs.length;i++){const p=[(xs[i]+xs[i+1])/2,y];if(xs[i+1]-xs[i]>width&&valid(p)){width=xs[i+1]-xs[i];best=p}}}return best}
  function clip(c,a,b,positive){const out=[],s=p=>cross(a,b,p)*(positive?1:-1);for(let i=0;i<c.length;i++){const p=c[i],q=c[(i+1)%c.length],sp=s(p),sq=s(q),ip=sp>=-EPS,iq=sq>=-EPS;if(ip)out.push(p);if(ip!==iq)out.push(lerp(p,q,sp/(sp-sq)))}return clean(out)}
  function split(c,a,b,target,side=1,kind='parallel'){
    const invalid=validate(c);if(invalid)throw Error(invalid);
    const full=area(c);if(!Number.isFinite(target)||target<=.001||target>=full-.001)throw Error('Target must be greater than zero and smaller than the parcel');
    const len=dist(a,b);if(len<.001)throw Error('Choose two different line points');
    let A=a,B=b,angle=0;
    if(kind==='parallel'){
      const n=[-(b[1]-a[1])/len,(b[0]-a[0])/len],values=c.map(p=>(p[0]-a[0])*n[0]+(p[1]-a[1])*n[1]);let lo=Math.min(...values)-1,hi=Math.max(...values)+1;
      for(let i=0;i<65;i++){const d=(lo+hi)/2,aa=[a[0]+n[0]*d,a[1]+n[1]*d],bb=[b[0]+n[0]*d,b[1]+n[1]*d],ar=area(clip(c,aa,bb,side>0));if(side>0?ar>target:ar<target)lo=d;else hi=d}
      const d=(lo+hi)/2;A=[a[0]+n[0]*d,a[1]+n[1]*d];B=[b[0]+n[0]*d,b[1]+n[1]*d];
    }else{
      if(!c.some(p=>dist(p,a)<.001))throw Error('The pivot must be a parcel vertex');
      const base=Math.atan2(b[1]-a[1],b[0]-a[0]),at=t=>[a[0]+Math.cos(base+t)*len,a[1]+Math.sin(base+t)*len],value=t=>area(clip(c,a,at(t),side>0))-target,roots=[];
      if(Math.abs(value(0))<.00001)roots.push(0);
      for(const direction of [-1,1]){let prev=0,pv=value(0);for(let i=1;i<=720;i++){const next=direction*Math.PI*i/720,v=value(next);if(pv*v<=0){let lo=prev,hi=next,vl=pv;for(let k=0;k<60;k++){const mid=(lo+hi)/2,vm=value(mid);if(vl*vm<=0)hi=mid;else{lo=mid;vl=vm}}roots.push((lo+hi)/2);break}prev=next;pv=v}}
      if(!roots.length)throw Error('Target cannot be reached from this pivot');angle=roots.sort((x,y)=>Math.abs(x)-Math.abs(y))[0];B=at(angle);
    }
    const selected=clip(c,A,B,side>0),other=clip(c,A,B,side<0);
    if(validate(selected)||validate(other))throw Error('This cut creates separate pieces or overlapping edges. Choose another direction.');
    if(Math.abs(area(selected)-target)>.02||Math.abs(area(selected)+area(other)-full)>.02)throw Error('Area check failed; choose another line');
    return{selected,other,line:[A,B],angle};
  }
  /* Stable specific-object priority; nearest cannot steal an endpoint or intersection. */
  function snap(point,features,options={}){
    const radius=options.radius||26,modes=options.modes||['endpoint','intersection','nearest'],sets={endpoint:[],intersection:[],midpoint:[],perpendicular:[],nearest:[]},segments=[];
    function add(kind,p,meta){const d=dist(point,p);if(d<=radius)sets[kind].push({kind,point:p.slice(),d,...meta})}
    for(const f of features){const c=f.coords,n=f.closed?c.length:c.length-1;
      for(let i=0;i<c.length;i++)add('endpoint',c[i],{featureId:f.id,ring:f.ring||0,index:i,segment:f.closed?i:Math.min(i,Math.max(0,n-1)),t:!f.closed&&i===n?1:0});
      for(let i=0;i<n;i++){const a=c[i],b=c[(i+1)%c.length];if(dist(a,b)<EPS)continue;const hit=nearest(point,a,b),meta={featureId:f.id,ring:f.ring||0,segment:i};if(hit.d>radius)continue;const seg={a,b,...meta};segments.push(seg);add('nearest',hit.point,{...meta,t:hit.t});add('midpoint',lerp(a,b,.5),{...meta,t:.5});if(options.anchor){const foot=nearest(options.anchor,a,b,false);if(foot.t>=0&&foot.t<=1)add('perpendicular',foot.point,{...meta,t:foot.t})}}
    }
    if(modes.includes('intersection'))for(let i=0;i<segments.length;i++)for(let j=i+1;j<segments.length;j++){const a=segments[i],b=segments[j];if(a.featureId===b.featureId&&a.ring===b.ring&&a.segment===b.segment)continue;const hit=intersection(a.a,a.b,b.a,b.b);if(hit)add('intersection',hit.point,{featureId:a.featureId,ring:a.ring,segment:a.segment,t:hit.t,other:{featureId:b.featureId,ring:b.ring,segment:b.segment,t:hit.u}})}
    for(const kind of ['endpoint','intersection','midpoint','perpendicular','nearest'])if(modes.includes(kind)&&sets[kind].length)return sets[kind].sort((a,b)=>a.d-b.d)[0];return null;
  }
  function traceRing(c,start,end,closed,alternate=false){
    const n=c.length,a=start.segment+start.t,b=end.segment+end.t;
    if(!closed){const out=[start.point];if(a<=b){for(let i=Math.floor(a)+1;i<b;i++)out.push(c[i])}else for(let i=Math.ceil(a)-1;i>b;i--)out.push(c[i]);out.push(end.point);return clean(out)}
    function forward(s,e){const out=[s.point],from=s.segment+s.t;let to=e.segment+e.t;if(to<from+EPS)to+=n;for(let i=Math.floor(from)+1;i<to-EPS;i++)out.push(c[i%n]);out.push(e.point);return clean(out)}
    const one=forward(start,end),two=forward(end,start).reverse(),short=length(one)<=length(two)?one:two,long=short===one?two:one;return alternate?long:short;
  }
  /* Node endpoints, T junctions and crossings before following the shortest path.
     Endpoints within the supplied metric tolerance count as coincident. */
  function traceNetwork(features,start,end,tolerance=.005){
    const nodes=[],adj=[],cells=new Map(),cell=p=>[Math.floor(p[0]/tolerance),Math.floor(p[1]/tolerance)];
    function node(p){const[x,y]=cell(p);for(let dx=-1;dx<=1;dx++)for(let dy=-1;dy<=1;dy++){for(const id of cells.get(`${x+dx},${y+dy}`)||[])if(dist(nodes[id],p)<=tolerance)return id}const id=nodes.length;nodes.push(p.slice());adj.push([]);const key=`${x},${y}`;if(!cells.has(key))cells.set(key,[]);cells.get(key).push(id);return id}
    function edge(a,b){const ia=node(a),ib=node(b),w=dist(a,b);if(ia===ib)return;adj[ia].push([ib,w]);adj[ib].push([ia,w])}
    const segments=[];for(const f of features){const n=f.closed?f.coords.length:f.coords.length-1;for(let i=0;i<n;i++){const a=f.coords[i],b=f.coords[(i+1)%f.coords.length];if(dist(a,b)<EPS)continue;segments.push({a,b,minX:Math.min(a[0],b[0]),maxX:Math.max(a[0],b[0]),minY:Math.min(a[1],b[1]),maxY:Math.max(a[1],b[1]),cuts:[{point:a,t:0},{point:b,t:1}]})}}
    segments.sort((a,b)=>a.minX-b.minX);const add=(s,p)=>{const h=nearest(p,s.a,s.b);if(h.d<=tolerance)s.cuts.push({point:p,t:h.t})};
    for(let i=0;i<segments.length;i++){const a=segments[i];for(const pick of[start,end])add(a,pick.point);for(let j=i+1;j<segments.length&&segments[j].minX<=a.maxX+tolerance;j++){const b=segments[j];if(b.maxY<a.minY-tolerance||b.minY>a.maxY+tolerance)continue;const h=intersection(a.a,a.b,b.a,b.b);if(h){a.cuts.push({point:h.point,t:h.t});b.cuts.push({point:h.point,t:h.u})}else{add(a,b.a);add(a,b.b);add(b,a.a);add(b,a.b)}}}
    for(const s of segments){s.cuts.sort((a,b)=>a.t-b.t);for(let i=1;i<s.cuts.length;i++)edge(s.cuts[i-1].point,s.cuts[i].point)}
    const source=node(start.point),goal=node(end.point),best=new Map([[source,0]]),prev=new Map(),queue=[[0,source]];
    while(queue.length){queue.sort((a,b)=>b[0]-a[0]);const[d,u]=queue.pop();if(d!==best.get(u))continue;if(u===goal)break;for(const[v,w]of adj[u])if(d+w<(best.get(v)??Infinity)){best.set(v,d+w);prev.set(v,u);queue.push([d+w,v])}}
    if(!best.has(goal))throw Error('Boundaries are not connected. Trace each feature separately; no gaps are auto-joined.');const route=[];for(let u=goal;;u=prev.get(u)){route.push(nodes[u]);if(u===source)break}return route.reverse();
  }
  return{EPS,PERCH,dist,cross,lerp,length,area,signedArea,arp,nearest,intersection,inside,clean,validate,labelPoint,clip,split,snap,traceRing,traceNetwork};
});
