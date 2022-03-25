import type { VueModule } from "../types";
// @ts-ignore
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faDiscord,
  faGithub,
  faSteam,
} from "@fortawesome/free-brands-svg-icons";
import { faAt } from "@fortawesome/free-solid-svg-icons";

library.add(faDiscord, faAt, faGithub, faSteam);
export const install: VueModule = ({ app }) => {
  app.component("font-awesome-icon", FontAwesomeIcon);
};
