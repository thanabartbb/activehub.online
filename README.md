# activity-hub.online

AGENSDKDOS — Carbon Olive AI Console: หน้าคอนโซลแบบ single-page (Tailwind CDN, ไม่มี build step)

## ไฟล์ในนี้

- `index.html` — หน้าเว็บหลัก โหลด `script.js` ที่ compile แล้ว เปิดได้ตรงๆ ไม่ต้อง build
- `script.ts` — ต้นฉบับ TypeScript ของลอจิกทั้งหมด (screen switching, modal, drawer, toast)
- `script.js` — ผลลัพธ์ compile จาก `script.ts` (ES2020, strict mode, ไม่มี type error)
- `tsconfig.json` — ใช้ compile ใหม่ด้วย `tsc` ถ้าแก้ `script.ts`
- `console.json` — manifest แบบ JSON ของ screens / actions / data / onclick bindings ทั้งหมด สำหรับระบบที่อ่านสเปกแบบ JSON แทนโค้ด
