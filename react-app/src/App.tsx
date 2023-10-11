import { QueryClient, QueryClientProvider } from 'react-query';

import { MeetingMenu } from './components/MeetingMenu';
import { MeetingPanel } from './components/MeetingPanel';
import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <main>
        <QueryClientProvider client={queryClient}>
          <MeetingMenu />
          <MeetingPanel />
        </QueryClientProvider>
      </main>
    </div>
  );
}

export default App;
