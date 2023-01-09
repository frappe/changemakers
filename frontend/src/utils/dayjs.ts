import dayjs from "dayjs"
import localizedFormat from "dayjs/plugin/localizedFormat"
import updateLocale from "dayjs/plugin/updateLocale"

dayjs.extend(updateLocale)
dayjs.extend(localizedFormat)

export default dayjs
