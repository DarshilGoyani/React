import { createBrowserRouter } from "react-router";
import App from "../App";
import DashboardPage from "../Pages/DashboardPage";
import Detail from "../Pages/detailspage";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        children: [
            {
                index: true,
                Component: DashboardPage
            },
            {
                path: "news/:id",
                Component: Detail
            }
        ]
    }
])