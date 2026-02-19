import { createBrowserRouter } from "react-router";
import { AlertQueue } from "./components/AlertQueue";
import { AlertInvestigation } from "./components/AlertInvestigation";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: AlertQueue,
  },
  {
    path: "/alert/:alertId",
    Component: AlertInvestigation,
  },
]);
