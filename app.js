const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)], NS="http://www.w3.org/2000/svg";
const svg=(n,a={})=>{const e=document.createElementNS(NS,n);Object.entries(a).forEach(([k,v])=>e.setAttribute(k,v));return e};
const cases=[
  [1,"Plate with transverse hole","tension","plate-hole",["d","w"],"d/w",0,.8,2.0,3.0,"σ₀ = F / [(w − d)t]"],
  [2,"Plate with transverse hole","bending","plate-hole",["d","w","h"],"d/w",0,.8,1.0,3.0,"σ₀ = Mc/I using the net section"],
  [3,"Notched rectangular bar","tension","plate-notch",["r","d","w"],"r/d",.01,.3,1.05,3.0,"σ₀ = F/(dt)"],
  [4,"Notched rectangular bar","bending","plate-notch",["r","d","w"],"r/d",.01,.3,1.05,3.0,"σ₀ = Mc/I at the minimum section"],
  [5,"Rectangular shoulder fillet","tension","shoulder-flat",["r","d","D"],"r/d",.01,.3,1.02,3.0,"σ₀ = F/(dt)"],
  [6,"Rectangular shoulder fillet","bending","shoulder-flat",["r","d","D"],"r/d",.01,.3,1.02,3.0,"σ₀ = Mc/I at the smaller section"],
  [7,"Round shaft shoulder fillet","tension","shoulder-round",["r","d","D"],"r/d",.01,.3,1.02,2.7,"σ₀ = 4F/(πd²)"],
  [8,"Round shaft shoulder fillet","torsion","shoulder-round",["r","d","D"],"r/d",.01,.3,1.02,2.6,"τ₀ = 16T/(πd³)"],
  [9,"Round shaft shoulder fillet","bending","shoulder-round",["r","d","D"],"r/d",.01,.3,1.02,3.0,"σ₀ = 32M/(πd³)"],
  [10,"Round shaft with transverse hole","torsion","shaft-hole",["d","D"],"d/D",.01,.3,2.4,4.0,"τ₀ uses the approximate net polar section"],
  [11,"Round shaft with transverse hole","bending","shaft-hole",["d","D"],"d/D",.01,.3,1.0,3.0,"σ₀ uses the approximate net bending section"],
  [12,"Pin-loaded plate with hole","tension","pin-hole",["d","w","h"],"d/w",.05,.8,1.0,11,"σ₀ = F / [(w − d)t]; clearance raises Kt"],
  [13,"Grooved round bar","tension","groove",["r","d","D"],"r/d",.01,.3,1.02,3.0,"σ₀ = 4F/(πd²)"],
  [14,"Grooved round bar","bending","groove",["r","d","D"],"r/d",.01,.3,1.02,3.0,"σ₀ = 32M/(πd³)"],
  [15,"Grooved round bar","torsion","groove",["r","d","D"],"r/d",.01,.3,1.02,2.7,"τ₀ = 16T/(πd³)"],
  [16,"Flat-bottom groove","bending","flat-groove",["a","t","r","D","d"],"a/t",.5,6,2,9,"σ₀ = 4F/(πd²) + 32M/(πd³)"],
  [17,"Flat-bottom groove","torsion","flat-groove",["a","t","r","D","d"],"a/t",.5,6,1,5,"τ₀ = 16T/(πd³)"]
].map(x=>({id:x[0],name:x[1],load:x[2],shape:x[3],dims:x[4],xLabel:x[5],xmin:x[6],xmax:x[7],ymin:x[8],ymax:x[9],nominal:x[10]}));
const labels={w:"Width",D:"Major diameter",d:"Feature / minor size",r:"Root radius",h:"Height",a:"Groove half-width",t:"Groove depth"};
const secondaryLabels={2:"d/h",3:"w/d",4:"w/d",5:"D/d",6:"D/d",7:"D/d",8:"D/d",9:"D/d",12:"h/w",13:"D/d",14:"D/d",15:"D/d",16:"r/t",17:"r/t"};
const axisSpecs={
  1:{xMajor:.1,yMin:2,yMax:3,yMajor:.2},2:{xMajor:.1,yMin:1,yMax:3,yMajor:.4},
  3:{xMajor:.05,yMin:1,yMax:3,yMajor:.4},4:{xMajor:.05,yMin:1,yMax:3,yMajor:.4},
  5:{xMajor:.05,yMin:1,yMax:3,yMajor:.4},6:{xMajor:.05,yMin:1,yMax:3,yMajor:.4},
  7:{xMajor:.05,yMin:1,yMax:2.6,yMajor:.4},8:{xMajor:.05,yMin:1,yMax:3,yMajor:.4},
  9:{xMajor:.05,yMin:1,yMax:3,yMajor:.4},10:{xMajor:.05,yMin:2.4,yMax:4,yMajor:.4},
  11:{xMajor:.05,yMin:1,yMax:3,yMajor:.4},12:{xMajor:.1,yMin:1,yMax:11,yMajor:2},
  13:{xMajor:.05,yMin:1,yMax:3,yMajor:.4},14:{xMajor:.05,yMin:1,yMax:3,yMajor:.4},
  15:{xMajor:.05,yMin:1,yMax:2.6,yMajor:.4},
  16:{xTicks:[.5,.6,.7,.8,.9,1,2,3,4,5,6],yMin:2,yMax:10,yMajor:1},
  17:{xTicks:[.5,.6,.7,.8,.9,1,2,3,4,5,6],yMin:1,yMax:5,yMajor:1}
};
const xs=[.02,.03,.05,.075,.10,.15,.20,.25,.30];
const curve=(z,ys,x=xs)=>({z,points:x.map((v,i)=>[v,ys[i]])});
const chartData={
  1:{curves:[
    curve(0,[3,2.827,2.692,2.586,2.497,2.425,2.36,2.259,2.185,2.13,2.092,2.071],[0,0.05,0.1,0.15,0.2,0.25,0.3,0.4,0.5,0.6,0.7,0.8])
  ]},
  2:{curves:[
    curve(0,[3,2.82,2.68,2.48,2.35,2.25,2.18,2.11],[0,0.05,0.1,0.2,0.3,0.4,0.5,0.6]),
    curve(0.25,[2.68,2.55,2.43,2.25,2.12],[0,0.05,0.1,0.2,0.3]),
    curve(0.5,[2.48,2.36,2.24,2.08,1.95],[0,0.05,0.1,0.2,0.3]),
    curve(1,[2.25,2.14,2.03,1.87,1.75],[0,0.05,0.1,0.2,0.3]),
    curve(2,[2.03,1.93,1.84,1.7,1.59],[0,0.05,0.1,0.2,0.3]),
    curve(10,[1.83,1.67,1.53,1.43,1.35,1.28,1.22,1.16],[0,0.1,0.2,0.3,0.4,0.5,0.6,0.7])
  ]},
  3:{curves:[
    curve(1.05,[2.961,2.647,2.27,2.01,1.856,1.68,1.583,1.522,1.48],[0.02,0.03,0.05,0.075,0.1,0.15,0.2,0.25,0.3]),
    curve(1.1,[3,2.635,2.289,2.088,1.857,1.724,1.635,1.571],[0.0371,0.05,0.075,0.1,0.15,0.2,0.25,0.3]),
    curve(1.2,[3,2.942,2.573,2.33,2.032,1.857,1.742,1.66],[0.0475,0.05,0.075,0.1,0.15,0.2,0.25,0.3]),
    curve(1.5,[3,2.856,2.559,2.211,2.018,1.897,1.816],[0.0674,0.075,0.1,0.15,0.2,0.25,0.3]),
    curve(3,[3,2.832,2.426,2.146,1.946,1.798],[0.0846,0.1,0.15,0.2,0.25,0.3])
  ]},
  4:{curves:[
    curve(1.02,[2.405,2.128,1.827,1.643,1.544,1.441,1.39,1.361,1.342],[0.02,0.03,0.05,0.075,0.1,0.15,0.2,0.25,0.3]),
    curve(1.05,[2.833,2.532,2.162,1.903,1.747,1.569,1.471,1.409,1.367],[0.02,0.03,0.05,0.075,0.1,0.15,0.2,0.25,0.3]),
    curve(1.1,[3,2.962,2.592,2.279,2.063,1.789,1.625,1.518,1.443],[0.0285,0.03,0.05,0.075,0.1,0.15,0.2,0.25,0.3]),
    curve(1.5,[3,2.77,2.393,2.144,1.842,1.668,1.558,1.483],[0.0402,0.05,0.075,0.1,0.15,0.2,0.25,0.3]),
    curve(10,[3,2.912,2.552,2.287,1.933,1.715,1.574,1.477],[0.0455,0.05,0.075,0.1,0.15,0.2,0.25,0.3])
  ]},
  5:{curves:[
    curve(1.02,[1.791,1.68,1.527,1.411,1.34,1.262,1.223,1.202,1.188],[0.02,0.03,0.05,0.075,0.1,0.15,0.2,0.25,0.3]),
    curve(1.05,[2.164,1.98,1.741,1.572,1.473,1.371,1.323,1.297,1.281],[0.02,0.03,0.05,0.075,0.1,0.15,0.2,0.25,0.3]),
    curve(1.1,[2.492,2.268,1.967,1.747,1.616,1.476,1.409,1.372,1.35],[0.02,0.03,0.05,0.075,0.1,0.15,0.2,0.25,0.3]),
    curve(1.5,[3,2.666,2.289,2.075,1.833,1.697,1.607,1.544],[0.0394,0.05,0.075,0.1,0.15,0.2,0.25,0.3])
  ]},
  6:{curves:[
    curve(1.02,[2.318,2.123,1.853,1.648,1.521,1.382,1.312,1.273,1.249],[0.02,0.03,0.05,0.075,0.1,0.15,0.2,0.25,0.3]),
    curve(1.05,[2.743,2.499,2.147,1.868,1.689,1.483,1.377,1.315,1.276],[0.02,0.03,0.05,0.075,0.1,0.15,0.2,0.25,0.3]),
    curve(1.1,[3,2.791,2.337,1.993,1.782,1.55,1.435,1.371,1.332],[0.0237,0.03,0.05,0.075,0.1,0.15,0.2,0.25,0.3]),
    curve(1.3,[3,2.618,2.185,1.938,1.667,1.524,1.436,1.377],[0.0385,0.05,0.075,0.1,0.15,0.2,0.25,0.3]),
    curve(3,[3,2.843,2.451,2.171,1.81,1.597,1.462,1.372],[0.0428,0.05,0.075,0.1,0.15,0.2,0.25,0.3])
  ]},
  7:{curves:[
    curve(1.02,[1.824,1.697,1.53,1.41,1.34,1.266,1.231,1.212,1.201],[0.02,0.03,0.05,0.075,0.1,0.15,0.2,0.25,0.3]),
    curve(1.05,[2.038,1.905,1.716,1.567,1.474,1.368,1.314,1.283,1.264],[0.02,0.03,0.05,0.075,0.1,0.15,0.2,0.25,0.3]),
    curve(1.1,[2.23,2.084,1.871,1.695,1.579,1.438,1.36,1.312,1.28],[0.02,0.03,0.05,0.075,0.1,0.15,0.2,0.25,0.3]),
    curve(1.5,[2.6,2.509,2.201,1.976,1.834,1.664,1.565,1.499,1.452],[0.0263,0.03,0.05,0.075,0.1,0.15,0.2,0.25,0.3])
  ]},
  8:{curves:[
    curve(1.09,[1.669,1.472,1.295,1.205,1.163,1.125,1.108,1.099,1.094],[0.02,0.03,0.05,0.075,0.1,0.15,0.2,0.25,0.3]),
    curve(1.2,[2.182,1.998,1.742,1.547,1.427,1.294,1.227,1.189,1.166],[0.02,0.03,0.05,0.075,0.1,0.15,0.2,0.25,0.3]),
    curve(1.33,[2.437,2.137,1.803,1.589,1.466,1.328,1.254,1.206,1.174],[0.02,0.03,0.05,0.075,0.1,0.15,0.2,0.25,0.3]),
    curve(2,[2.814,2.551,2.165,1.85,1.645,1.404,1.275,1.199,1.152],[0.02,0.03,0.05,0.075,0.1,0.15,0.2,0.25,0.3])
  ]},
  9:{curves:[
    curve(1.02,[2.311,2.069,1.77,1.567,1.451,1.328,1.266,1.231,1.209],[0.02,0.03,0.05,0.075,0.1,0.15,0.2,0.25,0.3]),
    curve(1.05,[2.569,2.291,1.93,1.673,1.521,1.357,1.275,1.229,1.199],[0.02,0.03,0.05,0.075,0.1,0.15,0.2,0.25,0.3]),
    curve(1.1,[2.782,2.488,2.089,1.792,1.612,1.418,1.323,1.27,1.239],[0.02,0.03,0.05,0.075,0.1,0.15,0.2,0.25,0.3]),
    curve(1.5,[3,2.829,2.317,1.937,1.707,1.459,1.337,1.27,1.229],[0.0255,0.03,0.05,0.075,0.1,0.15,0.2,0.25,0.3]),
    curve(3,[3,2.653,2.155,1.871,1.578,1.438,1.361,1.315],[0.0405,0.05,0.075,0.1,0.15,0.2,0.25,0.3])
  ]},
  10:{curves:[
    curve(0,[3.923,3.751,3.609,3.489,3.389,3.166,3.02,2.935,2.872],[0,0.02,0.04,0.06,0.08,0.14,0.2,0.25,0.3]),
    curve(1,[3.903,3.494,3.248,3.089,2.979,2.801,2.719,2.681,2.657],[0,0.02,0.04,0.06,0.08,0.14,0.2,0.25,0.3])
  ]},
  11:{curves:[
    curve(0,[2.958,2.715,2.537,2.404,2.301,2.104,1.995,1.938,1.899],[0,0.02,0.04,0.06,0.08,0.14,0.2,0.25,0.3])
  ]},
  12:{curves:[
    curve(0.35,[10.644,9.144,7.188,5.97,5.139,4.536],[0.075,0.1,0.15,0.2,0.25,0.3]),
    curve(0.5,[7.108,6.331,5.323,4.57,3.995,3.547,3.193,2.678,2.329,2.083],[0.12,0.15,0.2,0.25,0.3,0.35,0.4,0.5,0.6,0.7]),
    curve(1,[6.008,5.381,4.566,3.959,3.495,3.134,2.849,2.433,2.152,1.954],[0.12,0.15,0.2,0.25,0.3,0.35,0.4,0.5,0.6,0.7])
  ]},
  13:{curves:[
    curve(1.02,[2.191,2.044,1.839,1.681,1.582,1.473,1.418,1.386,1.367],[0.02,0.03,0.05,0.075,0.1,0.15,0.2,0.25,0.3]),
    curve(1.05,[2.679,2.475,2.195,1.971,1.82,1.627,1.507,1.423,1.362],[0.02,0.03,0.05,0.075,0.1,0.15,0.2,0.25,0.3]),
    curve(1.15,[3,2.879,2.583,2.313,2.119,1.864,1.712,1.614,1.549],[0.0235,0.03,0.05,0.075,0.1,0.15,0.2,0.25,0.3]),
    curve(1.5,[3,2.965,2.577,2.325,2.012,1.821,1.691,1.595],[0.0486,0.05,0.075,0.1,0.15,0.2,0.25,0.3])
  ]},
  14:{curves:[
    curve(1.02,[2.13,1.975,1.776,1.63,1.538,1.43,1.368,1.328,1.3],[0.02,0.03,0.05,0.075,0.1,0.15,0.2,0.25,0.3]),
    curve(1.05,[2.574,2.346,2.057,1.848,1.717,1.561,1.473,1.415,1.374],[0.02,0.03,0.05,0.075,0.1,0.15,0.2,0.25,0.3]),
    curve(1.5,[3,2.911,2.485,2.165,1.964,1.729,1.597,1.514,1.457],[0.0272,0.03,0.05,0.075,0.1,0.15,0.2,0.25,0.3])
  ]},
  15:{curves:[
    curve(1.02,[1.578,1.501,1.397,1.32,1.272,1.221,1.196,1.182,1.173],[0.02,0.03,0.05,0.075,0.1,0.15,0.2,0.25,0.3]),
    curve(1.05,[1.754,1.664,1.531,1.423,1.352,1.269,1.224,1.198,1.182],[0.02,0.03,0.05,0.075,0.1,0.15,0.2,0.25,0.3]),
    curve(1.3,[2.476,2.168,1.828,1.613,1.491,1.357,1.286,1.242,1.212],[0.02,0.03,0.05,0.075,0.1,0.15,0.2,0.25,0.3])
  ]},
  16:{curves:[
    curve(0.03,[9.178,8.622,8.064,7.507,7.18],[0.5,1,2,4,6]),
    curve(0.04,[8.263,7.774,7.286,6.797,6.512],[0.5,1,2,4,6]),
    curve(0.05,[7.597,7.153,6.709,6.265,6.006],[0.5,1,2,4,6]),
    curve(0.07,[6.734,6.325,5.916,5.509,5.271],[0.5,1,2,4,6]),
    curve(0.1,[5.849,5.52,5.195,4.875,4.689],[0.5,1,2,4,6]),
    curve(0.15,[5.234,4.823,4.48,4.207,4.08],[0.5,1,2,4,6]),
    curve(0.2,[4.935,4.452,4.092,3.853,3.77],[0.5,1,2,4,6]),
    curve(0.4,[4.445,4.088,3.31,3.032,3.032],[0.8,1,2,4,6]),
    curve(0.6,[4.164,3.804,3.007,2.698,2.698],[0.8,1,2,4,6]),
    curve(1,[3.499,3.186,2.807,2.581,2.323],[1.5,2,3,4,6])
  ]},
  17:{curves:[
    curve(0.03,[4.807,4.674,4.575,4.512,4.49],[0.5,1,2,4,6]),
    curve(0.04,[4.416,4.262,4.148,4.073,4.048],[0.5,1,2,4,6]),
    curve(0.06,[3.944,3.746,3.597,3.497,3.462],[0.5,1,2,4,6]),
    curve(0.1,[3.386,3.189,3.035,2.924,2.879],[0.5,1,2,4,6]),
    curve(0.2,[2.647,2.598,2.484,2.388,2.362],[1,1.2,2,4,6])
  ]}
};
let selected=cases[6], filter="all";
let values={w:100,D:60,d:40,r:4,h:60,a:8,t:4};
let holePoint=0;
function ratio(c){
  if(c.xLabel==="d/w")return values.d/values.w;if(c.xLabel==="d/D")return values.d/values.D;
  if(c.xLabel==="a/t")return values.a/values.t;return values.r/values.d;
}
function secondRatio(c){
  if(["plate-notch"].includes(c.shape))return values.w/values.d;
  if(["shoulder-flat","shoulder-round","groove"].includes(c.shape))return values.D/values.d;
  if(c.id===2)return values.d/values.h;
  if(c.id===12)return values.h/values.w;
  if(c.id===10)return holePoint;
  if(c.shape==="flat-groove")return values.r/values.t;
  return 1;
}
const axisX=(id,x)=>id>=16?Math.log(x):x;
const minorSubdivisionCount=increment=>Math.abs(increment*4-Math.round(increment*4))<1e-8?5:4;
const plotY=(value,spec,height=360,pad=52)=>height-pad-(value-spec.yMin)/(spec.yMax-spec.yMin)*(height-2*pad);
function interpolate(points,x,id=selected.id){
  const xp=axisX(id,x),data=points.map(p=>[axisX(id,p[0]),p[1]]);
  if(xp<data[0][0]||xp>data.at(-1)[0])return null;
  if(xp===data[0][0])return data[0][1];if(xp===data.at(-1)[0])return data.at(-1)[1];
  const n=data.length,h=[],delta=[],m=Array(n).fill(0);
  for(let i=0;i<n-1;i++){h[i]=data[i+1][0]-data[i][0];delta[i]=(data[i+1][1]-data[i][1])/h[i]}
  m[0]=delta[0];m[n-1]=delta[n-2];
  for(let i=1;i<n-1;i++)m[i]=delta[i-1]*delta[i]<=0?0:(h[i-1]+h[i])/((h[i-1]/delta[i-1])+(h[i]/delta[i]));
  const i=data.findIndex(p=>p[0]>=xp),a=data[i-1],b=data[i],t=(xp-a[0])/(b[0]-a[0]),t2=t*t,t3=t2*t;
  return (2*t3-3*t2+1)*a[1]+(t3-2*t2+t)*h[i-1]*m[i-1]+(-2*t3+3*t2)*b[1]+(t3-t2)*h[i-1]*m[i];
}
function factor(c,x=ratio(c),z=secondRatio(c)){
  const data=chartData[c.id],curves=data.curves;
  if(data.exact)return x>=c.xmin&&x<=c.xmax?data.exact(x):null;
  if(curves.length===1)return interpolate(curves[0].points,x,c.id);
  if(z<curves[0].z||z>curves.at(-1).z)return null;
  if(z===curves[0].z)return interpolate(curves[0].points,x,c.id);
  if(z===curves.at(-1).z)return interpolate(curves.at(-1).points,x,c.id);
  const i=curves.findIndex(q=>q.z>=z),a=curves[i-1],b=curves[i],u=(z-a.z)/(b.z-a.z);
  const ya=interpolate(a.points,x,c.id),yb=interpolate(b.points,x,c.id);
  return ya===null||yb===null?null:ya+u*(yb-ya);
}
function renderPicker(){
  const q=$("#search").value.toLowerCase(), list=cases.filter(c=>(filter==="all"||c.load===filter)&&(`${c.name} ${c.load}`.toLowerCase().includes(q)));
  $("#casePicker").innerHTML=list.length?list.map(card).join(""):"<p class='hint'>No matching charts.</p>";
  $$("#casePicker [data-id]").forEach(b=>b.onclick=()=>selectCase(Number(b.dataset.id)));
  const active=$("#casePicker .case-select.active"),picker=$("#casePicker");
  if(active)picker.scrollTop=Math.max(0,active.offsetTop-picker.offsetTop-12);
}
function card(c){return `<button class="case-select ${c.id===selected.id?"active":""}" data-id="${c.id}"><b>${String(c.id).padStart(2,"0")}</b><span><strong>${c.name}</strong><small>${c.load} · ${c.xLabel}</small></span><i></i></button>`}
function selectCase(id){selected=cases.find(c=>c.id===id);render()}
function renderInputs(){
  $("#dimensionInputs").innerHTML=selected.dims.map(d=>`<label><span>${labels[d]} <b>${d}</b></span><input data-dim="${d}" type="number" min="0.001" step="0.1" value="${values[d]}"></label>`).join("")+(selected.id===10?`<label><span>Critical point <b>A/B</b></span><select id="holePoint"><option value="0">Point A</option><option value="1">Point B</option></select></label>`:"");
  $$("[data-dim]").forEach(i=>i.oninput=()=>{values[i.dataset.dim]=Math.max(.001,Number(i.value)||.001);update()});
  if(selected.id===10){$("#holePoint").value=String(holePoint);$("#holePoint").onchange=()=>{holePoint=Number($("#holePoint").value);update()}}
}
const draw={
  add(g,n,a={}){const e=svg(n,a);g.append(e);return e},
  text(g,x,y,t,a={}){const e=this.add(g,"text",{x,y,fill:"#17201c","font-family":"DM Mono","font-size":13,...a});e.textContent=t;return e},
  line(g,x1,y1,x2,y2,a={}){return this.add(g,"line",{x1,y1,x2,y2,stroke:"#17201c","stroke-width":2,...a})},
  dim(g,x1,y1,x2,y2,t,tx=(x1+x2)/2,ty=(y1+y2)/2-7){this.line(g,x1,y1,x2,y2,{"marker-start":"url(#dimArrow)","marker-end":"url(#dimArrow)","stroke-width":1.4});this.text(g,tx,ty,t,{"text-anchor":"middle","font-style":"italic"})},
  force(g,x1,y1,x2,y2,t){this.line(g,x1,y1,x2,y2,{stroke:"#d8492a","stroke-width":3,"marker-end":"url(#loadArrow)"});this.text(g,x2+(x2>x1?10:-10),y2-9,t,{fill:"#d8492a","text-anchor":x2>x1?"start":"end","font-size":15,"font-weight":600})},
  moment(g,cx,cy,r,clockwise,t){const a=clockwise?[-2.45,1.1]:[-.7,-4.25],p1=[cx+r*Math.cos(a[0]),cy+r*Math.sin(a[0])],p2=[cx+r*Math.cos(a[1]),cy+r*Math.sin(a[1])];this.add(g,"path",{d:`M${p1[0]},${p1[1]} A${r},${r} 0 1 ${clockwise?1:0} ${p2[0]},${p2[1]}`,fill:"none",stroke:"#d8492a","stroke-width":3,"marker-end":"url(#loadArrow)"});this.text(g,cx,cy-r-7,t,{fill:"#d8492a","text-anchor":"middle","font-size":15,"font-weight":600})},
  center(g,x1,x2,y){this.line(g,x1,y,x2,y,{stroke:"#79817d","stroke-width":1,"stroke-dasharray":"7 6"})}
};
function geometryDefs(g){
  const defs=draw.add(g,"defs"),body=draw.add(defs,"linearGradient",{id:"bodyFill",x1:"0",x2:"0",y1:"0",y2:"1"});
  body.append(svg("stop",{offset:"0","stop-color":"#e8f2ef"}),svg("stop",{offset:".5","stop-color":"#b7d9dc"}),svg("stop",{offset:"1","stop-color":"#dceae5"}));
  [["loadArrow","#d8492a",7],["dimArrow","#17201c",6]].forEach(([id,color,size])=>{const m=draw.add(defs,"marker",{id,viewBox:"0 0 10 10",refX:9,refY:5,markerWidth:size,markerHeight:size,orient:"auto-start-reverse"});m.append(svg("path",{d:"M0 0L10 5L0 10Z",fill:color}))});
}
function plateHole(g,bending=false){
  draw.add(g,"rect",{x:185,y:105,width:350,height:140,fill:"url(#bodyFill)",stroke:"#17201c","stroke-width":2});
  draw.add(g,"circle",{cx:360,cy:175,r:27,fill:"#faf9f5",stroke:"#17201c","stroke-width":2});
  draw.center(g,155,565,175);draw.dim(g,215,105,215,245,"w",200,178);draw.dim(g,360,148,360,202,"d",378,180);
  if(bending){draw.add(g,"rect",{x:185,y:275,width:350,height:22,fill:"#d9dcda",stroke:"#17201c","stroke-width":2});draw.dim(g,430,275,430,297,"h",448,291);draw.moment(g,150,285,34,false,"M");draw.moment(g,570,285,34,true,"M")}
  else{draw.force(g,170,175,95,175,"F");draw.force(g,550,175,625,175,"F")}
}
function notchedPlate(g,bending=false){
  draw.add(g,"path",{d:"M120 105H300Q330 105 335 138Q340 155 360 155Q380 155 385 138Q390 105 420 105H600V245H420Q390 245 385 212Q380 195 360 195Q340 195 335 212Q330 245 300 245H120Z",fill:"url(#bodyFill)",stroke:"#17201c","stroke-width":2});
  draw.dim(g,250,105,250,245,"w",235,178);draw.dim(g,470,155,470,195,"d",488,180);draw.text(g,386,144,"r",{"font-style":"italic"});
  if(bending){draw.moment(g,90,175,34,false,"M");draw.moment(g,630,175,34,true,"M")}else{draw.force(g,110,175,45,175,"F");draw.force(g,610,175,675,175,"F")}
}
function shoulder(g,round=false){
  const d=round?"M90 95H300Q330 95 338 135H630V215H338Q330 255 300 255H90Z":"M90 95H300Q330 95 338 135H630V215H338Q330 255 300 255H90Z";
  draw.add(g,"path",{d,fill:"url(#bodyFill)",stroke:"#17201c","stroke-width":2});if(round){draw.add(g,"ellipse",{cx:90,cy:175,rx:18,ry:80,fill:"#d8ebe8",stroke:"#17201c","stroke-width":2});draw.add(g,"ellipse",{cx:630,cy:175,rx:12,ry:40,fill:"#d8ebe8",stroke:"#17201c","stroke-width":2})}
  draw.center(g,70,650,175);draw.dim(g,260,95,260,255,"D",242,180);draw.dim(g,490,135,490,215,"d",508,180);draw.text(g,350,126,"r",{"font-style":"italic"});
  if(selected.load==="tension"){draw.force(g,70,175,25,175,"F");draw.force(g,650,175,695,175,"F")}else if(selected.load==="bending"){draw.moment(g,60,175,38,false,"M");draw.moment(g,660,175,38,true,"M")}else{draw.moment(g,90,175,42,true,"T");draw.moment(g,630,175,42,false,"T")}
}
function shaftHole(g){
  draw.add(g,"rect",{x:110,y:120,width:500,height:110,rx:55,fill:"url(#bodyFill)",stroke:"#17201c","stroke-width":2});draw.add(g,"ellipse",{cx:360,cy:175,rx:17,ry:55,fill:"#faf9f5",stroke:"#17201c","stroke-width":2});draw.center(g,90,630,175);draw.dim(g,230,120,230,230,"D",212,180);draw.dim(g,360,158,360,192,"d",378,180);
  if(selected.id===10){draw.moment(g,105,175,42,true,"T");draw.moment(g,615,175,42,false,"T");draw.add(g,"circle",{cx:525,cy:286,r:48,fill:"url(#bodyFill)",stroke:"#17201c","stroke-width":2});draw.add(g,"rect",{x:477,y:279,width:96,height:14,fill:"#faf9f5",stroke:"#17201c","stroke-width":1.5});draw.text(g,530,275,"A",{fill:"#d8492a","font-weight":600});draw.text(g,530,310,"B",{fill:"#d8492a","font-weight":600})}
  else{draw.moment(g,95,175,40,false,"M");draw.moment(g,625,175,40,true,"M")}
}
function pinPlate(g){
  draw.add(g,"rect",{x:275,y:55,width:170,height:250,fill:"url(#bodyFill)",stroke:"#17201c","stroke-width":2});draw.add(g,"circle",{cx:360,cy:175,r:40,fill:"#faf9f5",stroke:"#17201c","stroke-width":2});draw.add(g,"rect",{x:220,y:158,width:280,height:34,fill:"#e0e2df",stroke:"#17201c","stroke-width":2});draw.add(g,"circle",{cx:360,cy:175,r:22,fill:"#c7d1ce",stroke:"#17201c","stroke-width":2});draw.dim(g,290,55,290,305,"h",274,184);draw.dim(g,275,320,445,320,"w",410,313);draw.dim(g,360,153,360,197,"d",378,180);draw.force(g,360,315,360,350,"F");draw.force(g,285,145,285,110,"F/2");draw.force(g,435,145,435,110,"F/2")
}
function groove(g,flat=false){
  const d=flat?"M70 105H260Q285 105 285 130Q285 148 303 148H417Q435 148 435 130Q435 105 460 105H650V245H460Q435 245 435 220Q435 202 417 202H303Q285 202 285 220Q285 245 260 245H70Z":"M70 105H270Q300 105 305 145Q310 158 330 158H390Q410 158 415 145Q420 105 450 105H650V245H450Q420 245 415 205Q410 192 390 192H330Q310 192 305 205Q300 245 270 245H70Z";
  draw.add(g,"path",{d,fill:"url(#bodyFill)",stroke:"#17201c","stroke-width":2});draw.add(g,"ellipse",{cx:70,cy:175,rx:15,ry:70,fill:"#d8ebe8",stroke:"#17201c","stroke-width":2});draw.add(g,"ellipse",{cx:650,cy:175,rx:15,ry:70,fill:"#d8ebe8",stroke:"#17201c","stroke-width":2});draw.center(g,50,670,175);draw.dim(g,230,105,230,245,"D",212,180);draw.dim(g,360,flat?148:158,360,flat?202:192,"d",378,180);draw.text(g,425,140,"r",{"font-style":"italic"});
  if(flat){draw.dim(g,285,265,435,265,"a",360,286);draw.dim(g,455,105,455,148,"t",473,132)}
  if(selected.load==="tension"||selected.id===16){draw.force(g,50,175,15,175,"F");draw.force(g,670,175,705,175,"F")}if(selected.load==="bending"||selected.id===16){draw.moment(g,72,175,40,false,"M");draw.moment(g,648,175,40,true,"M")}if(selected.load==="torsion"){draw.moment(g,72,175,42,true,"T");draw.moment(g,648,175,42,false,"T")}
}
function geometry(){
  const g=$("#geometry");g.replaceChildren();geometryDefs(g);
  if(selected.id===1)plateHole(g,false);else if(selected.id===2)plateHole(g,true);else if([3,4].includes(selected.id))notchedPlate(g,selected.id===4);else if([5,6].includes(selected.id))shoulder(g,false);else if([7,8,9].includes(selected.id))shoulder(g,true);else if([10,11].includes(selected.id))shaftHole(g);else if(selected.id===12)pinPlate(g);else if([13,14,15].includes(selected.id))groove(g,false);else groove(g,true);
  draw.text(g,360,348,`Figure A–15–${selected.id} · ${selected.load.toUpperCase()}`,{"text-anchor":"middle",fill:"#68716c","font-size":11});
}
function chart(){
  const s=$("#chart");s.replaceChildren();const W=720,H=360,p=52,spec=axisSpecs[selected.id],x0=selected.id<=15?0:selected.xmin,x1=selected.xmax;
  const sampleX=i=>selected.id>=16?Math.exp(Math.log(x0)+(Math.log(x1)-Math.log(x0))*i/160):x0+(x1-x0)*i/160;
  const pts=[...Array(161)].map((_,i)=>{const x=sampleX(i);return [x,factor(selected,x,secondRatio(selected))]}).filter(q=>q[1]!==null);
  const sourceCurves=chartData[selected.id].curves.map(q=>[...Array(161)].map((_,i)=>{const x=sampleX(i);return [x,interpolate(q.points,x,selected.id)]}).filter(v=>v[1]!==null));
  const ymin=spec.yMin,ymax=spec.yMax;
  const X=x=>p+(axisX(selected.id,x)-axisX(selected.id,x0))/(axisX(selected.id,x1)-axisX(selected.id,x0))*(W-2*p),Y=y=>plotY(y,spec,H,p);
  const defs=svg("defs"),clip=svg("clipPath",{id:"plotClip"});clip.append(svg("rect",{x:p,y:p,width:W-2*p,height:H-2*p}));defs.append(clip);s.append(defs);
  const grid=svg("g"),curves=svg("g",{"clip-path":"url(#plotClip)"});
  const xTicks=spec.xTicks||[...Array(Math.round((x1-x0)/spec.xMajor)+1)].map((_,i)=>x0+i*spec.xMajor);
  for(let i=0;i<xTicks.length;i++){const xv=xTicks[i],xx=X(xv);grid.append(svg("line",{x1:xx,y1:p,x2:xx,y2:H-p,stroke:"#d8d9d3","stroke-width":1.1}),svg("line",{x1:xx,y1:H-p,x2:xx,y2:H-p+5,stroke:"#68716c"}));const tx=svg("text",{x:xx,y:H-p+18,"text-anchor":"middle",fill:"#68716c","font-family":"DM Mono","font-size":9});tx.textContent=xv<1?xv.toFixed(selected.id>=16?1:(spec.xMajor<.1?2:1)):xv.toFixed(selected.id>=16?1:0);grid.append(tx);if(i<xTicks.length-1){const n=minorSubdivisionCount(xTicks[i+1]-xv);for(let j=1;j<=n;j++){const mx=selected.id>=16?Math.exp(axisX(selected.id,xv)+(axisX(selected.id,xTicks[i+1])-axisX(selected.id,xv))*j/(n+1)):xv+(xTicks[i+1]-xv)*j/(n+1),px=X(mx);grid.append(svg("line",{x1:px,y1:p,x2:px,y2:H-p,stroke:"#ecece7","stroke-width":.7}),svg("line",{x1:px,y1:H-p,x2:px,y2:H-p+3,stroke:"#9da39f","stroke-width":.8}))}}}
  const yCount=Math.round((ymax-ymin)/spec.yMajor);
  for(let i=0;i<=yCount;i++){const yv=ymin+i*spec.yMajor,yy=Y(yv);grid.append(svg("line",{x1:p,y1:yy,x2:W-p,y2:yy,stroke:"#d8d9d3","stroke-width":1.1}),svg("line",{x1:p-5,y1:yy,x2:p,y2:yy,stroke:"#68716c"}));const ty=svg("text",{x:p-8,y:yy+3,"text-anchor":"end",fill:"#68716c","font-family":"DM Mono","font-size":9});ty.textContent=yv.toFixed(1);grid.append(ty);if(i<yCount){const n=minorSubdivisionCount(spec.yMajor);for(let j=1;j<=n;j++){const my=yv+spec.yMajor*j/(n+1),py=Y(my);grid.append(svg("line",{x1:p,y1:py,x2:W-p,y2:py,stroke:"#ecece7","stroke-width":.7}),svg("line",{x1:p-3,y1:py,x2:p,y2:py,stroke:"#9da39f","stroke-width":.8}))}}}
  s.append(grid);
  sourceCurves.forEach(q=>{const d=q.map((v,i)=>`${i?"L":"M"}${X(v[0]).toFixed(1)},${Y(v[1]).toFixed(1)}`).join(" ");curves.append(svg("path",{d,fill:"none",stroke:"#bbc4bf","stroke-width":1.2}))});
  const path=pts.map((q,i)=>`${i?"L":"M"}${X(q[0]).toFixed(1)},${Y(q[1]).toFixed(1)}`).join(" ");curves.append(svg("path",{d:path,fill:"none",stroke:"#207a8a","stroke-width":3}));
  const cx=ratio(selected),cy=factor(selected,cx,secondRatio(selected));if(cy!==null)curves.append(svg("circle",{cx:X(cx),cy:Y(cy),r:7,fill:"#ff5c35",stroke:"#fff","stroke-width":3,"data-kt":cy.toFixed(6),"data-y":Y(cy).toFixed(3)}));
  s.append(curves);
  let xl=svg("text",{x:W-p,y:H-12,"text-anchor":"end",fill:"#17201c","font-family":"DM Mono","font-size":10});xl.textContent=selected.xLabel;let yl=svg("text",{x:p,y:25,fill:"#17201c","font-family":"DM Mono","font-size":10});yl.textContent=selected.load==="torsion"?"Kts":"Kt";s.append(xl,yl);
}
function update(){
  const x=ratio(selected),z=secondRatio(selected),k=factor(selected),curves=chartData[selected.id].curves;
  const familyValid=curves.length===1||selected.id===10||(z>=curves[0].z&&z<=curves.at(-1).z);
  const valid=x>=selected.xmin&&x<=selected.xmax&&familyValid&&k!==null&&Number.isFinite(k);
  $("#factorValue").textContent=valid?k.toFixed(3):"—";$("#factorLabel").textContent=`THEORETICAL FACTOR · ${selected.load==="torsion"?"Kts":"Kt"}`;
  $("#ratioSummary").textContent=selected.id===10?`${selected.xLabel} = ${x.toFixed(3)} · point ${holePoint?"B":"A"}`:secondaryLabels[selected.id]?`${selected.xLabel} = ${x.toFixed(3)} · ${secondaryLabels[selected.id]} = ${z.toFixed(2)}`:`${selected.xLabel} = ${x.toFixed(3)}`;
  $("#statusText").textContent=valid?"Inside characterized range":"Outside characterized range";$("#statusCard").className=`status ${valid?"good":"warn"}`;
  $("#nominalNote").textContent=selected.nominal;
  $("#definition").textContent=selected.load==="torsion"?"Kts = τmax / τ₀":"Kt = σmax / σ₀";
  $("#interpretation").textContent=valid?`At this geometry, the elastic peak stress is approximately ${k.toFixed(2)} times the nominal ${selected.load==="torsion"?"shear":"normal"} stress. The point is within the characterized Table A-15 curves.`:"This geometry falls outside the portion of the source curves that has been characterized. No endpoint clamping or unsupported extrapolation is performed.";
  chart()
}
function render(){renderPicker();$("#caseTitle").textContent=`A–15–${selected.id} · ${selected.load}`;renderInputs();geometry();update()}
$$(".filters button").forEach(b=>b.onclick=()=>{filter=b.dataset.filter;$$(".filters button").forEach(x=>x.classList.toggle("active",x===b));renderPicker()});
$("#search").oninput=renderPicker;render();
