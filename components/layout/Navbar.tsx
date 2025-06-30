import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/server';
import UserNav from '../auth/UserNav';
import { Bot } from 'lucide-react';

export default async function Navbar() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Bot className="h-6 w-6 text-amber-500" />
            <span className="font-bold">PenaltyPal</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link href="/#features" className="transition-colors hover:text-foreground/80 text-foreground/60">Features</Link>
            <Link href="/#pricing" className="transition-colors hover:text-foreground/80 text-foreground/60">Pricing</Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          {user ? (
            <UserNav user={user} />
          ) : (
            <nav className="flex items-center space-x-2">
              <Button asChild variant="ghost">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
} 