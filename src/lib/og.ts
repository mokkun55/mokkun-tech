import satori from "satori";
import { html } from "satori-html";
import sharp from "sharp";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

let fontCache: { regular: ArrayBuffer; bold: ArrayBuffer } | null = null;
let profIconCache: string | null = null;

async function loadGoogleFont(family: string, weight: number) {
  const url = `https://fonts.googleapis.com/css2?family=${family.replace(/ /g, "+")}:wght@${weight}`;
  const css = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/4.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)",
    },
  }).then((r) => r.text());

  const match = css.match(/src:\s*url\(([^)]+)\)\s*format\([^)]+\)/);
  if (!match) throw new Error(`Font URL not found for ${family} ${weight}`);

  return await fetch(match[1]).then((r) => r.arrayBuffer());
}

async function loadFonts() {
  if (fontCache) return fontCache;
  const [regular, bold] = await Promise.all([
    loadGoogleFont("Noto Sans JP", 400),
    loadGoogleFont("Noto Sans JP", 700),
  ]);
  fontCache = { regular, bold };
  return fontCache;
}

async function loadProfIcon() {
  if (profIconCache) return profIconCache;
  const path = resolve(process.cwd(), "src/assets/prof-icon.jpg");
  const buffer = await readFile(path);
  profIconCache = `data:image/jpeg;base64,${buffer.toString("base64")}`;
  return profIconCache;
}

function escapeHtml(str: string) {
  return str.replace(
    /[&<>"']/g,
    (m) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[m]!,
  );
}

type OgPageProps = {
  title: string;
  label?: string;
};

export async function generateOgImage({
  title,
  label,
}: OgPageProps): Promise<ArrayBuffer> {
  const { regular, bold } = await loadFonts();
  const profIcon = await loadProfIcon();

  const labelMarkup = label
    ? `<div style="display: flex; padding: 10px 28px; background: #7ECDE6; color: #FFFFFF; border-radius: 999px; font-size: 28px; font-weight: 700; letter-spacing: 2px;">${escapeHtml(label)}</div>`
    : "";

  const markup = html(`
    <div style="width: 1200px; height: 630px; display: flex; flex-direction: column; padding: 72px; background: linear-gradient(135deg, #FFFFFF 0%, #F0F8FF 55%, #E3F4FA 100%); font-family: 'Noto Sans JP';">
      <div style="display: flex;">${labelMarkup}</div>
      <div style="display: flex; flex: 1; align-items: center;">
        <div style="display: flex; font-size: 68px; font-weight: 700; color: #1A1A1A; line-height: 1.4; word-break: break-word;">${escapeHtml(title)}</div>
      </div>
      <div style="display: flex; align-items: center; justify-content: space-between; border-top: solid 2px #E8EDF2; padding-top: 24px;">
        <div style="display: flex; align-items: center; gap: 20px;">
          <img src="${profIcon}" style="width: 80px; height: 80px; border-radius: 999px; border: 3px solid #7ECDE6; object-fit: cover;" />
          <div style="display: flex; flex-direction: column;">
            <div style="font-size: 30px; font-weight: 700; color: #1A1A1A;">もっくん</div>
            <div style="font-size: 22px; color: #5BB8D4; font-weight: 700;">mokkun.tech</div>
          </div>
        </div>
        <div style="display: flex; font-size: 22px; color: #666666;">つくるを楽しむエンジニア</div>
      </div>
    </div>
  `);

  const svg = await satori(markup, {
    width: 1200,
    height: 630,
    fonts: [
      { name: "Noto Sans JP", data: regular, weight: 400, style: "normal" },
      { name: "Noto Sans JP", data: bold, weight: 700, style: "normal" },
    ],
  });

  const buffer = await sharp(Buffer.from(svg)).png().toBuffer();
  return buffer.buffer.slice(
    buffer.byteOffset,
    buffer.byteOffset + buffer.byteLength,
  ) as ArrayBuffer;
}
