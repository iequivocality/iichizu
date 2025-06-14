import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { StatProvider } from '@/components/stat-provider';

const queryClient = new QueryClient();

export const Route = createRootRoute({
  component: () => (
    <QueryClientProvider client={queryClient}>
      <StatProvider>
        <main className='min-h-screen'>
          <Outlet />
        </main>
        <footer>
          <TanStackRouterDevtools />
        </footer>
      </StatProvider>
    </QueryClientProvider>
  ),
});
