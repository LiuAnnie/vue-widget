import { createElementBlock as a, openBlock as u, createElementVNode as o, Fragment as b, renderList as k, normalizeClass as m, withDirectives as y, vModelRadio as Q, toDisplayString as c, vModelText as _, createCommentVNode as g, resolveComponent as q, createBlock as w, resolveDynamicComponent as v, createVNode as D, createApp as V } from "vue";
const h = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [d, s] of t)
    n[d] = s;
  return n;
}, E = {
  name: "TextEnumQuestion",
  props: {
    question: {
      type: Object,
      required: !0
    },
    modelValue: {
      type: [String, Number],
      default: null
    },
    isDarkMode: {
      type: Boolean,
      default: !1
    }
  },
  computed: {
    localValue: {
      get() {
        return this.modelValue;
      },
      set(e) {
        this.$emit("update:modelValue", e);
      }
    }
  }
}, I = { class: "text-enum-question" }, M = { class: "options-container" }, S = ["name", "value"], C = { class: "option-text" };
function P(e, t, n, d, s, r) {
  return u(), a("div", I, [
    o("div", M, [
      (u(!0), a(b, null, k(n.question.options, (l) => (u(), a("label", {
        key: l,
        class: m(["option-label", {
          selected: n.modelValue === l,
          "dark-mode": n.isDarkMode
        }])
      }, [
        y(o("input", {
          type: "radio",
          name: "question-" + n.question.id,
          value: l,
          "onUpdate:modelValue": t[0] || (t[0] = (i) => r.localValue = i),
          class: "option-input"
        }, null, 8, S), [
          [Q, r.localValue]
        ]),
        o("span", C, c(l), 1)
      ], 2))), 128))
    ])
  ]);
}
const T = /* @__PURE__ */ h(E, [["render", P], ["__scopeId", "data-v-a6e14a8a"]]), A = {
  name: "ImageEnumQuestion",
  props: {
    question: {
      type: Object,
      required: !0
    },
    modelValue: {
      type: String,
      default: null
    },
    isDarkMode: {
      type: Boolean,
      default: !1
    }
  },
  methods: {
    selectOption(e) {
      this.$emit("update:modelValue", e);
    }
  }
}, B = { class: "image-enum-question" }, F = { class: "options-grid" }, L = ["onClick"], U = ["src", "alt"], W = { class: "option-label" };
function N(e, t, n, d, s, r) {
  return u(), a("div", B, [
    o("div", F, [
      (u(!0), a(b, null, k(n.question.options, (l) => (u(), a("div", {
        key: l.value,
        class: m(["option-card", {
          selected: n.modelValue === l.value,
          "dark-mode": n.isDarkMode
        }]),
        onClick: (i) => r.selectOption(l.value)
      }, [
        o("img", {
          src: l.imageUrl,
          alt: l.label,
          class: "option-image"
        }, null, 8, U),
        o("div", W, c(l.label), 1)
      ], 10, L))), 128))
    ])
  ]);
}
const O = /* @__PURE__ */ h(A, [["render", N], ["__scopeId", "data-v-72dc1159"]]), z = {
  name: "TextBoxQuestion",
  props: {
    question: {
      type: Object,
      required: !0
    },
    modelValue: {
      type: String,
      default: ""
    },
    isDarkMode: {
      type: Boolean,
      default: !1
    }
  },
  computed: {
    localValue: {
      get() {
        return this.modelValue;
      },
      set(e) {
        this.$emit("update:modelValue", e);
      }
    }
  }
}, H = { class: "text-box-question" }, R = ["placeholder", "rows"];
function j(e, t, n, d, s, r) {
  return u(), a("div", H, [
    y(o("textarea", {
      "onUpdate:modelValue": t[0] || (t[0] = (l) => r.localValue = l),
      placeholder: n.question.placeholder || "Enter your answer...",
      rows: n.question.rows || 4,
      class: m(["text-input", { "dark-mode": n.isDarkMode }])
    }, null, 10, R), [
      [_, r.localValue]
    ])
  ]);
}
const Y = /* @__PURE__ */ h(z, [["render", j], ["__scopeId", "data-v-cba559f8"]]), G = {
  name: "NumericalQuestion",
  props: {
    question: {
      type: Object,
      required: !0
    },
    modelValue: {
      type: [Number, String],
      default: null
    },
    isDarkMode: {
      type: Boolean,
      default: !1
    }
  },
  computed: {
    localValue: {
      get() {
        return this.modelValue;
      },
      set(e) {
        const t = e === "" ? null : Number(e);
        this.$emit("update:modelValue", t);
      }
    }
  }
}, J = { class: "numerical-question" }, K = { class: "input-container" }, X = ["min", "max", "placeholder"], Z = {
  key: 0,
  class: "range-info"
}, $ = { key: 0 }, ee = { key: 1 };
function te(e, t, n, d, s, r) {
  return u(), a("div", J, [
    o("div", K, [
      y(o("input", {
        type: "number",
        "onUpdate:modelValue": t[0] || (t[0] = (l) => r.localValue = l),
        min: n.question.min,
        max: n.question.max,
        placeholder: n.question.placeholder || "Enter a number",
        class: m(["number-input", { "dark-mode": n.isDarkMode }])
      }, null, 10, X), [
        [_, r.localValue]
      ]),
      n.question.min !== void 0 || n.question.max !== void 0 ? (u(), a("div", Z, [
        n.question.min !== void 0 ? (u(), a("span", $, "Min: " + c(n.question.min), 1)) : g("", !0),
        n.question.max !== void 0 ? (u(), a("span", ee, "Max: " + c(n.question.max), 1)) : g("", !0)
      ])) : g("", !0)
    ])
  ]);
}
const se = /* @__PURE__ */ h(G, [["render", te], ["__scopeId", "data-v-bfa052ee"]]), p = {
  async getQuestions(e) {
    return await new Promise((t) => setTimeout(t, 500)), [
      {
        id: 1,
        type: "text-enum",
        text: "What type of HR question do you have?",
        options: [
          "Benefits-related (Health Insurance, Retirement Plans)",
          "Timesheet Submission Process",
          "Holiday or Vacation Policies",
          "Payroll Information",
          "HR Policies and Procedures",
          "Sick Leave or Paid Time Off",
          "Office Attendance Policies"
        ]
      },
      {
        id: 2,
        type: "image-enum",
        text: "Which communication style would you prefer for this matter?",
        options: [
          { value: "AI summary", label: "AI Summary", imageUrl: "images/textguide.svg" },
          { value: "link to company documentation", label: "Company Documentation", imageUrl: "images/docs.svg" },
          { value: "video", label: "Video Walkthrough", imageUrl: "images/video.svg" }
        ]
      },
      {
        id: 3,
        type: "text-box",
        text: "Your Company Email Address.",
        placeholder: "you@company.com",
        rows: 4
      },
      {
        id: 4,
        type: "numerical",
        text: "Your Employee ID.",
        min: 1,
        max: 99999999,
        placeholder: "12345678"
      }
    ];
  },
  async getSolution(e) {
    return await new Promise((n) => setTimeout(n, 1e3)), this.generateSolution(e);
  },
  generateSolution(e) {
    const t = e[1] || "unknown", n = e[2] || "unknown";
    e[3];
    const d = e[4] || "unknown", s = n.toLowerCase().startsWith("ai") ? "an" : "a";
    return `We've received your request on information about ${t}. We'll send ${s} ${n} to your provided email address. Typical response time is 2 minutes, but more complicated requests can take up to 2 hours. Thank you for your patience.

Request successfully processed for employee ${d}.`;
  },
  async submitFeedback(e) {
    return await new Promise((t) => setTimeout(t, 300)), console.log("Feedback submitted:", e), { success: !0 };
  }
}, ne = {
  name: "LoadingSpinner",
  props: {
    isDarkMode: {
      type: Boolean,
      default: !1
    }
  }
};
function oe(e, t, n, d, s, r) {
  return u(), a("div", {
    class: m(["loading-spinner", { "dark-mode": n.isDarkMode }])
  }, t[0] || (t[0] = [
    o("div", { class: "spinner" }, null, -1),
    o("div", { class: "loading-text" }, "Processing your request...", -1)
  ]), 2);
}
const ie = /* @__PURE__ */ h(ne, [["render", oe], ["__scopeId", "data-v-e1d915a2"]]), re = {
  name: "InteractiveGuidanceWidget",
  components: {
    TextEnumQuestion: T,
    ImageEnumQuestion: O,
    TextBoxQuestion: Y,
    NumericalQuestion: se,
    LoadingSpinner: ie
  },
  props: {
    config: {
      type: Object,
      default: () => ({
        logo: "/default-logo.png",
        colors: {
          primary: "#470FF4",
          secondary: "#89AAE6",
          background: "#EBFFED",
          text: "#2E3532",
          accent: "#2F242C"
        },
        fonts: {
          primary: "Arial, sans-serif",
          sizes: {
            heading: "24px",
            subheading: "18px",
            body: "16px"
          }
        }
      })
    },
    isDarkMode: {
      type: Boolean,
      default: !1
    },
    headerText: {
      type: String,
      default: "MyHR"
    }
  },
  data() {
    return {
      userProblem: "",
      problemDescription: "",
      currentQuestions: [],
      currentQuestionIndex: 0,
      answeredQuestions: [],
      answers: {},
      solution: null,
      feedback: null,
      showSolution: !1,
      isLoading: !1,
      isDarkMode: !1
    };
  },
  computed: {
    widgetStyle() {
      return {
        "--primary-color": this.config.colors.primary,
        "--secondary-color": this.config.colors.secondary,
        "--text-color": this.config.colors.text,
        "--accent-color": this.config.colors.accent,
        "--font-primary": this.config.fonts.primary,
        "--heading-size": this.config.fonts.sizes.heading,
        "--subheading-size": this.config.fonts.sizes.subheading,
        "--body-size": this.config.fonts.sizes.body,
        "--background-color": this.isDarkMode ? "#1a1a1a" : this.config.colors.background
      };
    },
    canSubmitAnswers() {
      return this.currentQuestions.every((e) => this.answers[e.id] !== void 0);
    }
  },
  mounted() {
    this.isDarkMode = this.checkSystemDarkMode(), window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
      this.isDarkMode = e.matches;
    });
  },
  beforeUnmount() {
    window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").removeEventListener("change", this.checkSystemDarkMode);
  },
  methods: {
    checkSystemDarkMode() {
      return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    },
    async submitProblem() {
      this.problemDescription = this.userProblem, await this.fetchQuestions();
    },
    async fetchQuestions() {
      try {
        this.currentQuestions = await p.getQuestions(this.problemDescription);
      } catch (e) {
        console.error("Error fetching questions:", e);
      }
    },
    getQuestionComponent(e) {
      return {
        "text-enum": "TextEnumQuestion",
        "image-enum": "ImageEnumQuestion",
        "text-box": "TextBoxQuestion",
        numerical: "NumericalQuestion"
      }[e] || "TextBoxQuestion";
    },
    async submitAnswers() {
      this.isLoading = !0, this.answeredQuestions = this.currentQuestions.map((e) => ({
        question: e.text,
        answer: this.answers[e.id],
        id: e.id,
        type: e.type,
        options: e.options,
        isEditing: !1
      })), this.currentQuestions = [];
      try {
        await new Promise((e) => setTimeout(e, 1500)), this.solution = await p.getSolution(this.answers), this.showSolution = !0;
      } catch (e) {
        console.error("Error fetching solution:", e), this.solution = "Sorry, there was an error generating your solution. Please try again.", this.showSolution = !0;
      } finally {
        this.isLoading = !1;
      }
    },
    editAnswer(e) {
      this.answeredQuestions.forEach((t) => t.isEditing = !1), this.answeredQuestions[e].isEditing = !0, this.answers[this.answeredQuestions[e].id] = this.answeredQuestions[e].answer;
    },
    async saveAnswer(e) {
      e.isEditing = !1, e.answer = this.answers[e.id], this.isLoading = !0;
      try {
        await new Promise((t) => setTimeout(t, 1500)), this.solution = await p.getSolution(this.answers);
      } catch (t) {
        console.error("Error fetching solution:", t), this.solution = "Sorry, there was an error generating your solution. Please try again.";
      } finally {
        this.isLoading = !1;
      }
    },
    cancelEdit(e) {
      e.isEditing = !1, this.answers[e.id] = e.answer;
    },
    formatAnswer(e) {
      return Array.isArray(e) ? e.join(", ") : e ?? "Not answered";
    },
    async submitFeedback(e) {
      this.feedback = e;
      try {
        await p.submitFeedback(e);
      } catch (t) {
        console.error("Error submitting feedback:", t);
      }
    },
    resetWidget() {
      this.answers = {}, this.currentQuestions = [], this.answeredQuestions = [], this.solution = null, this.feedback = null, this.problemDescription = "", this.userProblem = "", this.showSolution = !1;
    },
    startQuestions() {
      this.submitProblem();
    },
    handleUserProblemInput() {
    },
    goToNextQuestion() {
      this.currentQuestionIndex < this.currentQuestions.length - 1 ? this.currentQuestionIndex++ : this.submitAnswers();
    },
    goBack() {
      this.currentQuestionIndex > 0 ? this.currentQuestionIndex-- : (this.currentQuestions = [], this.userProblem = "");
    },
    handleContinue() {
      if (this.currentQuestion === null) {
        if (!this.userProblem.trim())
          return;
        this.answeredQuestions.push({
          question: "How can I help you?",
          answer: this.userProblem,
          isEditing: !1
        }), this.currentQuestion = this.questions[0], this.currentQuestionIndex = 0;
        return;
      }
      if (this.currentQuestion.type === "enum" && !this.selectedAnswer)
        return;
      this.answeredQuestions.push({
        question: this.currentQuestion.text,
        answer: this.selectedAnswer,
        isEditing: !1
      });
      const e = this.questions.findIndex((t) => t.id === this.currentQuestion.id);
      e < this.questions.length - 1 ? (this.currentQuestion = this.questions[e + 1], this.currentQuestionIndex = e + 1, this.selectedAnswer = null) : (this.currentQuestion = null, this.currentQuestionIndex = -1);
    }
  }
}, ue = { class: "widget-header" }, ae = ["src"], le = { class: "widget-content" }, de = {
  key: 0,
  class: "user-problem"
}, ce = ["disabled"], me = {
  key: 1,
  class: "questions-section"
}, he = { class: "question-container" }, ge = ["disabled"], fe = {
  key: 2,
  class: "solution-container"
}, pe = {
  key: 3,
  class: "solution-section"
}, ye = { class: "answered-questions" }, be = { class: "question-header" }, ke = ["onClick"], _e = {
  key: 0,
  class: "edit-answer"
}, xe = { class: "edit-buttons" }, we = ["onClick"], ve = ["onClick"], Qe = {
  key: 1,
  class: "answer-display"
}, qe = { class: "feedback-section" }, De = { class: "feedback-buttons" };
function Ve(e, t, n, d, s, r) {
  const l = q("LoadingSpinner");
  return u(), a("div", {
    class: m(["guidance-widget", { "dark-mode": s.isDarkMode }])
  }, [
    o("div", ue, [
      o("h2", null, c(n.headerText), 1),
      o("img", {
        src: n.config.logo,
        alt: "Logo",
        class: "widget-logo"
      }, null, 8, ae)
    ]),
    o("div", le, [
      !s.currentQuestions.length && !s.answeredQuestions.length ? (u(), a("div", de, [
        t[9] || (t[9] = o("h3", null, "How can I help you?", -1)),
        y(o("textarea", {
          "onUpdate:modelValue": t[0] || (t[0] = (i) => s.userProblem = i),
          placeholder: "Describe your HR question or request...",
          onInput: t[1] || (t[1] = (...i) => r.handleUserProblemInput && r.handleUserProblemInput(...i))
        }, null, 544), [
          [_, s.userProblem]
        ]),
        o("button", {
          onClick: t[2] || (t[2] = (...i) => r.startQuestions && r.startQuestions(...i)),
          disabled: !s.userProblem.trim()
        }, " Continue ", 8, ce)
      ])) : s.currentQuestions.length > 0 ? (u(), a("div", me, [
        o("button", {
          class: "back-button",
          onClick: t[3] || (t[3] = (...i) => r.goBack && r.goBack(...i))
        }, " ← "),
        o("div", he, [
          o("h3", null, c(s.currentQuestions[s.currentQuestionIndex].text), 1),
          (u(), w(v(r.getQuestionComponent(s.currentQuestions[s.currentQuestionIndex].type)), {
            question: s.currentQuestions[s.currentQuestionIndex],
            modelValue: s.answers[s.currentQuestions[s.currentQuestionIndex].id],
            "onUpdate:modelValue": t[4] || (t[4] = (i) => s.answers[s.currentQuestions[s.currentQuestionIndex].id] = i),
            "is-dark-mode": s.isDarkMode
          }, null, 8, ["question", "modelValue", "is-dark-mode"])),
          o("button", {
            onClick: t[5] || (t[5] = (...i) => r.goToNextQuestion && r.goToNextQuestion(...i)),
            disabled: !s.answers[s.currentQuestions[s.currentQuestionIndex].id],
            class: "continue-button"
          }, " Continue ", 8, ge)
        ])
      ])) : s.isLoading ? (u(), a("div", fe, [
        D(l, { "is-dark-mode": s.isDarkMode }, null, 8, ["is-dark-mode"])
      ])) : g("", !0),
      s.solution && s.showSolution ? (u(), a("div", pe, [
        t[12] || (t[12] = o("h3", null, "Based on your request:", -1)),
        o("p", null, c(s.solution), 1),
        o("div", ye, [
          t[10] || (t[10] = o("h4", null, "Your Answers", -1)),
          (u(!0), a(b, null, k(s.answeredQuestions, (i, x) => (u(), a("div", {
            key: x,
            class: "answered-question"
          }, [
            o("div", be, [
              o("h5", null, c(i.question), 1),
              o("span", {
                class: "edit-icon",
                onClick: (f) => r.editAnswer(x)
              }, "✎", 8, ke)
            ]),
            i.isEditing ? (u(), a("div", _e, [
              (u(), w(v(r.getQuestionComponent(i.type)), {
                question: {
                  id: i.id,
                  type: i.type,
                  text: i.question,
                  options: i.options,
                  placeholder: i.placeholder,
                  min: i.min,
                  max: i.max
                },
                modelValue: s.answers[i.id],
                "onUpdate:modelValue": (f) => s.answers[i.id] = f,
                "is-dark-mode": s.isDarkMode
              }, null, 8, ["question", "modelValue", "onUpdate:modelValue", "is-dark-mode"])),
              o("div", xe, [
                o("button", {
                  onClick: (f) => r.cancelEdit(i)
                }, "Cancel", 8, we),
                o("button", {
                  onClick: (f) => r.saveAnswer(i)
                }, "Save", 8, ve)
              ])
            ])) : (u(), a("div", Qe, c(i.answer), 1))
          ]))), 128))
        ]),
        o("div", qe, [
          t[11] || (t[11] = o("h4", null, "Was this helpful?", -1)),
          o("div", De, [
            o("button", {
              onClick: t[6] || (t[6] = (i) => r.submitFeedback(!0)),
              class: m(["feedback-button", { selected: s.feedback === !0 }])
            }, " 👍 ", 2),
            o("button", {
              onClick: t[7] || (t[7] = (i) => r.submitFeedback(!1)),
              class: m(["feedback-button", { selected: s.feedback === !1 }])
            }, " 👎 ", 2)
          ]),
          o("button", {
            onClick: t[8] || (t[8] = (...i) => r.resetWidget && r.resetWidget(...i)),
            class: "reset-button"
          }, "Done")
        ])
      ])) : g("", !0)
    ])
  ], 2);
}
const Ee = /* @__PURE__ */ h(re, [["render", Ve], ["__scopeId", "data-v-127a761e"]]);
class Ie {
  constructor(t = {}) {
    this.options = {
      target: t.target || "#vue-widget",
      config: t.config || {
        logo: "/default-logo.png",
        colors: {
          primary: "#470FF4",
          secondary: "#89AAE6",
          background: "#EBFFED",
          text: "#2E3532",
          accent: "#2F242C"
        },
        fonts: {
          primary: "Arial, sans-serif",
          sizes: {
            heading: "24px",
            subheading: "18px",
            body: "16px"
          }
        }
      },
      headerText: t.headerText || "MyHR",
      isDarkMode: t.isDarkMode || !1
    };
  }
  mount() {
    const t = document.querySelector(this.options.target);
    if (!t)
      throw new Error(`Target element "${this.options.target}" not found`);
    const n = V(Ee, {
      config: this.options.config,
      headerText: this.options.headerText,
      isDarkMode: this.options.isDarkMode
    });
    return n.mount(t), n;
  }
}
typeof window < "u" && (window.VueWidget = Ie);
export {
  Ie as default
};
