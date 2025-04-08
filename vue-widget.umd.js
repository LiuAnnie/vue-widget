(function(e,a){typeof exports=="object"&&typeof module<"u"?module.exports=a(require("vue")):typeof define=="function"&&define.amd?define(["vue"],a):(e=typeof globalThis<"u"?globalThis:e||self,e.VueWidget=a(e.Vue))})(this,function(e){"use strict";const a=(t,n)=>{const s=t.__vccOpts||t;for(const[c,o]of n)s[c]=o;return s},p={name:"TextEnumQuestion",props:{question:{type:Object,required:!0},modelValue:{type:[String,Number],default:null},isDarkMode:{type:Boolean,default:!1}},computed:{localValue:{get(){return this.modelValue},set(t){this.$emit("update:modelValue",t)}}}},g={class:"text-enum-question"},f={class:"options-container"},k=["name","value"],y={class:"option-text"};function b(t,n,s,c,o,r){return e.openBlock(),e.createElementBlock("div",g,[e.createElementVNode("div",f,[(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(s.question.options,l=>(e.openBlock(),e.createElementBlock("label",{key:l,class:e.normalizeClass(["option-label",{selected:s.modelValue===l,"dark-mode":s.isDarkMode}])},[e.withDirectives(e.createElementVNode("input",{type:"radio",name:"question-"+s.question.id,value:l,"onUpdate:modelValue":n[0]||(n[0]=i=>r.localValue=i),class:"option-input"},null,8,k),[[e.vModelRadio,r.localValue]]),e.createElementVNode("span",y,e.toDisplayString(l),1)],2))),128))])])}const E=a(p,[["render",b],["__scopeId","data-v-a6e14a8a"]]),_={name:"ImageEnumQuestion",props:{question:{type:Object,required:!0},modelValue:{type:String,default:null},isDarkMode:{type:Boolean,default:!1}},methods:{selectOption(t){this.$emit("update:modelValue",t)}}},x={class:"image-enum-question"},w={class:"options-grid"},V=["onClick"],Q=["src","alt"],B={class:"option-label"};function N(t,n,s,c,o,r){return e.openBlock(),e.createElementBlock("div",x,[e.createElementVNode("div",w,[(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(s.question.options,l=>(e.openBlock(),e.createElementBlock("div",{key:l.value,class:e.normalizeClass(["option-card",{selected:s.modelValue===l.value,"dark-mode":s.isDarkMode}]),onClick:i=>r.selectOption(l.value)},[e.createElementVNode("img",{src:l.imageUrl,alt:l.label,class:"option-image"},null,8,Q),e.createElementVNode("div",B,e.toDisplayString(l.label),1)],10,V))),128))])])}const q=a(_,[["render",N],["__scopeId","data-v-72dc1159"]]),D={name:"TextBoxQuestion",props:{question:{type:Object,required:!0},modelValue:{type:String,default:""},isDarkMode:{type:Boolean,default:!1}},computed:{localValue:{get(){return this.modelValue},set(t){this.$emit("update:modelValue",t)}}}},C={class:"text-box-question"},S=["placeholder","rows"];function M(t,n,s,c,o,r){return e.openBlock(),e.createElementBlock("div",C,[e.withDirectives(e.createElementVNode("textarea",{"onUpdate:modelValue":n[0]||(n[0]=l=>r.localValue=l),placeholder:s.question.placeholder||"Enter your answer...",rows:s.question.rows||4,class:e.normalizeClass(["text-input",{"dark-mode":s.isDarkMode}])},null,10,S),[[e.vModelText,r.localValue]])])}const I=a(D,[["render",M],["__scopeId","data-v-cba559f8"]]),T={name:"NumericalQuestion",props:{question:{type:Object,required:!0},modelValue:{type:[Number,String],default:null},isDarkMode:{type:Boolean,default:!1}},computed:{localValue:{get(){return this.modelValue},set(t){const n=t===""?null:Number(t);this.$emit("update:modelValue",n)}}}},P={class:"numerical-question"},A={class:"input-container"},F=["min","max","placeholder"],L={key:0,class:"range-info"},z={key:0},U={key:1};function W(t,n,s,c,o,r){return e.openBlock(),e.createElementBlock("div",P,[e.createElementVNode("div",A,[e.withDirectives(e.createElementVNode("input",{type:"number","onUpdate:modelValue":n[0]||(n[0]=l=>r.localValue=l),min:s.question.min,max:s.question.max,placeholder:s.question.placeholder||"Enter a number",class:e.normalizeClass(["number-input",{"dark-mode":s.isDarkMode}])},null,10,F),[[e.vModelText,r.localValue]]),s.question.min!==void 0||s.question.max!==void 0?(e.openBlock(),e.createElementBlock("div",L,[s.question.min!==void 0?(e.openBlock(),e.createElementBlock("span",z,"Min: "+e.toDisplayString(s.question.min),1)):e.createCommentVNode("",!0),s.question.max!==void 0?(e.openBlock(),e.createElementBlock("span",U,"Max: "+e.toDisplayString(s.question.max),1)):e.createCommentVNode("",!0)])):e.createCommentVNode("",!0)])])}const O=a(T,[["render",W],["__scopeId","data-v-bfa052ee"]]),d={async getQuestions(t){return await new Promise(n=>setTimeout(n,500)),[{id:1,type:"text-enum",text:"What type of HR question do you have?",options:["Benefits-related (Health Insurance, Retirement Plans)","Timesheet Submission Process","Holiday or Vacation Policies","Payroll Information","HR Policies and Procedures","Sick Leave or Paid Time Off","Office Attendance Policies"]},{id:2,type:"image-enum",text:"Which communication style would you prefer for this matter?",options:[{value:"AI summary",label:"AI Summary",imageUrl:"images/textguide.svg"},{value:"link to company documentation",label:"Company Documentation",imageUrl:"images/docs.svg"},{value:"video",label:"Video Walkthrough",imageUrl:"images/video.svg"}]},{id:3,type:"text-box",text:"Your Company Email Address.",placeholder:"you@company.com",rows:4},{id:4,type:"numerical",text:"Your Employee ID.",min:1,max:99999999,placeholder:"12345678"}]},async getSolution(t){return await new Promise(s=>setTimeout(s,1e3)),this.generateSolution(t)},generateSolution(t){const n=t[1]||"unknown",s=t[2]||"unknown";t[3];const c=t[4]||"unknown",o=s.toLowerCase().startsWith("ai")?"an":"a";return`We've received your request on information about ${n}. We'll send ${o} ${s} to your provided email address. Typical response time is 2 minutes, but more complicated requests can take up to 2 hours. Thank you for your patience.

Request successfully processed for employee ${c}.`},async submitFeedback(t){return await new Promise(n=>setTimeout(n,300)),console.log("Feedback submitted:",t),{success:!0}}},H={name:"LoadingSpinner",props:{isDarkMode:{type:Boolean,default:!1}}};function R(t,n,s,c,o,r){return e.openBlock(),e.createElementBlock("div",{class:e.normalizeClass(["loading-spinner",{"dark-mode":s.isDarkMode}])},n[0]||(n[0]=[e.createElementVNode("div",{class:"spinner"},null,-1),e.createElementVNode("div",{class:"loading-text"},"Processing your request...",-1)]),2)}const j={name:"InteractiveGuidanceWidget",components:{TextEnumQuestion:E,ImageEnumQuestion:q,TextBoxQuestion:I,NumericalQuestion:O,LoadingSpinner:a(H,[["render",R],["__scopeId","data-v-e1d915a2"]])},props:{config:{type:Object,default:()=>({logo:"/default-logo.png",colors:{primary:"#470FF4",secondary:"#89AAE6",background:"#EBFFED",text:"#2E3532",accent:"#2F242C"},fonts:{primary:"Arial, sans-serif",sizes:{heading:"24px",subheading:"18px",body:"16px"}}})},isDarkMode:{type:Boolean,default:!1},headerText:{type:String,default:"MyHR"}},data(){return{userProblem:"",problemDescription:"",currentQuestions:[],currentQuestionIndex:0,answeredQuestions:[],answers:{},solution:null,feedback:null,showSolution:!1,isLoading:!1,isDarkMode:!1}},computed:{widgetStyle(){return{"--primary-color":this.config.colors.primary,"--secondary-color":this.config.colors.secondary,"--text-color":this.config.colors.text,"--accent-color":this.config.colors.accent,"--font-primary":this.config.fonts.primary,"--heading-size":this.config.fonts.sizes.heading,"--subheading-size":this.config.fonts.sizes.subheading,"--body-size":this.config.fonts.sizes.body,"--background-color":this.isDarkMode?"#1a1a1a":this.config.colors.background}},canSubmitAnswers(){return this.currentQuestions.every(t=>this.answers[t.id]!==void 0)}},mounted(){this.isDarkMode=this.checkSystemDarkMode(),window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",t=>{this.isDarkMode=t.matches})},beforeUnmount(){window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").removeEventListener("change",this.checkSystemDarkMode)},methods:{checkSystemDarkMode(){return window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches},async submitProblem(){this.problemDescription=this.userProblem,await this.fetchQuestions()},async fetchQuestions(){try{this.currentQuestions=await d.getQuestions(this.problemDescription)}catch(t){console.error("Error fetching questions:",t)}},getQuestionComponent(t){return{"text-enum":"TextEnumQuestion","image-enum":"ImageEnumQuestion","text-box":"TextBoxQuestion",numerical:"NumericalQuestion"}[t]||"TextBoxQuestion"},async submitAnswers(){this.isLoading=!0,this.answeredQuestions=this.currentQuestions.map(t=>({question:t.text,answer:this.answers[t.id],id:t.id,type:t.type,options:t.options,isEditing:!1})),this.currentQuestions=[];try{await new Promise(t=>setTimeout(t,1500)),this.solution=await d.getSolution(this.answers),this.showSolution=!0}catch(t){console.error("Error fetching solution:",t),this.solution="Sorry, there was an error generating your solution. Please try again.",this.showSolution=!0}finally{this.isLoading=!1}},editAnswer(t){this.answeredQuestions.forEach(n=>n.isEditing=!1),this.answeredQuestions[t].isEditing=!0,this.answers[this.answeredQuestions[t].id]=this.answeredQuestions[t].answer},async saveAnswer(t){t.isEditing=!1,t.answer=this.answers[t.id],this.isLoading=!0;try{await new Promise(n=>setTimeout(n,1500)),this.solution=await d.getSolution(this.answers)}catch(n){console.error("Error fetching solution:",n),this.solution="Sorry, there was an error generating your solution. Please try again."}finally{this.isLoading=!1}},cancelEdit(t){t.isEditing=!1,this.answers[t.id]=t.answer},formatAnswer(t){return Array.isArray(t)?t.join(", "):t??"Not answered"},async submitFeedback(t){this.feedback=t;try{await d.submitFeedback(t)}catch(n){console.error("Error submitting feedback:",n)}},resetWidget(){this.answers={},this.currentQuestions=[],this.answeredQuestions=[],this.solution=null,this.feedback=null,this.problemDescription="",this.userProblem="",this.showSolution=!1},startQuestions(){this.submitProblem()},handleUserProblemInput(){},goToNextQuestion(){this.currentQuestionIndex<this.currentQuestions.length-1?this.currentQuestionIndex++:this.submitAnswers()},goBack(){this.currentQuestionIndex>0?this.currentQuestionIndex--:(this.currentQuestions=[],this.userProblem="")},handleContinue(){if(this.currentQuestion===null){if(!this.userProblem.trim())return;this.answeredQuestions.push({question:"How can I help you?",answer:this.userProblem,isEditing:!1}),this.currentQuestion=this.questions[0],this.currentQuestionIndex=0;return}if(this.currentQuestion.type==="enum"&&!this.selectedAnswer)return;this.answeredQuestions.push({question:this.currentQuestion.text,answer:this.selectedAnswer,isEditing:!1});const t=this.questions.findIndex(n=>n.id===this.currentQuestion.id);t<this.questions.length-1?(this.currentQuestion=this.questions[t+1],this.currentQuestionIndex=t+1,this.selectedAnswer=null):(this.currentQuestion=null,this.currentQuestionIndex=-1)}}},Y={class:"widget-header"},G=["src"],J={class:"widget-content"},K={key:0,class:"user-problem"},X=["disabled"],Z={key:1,class:"questions-section"},$={class:"question-container"},v=["disabled"],ee={key:2,class:"solution-container"},te={key:3,class:"solution-section"},ne={class:"answered-questions"},oe={class:"question-header"},se=["onClick"],ie={key:0,class:"edit-answer"},re={class:"edit-buttons"},le=["onClick"],ae=["onClick"],ce={key:1,class:"answer-display"},de={class:"feedback-section"},ue={class:"feedback-buttons"};function me(t,n,s,c,o,r){const l=e.resolveComponent("LoadingSpinner");return e.openBlock(),e.createElementBlock("div",{class:e.normalizeClass(["guidance-widget",{"dark-mode":o.isDarkMode}])},[e.createElementVNode("div",Y,[e.createElementVNode("h2",null,e.toDisplayString(s.headerText),1),e.createElementVNode("img",{src:s.config.logo,alt:"Logo",class:"widget-logo"},null,8,G)]),e.createElementVNode("div",J,[!o.currentQuestions.length&&!o.answeredQuestions.length?(e.openBlock(),e.createElementBlock("div",K,[n[9]||(n[9]=e.createElementVNode("h3",null,"How can I help you?",-1)),e.withDirectives(e.createElementVNode("textarea",{"onUpdate:modelValue":n[0]||(n[0]=i=>o.userProblem=i),placeholder:"Describe your HR question or request...",onInput:n[1]||(n[1]=(...i)=>r.handleUserProblemInput&&r.handleUserProblemInput(...i))},null,544),[[e.vModelText,o.userProblem]]),e.createElementVNode("button",{onClick:n[2]||(n[2]=(...i)=>r.startQuestions&&r.startQuestions(...i)),disabled:!o.userProblem.trim()}," Continue ",8,X)])):o.currentQuestions.length>0?(e.openBlock(),e.createElementBlock("div",Z,[e.createElementVNode("button",{class:"back-button",onClick:n[3]||(n[3]=(...i)=>r.goBack&&r.goBack(...i))}," ← "),e.createElementVNode("div",$,[e.createElementVNode("h3",null,e.toDisplayString(o.currentQuestions[o.currentQuestionIndex].text),1),(e.openBlock(),e.createBlock(e.resolveDynamicComponent(r.getQuestionComponent(o.currentQuestions[o.currentQuestionIndex].type)),{question:o.currentQuestions[o.currentQuestionIndex],modelValue:o.answers[o.currentQuestions[o.currentQuestionIndex].id],"onUpdate:modelValue":n[4]||(n[4]=i=>o.answers[o.currentQuestions[o.currentQuestionIndex].id]=i),"is-dark-mode":o.isDarkMode},null,8,["question","modelValue","is-dark-mode"])),e.createElementVNode("button",{onClick:n[5]||(n[5]=(...i)=>r.goToNextQuestion&&r.goToNextQuestion(...i)),disabled:!o.answers[o.currentQuestions[o.currentQuestionIndex].id],class:"continue-button"}," Continue ",8,v)])])):o.isLoading?(e.openBlock(),e.createElementBlock("div",ee,[e.createVNode(l,{"is-dark-mode":o.isDarkMode},null,8,["is-dark-mode"])])):e.createCommentVNode("",!0),o.solution&&o.showSolution?(e.openBlock(),e.createElementBlock("div",te,[n[12]||(n[12]=e.createElementVNode("h3",null,"Based on your request:",-1)),e.createElementVNode("p",null,e.toDisplayString(o.solution),1),e.createElementVNode("div",ne,[n[10]||(n[10]=e.createElementVNode("h4",null,"Your Answers",-1)),(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(o.answeredQuestions,(i,h)=>(e.openBlock(),e.createElementBlock("div",{key:h,class:"answered-question"},[e.createElementVNode("div",oe,[e.createElementVNode("h5",null,e.toDisplayString(i.question),1),e.createElementVNode("span",{class:"edit-icon",onClick:u=>r.editAnswer(h)},"✎",8,se)]),i.isEditing?(e.openBlock(),e.createElementBlock("div",ie,[(e.openBlock(),e.createBlock(e.resolveDynamicComponent(r.getQuestionComponent(i.type)),{question:{id:i.id,type:i.type,text:i.question,options:i.options,placeholder:i.placeholder,min:i.min,max:i.max},modelValue:o.answers[i.id],"onUpdate:modelValue":u=>o.answers[i.id]=u,"is-dark-mode":o.isDarkMode},null,8,["question","modelValue","onUpdate:modelValue","is-dark-mode"])),e.createElementVNode("div",re,[e.createElementVNode("button",{onClick:u=>r.cancelEdit(i)},"Cancel",8,le),e.createElementVNode("button",{onClick:u=>r.saveAnswer(i)},"Save",8,ae)])])):(e.openBlock(),e.createElementBlock("div",ce,e.toDisplayString(i.answer),1))]))),128))]),e.createElementVNode("div",de,[n[11]||(n[11]=e.createElementVNode("h4",null,"Was this helpful?",-1)),e.createElementVNode("div",ue,[e.createElementVNode("button",{onClick:n[6]||(n[6]=i=>r.submitFeedback(!0)),class:e.normalizeClass(["feedback-button",{selected:o.feedback===!0}])}," 👍 ",2),e.createElementVNode("button",{onClick:n[7]||(n[7]=i=>r.submitFeedback(!1)),class:e.normalizeClass(["feedback-button",{selected:o.feedback===!1}])}," 👎 ",2)]),e.createElementVNode("button",{onClick:n[8]||(n[8]=(...i)=>r.resetWidget&&r.resetWidget(...i)),class:"reset-button"},"Done")])])):e.createCommentVNode("",!0)])],2)}const he=a(j,[["render",me],["__scopeId","data-v-127a761e"]]);class m{constructor(n={}){this.options={target:n.target||"#vue-widget",config:n.config||{logo:"/default-logo.png",colors:{primary:"#470FF4",secondary:"#89AAE6",background:"#EBFFED",text:"#2E3532",accent:"#2F242C"},fonts:{primary:"Arial, sans-serif",sizes:{heading:"24px",subheading:"18px",body:"16px"}}},headerText:n.headerText||"MyHR",isDarkMode:n.isDarkMode||!1}}mount(){const n=document.querySelector(this.options.target);if(!n)throw new Error(`Target element "${this.options.target}" not found`);const s=e.createApp(he,{config:this.options.config,headerText:this.options.headerText,isDarkMode:this.options.isDarkMode});return s.mount(n),s}}return typeof window<"u"&&(window.VueWidget=m),m});
