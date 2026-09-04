import ReCAPTCHA from "react-google-recaptcha";

interface RecaptchaProps {
  onChange: (token: string | null) => void;
  theme?: "light" | "dark";
  dark?: boolean;
}

export default function Recaptcha({ onChange, theme = "light", dark }: RecaptchaProps) {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";

  const activeTheme = dark !== undefined ? (dark ? "dark" : "light") : theme;

  return (
    <div className="flex justify-start my-4">
      <ReCAPTCHA
        sitekey={siteKey}
        onChange={onChange}
        theme={activeTheme}
      />
    </div>
  );
}