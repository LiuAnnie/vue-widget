import { createElementBlock as a, openBlock as u, createElementVNode as i, Fragment as b, renderList as k, normalizeClass as m, withDirectives as y, vModelRadio as Q, toDisplayString as c, vModelText as x, createCommentVNode as h, resolveComponent as q, createBlock as v, resolveDynamicComponent as w, createVNode as V, createApp as E } from "vue";
const f = (e, t) => {
  const s = e.__vccOpts || e;
  for (const [d, n] of t)
    s[d] = n;
  return s;
}, I = {
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
}, D = { class: "text-enum-question" }, M = { class: "options-container" }, S = ["name", "value"], C = { class: "option-text" };
function P(e, t, s, d, n, r) {
  return u(), a("div", D, [
    i("div", M, [
      (u(!0), a(b, null, k(s.question.options, (l) => (u(), a("label", {
        key: l,
        class: m(["option-label", {
          selected: s.modelValue === l,
          "dark-mode": s.isDarkMode
        }])
      }, [
        y(i("input", {
          type: "radio",
          name: "question-" + s.question.id,
          value: l,
          "onUpdate:modelValue": t[0] || (t[0] = (o) => r.localValue = o),
          class: "option-input"
        }, null, 8, S), [
          [Q, r.localValue]
        ]),
        i("span", C, c(l), 1)
      ], 2))), 128))
    ])
  ]);
}
const T = /* @__PURE__ */ f(I, [["render", P], ["__scopeId", "data-v-a6e14a8a"]]), A = {
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
}, N = { class: "image-enum-question" }, B = { class: "options-grid" }, F = ["onClick"], L = ["src", "alt"], U = { class: "option-label" };
function W(e, t, s, d, n, r) {
  return u(), a("div", N, [
    i("div", B, [
      (u(!0), a(b, null, k(s.question.options, (l) => (u(), a("div", {
        key: l.value,
        class: m(["option-card", {
          selected: s.modelValue === l.value,
          "dark-mode": s.isDarkMode
        }]),
        onClick: (o) => r.selectOption(l.value)
      }, [
        i("img", {
          src: l.imageUrl,
          alt: l.label,
          class: "option-image"
        }, null, 8, L),
        i("div", U, c(l.label), 1)
      ], 10, F))), 128))
    ])
  ]);
}
const O = /* @__PURE__ */ f(A, [["render", W], ["__scopeId", "data-v-72dc1159"]]), z = {
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
function j(e, t, s, d, n, r) {
  return u(), a("div", H, [
    y(i("textarea", {
      "onUpdate:modelValue": t[0] || (t[0] = (l) => r.localValue = l),
      placeholder: s.question.placeholder || "Enter your answer...",
      rows: s.question.rows || 4,
      class: m(["text-input", { "dark-mode": s.isDarkMode }])
    }, null, 10, R), [
      [x, r.localValue]
    ])
  ]);
}
const Y = /* @__PURE__ */ f(z, [["render", j], ["__scopeId", "data-v-cba559f8"]]), G = {
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
  data() {
    var e;
    return {
      inputValue: ((e = this.modelValue) == null ? void 0 : e.toString()) ?? ""
    };
  },
  watch: {
    modelValue(e) {
      this.inputValue = (e == null ? void 0 : e.toString()) ?? "";
    }
  },
  computed: {
    showError() {
      const e = Number(this.inputValue);
      if (this.inputValue === "" || isNaN(e)) return !1;
      const t = this.question.min, s = this.question.max;
      return t !== void 0 && e < t || s !== void 0 && e > s;
    },
    errorMessage() {
      const e = Number(this.inputValue), t = this.question.min, s = this.question.max;
      return t !== void 0 && e < t ? "Employee ID must be 8 digits." : s !== void 0 && e > s ? `Value must be at most ${s}.` : `Value must be between ${t} and ${s}.`;
    }
  },
  methods: {
    handleInput(e) {
      const s = e.target.value.replace(/\D/g, "").slice(0, 8);
      this.inputValue = s;
      const d = Number(s);
      s !== "" && !isNaN(d) && (this.question.min === void 0 || d >= this.question.min) && (this.question.max === void 0 || d <= this.question.max) ? this.$emit("update:modelValue", d) : this.$emit("update:modelValue", null);
    }
  }
}, J = { class: "numerical-question" }, K = { class: "input-container" }, X = ["placeholder"], Z = {
  key: 0,
  class: "range-info"
}, $ = { key: 0 }, ee = { key: 1 }, te = {
  key: 1,
  class: "error-message"
};
function se(e, t, s, d, n, r) {
  return u(), a("div", J, [
    i("div", K, [
      y(i("input", {
        type: "text",
        "onUpdate:modelValue": t[0] || (t[0] = (l) => n.inputValue = l),
        onInput: t[1] || (t[1] = (...l) => r.handleInput && r.handleInput(...l)),
        placeholder: s.question.placeholder || `Enter a number (${s.question.min}-${s.question.max})`,
        class: m(["number-input", { "dark-mode": s.isDarkMode, "has-error": r.showError }])
      }, null, 42, X), [
        [x, n.inputValue]
      ]),
      s.question.min !== void 0 || s.question.max !== void 0 ? (u(), a("div", Z, [
        s.question.min !== void 0 ? (u(), a("span", $, "Min: " + c(s.question.min), 1)) : h("", !0),
        s.question.max !== void 0 ? (u(), a("span", ee, "Max: " + c(s.question.max), 1)) : h("", !0)
      ])) : h("", !0),
      r.showError ? (u(), a("div", te, c(r.errorMessage), 1)) : h("", !0)
    ])
  ]);
}
const ne = /* @__PURE__ */ f(G, [["render", se], ["__scopeId", "data-v-f83cb8fb"]]), p = {
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
          { value: "AI summary", label: "AI Summary", imageUrl: "public/images/textguide.svg" },
          { value: "link to company documentation", label: "Company Documentation", imageUrl: "public/images/docs.svg" },
          { value: "video", label: "Video Walkthrough", imageUrl: "public/images/video.svg" }
        ]
      },
      {
        id: 3,
        type: "text-box",
        text: "Your Company Email Address",
        placeholder: "you@company.com",
        rows: 4
      },
      {
        id: 4,
        type: "numerical",
        text: "Your Employee ID",
        min: 1e7,
        max: 99999999,
        placeholder: "12345678"
      }
    ];
  },
  async getSolution(e) {
    return await new Promise((s) => setTimeout(s, 1e3)), this.generateSolution(e);
  },
  generateSolution(e) {
    const t = e[1] || "unknown", s = e[2] || "unknown";
    e[3];
    const d = e[4] || "unknown", n = s.toLowerCase().startsWith("ai") ? "an" : "a";
    return `We've received your request on information about ${t}. We'll send ${n} ${s} to your provided email address. Typical response time is 2 minutes, but more complicated requests can take up to 2 hours. Thank you for your patience.

Request successfully processed for employee ${d}.`;
  },
  async submitFeedback(e) {
    return await new Promise((t) => setTimeout(t, 300)), console.log("Feedback submitted:", e), { success: !0 };
  }
}, ie = {
  name: "LoadingSpinner",
  props: {
    isDarkMode: {
      type: Boolean,
      default: !1
    }
  }
};
function oe(e, t, s, d, n, r) {
  return u(), a("div", {
    class: m(["loading-spinner", { "dark-mode": s.isDarkMode }])
  }, t[0] || (t[0] = [
    i("div", { class: "spinner" }, null, -1),
    i("div", { class: "loading-text" }, "Processing your request...", -1)
  ]), 2);
}
const re = /* @__PURE__ */ f(ie, [["render", oe], ["__scopeId", "data-v-e1d915a2"]]), ue = {
  name: "InteractiveGuidanceWidget",
  components: {
    TextEnumQuestion: T,
    ImageEnumQuestion: O,
    TextBoxQuestion: Y,
    NumericalQuestion: ne,
    LoadingSpinner: re
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
        min: e.min,
        max: e.max,
        placeholder: e.placeholder,
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
      if (e.type === "numerical") {
        const t = Number(this.answers[e.id]);
        if (isNaN(t) || e.min !== void 0 && t < e.min || e.max !== void 0 && t > e.max) {
          this.answers[e.id] = e.answer, e.isEditing = !1;
          return;
        }
      }
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
}, ae = { class: "widget-header" }, le = ["src"], de = { class: "widget-content" }, ce = {
  key: 0,
  class: "user-problem"
}, me = ["disabled"], he = {
  key: 1,
  class: "questions-section"
}, fe = { class: "question-container" }, ge = ["disabled"], pe = {
  key: 2,
  class: "solution-container"
}, ye = {
  key: 3,
  class: "solution-section"
}, be = { class: "answered-questions" }, ke = { class: "question-header" }, xe = ["onClick"], _e = {
  key: 0,
  class: "edit-answer"
}, ve = { class: "edit-buttons" }, we = ["onClick"], Qe = ["onClick"], qe = {
  key: 1,
  class: "answer-display"
}, Ve = { class: "feedback-section" }, Ee = { class: "feedback-buttons" };
function Ie(e, t, s, d, n, r) {
  const l = q("LoadingSpinner");
  return u(), a("div", {
    class: m(["guidance-widget", { "dark-mode": n.isDarkMode }])
  }, [
    i("div", ae, [
      i("h2", null, c(s.headerText), 1),
      i("img", {
        src: s.config.logo,
        alt: "Logo",
        class: "widget-logo"
      }, null, 8, le)
    ]),
    i("div", de, [
      !n.currentQuestions.length && !n.answeredQuestions.length ? (u(), a("div", ce, [
        t[9] || (t[9] = i("h3", null, "How can I help you?", -1)),
        y(i("textarea", {
          "onUpdate:modelValue": t[0] || (t[0] = (o) => n.userProblem = o),
          placeholder: "Describe your HR question or request...",
          onInput: t[1] || (t[1] = (...o) => r.handleUserProblemInput && r.handleUserProblemInput(...o))
        }, null, 544), [
          [x, n.userProblem]
        ]),
        i("button", {
          onClick: t[2] || (t[2] = (...o) => r.startQuestions && r.startQuestions(...o)),
          disabled: !n.userProblem.trim()
        }, " Continue ", 8, me)
      ])) : n.currentQuestions.length > 0 ? (u(), a("div", he, [
        i("button", {
          class: "back-button",
          onClick: t[3] || (t[3] = (...o) => r.goBack && r.goBack(...o))
        }, " ← "),
        i("div", fe, [
          i("h3", null, c(n.currentQuestions[n.currentQuestionIndex].text), 1),
          (u(), v(w(r.getQuestionComponent(n.currentQuestions[n.currentQuestionIndex].type)), {
            question: n.currentQuestions[n.currentQuestionIndex],
            modelValue: n.answers[n.currentQuestions[n.currentQuestionIndex].id],
            "onUpdate:modelValue": t[4] || (t[4] = (o) => n.answers[n.currentQuestions[n.currentQuestionIndex].id] = o),
            "is-dark-mode": n.isDarkMode
          }, null, 8, ["question", "modelValue", "is-dark-mode"])),
          i("button", {
            onClick: t[5] || (t[5] = (...o) => r.goToNextQuestion && r.goToNextQuestion(...o)),
            disabled: !n.answers[n.currentQuestions[n.currentQuestionIndex].id],
            class: "continue-button"
          }, " Continue ", 8, ge)
        ])
      ])) : n.isLoading ? (u(), a("div", pe, [
        V(l, { "is-dark-mode": n.isDarkMode }, null, 8, ["is-dark-mode"])
      ])) : h("", !0),
      n.solution && n.showSolution ? (u(), a("div", ye, [
        t[12] || (t[12] = i("h3", null, "Based on your request:", -1)),
        i("p", null, c(n.solution), 1),
        i("div", be, [
          t[10] || (t[10] = i("h4", null, "Your Answers", -1)),
          (u(!0), a(b, null, k(n.answeredQuestions, (o, _) => (u(), a("div", {
            key: _,
            class: "answered-question"
          }, [
            i("div", ke, [
              i("h5", null, c(o.question), 1),
              i("span", {
                class: "edit-icon",
                onClick: (g) => r.editAnswer(_)
              }, "✎", 8, xe)
            ]),
            o.isEditing ? (u(), a("div", _e, [
              (u(), v(w(r.getQuestionComponent(o.type)), {
                question: {
                  id: o.id,
                  type: o.type,
                  text: o.question,
                  options: o.options,
                  placeholder: o.placeholder,
                  min: o.min,
                  max: o.max
                },
                modelValue: n.answers[o.id],
                "onUpdate:modelValue": (g) => n.answers[o.id] = g,
                "is-dark-mode": n.isDarkMode
              }, null, 8, ["question", "modelValue", "onUpdate:modelValue", "is-dark-mode"])),
              i("div", ve, [
                i("button", {
                  onClick: (g) => r.cancelEdit(o)
                }, "Cancel", 8, we),
                i("button", {
                  onClick: (g) => r.saveAnswer(o)
                }, "Save", 8, Qe)
              ])
            ])) : (u(), a("div", qe, c(o.answer), 1))
          ]))), 128))
        ]),
        i("div", Ve, [
          t[11] || (t[11] = i("h4", null, "Was this helpful?", -1)),
          i("div", Ee, [
            i("button", {
              onClick: t[6] || (t[6] = (o) => r.submitFeedback(!0)),
              class: m(["feedback-button", { selected: n.feedback === !0 }])
            }, " 👍 ", 2),
            i("button", {
              onClick: t[7] || (t[7] = (o) => r.submitFeedback(!1)),
              class: m(["feedback-button", { selected: n.feedback === !1 }])
            }, " 👎 ", 2)
          ]),
          i("button", {
            onClick: t[8] || (t[8] = (...o) => r.resetWidget && r.resetWidget(...o)),
            class: "reset-button"
          }, "Done")
        ])
      ])) : h("", !0)
    ])
  ], 2);
}
const De = /* @__PURE__ */ f(ue, [["render", Ie], ["__scopeId", "data-v-0fee9578"]]);
class Me {
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
    const s = E(De, {
      config: this.options.config,
      headerText: this.options.headerText,
      isDarkMode: this.options.isDarkMode
    });
    return s.mount(t), s;
  }
}
typeof window < "u" && (window.VueWidget = Me);
export {
  Me as default
};
