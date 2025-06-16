import { blue_inntale } from "./colors";
import "@fontsource-variable/cinzel"; // Supports weights 400-900
import "@fontsource/cormorant-unicase";
import "@fontsource/im-fell-english-sc";
import "@fontsource-variable/lora"; // Supports weights 400-700
import "@fontsource-variable/merriweather"; // Supports weights 300-900
import "@fontsource/cinzel-decorative";

// COLOR APPLIED TO COMPONENTS
// Navbar section
export const navbarBackgroundColor = blue_inntale;

// Main section
export const mainBackgroundColor = blue_inntale;
export const dynamicHeadingBackgroundColor = blue_inntale;
export const sortSelectorBackgroundColor = blue_inntale;
export const campaignGridBackgroundColor = blue_inntale;
export const campaignCardBackgroundColor = "white";

// Sidebar section
export const sidebarBackgroundColor = blue_inntale;
export const showAllButtonBackgroundColor = blue_inntale;

// DEBUGGING BORDERS (MAIN AREA)
const DEBUGGING_VALUE = "0px";

export const mainBorderWidth = DEBUGGING_VALUE;
export const dynamicHeadingBorderWidth = DEBUGGING_VALUE;
export const sortSelectorBorderWidth = DEBUGGING_VALUE;
export const campaignGridBorderWidth = DEBUGGING_VALUE;
export const sidebarBorderWidth = DEBUGGING_VALUE;

// FONT STYLES
let testingFont = "";
testingFont = "IM Fell English SC";
testingFont = "Cormorant Unicase";
testingFont = "Merriweather Variable";
testingFont = "Lora Variable";
testingFont = "Cinzel Decorative"; // per altro?
testingFont = "Cinzel Variable";
export const fontNavbar = testingFont;

/**
 * PREFERENCES:
 * - Lora Variable
 * - Merriweather Variable
 * - Cormorant Unicase (maybe with an higher width/weight)
 * - Cinzel Variable
 * - IM Fell English SC
 */
