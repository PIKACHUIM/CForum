import{u as U,r as s,j as e,I as m,B as E,c as B,m as M}from"./api-DD7AG97x.js";import{T as H}from"./turnstile-BqBidpjZ.js";import{A as J,a as V}from"./auth-shell-CR6U0Z_O.js";import{L as x}from"./label-BJMVFGUR.js";const W=`用户协议

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

继续注册即表示您同意以上条款。`,Y=`隐私政策

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

使用本站即表示您同意本隐私政策。`;function A({title:r,content:o,onClose:a}){return e.jsxs("div",{className:"fixed inset-0 z-50 flex items-center justify-center p-4",children:[e.jsx("div",{className:"absolute inset-0 bg-black/40 backdrop-blur-sm",onClick:a}),e.jsxs("div",{className:"relative z-10 w-full max-w-lg max-h-[70vh] flex flex-col rounded-2xl border border-sakura/30 bg-background shadow-2xl",children:[e.jsxs("div",{className:"flex items-center justify-between px-5 py-4 border-b border-sakura/20 bg-gradient-to-r from-sakura/10 to-lavender/10 rounded-t-2xl",children:[e.jsx("h3",{className:"font-display font-bold text-base",children:r}),e.jsx("button",{type:"button",onClick:a,className:"text-muted-foreground hover:text-foreground transition-colors text-lg leading-none",children:"✕"})]}),e.jsx("div",{className:"overflow-y-auto flex-1 p-5",children:e.jsx("pre",{className:"text-xs text-muted-foreground whitespace-pre-wrap leading-relaxed font-sans",children:o})}),e.jsx("div",{className:"px-5 py-3 border-t border-sakura/20",children:e.jsx(E,{size:"sm",className:"w-full",onClick:a,children:"我已阅读"})})]})]})}function G(){const{config:r}=U(),[o,a]=s.useState(""),[h,p]=s.useState(""),[g,f]=s.useState(""),[b,i]=s.useState(""),[_,j]=s.useState(0),[y,v]=s.useState(!1),[N,l]=s.useState(""),[k,w]=s.useState(""),[c,L]=s.useState(!1),[d,R]=s.useState(!1),[F,S]=s.useState(!1),[I,C]=s.useState(!1),K=!!r?.turnstile_enabled,T=r?.turnstile_site_key||"",P=K&&!!T,q=r?.site_terms||W,z=r?.site_privacy||Y;async function D(t){if(t.preventDefault(),l(""),w(""),!c||!d){l("请先阅读并同意用户协议和隐私政策");return}if(P&&!b){l("请完成验证码验证");return}v(!0);try{const n=await fetch("/api/register",{method:"POST",headers:B("POST"),body:JSON.stringify({email:o,username:h,password:g,"cf-turnstile-response":b})}),O=await n.json();if(!n.ok)throw i(""),j(u=>u+1),new Error(O?.error||"注册失败");w("注册成功！请前往邮箱完成验证后再登录。"),a(""),p(""),f(""),i(""),j(u=>u+1)}catch(n){l(String(n?.message||n))}finally{v(!1)}}return e.jsxs(J,{children:[F&&e.jsx(A,{title:"用户协议",content:q,onClose:()=>S(!1)}),I&&e.jsx(A,{title:"隐私政策",content:z,onClose:()=>C(!1)}),e.jsx(V,{children:e.jsxs("div",{className:"p-8",children:[e.jsxs("div",{className:"text-center mb-8",children:[e.jsx("div",{className:"text-4xl mb-3 animate-bounce-gentle",children:"✨"}),e.jsx("h1",{className:"font-display text-2xl font-bold bg-gradient-to-r from-[#e879a0] to-[#a855f7] bg-clip-text text-transparent",children:"加入我们"}),e.jsx("p",{className:"text-sm text-muted-foreground mt-1",children:"创建你的账号"})]}),e.jsxs("form",{className:"space-y-5",onSubmit:D,children:[N?e.jsx("div",{className:"rounded-xl border border-destructive/50 bg-destructive/5 p-3 text-sm text-destructive",children:N}):null,k?e.jsxs("div",{className:"rounded-xl border border-mint/50 bg-mint/10 p-3 text-sm text-green-700 dark:text-green-300",children:["🎉 ",k]}):null,e.jsxs("div",{className:"space-y-2",children:[e.jsxs(x,{htmlFor:"register-username",children:["用户名 ",e.jsx("span",{className:"text-muted-foreground text-xs",children:"(最多 20 字符)"})]}),e.jsx(m,{id:"register-username",name:"username",type:"text",maxLength:20,value:h,onChange:t=>p(t.target.value),placeholder:"你的昵称",required:!0})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx(x,{htmlFor:"register-email",children:"邮箱"}),e.jsx(m,{id:"register-email",name:"email",type:"email",autoComplete:"email",value:o,onChange:t=>a(t.target.value),placeholder:"your@email.com",required:!0})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsxs(x,{htmlFor:"register-password",children:["密码 ",e.jsx("span",{className:"text-muted-foreground text-xs",children:"(8-16 字符)"})]}),e.jsx(m,{id:"register-password",name:"password",type:"password",autoComplete:"new-password",value:g,onChange:t=>f(t.target.value),placeholder:"••••••••",required:!0})]}),e.jsxs("div",{className:"space-y-3 rounded-xl border border-sakura/20 bg-sakura/5 p-3",children:[e.jsxs("label",{className:"flex items-start gap-2.5 cursor-pointer group",children:[e.jsx("input",{type:"checkbox",className:"mt-0.5 h-4 w-4 rounded border-sakura/40 accent-pink-500 cursor-pointer",checked:c,onChange:t=>L(t.target.checked)}),e.jsxs("span",{className:"text-sm text-muted-foreground leading-relaxed",children:["我已阅读并同意"," ",e.jsx("button",{type:"button",className:"text-primary hover:underline font-medium",onClick:()=>S(!0),children:"《用户协议》"})]})]}),e.jsxs("label",{className:"flex items-start gap-2.5 cursor-pointer group",children:[e.jsx("input",{type:"checkbox",className:"mt-0.5 h-4 w-4 rounded border-sakura/40 accent-pink-500 cursor-pointer",checked:d,onChange:t=>R(t.target.checked)}),e.jsxs("span",{className:"text-sm text-muted-foreground leading-relaxed",children:["我已阅读并同意"," ",e.jsx("button",{type:"button",className:"text-primary hover:underline font-medium",onClick:()=>C(!0),children:"《隐私政策》"})]})]})]}),e.jsx(H,{enabled:P,siteKey:T,onToken:i,resetKey:_}),e.jsx(E,{className:"w-full",type:"submit",disabled:y||!c||!d,children:y?"🌸 注册中...":"✨ 注册"}),e.jsx("div",{className:"text-sm text-center pt-1",children:e.jsx("a",{className:"text-muted-foreground hover:text-primary transition-colors hover:underline",href:"/login",children:"已有账号？登录"})})]})]})})]})}M("root",e.jsx(G,{}));
