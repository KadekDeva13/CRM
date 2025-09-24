// components/TemplateBuilder/BuilderToolbar.tsx
import { useNavigate } from "react-router-dom";

type Mode = "setup" | "builder";

type Props = {
  title?: string;
  viewport: "desktop" | "mobile";
  onViewport: (v: "desktop" | "mobile") => void;
  onPreview: () => void;
  onSave: () => void;
  onContinue?: () => void; // hanya dipakai saat mode setup
  onBack?: () => void;     // opsional; jika tak ada → default by mode
  onMenu?: () => void;
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  leftWidth: number;
  mode?: Mode; // default: "builder"
};

export default function BuilderToolbar({
  title = "Template Builder by Quirez",
  viewport,
  onViewport,
  onPreview,
  onSave,
  onContinue,
  onBack,
  mode = "builder",
}: Props) {
  const navigate = useNavigate();
  const showContinue = mode === "setup" && typeof onContinue === "function";

  const handleBack = () => {
    if (onBack) return onBack();
    if (mode === "builder") {
      navigate("/email-templates");
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="flex items-center justify-between py-3">
      {/* left: back + title */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleBack}
          className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-zinc-100"
          title="Back"
        >
          <svg width="12" height="22" viewBox="0 0 12 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.7083 20.2921c.0929.0929.1666.2032.2169.3246.0503.1214.0761.2515.0761.3829s-.0258.2617-.0761.3831c-.0503.1214-.124.2317-.2169.3246-.0929.0929-.2032.1666-.3246.2169-.1214.0503-.2515.0761-.3829.0761s-.2617-.0258-.3831-.0761c-.1214-.0503-.2317-.124-.3246-.2169L.293 11.707c-.0929-.0929-.1667-.2032-.217-.3246A1.07 1.07 0 0 1 0 11c0-.131.0259-.2616.0763-.383l.217-.3246L10.293.292c.1876-.1876.4421-.293.7075-.293.2654 0 .5198.1054.7074.293.1876.1876.293.4421.293.7074 0 .2654-.1054.5199-.293.7075L2.4145 11l9.2938 9.2921z" fill="black"/>
          </svg>
        </button>
        <h1 className="text-[18px] font-semibold text-zinc-900">{title}</h1>
      </div>

      {/* right controls */}
      <div className="flex items-center gap-3">
        {/* viewport toggle */}
        <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-2 py-1">
          <button
            onClick={() => onViewport("desktop")}
            className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1.5 text-[12px] ${
              viewport === "desktop" ? "bg-zinc-100 text-zinc-800" : "text-zinc-600"
            }`}
          >
            <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.75.75C.784.75 0 1.535 0 2.5v7.875C0 11.34.784 12.125 1.75 12.125h4.813L6.27 13H4.375a.875.875 0 0 0 0 1.75h7c.484 0 .875-.391.875-.875S11.859 13 11.375 13H9.48l-.292-.875H14c.965 0 1.75-.785 1.75-1.75V2.5c0-.965-.785-1.75-1.75-1.75H1.75Zm12.25 1.75V8.625H1.75V2.5h12.25Z" fill="#374151"/>
            </svg>
            Desktop
          </button>
          <button
            onClick={() => onViewport("mobile")}
            className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1.5 text-[12px] ${
              viewport === "mobile" ? "bg-zinc-100 text-zinc-800" : "text-zinc-600"
            }`}
          >
            <svg width="11" height="15" viewBox="0 0 11 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M.625 2.5C.625 1.535 1.41.75 2.375.75H8.5c.965 0 1.75.785 1.75 1.75V13c0 .965-.785 1.75-1.75 1.75H2.375C1.41 14.75.625 13.965.625 13V2.5Zm3.5 10.5c0 .241.197.438.438.438h1.75c.241 0 .438-.197.438-.438a.438.438 0 0 0-.438-.438H4.563a.438.438 0 0 0-.438.438ZM8.5 2.5H2.375v8.75H8.5V2.5Z" fill="#374151"/>
            </svg>
            Mobile
          </button>
        </div>

        {/* Preview */}
        <button
          onClick={onPreview}
          className="inline-flex items-center gap-2 rounded-md border border-zinc-300 bg-white px-3 py-2 text-[12px] text-zinc-700 hover:bg-zinc-50"
        >
          <svg width="17" height="13" viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.296.625C6.087.625 4.318 1.631 3.03 2.829c-1.28 1.187-2.136 2.609-2.54 3.586a.937.937 0 0 0 0 .672c.404.976 1.26 2.398 2.54 3.585C4.318 11.869 6.087 12.875 8.296 12.875c2.21 0 3.979-1.007 5.267-2.204 1.279-1.189 2.135-2.609 2.542-3.586a.938.938 0 0 0 0-.672c-.407-.977-1.263-2.399-2.542-3.586C12.275 1.631 10.506.625 8.296.625Zm-3.937 6.125a3.937 3.937 0 1 1 7.874 0 3.937 3.937 0 0 1-7.874 0ZM8.296 5c0 .965-.785 1.75-1.75 1.75a.75.75 0 0 0-.555.112c-.15.05-.325-.043-.319.116.008.19.035.378.087.566.375 1.4 1.816 2.232 3.216 1.858 1.4-.375 2.231-1.816 1.857-3.216C10.83 4.934 9.824 4.171 8.708 4.125c-.458-.016-.551.157-.502.31.058.175.091.361.091.565Z" fill="#374151"/>
          </svg>
          Preview
        </button>

        {/* Save (selalu ada) */}
        <button
          onClick={onSave}
          className="inline-flex items-center gap-2 rounded-md bg-[#0F5A62] px-3 py-2 text-[12px] font-semibold text-white hover:brightness-110"
        >
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.859.625C.894.625.109 1.41.109 2.375v8.75c0 .965.785 1.75 1.75 1.75h8.75c.965 0 1.75-.785 1.75-1.75V4.489a1.75 1.75 0 0 0-.511-1.239L9.734 1.136A1.75 1.75 0 0 0 8.496.625H1.859ZM1.859 3.25c0-.484.391-.875.875-.875h5.25c.484 0 .875.391.875.875V5c0 .484-.391.875-.875.875h-5.25A.875.875 0 0 1 1.859 5V3.25ZM6.234 7.625c.464 0 .909.184 1.237.512.328.328.513.773.513 1.238 0 .465-.185.91-.513 1.238a1.75 1.75 0 0 1-2.475 0 1.75 1.75 0 0 1 0-2.476c.328-.328.773-.512 1.238-.512Z" fill="white"/>
          </svg>
          Save Template
        </button>

        {/* Continue (hanya saat mode "setup") */}
        {showContinue && (
          <button
            onClick={onContinue}
            className="inline-flex items-center gap-2 rounded-md bg-[#0F5A62] px-3 py-2 text-[12px] font-semibold text-white hover:brightness-110"
          >
            Continue to Review
            <svg width="15" height="12" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.872 6.707c.39-.391.39-1.025 0-1.416L8.872.291A1 1 0 1 0 7.457 1.707L10.754 5H1.166A.834.834 0 0 0 .166 6c0 .553.447 1 .999 1H10.75l-3.29 3.294a1 1 0 0 0 1.415 1.415L13.875 6.71l-.003-.003Z" fill="white"/>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
