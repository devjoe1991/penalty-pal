'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LayoutGrid, Car, CreditCard } from "lucide-react"
import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutGrid },
  { name: "My Vehicles", href: "/dashboard/vehicles", icon: Car },
  { name: "Billing", href: "/dashboard/billing", icon: CreditCard },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [subscription, setSubscription] = useState<{ plan: string; credits: number } | null>(null)
  const supabase = createClient()

  useEffect(() => {
    async function fetchSubscription() {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data } = await supabase
          .from('subscriptions')
          .select('plan, credits')
          .eq('id', user.id)
          .single()
        setSubscription(data)
      }
    }
    fetchSubscription()
  }, [supabase])

  return (
    <aside className="hidden md:block w-64 flex-shrink-0 border-r p-4">
      <div className="flex flex-col space-y-4">
        <Button asChild className="w-full">
          <Link href="/contest">Contest New Fine</Link>
        </Button>
        
        {/* Credits Display for Freemium Users */}
        {subscription?.plan === 'freemium' && (
          <div className="bg-muted/50 rounded-lg p-3 text-center">
            <p className="text-sm font-medium text-muted-foreground">Credits Remaining</p>
            <div className="flex items-center justify-center space-x-2 mt-1">
              <span className="text-2xl font-bold">{subscription.credits}</span>
              {subscription.credits === 0 && (
                <Badge variant="destructive" className="text-xs">
                  Empty
                </Badge>
              )}
            </div>
                         {subscription.credits === 0 ? (
               <div className="flex gap-1 mt-2">
                 <Button asChild size="sm" className="flex-1 text-xs">
                   <Link href="/dashboard/billing">Upgrade</Link>
                 </Button>
                 <Button asChild size="sm" variant="outline" className="flex-1 text-xs">
                   <Link href="/dashboard/billing?tab=topup">Buy Credits</Link>
                 </Button>
               </div>
             ) : (
               <Button asChild size="sm" variant="outline" className="mt-2 w-full text-xs">
                 <Link href="/dashboard/billing?tab=topup">Top Up</Link>
               </Button>
             )}
          </div>
        )}

        <nav className="flex flex-col space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                pathname === item.href ? "bg-accent" : "bg-transparent",
              )}
            >
              <item.icon className="mr-2 h-4 w-4" />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  )
} 