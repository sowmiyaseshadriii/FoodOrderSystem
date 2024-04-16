"use client"
import { Menubar, MenubarMenu, MenubarTrigger } from "../components/ui/menubar";
import "../globals.css";
import { useRouter } from "next/navigation";
import MenuPage from "./menu/page";
import QueuePage from "./queue/page";
import OrderPage from "./order/page";


const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter(); 
  const handleNavigation = (url: string) => {
    router.push(url);
    switch(url) {
      case "/menu": return <MenuPage/>;
      case "/order": return <OrderPage/>;
      case "/queue": return <QueuePage/>;
      default:
        return <MenuPage/>;
    }
  };

  return (
    <html>
      <head>
        <title>Food Ordering Website</title>
      </head>
      <body>
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger onClick={() => handleNavigation('/menu')}>Menu</MenubarTrigger>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger onClick={() => handleNavigation('/order')}>Order</MenubarTrigger>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger onClick={() => handleNavigation('/queue')}>Queue</MenubarTrigger>
          </MenubarMenu>
        </Menubar>
        <div className="h-screen">{children}</div>
      </body>
    </html>
  );
};

export default RootLayout;
