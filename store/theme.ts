import { create } from 'zustand'
import { combine, subscribeWithSelector, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

type Theme = 'light' | 'dark'

const initialState = {
  theme: 'light' satisfies Theme as Theme,
  isLight: true,
  isDark: false,
  colors: {
    highlight: 'orange',
    link: 'blue'
  }
}
export const useThemeStore = create(
  persist(
    subscribeWithSelector(
      immer(
        combine(initialState, set => ({
          setMode: (theme: Theme) => {
            set(state => {
              state.theme = theme
            })
          }
        }))
      )
    ),
    {
      name: 'themeStore'
    }
  )
)

useThemeStore.subscribe(
  state => state.theme,
  theme => {
    useThemeStore.setState({
      isLight: theme === 'light',
      isDark: theme === 'dark'
    })
  }
)
