import{n as e}from"./rolldown-runtime-Bh1tDfsg.js";import{A as t,C as n,D as r,J as i,K as a,O as o,b as s,dt as c,ft as l,gt as u,k as d,lt as f,q as p,u as m,z as h}from"./ButtonBase-DMFUxBE6.js";var g=e(u(),1);function _(e){return p(`MuiCircularProgress`,e)}a(`MuiCircularProgress`,[`root`,`determinate`,`indeterminate`,`colorPrimary`,`colorSecondary`,`svg`,`track`,`circle`,`circleDisableShrink`]);var v=f(),y=44,b=l`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`,x=l`
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: -126px;
  }
`,S=typeof b==`string`?null:c`
        animation: ${b} 1.4s linear infinite;
      `,C=typeof x==`string`?null:c`
        animation: ${x} 1.4s ease-in-out infinite;
      `,w=e=>{let{classes:t,variant:n,color:i,disableShrink:a}=e;return h({root:[`root`,n,`color${r(i)}`],svg:[`svg`],track:[`track`],circle:[`circle`,a&&`circleDisableShrink`]},_,t)},T=t(`span`,{name:`MuiCircularProgress`,slot:`Root`,overridesResolver:(e,t)=>{let{ownerState:n}=e;return[t.root,t[n.variant],t[`color${r(n.color)}`]]}})(d(({theme:e})=>{let t=s(e,{animation:`none`});return{display:`inline-block`,variants:[{props:{variant:`determinate`},style:{...n(e,`transform`)}},{props:{variant:`indeterminate`},style:S||{animation:`${b} 1.4s linear infinite`}},...t?[{props:{variant:`indeterminate`},style:t}]:[],...Object.entries(e.palette).filter(m()).map(([t])=>({props:{color:t},style:{color:(e.vars||e).palette[t].main}}))]}})),E=t(`svg`,{name:`MuiCircularProgress`,slot:`Svg`})({display:`block`}),D=t(`circle`,{name:`MuiCircularProgress`,slot:`Circle`,overridesResolver:(e,t)=>{let{ownerState:n}=e;return[t.circle,n.disableShrink&&t.circleDisableShrink]}})(d(({theme:e})=>{let t=s(e,{animation:`none`});return{stroke:`currentColor`,variants:[{props:{variant:`determinate`},style:{...n(e,`stroke-dashoffset`)}},{props:{variant:`indeterminate`},style:{strokeDasharray:`80px, 200px`,strokeDashoffset:0}},{props:({ownerState:e})=>e.variant===`indeterminate`&&!e.disableShrink,style:C||{animation:`${x} 1.4s ease-in-out infinite`}},...t?[{props:({ownerState:e})=>e.variant===`indeterminate`&&!e.disableShrink,style:t}]:[]]}})),O=t(`circle`,{name:`MuiCircularProgress`,slot:`Track`})(d(({theme:e})=>({stroke:`currentColor`,opacity:(e.vars||e).palette.action.activatedOpacity}))),k=g.forwardRef(function(e,t){let n=o({props:e,name:`MuiCircularProgress`}),{className:r,color:a=`primary`,disableShrink:s=!1,enableTrackSlot:c=!1,min:l,max:u,size:d=40,style:f,thickness:p=3.6,value:m=n.min??0,variant:h=`indeterminate`,...g}=n,_=l??0,b=u??100,x={...n,color:a,disableShrink:s,size:d,thickness:p,value:m,variant:h,enableTrackSlot:c},S=w(x),C={},k={},A={};if(h===`determinate`){let e=2*Math.PI*((y-p)/2),t=b-_;C.strokeDasharray=e.toFixed(3),C.strokeDashoffset=t>0?`${((b-m)/t*e).toFixed(3)}px`:`${e.toFixed(3)}px`,k.transform=`rotate(-90deg)`,A[`aria-valuenow`]=m,A[`aria-valuemin`]=_,A[`aria-valuemax`]=b}return(0,v.jsx)(T,{className:i(S.root,r),style:{width:d,height:d,...k,...f},ownerState:x,ref:t,role:`progressbar`,...A,...g,children:(0,v.jsxs)(E,{className:S.svg,ownerState:x,viewBox:`${y/2} ${y/2} ${y} ${y}`,children:[c?(0,v.jsx)(O,{className:S.track,ownerState:x,cx:y,cy:y,r:(y-p)/2,fill:`none`,strokeWidth:p,"aria-hidden":`true`}):null,(0,v.jsx)(D,{className:S.circle,style:C,ownerState:x,cx:y,cy:y,r:(y-p)/2,fill:`none`,strokeWidth:p})]})})});export{k as t};