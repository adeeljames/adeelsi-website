const CLAUDE_BASE64_RAW = `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c6PeTY53HiklFOS4Nj2T1pCE0gGJvp5eUYR5Jo7qRQhbLufKnDNjJesMcNTgEMHlUcJMMHGfip2P8AKXFl9DvVhFWGbkKSSXwyGQVJVgHjF6W/BrJuKgAwHzKyOMwxzvh/a6eew+VFyhLOe53UhTGr19SQyNahIM47rSySWBqppCxwm9GpgJqSrFvSAuVaacnzQEghImdYNbYfe/zT31u/xXKKiG5oy9eCKF4vKsUkgM+nD32WFkd6RTJyZ3bYDWhmfVqmuFkTrH9HHzRJxDah1651AoMT3WPO1CRC4mVGgXModf1EGDK4So8UpAAcj/ALH/2gAMAwEAAgADAAAAEPfffffffffffffffffffffffffffffadOffffffffedXspebv8A333328sw6Y/v333333Oe75/tNXf33332RVf/ALgC/wDffffZUr86urXvffffTDIX2lVvffffffVqt+t/ffffffffb3vffffffffffffffffffffffffffffffff/xAAqEQEAAQIEBAYCAwAAAAAAAAABEQAhMUFRYZGhwdEgcYGx4fAw8RBAUP/aAAgBAwEBPxD+8DOSGZl1zttxrALE0eRJYCiUg/R5/hSiUyGo8rNvNk+v3Gp1XuPJx4PvVz6sKEogAu2bUnUOFsfPtQhQoKaeIArOiTsGw66PJpVZRE5PZ5Twq98XxPkp3pAj1NXD1t06Hv6Vb+3A1ex7+NAwtIgkaKVp+rPRqInmy+JtUkXBBxnrWoAHb7hQFyFiCDnflRQ50+xSgoUGNNvCvUCNaMSHpQHKHEoluMz6Tn/CqgMYdcqxhN0eUhypIRLYey0AEkfEBC2XXSretwDu/bUAFJbUdDQM/ilX4x7wwvXypel8RtnbM10x3qFKOIlz1xiiwIaDbnLzoqIAg8TprLMZd6PWmZZO7lxokO8l2MY7/FHVcc5Whm66l7eVSCzHdmdzBollxNz8Ewism36wNPbSQjjbrUOrY4HzSH0XR1p3eGeQdPxIBEkoQQNC3+D/AP/EACoRAQABAwEFCAMBAAAAAAAAAAEAESExQSBRYaHhMHGBkbHB0fAQQFDx/9oACAECAQE/EP3gLqu6K8xKYNAyxFWOxDKBm8AxKTibPf8AfSWO494nNK29JQQquXdCUNQ2ho1JrG1GA74XpqfJBb4Hk9GNkovIlPrMcOrLlXZ4HXbosFVTMUp53zBRoN7QCtsxMiroQQYF39IIryoThrTXZTGoZpF8ekwUvl8Ql5d0/D0CBd8wAO6BV8w+8RGjtP1Lb33Mujfm6RqtGh9yukPEPvufEAFZw8fmU0u46eUGo0fCOGu7RAwprMohv1Yp4nN+4nC6vKkT5sPsypQqb/T/AHMR1x2Ci6KX++sIjv8AS8rcNBPicSCBKUKdkKNSOVav8H//xAAoEAEAAQMDBAICAwEBAAAAAAABEQAhMUFRYXGBkaEQMLHwIEDBYNH/2gAIAQEAAT8Q/wCsNurCgDKVAOu4ZaSfyRsYNm7Ftf4WcOspQErBsC/1B/ozdEEdiA8rwQgkJJzS6M52voHVPyDlGumtOgKwtMtCLbBChHFbHe7K/wBM5RKmASAeiDqDX4vwYwuoPJLg+EtwsUYCBBwEVArMmbJvr4HClAHlO66GXoKMO8AGWSXBxOk0m5RsAYRNEfszQjhuPnEBgpeJtN4a0JNNhomA7lJIUQhEwjQaMFtYaNhD3TShrYxgITw1OVkBkv3hOjJpVuptvRP9pu1GzPSUC9qpvO2UzxE91DWoCFpOa2/4IPg/S+ECwdiXf7LcTYYmYP8AFGMuvKiRHpTKwy2O80OmHUrRNHao9DnRb09kmC2E+wz0d1CIIyOpV0jELq57k9E0qykw44m+qOjLl0AloFNgOZV+WrfLO1HWEN7uvxZTuXdjF0DwPIn2mJLK3Sbuo4w6mtFxEg6dNLrh0WoCQIA2RqLFzIQe/Fh6PcgClsO1EuguaA0MFkIR6jQ1La0/TAeRrM4VswFbWNnrrrGgeC2qfC0zFynUXIdVDWaeZdKVMq/fhJUsSbJhOGSrsFAGE5XPrbkxQiCMjhKYYUMoq5vTKF7Xm0VOkwFyVkWwTPqUNG4fKAiawg32+JsX6yDQ3VgDVSlf0ayHD+V1VdfgGtYOV7FDwAQQBvcxz9QKgErgKdhTZz2UgYknb5feG2BcmOq3SZoOAwLc7Zh9Oi/xIpEYExBZC7dLxtUEbyp9S72UVBW4PmlCT3/zIKUl2SjuoUxmSYII/wBE/Srw4MgCQbyntvWNuBI8TNJLleTq4zOtMmv0lwKlEG6+lI0KeDCZ1yUq1J/jBs5eKG7xUMPw3HlY+Bp8aO9DR/NGIzanYPanjXlzd2/2LZD2rNXQxXpFX+0qyYTrgGas7brFkHKG4mTU/gagoJgK9gzTFqrmS4mlPFOSGdgeClSM4p5Gpm5uoqod3muK2h1J6NLEFlBPyajqM/YgAKrAGtX7qGLBw/bwaiEqPLLfsQbBUzixGZbAUw8JVrXmnKBTwKYlRJLkVtKBTFXDDTIuqBOyxkY+APQmyM9HPDrvTuYHIGES0myVCk2XxKw8jUqLyd9Zl6alOVlY8xAOZ6TUOsWUQEsEtpxr9ckig26ddLW2WGBqBgtCW35GeYtWcFSxLsGV4JWr/XKWB4jDpfkxTsKCguDlcvpLqNQoKAXcCnGDd3BpFFDEqQK62FO90OQB8JAbm6nVvDFUwkSTNymqgAJvuw8pi8gat0BBGOTQyOTCNtEQr91wn3KIMDABI3TRmmZnQy5CBPTLczTwumCw7Yg9uq1MIHvtqB4w8INZH2IOOOIG7jjOCrjtgtn4Qf8AuVpAED+l+U0EJNd5KHqo5TesYQ6MicJzTmlRH3HU15SUsw8Q34X9771aZXkgyR5W+SZNRVrMag0R1HRPvNxy8kDdc6BqvVIOeRQAF0bt1etQ2GYWks5wbGytWGnqOIvE1aaQuAKXOmXen12g3hNg3S9ka0f8ScgbiO1ZUBDs904Lk5htV6dRNs7p05W2i9Joc0S8RMmWx1La/eUiS6SqWloC0bzu0yuSHwODtf0RNT9weaPsPao5ZAuyIfONyV+C71l3hJoUTCiiyFA5Y/o+vDRAMPf5hiGDqF+T4UACWJYmKPyfyInCjCNCIWAH0yY/qXwMAD901q92xBREwAt27e7/ANj/AP/Z`

