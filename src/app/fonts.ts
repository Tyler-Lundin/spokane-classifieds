// app/fonts.ts
import { EB_Garamond, Old_Standard_TT } from "next/font/google";

export const garamond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-garamond",
  display: "swap",
});

export const oldStandard = Old_Standard_TT({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-old-standard",
  display: "swap",
});