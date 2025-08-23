import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SehatSathi from "./pages/SehatSathi";
import JalRakshak from "./pages/JalRakshak";
import AnnapurnaConnect from "./pages/AnnapurnaConnect";
import Pathshala from "./pages/Pathshala";
import Sakhi from "./pages/Sakhi";
import SkillhoodLite from "./pages/SkillhoodLite";
import SaksinGroup from "./pages/SaksinGroup";
import CarbonKart from "./pages/CarbonKart";
import MittiMitra from "./pages/MittiMitra";
import NyayaDost from "./pages/NyayaDost";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/sehat-sathi" element={<SehatSathi />} />
          <Route path="/jal-rakshak" element={<JalRakshak />} />
          <Route path="/annapurna-connect" element={<AnnapurnaConnect />} />
          <Route path="/pathshala" element={<Pathshala />} />
          <Route path="/sakhi" element={<Sakhi />} />
          <Route path="/skillhood-lite" element={<SkillhoodLite />} />
          <Route path="/saksin-group" element={<SaksinGroup />} />
          <Route path="/carbon-kart" element={<CarbonKart />} />
          <Route path="/mitti-mitra" element={<MittiMitra />} />
          <Route path="/nyaya-dost" element={<NyayaDost />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
