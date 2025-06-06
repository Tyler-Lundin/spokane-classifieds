interface PageHeaderProps {
  title: string;
}

export function PageHeader({ title }: PageHeaderProps) {
  return (
    <h1 className="text-md md:text-lg border-b border-black dark:border-white mb-2 font-light lowercase pb-6 text-black dark:text-white text-center bg-white dark:bg-black">
      {title}
    </h1>
  );
} 