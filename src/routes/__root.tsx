import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatProvider } from '@/components/stat-provider';
import { MapIcon } from 'lucide-react';
import { ThemeProvider } from '@/components/theme-provider';
import { ThemeToggle } from '@/components/theme-toggle';

const queryClient = new QueryClient();

export const Route = createRootRoute({
  component: () => (
    <ThemeProvider defaultTheme='light' storageKey='iichizu-theme'>
      <QueryClientProvider client={queryClient}>
        <header className='h-20 px-6 py-4 flex justify-between gap-x-4 items-center border-b'>
          <div className='flex items-center gap-x-4'>
            <MapIcon className='size-8' />
            <div>
              <h1 className='text-2xl font-bold'>iichizu</h1>
              <p className='text-muted-foreground'>fun japanese maps</p>
            </div>
          </div>
          <ThemeToggle />
        </header>
        <StatProvider>
          <main className='h-full px-8 py-12'>
            <Outlet />
          </main>
        </StatProvider>
        <footer className='w-full h-20 flex flex-col justify-center items-center text-muted-foreground border-t'>
          <span>
            © 2024-2025. Built by{' '}
            <a className='underline' href='https://www.ambi.moe/'>
              ambidere
            </a>
            .
          </span>
          <span>
            All tourism data are provided by the{' '}
            <a className='underline' href='https://statistics.jnto.go.jp/en/'>
              Japan National Tourism Organization
            </a>
          </span>
          <TanStackRouterDevtools />
        </footer>
      </QueryClientProvider>
    </ThemeProvider>
  ),
});
