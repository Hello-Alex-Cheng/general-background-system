import { watch } from 'vue'
import store from '@/store'

type IProps = ((lang: string) => void)[]

export default function watchSwitchLang(...cbs: IProps) {
  watch(
    () => store.getters.language,
    () => {
      cbs.forEach(cb => cb(store.getters.language))
    }
  )
}
