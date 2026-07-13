import{u as O,r as t,j as e,B as R,c as H,d as J,s as V,m as W}from"./api-gfxnrhVU.js";import{T as Y}from"./turnstile-gnsAnuG1.js";import{A as G,a as Q}from"./auth-shell-wQrNrzzw.js";import{I as h}from"./input-LzSVRO9V.js";import{L as p}from"./label-BY2GVP_4.js";import{u as _}from"./use-i18n-MLtFW5Pj.js";const X=`用户协议

欢迎使用本论坛（以下简称"本站"）。在注册账号前，请仔细阅读以下条款：

1. 账号注册
   - 您需要提供真实有效的邮箱地址完成注册。
   - 您有责任保管好自己的账号和密码，不得将账号转让或出借给他人。

2. 用户行为规范
   - 禁止发布违法、违规、侵权、色情、暴力等内容。
   - 禁止发布垃圾广告、恶意链接等内容。
   - 禁止骚扰、攻击其他用户。
   - 请尊重他人，文明交流。

3. 内容版权
   - 您在本站发布的内容，版权归您所有，但您授权本站展示和传播。
   - 请勿发布侵犯他人版权的内容。

4. 账号处理
   - 违反本协议的账号将被封禁或删除。
   - 本站有权在不通知的情况下删除违规内容。

5. 免责声明
   - 本站不对用户发布的内容承担法律责任。
   - 本站保留随时修改本协议的权利。

继续注册即表示您同意以上条款。`,Z=`隐私政策

本站重视您的隐私保护，请仔细阅读以下隐私政策：

1. 信息收集
   - 注册时我们收集您的邮箱地址和用户名。
   - 使用过程中我们记录您发布的帖子和评论。
   - 我们可能记录您的 IP 地址用于安全防护。

2. 信息使用
   - 您的邮箱用于账号验证和重要通知。
   - 我们不会将您的个人信息出售给第三方。
   - 我们可能使用匿名化数据改善服务。

3. 信息安全
   - 您的密码经过加密存储，我们无法查看明文密码。
   - 我们采取合理的技术措施保护您的数据安全。

4. Cookie
   - 本站使用 Cookie 保持您的登录状态。
   - 您可以在浏览器中禁用 Cookie，但这可能影响部分功能。

5. 数据删除
   - 您可以随时申请删除您的账号和相关数据。
   - 删除后数据将无法恢复。

6. 政策更新
   - 本站保留随时更新隐私政策的权利。
   - 重大变更将通过邮件通知您。

使用本站即表示您同意本隐私政策。`;function E({title:a,content:s,onClose:n}){const{t:l}=_();return e.jsxs("div",{className:"fixed inset-0 z-50 flex items-center justify-center p-4",children:[e.jsx("div",{className:"absolute inset-0 bg-black/40 backdrop-blur-sm",onClick:n}),e.jsxs("div",{className:"relative z-10 w-full max-w-lg max-h-[70vh] flex flex-col rounded-2xl border border-border bg-background shadow-elevated",children:[e.jsxs("div",{className:"flex items-center justify-between px-5 py-4 border-b border-border bg-muted/30 rounded-t-2xl",children:[e.jsx("h3",{className:"font-display font-bold text-base",children:a}),e.jsx("button",{type:"button",onClick:n,className:"text-muted-foreground hover:text-foreground transition-colors text-lg leading-none",children:"✕"})]}),e.jsx("div",{className:"overflow-y-auto flex-1 p-5",children:e.jsx("pre",{className:"text-xs text-muted-foreground whitespace-pre-wrap leading-relaxed font-sans",children:s})}),e.jsx("div",{className:"px-5 py-3 border-t border-border",children:e.jsx(R,{size:"sm",className:"w-full",onClick:n,children:l.iHaveRead})})]})]})}function $(){const{config:a}=O(),{t:s}=_(),[n,l]=t.useState(""),[g,f]=t.useState(""),[b,j]=t.useState(""),[y,d]=t.useState(""),[F,v]=t.useState(0),[N,w]=t.useState(!1),[k,c]=t.useState(""),[S,C]=t.useState(""),[u,I]=t.useState(!1),[m,U]=t.useState(!1),[B,T]=t.useState(!1),[K,P]=t.useState(!1),q=!!a?.turnstile_enabled,A=a?.turnstile_site_key||"",L=q&&!!A,z=a?.site_terms||X,D=a?.site_privacy||Z;async function M(r){if(r.preventDefault(),c(""),C(""),!u||!m){c(s.mustAgree);return}if(L&&!y){c(s.completeCaptcha);return}w(!0);try{const o=await fetch("/api/register",{method:"POST",headers:H("POST"),body:JSON.stringify({email:n,username:g,password:b,"cf-turnstile-response":y})}),i=await o.json();if(!o.ok)throw d(""),v(x=>x+1),new Error(i?.error||s.registerFailed);if(C(s.registerSuccess),i.token&&i.user){J(i.token),V(i.user),window.location.href="/";return}l(""),f(""),j(""),d(""),v(x=>x+1)}catch(o){c(String(o?.message||o))}finally{w(!1)}}return e.jsxs(G,{icon:"✨",subtitle:s.joinUs,children:[B&&e.jsx(E,{title:s.termsTitle,content:z,onClose:()=>T(!1)}),K&&e.jsx(E,{title:s.privacyTitle,content:D,onClose:()=>P(!1)}),e.jsx(Q,{children:e.jsxs("div",{className:"p-8",children:[e.jsxs("div",{className:"text-center mb-8",children:[e.jsx("h2",{className:"font-display text-xl font-bold text-foreground",children:s.registerBtn}),e.jsx("p",{className:"text-sm text-muted-foreground mt-1",children:s.registerSubtitle})]}),e.jsxs("form",{className:"space-y-5",onSubmit:M,children:[k?e.jsx("div",{className:"rounded-xl border border-destructive/50 bg-destructive/5 p-3 text-sm text-destructive",children:k}):null,S?e.jsxs("div",{className:"rounded-xl border border-mint/50 bg-mint/10 p-3 text-sm text-green-700 dark:text-green-300",children:["🎉 ",S]}):null,e.jsxs("div",{className:"space-y-2",children:[e.jsxs(p,{htmlFor:"register-username",children:[s.username," ",e.jsx("span",{className:"text-muted-foreground text-xs",children:s.usernameMaxLen})]}),e.jsx(h,{id:"register-username",name:"username",type:"text",maxLength:20,value:g,onChange:r=>f(r.target.value),placeholder:s.nickname,required:!0})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx(p,{htmlFor:"register-email",children:s.email}),e.jsx(h,{id:"register-email",name:"email",type:"email",autoComplete:"email",value:n,onChange:r=>l(r.target.value),placeholder:"your@email.com",required:!0})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsxs(p,{htmlFor:"register-password",children:[s.password," ",e.jsx("span",{className:"text-muted-foreground text-xs",children:s.passwordLen})]}),e.jsx(h,{id:"register-password",name:"password",type:"password",autoComplete:"new-password",value:b,onChange:r=>j(r.target.value),placeholder:"••••••••",required:!0})]}),e.jsxs("div",{className:"space-y-3 rounded-xl border border-border bg-muted/20 p-3",children:[e.jsxs("label",{className:"flex items-start gap-2.5 cursor-pointer group",children:[e.jsx("input",{type:"checkbox",className:"mt-0.5 h-4 w-4 rounded border-border cursor-pointer accent-primary",checked:u,onChange:r=>I(r.target.checked)}),e.jsxs("span",{className:"text-sm text-muted-foreground leading-relaxed",children:[s.agreeTerms," ",e.jsx("button",{type:"button",className:"text-primary hover:underline font-medium",onClick:()=>T(!0),children:s.termsLink})]})]}),e.jsxs("label",{className:"flex items-start gap-2.5 cursor-pointer group",children:[e.jsx("input",{type:"checkbox",className:"mt-0.5 h-4 w-4 rounded border-border cursor-pointer accent-primary",checked:m,onChange:r=>U(r.target.checked)}),e.jsxs("span",{className:"text-sm text-muted-foreground leading-relaxed",children:[s.agreeTerms," ",e.jsx("button",{type:"button",className:"text-primary hover:underline font-medium",onClick:()=>P(!0),children:s.privacyLink})]})]})]}),e.jsx(Y,{enabled:L,siteKey:A,onToken:d,resetKey:F}),e.jsx(R,{className:"w-full",type:"submit",disabled:N||!u||!m,children:N?s.registering:s.registerBtn}),e.jsx("div",{className:"text-sm text-center pt-1",children:e.jsx("a",{className:"text-muted-foreground hover:text-primary transition-colors hover:underline",href:"/login",children:s.hasAccount})})]})]})})]})}W("root",e.jsx($,{}));
