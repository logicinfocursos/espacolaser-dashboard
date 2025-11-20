import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, children, ...props }) => (
  <div className={cn("rounded-xl border border-dark-border bg-dark-surface text-slate-100 shadow-sm", className)} {...props}>
    {children}
  </div>
);

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, children, ...props }) => (
  <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props}>
    {children}
  </div>
);

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ className, children, ...props }) => (
  <h3 className={cn("text-lg font-semibold leading-none tracking-tight", className)} {...props}>
    {children}
  </div>
);

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, children, ...props }) => (
  <div className={cn("p-6 pt-0", className)} {...props}>
    {children}
  </div>
);

export const Badge: React.FC<React.HTMLAttributes<HTMLDivElement> & { variant?: 'default' | 'success' | 'warning' | 'destructive' }> = ({ className, variant = 'default', children, ...props }) => {
  const variants = {
    default: "bg-slate-800 text-slate-100 hover:bg-slate-700",
    success: "bg-green-900/50 text-green-400 border border-green-900",
    warning: "bg-yellow-900/50 text-yellow-400 border border-yellow-900",
    destructive: "bg-red-900/50 text-red-400 border border-red-900",
  };
  return (
    <div className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", variants[variant], className)} {...props}>
      {children}
    </div>
  );
};

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'ghost' | 'outline' }> = ({ className, variant = 'primary', children, ...props }) => {
  const variants = {
    primary: "bg-brand hover:bg-brand-dark text-dark-bg font-medium shadow-lg shadow-brand/20",
    ghost: "hover:bg-slate-800 text-slate-300 hover:text-white",
    outline: "border border-slate-700 bg-transparent hover:bg-slate-800 text-slate-300"
  };
  return (
    <button className={cn("inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none ring-offset-dark-bg h-10 py-2 px-4", variants[variant], className)} {...props}>
      {children}
    </button>
  );
};

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({ className, ...props }) => (
  <input
    className={cn("flex h-10 w-full rounded-md border border-dark-border bg-dark-bg px-3 py-2 text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand/50 disabled:cursor-not-allowed disabled:opacity-50", className)}
    {...props}
  />
);