export const CLAUDE_LOGO_SRC = `data:image/jpeg;base64,${CLAUDE_BASE64_RAW.replace(/\s+/g, '')}`
export const CHATGPT_LOGO_SRC = 'https://api.companyenrich.com/logo/chatgpt.com'
export const GEMINI_LOGO_SRC = 'https://api.companyenrich.com/logo/gemini.google.com'
export const GROK_LOGO_SRC = 'https://api.companyenrich.com/logo/grok.com'
export const N8N_LOGO_SRC = 'https://api.companyenrich.com/logo/n8n.io'
export const MICROSOFT_LOGO_SRC = 'https://api.companyenrich.com/logo/microsoft.com'
export const DEEPLEARNING_LOGO_SRC = 'https://api.companyenrich.com/logo/deeplearning.ai'
export const UDACITY_LOGO_SRC = 'https://api.companyenrich.com/logo/udacity.com'
export const DATACAMP_LOGO_SRC = 'https://api.companyenrich.com/logo/datacamp.com'
export const FOUNDERZ_LOGO_SRC = 'https://api.companyenrich.com/logo/founderz.com'
export const ASTRONOMER_LOGO_SRC = 'https://api.companyenrich.com/logo/astronomer.io'

const BrandImg = ({ src, alt = '', className = '', ...props }) => (
  <img
    src={src}
    alt={alt}
    referrerPolicy="no-referrer"
    loading="lazy"
    className={`brand-logo-img ${className}`.trim()}
    {...props}
  />
)

