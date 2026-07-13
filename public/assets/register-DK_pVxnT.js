import{u as O,r as t,j as e,B as T,c as H,m as J}from"./api-R2kV19Q8.js";import{T as V}from"./turnstile-CdWqogKG.js";import{A as W,a as Y}from"./auth-shell-CPaevYWa.js";import{I as u}from"./input-TGpv7DBZ.js";import{L as m}from"./label-CY-F_k83.js";import{u as P}from"./use-i18n-DXLkvJQe.js";const G=`用户协议

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

继续注册即表示您同意以上条款。`,Q=`隐私政策

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

使用本站即表示您同意本隐私政策。`;function C({title:a,content:s,onClose:n}){const{t:l}=P();return e.jsxs("div",{className:"fixed inset-0 z-50 flex items-center justify-center p-4",children:[e.jsx("div",{className:"absolute inset-0 bg-black/40 backdrop-blur-sm",onClick:n}),e.jsxs("div",{className:"relative z-10 w-full max-w-lg max-h-[70vh] flex flex-col rounded-2xl border border-border bg-background shadow-elevated",children:[e.jsxs("div",{className:"flex items-center justify-between px-5 py-4 border-b border-border bg-muted/30 rounded-t-2xl",children:[e.jsx("h3",{className:"font-display font-bold text-base",children:a}),e.jsx("button",{type:"button",onClick:n,className:"text-muted-foreground hover:text-foreground transition-colors text-lg leading-none",children:"✕"})]}),e.jsx("div",{className:"overflow-y-auto flex-1 p-5",children:e.jsx("pre",{className:"text-xs text-muted-foreground whitespace-pre-wrap leading-relaxed font-sans",children:s})}),e.jsx("div",{className:"px-5 py-3 border-t border-border",children:e.jsx(T,{size:"sm",className:"w-full",onClick:n,children:l.iHaveRead})})]})]})}function X(){const{config:a}=O(),{t:s}=P(),[n,l]=t.useState(""),[x,A]=t.useState(""),[h,L]=t.useState(""),[p,g]=t.useState(""),[E,R]=t.useState(0),[f,b]=t.useState(!1),[j,i]=t.useState(""),[y,v]=t.useState(""),[c,_]=t.useState(!1),[d,F]=t.useState(!1),[I,N]=t.useState(!1),[B,w]=t.useState(!1),K=!!a?.turnstile_enabled,k=a?.turnstile_site_key||"",S=K&&!!k,U=a?.site_terms||G,q=a?.site_privacy||Q;async function z(r){if(r.preventDefault(),i(""),v(""),!c||!d){i(s.mustAgree);return}if(S&&!p){i(s.completeCaptcha);return}b(!0);try{const o=await fetch("/api/register",{method:"POST",headers:H("POST"),body:JSON.stringify({email:n,username:x,password:h,"cf-turnstile-response":p})}),D=await o.json();if(!o.ok)throw g(""),R(M=>M+1),new Error(D?.error||s.registerFailed);v(s.registerSuccess),setTimeout(()=>{window.location.href="/login"},1500)}catch(o){i(String(o?.message||o))}finally{b(!1)}}return e.jsxs(W,{icon:"✨",subtitle:s.joinUs,children:[I&&e.jsx(C,{title:s.termsTitle,content:U,onClose:()=>N(!1)}),B&&e.jsx(C,{title:s.privacyTitle,content:q,onClose:()=>w(!1)}),e.jsx(Y,{children:e.jsxs("div",{className:"p-8",children:[e.jsxs("div",{className:"text-center mb-8",children:[e.jsx("h2",{className:"font-display text-xl font-bold text-foreground",children:s.registerBtn}),e.jsx("p",{className:"text-sm text-muted-foreground mt-1",children:s.registerSubtitle})]}),e.jsxs("form",{className:"space-y-5",onSubmit:z,children:[j?e.jsx("div",{className:"rounded-xl border border-destructive/50 bg-destructive/5 p-3 text-sm text-destructive",children:j}):null,y?e.jsxs("div",{className:"rounded-xl border border-mint/50 bg-mint/10 p-3 text-sm text-green-700 dark:text-green-300",children:["🎉 ",y]}):null,e.jsxs("div",{className:"space-y-2",children:[e.jsxs(m,{htmlFor:"register-username",children:[s.username," ",e.jsx("span",{className:"text-muted-foreground text-xs",children:s.usernameMaxLen})]}),e.jsx(u,{id:"register-username",name:"username",type:"text",maxLength:20,value:x,onChange:r=>A(r.target.value),placeholder:s.nickname,required:!0})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx(m,{htmlFor:"register-email",children:s.email}),e.jsx(u,{id:"register-email",name:"email",type:"email",autoComplete:"email",value:n,onChange:r=>l(r.target.value),placeholder:"your@email.com",required:!0})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsxs(m,{htmlFor:"register-password",children:[s.password," ",e.jsx("span",{className:"text-muted-foreground text-xs",children:s.passwordLen})]}),e.jsx(u,{id:"register-password",name:"password",type:"password",autoComplete:"new-password",value:h,onChange:r=>L(r.target.value),placeholder:"••••••••",required:!0})]}),e.jsxs("div",{className:"space-y-3 rounded-xl border border-border bg-muted/20 p-3",children:[e.jsxs("label",{className:"flex items-start gap-2.5 cursor-pointer group",children:[e.jsx("input",{type:"checkbox",className:"mt-0.5 h-4 w-4 rounded border-border cursor-pointer accent-primary",checked:c,onChange:r=>_(r.target.checked)}),e.jsxs("span",{className:"text-sm text-muted-foreground leading-relaxed",children:[s.agreeTerms," ",e.jsx("button",{type:"button",className:"text-primary hover:underline font-medium",onClick:()=>N(!0),children:s.termsLink})]})]}),e.jsxs("label",{className:"flex items-start gap-2.5 cursor-pointer group",children:[e.jsx("input",{type:"checkbox",className:"mt-0.5 h-4 w-4 rounded border-border cursor-pointer accent-primary",checked:d,onChange:r=>F(r.target.checked)}),e.jsxs("span",{className:"text-sm text-muted-foreground leading-relaxed",children:[s.agreeTerms," ",e.jsx("button",{type:"button",className:"text-primary hover:underline font-medium",onClick:()=>w(!0),children:s.privacyLink})]})]})]}),e.jsx(V,{enabled:S,siteKey:k,onToken:g,resetKey:E}),e.jsx(T,{className:"w-full",type:"submit",disabled:f||!c||!d,children:f?s.registering:s.registerBtn}),e.jsx("div",{className:"text-sm text-center pt-1",children:e.jsx("a",{className:"text-muted-foreground hover:text-primary transition-colors hover:underline",href:"/login",children:s.hasAccount})})]})]})})]})}J("root",e.jsx(X,{}));
