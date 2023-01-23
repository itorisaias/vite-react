import { initialize, mswDecorator } from 'msw-storybook-addon'
import React from 'react'
import { QueryClient, QueryClientProvider, setLogger } from "react-query"
import { ThemeProvider } from "styled-components"
import theme from '../src/styles/theme'

setLogger({
  error: () => {},
  log: (...params) => console.log(...params),
  warn: (...params) => console.warn(...params),
})

initialize({ onUnhandledRequest: 'bypass' })

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [
  mswDecorator,
  (storyFn) => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          refetchIntervalInBackground: false,
          retry: false,
        },
      },
    })

    return (
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          {storyFn()}
        </QueryClientProvider>
      </ThemeProvider>
    )
  }
]
