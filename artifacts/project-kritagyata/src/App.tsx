import { Switch, Route, Router as WouterRouter } from "wouter";
import IntroSplash from "./components/IntroSplash";
import FloatingDonate from "./components/FloatingDonate";
import Home from "./pages/Home";
import OurWork from "./pages/OurWork";
import ProjectDetail from "./pages/ProjectDetail";
import Gallery from "./pages/Gallery";
import JoinUs from "./pages/JoinUs";

function NotFound() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "1rem" }}>
      <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", color: "#1f2937" }}>Page not found</h1>
      <a href="/" style={{ color: "hsl(345,75%,28%)", fontSize: "0.875rem" }}>← Go home</a>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/our-work" component={OurWork} />
      <Route path="/project/:id" component={ProjectDetail} />
      <Route path="/gallery" component={Gallery} />
      <Route path="/join-us" component={JoinUs} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <IntroSplash />
      <Router />
      <FloatingDonate />
    </WouterRouter>
  );
}

export default App;
