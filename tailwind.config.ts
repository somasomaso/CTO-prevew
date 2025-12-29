import type { Config } from "tailwindcss";

export const designTokens = {
  colors: {
    neutral: {
      background: "hsl(var(--color-background) / <alpha-value>)",
      foreground: "hsl(var(--color-foreground) / <alpha-value>)",
      surface: "hsl(var(--color-surface) / <alpha-value>)",
      muted: "hsl(var(--color-muted) / <alpha-value>)",
      "muted-foreground": "hsl(var(--color-muted-foreground) / <alpha-value>)",
      border: "hsl(var(--color-border) / <alpha-value>)",
      ring: "hsl(var(--color-ring) / <alpha-value>)",
    },
    brand: {
      primary: "hsl(var(--color-primary) / <alpha-value>)",
      "primary-foreground": "hsl(var(--color-primary-foreground) / <alpha-value>)",
      secondary: "hsl(var(--color-secondary) / <alpha-value>)",
      "secondary-foreground": "hsl(var(--color-secondary-foreground) / <alpha-value>)",
    },
    neon: {
      purple: "hsl(var(--color-neon-purple) / <alpha-value>)",
      blue: "hsl(var(--color-neon-blue) / <alpha-value>)",
      pink: "hsl(var(--color-neon-pink) / <alpha-value>)",
      cyan: "hsl(var(--color-neon-cyan) / <alpha-value>)",
    },
    status: {
      success: "hsl(var(--color-success) / <alpha-value>)",
      "success-foreground": "hsl(var(--color-success-foreground) / <alpha-value>)",
      warning: "hsl(var(--color-warning) / <alpha-value>)",
      "warning-foreground": "hsl(var(--color-warning-foreground) / <alpha-value>)",
      danger: "hsl(var(--color-danger) / <alpha-value>)",
      "danger-foreground": "hsl(var(--color-danger-foreground) / <alpha-value>)",
      info: "hsl(var(--color-info) / <alpha-value>)",
      "info-foreground": "hsl(var(--color-info-foreground) / <alpha-value>)",
    },
    subjects: {
      math: "hsl(var(--color-subject-math) / <alpha-value>)",
      science: "hsl(var(--color-subject-science) / <alpha-value>)",
      language: "hsl(var(--color-subject-language) / <alpha-value>)",
      history: "hsl(var(--color-subject-history) / <alpha-value>)",
      arts: "hsl(var(--color-subject-arts) / <alpha-value>)",
    },
  },
  radius: {
    sm: "var(--radius-sm)",
    md: "var(--radius-md)",
    lg: "var(--radius-lg)",
    xl: "var(--radius-xl)",
    "2xl": "var(--radius-2xl)",
  },
  shadow: {
    sm: "var(--shadow-sm)",
    md: "var(--shadow-md)",
    lg: "var(--shadow-lg)",
    "neon-purple": "var(--shadow-neon-purple)",
    "neon-blue": "var(--shadow-neon-blue)",
  },
  transition: {
    fast: "var(--transition-fast)",
    base: "var(--transition-base)",
    slow: "var(--transition-slow)",
  },
  typography: {
    fontSans: [
      "ui-sans-serif",
      "system-ui",
      "-apple-system",
      "Segoe UI",
      "Roboto",
      "Helvetica",
      "Arial",
      "Apple Color Emoji",
      "Segoe UI Emoji",
    ],
    fontMono: [
      "ui-monospace",
      "SFMono-Regular",
      "Menlo",
      "Monaco",
      "Consolas",
      "Liberation Mono",
      "Courier New",
      "monospace",
    ],
  },
} as const;

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: designTokens.colors.neutral.background,
        foreground: designTokens.colors.neutral.foreground,
        surface: designTokens.colors.neutral.surface,
        muted: designTokens.colors.neutral.muted,
        "muted-foreground": designTokens.colors.neutral["muted-foreground"],
        border: designTokens.colors.neutral.border,
        ring: designTokens.colors.neutral.ring,

        primary: designTokens.colors.brand.primary,
        "primary-foreground": designTokens.colors.brand["primary-foreground"],
        secondary: designTokens.colors.brand.secondary,
        "secondary-foreground": designTokens.colors.brand["secondary-foreground"],

        neon: {
          purple: designTokens.colors.neon.purple,
          blue: designTokens.colors.neon.blue,
          pink: designTokens.colors.neon.pink,
          cyan: designTokens.colors.neon.cyan,
        },

        success: designTokens.colors.status.success,
        "success-foreground": designTokens.colors.status["success-foreground"],
        warning: designTokens.colors.status.warning,
        "warning-foreground": designTokens.colors.status["warning-foreground"],
        danger: designTokens.colors.status.danger,
        "danger-foreground": designTokens.colors.status["danger-foreground"],
        info: designTokens.colors.status.info,
        "info-foreground": designTokens.colors.status["info-foreground"],

        subject: {
          math: designTokens.colors.subjects.math,
          science: designTokens.colors.subjects.science,
          language: designTokens.colors.subjects.language,
          history: designTokens.colors.subjects.history,
          arts: designTokens.colors.subjects.arts,
        },
      },
      fontFamily: {
        sans: [designTokens.typography.fontSans],
        mono: [designTokens.typography.fontMono],
      },
      borderRadius: {
        sm: designTokens.radius.sm,
        md: designTokens.radius.md,
        lg: designTokens.radius.lg,
        xl: designTokens.radius.xl,
        "2xl": designTokens.radius["2xl"],
      },
      boxShadow: {
        sm: designTokens.shadow.sm,
        md: designTokens.shadow.md,
        lg: designTokens.shadow.lg,
        "neon-purple": designTokens.shadow["neon-purple"],
        "neon-blue": designTokens.shadow["neon-blue"],
      },
      transitionDuration: {
        fast: "150ms",
        base: "200ms",
        slow: "300ms",
      },
      transitionTimingFunction: {
        "out-quint": "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "slide-up": {
          from: { transform: "translateY(6px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        "pulse-neon": {
          "0%, 100%": { opacity: "1", boxShadow: "0 0 20px hsla(275, 85%, 65%, 0.4)" },
          "50%": { opacity: "0.8", boxShadow: "0 0 40px hsla(275, 85%, 65%, 0.6)" },
        },
      },
      animation: {
        "fade-in": "fade-in 150ms ease-out",
        "slide-up": "slide-up 180ms cubic-bezier(0.22, 1, 0.36, 1)",
        "pulse-neon": "pulse-neon 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
