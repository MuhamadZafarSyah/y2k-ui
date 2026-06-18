# Y2K UI — Project context

## Design rules (Y2K)

Gaya: Modern Y2K / kawaii-retro. Window flat, border tebal 2-3px navy #1b1b3a,
TANPA offset shadow, fill pastel, radius 4-8px, title bar + kontrol [_ ▢ ✕].
Palet: blue #8ed1fc, pink #ff8fcf, lilac #b69cff, mint #8ff0d0, lemon #ffe45e,
panel #d7dde8, ink #1b1b3a.
BUKAN glassmorphism/aqua, BUKAN bevel Win98, BUKAN neobrutalism shadow.
Jangan pakai React95/98.css/xp.css/7.css.

## Docs site rules

Setiap komponen baru WAJIB punya dokumentasi di content/docs/<name>.mdx.
Urutan halaman: Preview -> Installation -> Usage -> Props -> Examples.

- Preview pakai <ComponentPreview name="<name>-demo" />.
- Installation selalu pakai perintah: npx y2kui@latest add <name>.
- Props WAJIB pakai <PropsTable data={[...]} /> (prop/type/default/description).
- Jangan tinggalkan komponen tanpa dokumentasi.

## File Structure

y2k-ui/
├─ app/
│ ├─ globals.css # token Y2K (:root --y2k-_)
│ ├─ layout.tsx
│ └─ (docs)/ # route group untuk dokumentasi
│ ├─ layout.tsx # layout Fumadocs (sidebar, nav)
│ └─ docs/
│ └─ [[...slug]]/
│ └─ page.tsx # renderer halaman MDX
├─ content/
│ └─ docs/ # << SUMBER DOKUMENTASI (MDX)
│ ├─ index.mdx # landing docs
│ ├─ installation.mdx # cara init + CLI y2kui
│ ├─ button.mdx # doc per-komponen
│ ├─ dialog.mdx
│ ├─ input.mdx
│ └─ date-picker.mdx
├─ components/
│ ├─ ui/ # komponen Y2K (button.tsx, dialog.tsx, ...)
│ └─ docs/
│ ├─ component-preview.tsx # live preview + tab kode
│ ├─ props-table.tsx # render tabel props
│ └─ code-block.tsx # copy button, highlight
├─ registry/
│ └─ y2k/ # definisi item registry
├─ lib/
│ ├─ utils.ts # cn()
│ └─ source.ts # loader konten Fumadocs
├─ public/
│ └─ r/ # output registry (_.json) hasil build
├─ scripts/
│ └─ screenshots.mjs # otomasi screenshot preview (opsional)
├─ .opencode/
│ ├─ agents/
│ ├─ commands/
│ └─ skills/
├─ source.config.ts # config Fumadocs MDX
├─ registry.json # daftar item registry
├─ components.json # config shadcn
├─ opencode.json # config opencode (MCP, dll)
└─ AGENTS.md # konteks utama untuk AI