export const Logo = (props) => (
  <svg viewBox="0 0 28 28" fill="none" aria-hidden="true" {...props}>
    <path d="M14 1.6 20.3 8 14 14.4 7.7 8 14 1.6Z" fill="#FF6A00" />
    <path d="M6.4 9.3 12.7 15.7 6.4 22.1 0.1 15.7 6.4 9.3Z" fill="#FF3D00" />
    <path d="M21.6 9.3 27.9 15.7 21.6 22.1 15.3 15.7 21.6 9.3Z" fill="#FF9A2E" />
  </svg>
)

export const Globe = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true" {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.5 2.6 3.7 5.7 3.7 9S14.5 18.4 12 21c-2.5-2.6-3.7-5.7-3.7-9S9.5 5.6 12 3Z" />
  </svg>
)

export const Chevron = (props) => (
  <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" aria-hidden="true" {...props}>
    <path d="m3 4.5 3 3 3-3" />
  </svg>
)

export const ArrowRight = (props) => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
    <path d="M4 10h12M11 5l5 5-5 5" />
  </svg>
)

export const ArrowUpRight = (props) => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
    <path d="M6 14 14 6M7 6h7v7" />
  </svg>
)

export const Menu = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true" {...props}>
    <path d="M4 8h16M4 16h16" />
  </svg>
)

export const Close = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true" {...props}>
    <path d="m6 6 12 12M18 6 6 18" />
  </svg>
)

export const ClaudeIcon = (props) => <BrandImg src={CLAUDE_LOGO_SRC} {...props} />
export const GeminiIcon = (props) => <BrandImg src={GEMINI_LOGO_SRC} {...props} />
export const ChatGPTIcon = (props) => <BrandImg src={CHATGPT_LOGO_SRC} {...props} />
export const GrokIcon = (props) => <BrandImg src={GROK_LOGO_SRC} {...props} />
export const N8nIcon = (props) => <BrandImg src={N8N_LOGO_SRC} {...props} />
export const MicrosoftIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <rect x="2.5" y="2.5" width="8.8" height="8.8" rx="1" fill="#F25022" />
    <rect x="12.7" y="2.5" width="8.8" height="8.8" rx="1" fill="#7FBA00" />
    <rect x="2.5" y="12.7" width="8.8" height="8.8" rx="1" fill="#00A4EF" />
    <rect x="12.7" y="12.7" width="8.8" height="8.8" rx="1" fill="#FFB900" />
  </svg>
)
export const DeepLearningIcon = (props) => <BrandImg src={DEEPLEARNING_LOGO_SRC} {...props} />
export const UdacityIcon = (props) => <BrandImg src={UDACITY_LOGO_SRC} {...props} />
export const DataCampIcon = (props) => <BrandImg src={DATACAMP_LOGO_SRC} {...props} />
export const FounderzIcon = (props) => <BrandImg src={FOUNDERZ_LOGO_SRC} {...props} />
export const AstronomerIcon = (props) => <BrandImg src={ASTRONOMER_LOGO_SRC} {...props} />

export const GitHubIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z"
    />
  </svg>
)

export const LinkedInIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77Z" />
  </svg>
)

export const VerifiedBadgeIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
    <path d="M12 2.5 14.8 5l3.7-.3 1.1 3.5 3.1 1.9-1.5 3.4.8 3.6-3.5 1.1-1.9 3.1-3.4-1.5-3.4 1.5-1.9-3.1-3.5-1.1.8-3.6-1.5-3.4 3.1-1.9 1.1-3.5 3.7.3L12 2.5Z" />
    <path d="m9 12.2 2 2 4.2-4.2" />
  </svg>
)
