import { ImageResponse } from "next/og";
import { truncateAtWord } from "@/lib/truncate";

export const OG_SIZE = { width: 1200, height: 630 };

export function renderOgImage({
  title,
  eyebrow,
}: {
  title: string;
  eyebrow?: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#F5F3EE",
          backgroundImage:
            "radial-gradient(circle, rgba(20,19,15,0.07) 1.5px, transparent 1.5px)",
          backgroundSize: "24px 24px",
          padding: "64px 72px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width={56} height={56} viewBox="0 0 32 32">
            <polygon
              points="16,3 27.26,9.5 27.26,22.5 16,29 4.74,22.5 4.74,9.5"
              fill="none"
              stroke="#14130F"
              strokeWidth={2}
            />
            <polygon
              points="16,10.5 20.76,13.25 20.76,18.75 16,21.5 11.24,18.75 11.24,13.25"
              fill="#5B5BF0"
            />
          </svg>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              fontSize: 40,
              fontWeight: 600,
            }}
          >
            <div style={{ display: "flex", color: "#14130F" }}>Hexary</div>
            <div style={{ display: "flex", color: "#5C5849", fontWeight: 400 }}>
              Labs
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {eyebrow ? (
            <div
              style={{
                display: "flex",
                fontSize: 24,
                letterSpacing: 4,
                textTransform: "uppercase",
                color: "#5C5849",
                marginBottom: 20,
              }}
            >
              {eyebrow}
            </div>
          ) : null}
          <div
            style={{
              display: "flex",
              fontSize: 64,
              lineHeight: 1.15,
              fontWeight: 600,
              color: "#14130F",
              maxWidth: 980,
            }}
          >
            {truncateAtWord(title, 90)}
          </div>
          <div
            style={{
              display: "flex",
              width: 96,
              height: 6,
              background: "#5B45F5",
              marginTop: 40,
            }}
          />
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
