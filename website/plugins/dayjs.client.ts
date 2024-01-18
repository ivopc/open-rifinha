import dayjs from "dayjs";
import "dayjs/locale/pt-br";

dayjs.locale("pt-br");

import relativeTime from "dayjs/plugin/relativeTime";
import weekOfYear from "dayjs/plugin/weekOfYear";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(relativeTime);
dayjs.extend(weekOfYear);
dayjs.extend(customParseFormat);

export default defineNuxtPlugin(() => ({
    provide: { dayjs }
}));