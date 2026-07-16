/**
 * Centralized project image imports.
 * Every project image lives in src/assets/Images/ and is imported here
 * so Vite can hash, optimize, and tree-shake them properly.
 */

import doseloopImg from "../../assets/Images/DOSELOOP.png";
import harvestiqImg from "../../assets/Images/Harvest Iq.png";
import expenseTrackerImg from "../../assets/Images/Expense Tracker.png";
import profileVideo from "../../assets/Images/profile photo.mp4";
import signatureImg from "../../assets/Images/Signature.png";

/** Map project slugs to their hero artwork. */
export const projectImages: Record<string, string> = {
  doseloop: doseloopImg,
  harvestiq: harvestiqImg,
  "expense-tracker": expenseTrackerImg,
};

export { profileVideo, signatureImg };
