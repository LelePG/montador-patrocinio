import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import Quotes from "@/pages/quotes";
import QuoteDetail from "@/pages/quote-detail";
import NotFound from "@/pages/not-found";

const isAdmin = import.meta.env.VITE_ADMIN !== "false";

function Router() {
	return (
		<Switch>
			<Route path="/" component={() => <Home isAdmin={isAdmin} />} />
			{isAdmin && <Route path="/quotes" component={Quotes} />}
			{isAdmin && <Route path="/quotes/:id" component={QuoteDetail} />}
			<Route component={NotFound} />
		</Switch>
	);
}

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<TooltipProvider>
				<Toaster />
				<Router />
			</TooltipProvider>
		</QueryClientProvider>
	);
}

export default App;
