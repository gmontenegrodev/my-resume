import { ImageResponse } from "next/og";
import { resume } from "@/content/resume";

// The preview image shown when the link is shared on LinkedIn, Slack, etc.
// Generated once at build time.
export const dynamic = "force-static";
export const alt = `${resume.name}, ${resume.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#ffffff",
          color: "#0f172a",
          borderTop: "16px solid #2563eb",
        }}
      >
        <div style={{ fontSize: 28, fontWeight: 700, color: "#2563eb", textTransform: "uppercase", letterSpacing: 2 }}>
          {resume.focus}
        </div>
        <div style={{ fontSize: 84, fontWeight: 800, marginTop: 24 }}>{resume.name}</div>
        <div style={{ fontSize: 44, fontWeight: 600, marginTop: 12, color: "#475569" }}>{resume.title}</div>
        <div style={{ fontSize: 28, marginTop: 48, color: "#475569" }}>germanresume.com</div>
      </div>
    ),
    size,
  );
}
