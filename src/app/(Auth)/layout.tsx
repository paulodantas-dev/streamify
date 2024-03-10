interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen">
      {children}
    </div>
  );
}
