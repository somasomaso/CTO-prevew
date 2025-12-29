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

        dark: {
          900: "#050505",
          800: "#0a0a0a",
          700: "#121212",
        },

        neon: {
          purple: "#a855f7",
          blue: "#3b82f6",
          cyan: "#06b6d4",
          pink: "#ec4899",
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
      backgroundImage: {
        "glass-gradient":
          "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.01))",
        "neon-glow":
          "radial-gradient(circle at top left, rgba(168,85,247,0.35), transparent 55%), radial-gradient(circle at bottom right, rgba(59,130,246,0.25), transparent 50%)",
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        26: "6.5rem",
        30: "7.5rem",
        34: "8.5rem",
      },
      fontFamily: {
        sans: designTokens.typography.fontSans,
        mono: designTokens.typography.fontMono,
      },
      borderRadius: {
        sm: designTokens.radius.sm,
        md: designTokens.radius.md,
        lg: designTokens.radius.lg,
        xl: designTokens.radius.xl,
        "2xl": designTokens.radius["2xl"],
        "3xl": "2rem",
        "4xl": "2.5rem",
      },
      boxShadow: {
        sm: designTokens.shadow.sm,
        md: designTokens.shadow.md,
        lg: designTokens.shadow.lg,
        "neon-purple": designTokens.shadow["neon-purple"],
        "neon-blue": designTokens.shadow["neon-blue"],
        "neon-glow":
          "0 0 24px rgba(168,85,247,0.28), 0 0 60px rgba(59,130,246,0.18)",
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
        "fade-in-down": {
          from: { opacity: "0", transform: "translateY(-10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-up": {
          from: { transform: "translateY(6px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "pulse-glow": {
          "0%, 100%": {
            boxShadow:
              "0 0 18px rgba(168,85,247,0.25), 0 0 42px rgba(59,130,246,0.12)",
          },
          "50%": {
            boxShadow:
              "0 0 30px rgba(168,85,247,0.38), 0 0 70px rgba(59,130,246,0.18)",
          },
        },
        "pulse-neon": {
          "0%, 100%": {
            opacity: "1",
            boxShadow: "0 0 20px hsla(275, 85%, 65%, 0.4)",
          },
          "50%": {
            opacity: "0.8",
            boxShadow: "0 0 40px hsla(275, 85%, 65%, 0.6)",
          },
        },
      },
      animation: {
        "fade-in": "fade-in 150ms ease-out",
        "fade-in-down": "fade-in-down 300ms ease-out",
        "slide-up": "slide-up 180ms cubic-bezier(0.22, 1, 0.36, 1)",
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "pulse-neon": "pulse-neon 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
