import{k as U,r as L,a8 as F,aa as B,B as l,x as e,u as c,V as s,C as g,y as _,v as h,A as v,F as a,a5 as i,a9 as A,Y as H,m as r,a3 as k,J as D,ad as Y,ae as E}from"./index-bf2ac084.js";import{u as J}from"./searchResultStore-ebdd0920.js";import{u as G,_ as K}from"./playStore-c196edbc.js";const C=S=>(Y("data-v-7a9696b3"),S=S(),E(),S),O={class:"-mt-5"},Q={class:"h-[120px] flex items-center"},W={class:"w-1/2 p-2 flex items-center"},X=["src"],Z={class:"flex flex-col justify-center ml-2"},ee={class:"text-xl"},te={class:"text-sm text-slate-500"},se=C(()=>e("i",{class:"bi bi-chevron-right flex flex-1 justify-end"},null,-1)),le={class:"w-1/2 flex items-center"},re={class:"text-xl ml-3"},oe=C(()=>e("i",{class:"bi bi-chevron-right flex flex-1 justify-end"},null,-1)),ne=C(()=>e("hr",null,null,-1)),ce={class:"w-full h-[35px] flex items-center mt-3"},ae={class:"w-full flex-col mt-2"},ie=C(()=>e("div",{class:"flex mb-2 shadow-sm"},[e("p",{class:"text-slate-500 text-sm w-1/2"},"歌曲"),e("p",{class:"text-slate-500 text-sm w-1/4"},"歌手"),e("p",{class:"text-slate-500 text-sm w-1/4"},"专辑")],-1)),ue={class:"w-full h-[50px] mt-1 flex items-center text-slate-800 text-sm"},de=C(()=>e("i",{class:"bi bi-suit-heart mr-2 text-slate-600 hover:text-red-500 cursor-pointer"},null,-1)),xe=["onClick"],pe=["onClick"],_e={key:1,class:"w-1/4 -ml-6 cursor-pointer"},he=["onClick"],ve={key:0},fe={class:"w-1/4 cursor-pointer hover:text-green-500"},me={class:"w-full flex flex-col"},we={class:"w-full h-[100px] flex items-center"},ge={class:"w-1/2 flex items-center"},ye={class:"ml-3 hover:text-green-500 cursor-pointer"},be={class:"w-1/4 hover:text-green-500 cursor-pointer text-sm"},ke={class:"flex flex-1 justify-end mr-2 text-xs text-slate-500"},Ce={class:"w-full flex flex-wrap"},Se={class:"w-[200px] h-[220px] flex flex-col items-center mt-5 mr-5"},je={class:"text-lg mt-1 hover:text-green-500 cursor-pointer"},Re={class:"text-sm text-slate-500 cursor-pointer"},$e={class:"w-full"},Be={class:"w-full h-[100px] flex items-center"},De={class:"w-1/2 flex items-center"},qe={class:"ml-3 hover:text-green-500 cursor-pointer"},ze={class:"w-1/4 text-sm hover:text-green-500 cursor-pointer"},Ie={class:"flex flex-1 justify-end mr-2 text-xs text-slate-500"},Pe={class:"w-full flex-col"},Te={class:"flex w-full h-[120px] items-center"},Ve={class:"w-1/2 flex items-center"},Me={class:"ml-2 hover:text-green-500 cursor-pointer"},Ne={key:0,class:"ml-1 text-sm text-slate-500"},Ue={class:"w-1/4 text-sm text-slate-500 cursor-pointer"},Le={class:"flex flex-1 justify-end text-sm text-slate-500 mr-2 cursor-pointer"},Fe={class:"w-full flex flex-wrap mt-1 mb-3"},Ae={class:"w-auto PC:h-[310px] laptop:h-[244.36px] m-2 mt-4"},He={class:"mt-1 text-sm cursor-pointer hover:text-green-500"},Ye={class:"mt-1 text-xs text-slate-500"},Ee={class:"w-ful flex flex-col"},Je={class:"h-[130px] pl-4"},Ge={class:"w-full h-full flex flex-col justify-center"},Ke={class:"flex"},Oe={class:"w-1/3 hover:text-green-500 cursor-pointer"},Qe=["onClick"],We={key:1,class:"w-1/3 cursor-pointer"},Xe=["onClick"],Ze={key:0},et={class:"w-1/3 flex"},tt={class:"hover:text-green-500 cursor-pointer"},st={class:"flex flex-1 justify-end text-sm text-slate-500"},lt=["innerHTML"],rt={class:"text-slate-500 text-sm"},ot={class:"text-slate-500 text-sm"},nt=U({__name:"search-results",async setup(S){let u,f;const y=A(),n=L(1),q=G(),b=J(),{single:P,album:T,artists:j,playList:z,user:V,mv:$,lyrics:M,radio:ct,video:at}=F(b);[u,f]=B(()=>b.requestSearchResult(y.currentRoute.value.query.value,1)),await u,f(),[u,f]=B(()=>b.requestSearchResult(y.currentRoute.value.query.value,100)),u=await u,f(),[u,f]=B(()=>b.requestSearchResult(y.currentRoute.value.query.value,1004)),u=await u,f();const p=async(d,o)=>{n.value=d,await b.requestSearchResult(y.currentRoute.value.query.value,o)},R=d=>{y.push({path:"/singerDetail",query:{id:d}})},N=d=>new Date(d).getFullYear()+"-"+Number(new Date(d).getMonth()+1)+"-"+new Date(d).getDate();return(d,o)=>{const m=H("ProgressiveImage");return r(),l("div",O,[e("header",Q,[e("div",W,[e("img",{src:c(j)[0].picUrl,alt:"",class:"w-[90px] h-[95px] rounded-full ml-2"},null,8,X),e("div",Z,[e("p",ee,"歌手："+s(c(j)[0].name),1),e("p",te,"专辑："+s(c(j)[0].albumSize),1)]),se]),e("div",le,[g(m,{"lazy-placeholder":"",src:c($)[0].cover,alt:"",class:"bg-slate-300 w-[120px] h-[65px] ml-3"},null,8,["src"]),e("p",re,"MV："+s(c($)[0].name),1),oe])]),ne,e("div",ce,[e("div",{class:_(["w-[80px] h-full hover:text-green-500 cursor-pointer flex items-center justify-center mb-1 mr-2",{"bottomBorder rounded-lg":n.value==1}]),onClick:o[0]||(o[0]=t=>p(1,1))},"单曲 ",2),e("div",{class:_(["w-[80px] h-full hover:text-green-500 cursor-pointer flex items-center justify-center mb-1 mr-2",{"bottomBorder rounded-lg":n.value==2}]),onClick:o[1]||(o[1]=t=>p(2,10))},"专辑 ",2),e("div",{class:_(["w-[80px] h-full hover:text-green-500 cursor-pointer flex items-center justify-center mb-1 mr-2",{"bottomBorder rounded-lg":n.value==3}]),onClick:o[2]||(o[2]=t=>p(3,100))},"歌手 ",2),e("div",{class:_(["w-[80px] h-full hover:text-green-500 cursor-pointer flex items-center justify-center mb-1 mr-2",{"bottomBorder rounded-lg":n.value==4}]),onClick:o[3]||(o[3]=t=>p(4,1e3))},"歌单",2),e("div",{class:_(["w-[80px] h-full hover:text-green-500 cursor-pointer flex items-center justify-center mb-1 mr-2",{"bottomBorder rounded-lg":n.value==5}]),onClick:o[4]||(o[4]=t=>p(5,1002))},"用户",2),e("div",{class:_(["w-[80px] h-full hover:text-green-500 cursor-pointer flex items-center justify-center mb-1 mr-2",{"bottomBorder rounded-lg":n.value==6}]),onClick:o[5]||(o[5]=t=>p(6,1004))},"MV",2),e("div",{class:_(["w-[80px] h-full hover:text-green-500 cursor-pointer flex items-center justify-center mb-1 mr-2",{"bottomBorder rounded-lg":n.value==7}]),onClick:o[6]||(o[6]=t=>p(7,1006))},"歌词",2)]),h(e("div",ae,[ie,(r(!0),l(a,null,i(c(P),(t,x)=>(r(),l("div",ue,[de,e("p",{class:"w-1/2 cursor-pointer hover:text-green-500",onClick:w=>c(q).updateData(c(z),x)},s(t.name),9,xe),t.ar.length==1?(r(),l("p",{key:0,class:"w-1/4 -ml-6 cursor-pointer hover:text-green-500",onClick:w=>R(t.ar[0].id)},s(t.ar[0].name),9,pe)):(r(),l("p",_e,[(r(!0),l(a,null,i(t.ar,(w,I)=>(r(),l("span",null,[e("span",{class:"hover:text-green-500",onClick:it=>R(w.id)},s(w.name),9,he),k(" "),I!=t.ar.length-1?(r(),l("span",ve,"/")):D("",!0),k(" ")]))),256))])),e("p",fe,s(t.al.name),1)]))),256))],512),[[v,n.value==1]]),h(e("div",me,[(r(!0),l(a,null,i(c(T),(t,x)=>(r(),l("div",we,[e("div",ge,[g(m,{"lazy-placeholder":"",src:t.blurPicUrl,alt:"",class:"w-[80px] h-[80px] rounded-lg hover:cursor-pointer"},null,8,["src"]),e("span",ye,s(t.name),1)]),e("div",be,s(t.artist.name),1),e("div",ke,s(N(t.publishTime)),1)]))),256))],512),[[v,n.value==2]]),h(e("div",Ce,[(r(!0),l(a,null,i(c(j),t=>(r(),l("div",Se,[g(m,{"lazy-placeholder":"",src:t.picUrl,alt:"",class:"w-[180px] h-[180px] rounded-full cursor-pointer"},null,8,["src"]),e("p",je,s(t.name),1),e("p",Re,"专辑："+s(t.albumSize),1)]))),256))],512),[[v,n.value==3]]),h(e("div",$e,[(r(!0),l(a,null,i(c(z),(t,x)=>(r(),l("div",Be,[e("div",De,[g(m,{"lazy-placeholder":"",src:t.coverImgUrl,alt:"",class:"w-[80px] h-[80px] rounded-lg hover:cursor-pointer"},null,8,["src"]),e("span",qe,s(t.name),1)]),e("div",ze,s(t.creator.nickname),1),e("div",Ie,s(t.bookCount)+"人收藏",1)]))),256))],512),[[v,n.value==4]]),h(e("div",Pe,[(r(!0),l(a,null,i(c(V),t=>(r(),l("div",Te,[e("div",Ve,[g(m,{"lazy-placeholder":"",src:t.avatarUrl,alt:"",class:"w-[80px] h-[80px] rounded-full cursor-pointer"},null,8,["src"]),e("p",Me,[k(s(t.nickname),1),t.detailDescription?(r(),l("span",Ne,"("+s(t.detailDescription)+")",1)):D("",!0)])]),e("div",Ue," 歌单："+s(t.playlistCount),1),e("div",Le," 粉丝："+s(t.followeds),1)]))),256))],512),[[v,n.value==5]]),h(e("div",Fe,[(r(!0),l(a,null,i(c($),(t,x)=>(r(),l("div",Ae,[g(m,{"lazy-placeholder":"",src:t.cover,alt:"",class:"w-full PC:h-[270px] laptop:h-[204.36px] rounded-lg hover:cursor-pointer"},null,8,["src"]),e("p",He,s(t.name),1),e("p",Ye,"播放次数："+s(t.playCount),1)]))),256))],512),[[v,n.value==6]]),h(e("div",Ee,[(r(!0),l(a,null,i(c(M),t=>(r(),l("div",Je,[e("div",Ge,[e("div",Ke,[e("p",Oe,s(t.name),1),t.ar.length==1?(r(),l("p",{key:0,class:"w-1/3 cursor-pointer hover:text-green-500",onClick:x=>R(t.ar[0].id)},s(t.ar[0].name),9,Qe)):(r(),l("p",We,[(r(!0),l(a,null,i(t.ar,(x,w)=>(r(),l("span",null,[e("span",{class:"hover:text-green-500",onClick:I=>R(x.id)},s(x.name),9,Xe),k(" "),w!=t.ar.length-1?(r(),l("span",Ze,"/")):D("",!0),k(" ")]))),256))])),e("p",et,[e("span",tt,s(t.al.name),1),e("span",st,s(c(q).toTime(parseInt((t.dt/1e3).toString()).toString())),1)])]),e("p",{innerHTML:t.lyrics[0],class:"text-slate-500 text-sm"},null,8,lt),e("p",rt,s(t.lyrics[1]),1),e("p",ot,s(t.lyrics[2]),1)])]))),256))],512),[[v,n.value==7]])])}}});const pt=K(nt,[["__scopeId","data-v-7a9696b3"]]);export{pt as default};
