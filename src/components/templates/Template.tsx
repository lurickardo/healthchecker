import SideBar from "../organisms/Sidebar";

interface TemplateProps {
  children: React.ReactNode;
}

export default function Template({ children }: TemplateProps) {
  return (
    <>
      <main className="flex gap-10 pr-10 min-h-screen bg-wave bg-no-repeat bg-bottom bg-contain text-lg">
        <SideBar />
        <div
          className={`w-authenticated pt-20 pl-4 pr-12 transition-all duration-300 ease-in-out`}
        >
          {children}
        </div>
      </main>
    </>
  );
}
