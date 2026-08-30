import { ImageResponse } from "next/og";

import { eventContent } from "@/lib/event-content";

export const ogImageSize = { width: 1200, height: 630 };
export const ogImageContentType = "image/png";
export const ogImageAlt = eventContent.meta.description;

async function loadGoogleFont(family: string, weight: number, text: string) {
  const params = new URLSearchParams({
    family: `${family}:wght@${weight}`,
    text,
  });
  const css = await (
    await fetch(`https://fonts.googleapis.com/css2?${params.toString()}`)
  ).text();

  const match = css.match(
    /src: url\(([^)]+)\) format\('(?:opentype|truetype)'\)/,
  );
  if (!match) {
    throw new Error(`Could not resolve font source for ${family}`);
  }

  const response = await fetch(match[1]);
  return response.arrayBuffer();
}

export async function renderEventOgImage() {
  const eyebrow = "UNGA 81 · Side event on Youth, Peace and Security";
  const title = "Rooting and Rising";
  const subtitle = eventContent.hero.titleHighlight;
  const meta = `${eventContent.hero.dateShort} — ${eventContent.details.venueValue}, ${eventContent.hero.city}`;
  const credit = "Republic of Liberia · Ministry of Youth and Sports";

  const uniqueText = Array.from(
    new Set(Array.from(`${eyebrow}${title}${subtitle}${meta}${credit}`)),
  ).join("");

  const [playfair, dmMono] = await Promise.all([
    loadGoogleFont("Playfair Display", 700, uniqueText),
    loadGoogleFont("DM Mono", 500, uniqueText),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#002868",
          padding: "76px 84px",
          fontFamily: "DM Mono",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div style={{ display: "flex", width: "34px", height: "22px" }}>
              <div style={{ flex: 1, backgroundColor: "#BF0A30" }} />
              <div style={{ flex: 1, backgroundColor: "#D9ED8B" }} />
              <div style={{ flex: 1, backgroundColor: "#F3EFE7" }} />
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 20,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#D9ED8B",
              }}
            >
              {eyebrow}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              maxWidth: "980px",
            }}
          >
            <div
              style={{
                display: "flex",
                fontFamily: "Playfair Display",
                fontWeight: 700,
                fontSize: 88,
                lineHeight: 1.02,
                color: "#F3EFE7",
              }}
            >
              {title}
            </div>
            <div
              style={{
                display: "flex",
                fontFamily: "Playfair Display",
                fontWeight: 700,
                fontSize: 40,
                lineHeight: 1.15,
                color: "#F3EFE7",
                opacity: 0.82,
              }}
            >
              {subtitle}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
          <div
            style={{
              display: "flex",
              width: "100%",
              height: "1px",
              backgroundColor: "rgba(243, 239, 231, 0.24)",
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              fontSize: 18,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "#F3EFE7",
            }}
          >
            <div style={{ display: "flex" }}>{meta}</div>
            <div style={{ display: "flex", opacity: 0.68 }}>{credit}</div>
          </div>
        </div>
      </div>
    ),
    {
      ...ogImageSize,
      fonts: [
        { name: "Playfair Display", data: playfair, weight: 700, style: "normal" },
        { name: "DM Mono", data: dmMono, weight: 500, style: "normal" },
      ],
    },
  );
}
