import { CollapseHeader } from "@/components/layout/collapse-header";

interface ContentLayoutProps {
  title: string;
  children: React.ReactNode;
}

export function ContentLayout({ title, children }: ContentLayoutProps) {
  return (
    <>
      <CollapseHeader title={title} />
      {children}
    </>
  );
}
