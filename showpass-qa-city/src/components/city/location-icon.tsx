import {
  Building2Icon,
  CompassIcon,
  ShoppingBagIcon,
  TicketIcon,
} from "lucide-react";
import type { ComponentProps } from "react";
import type { AgentRole } from "@/lib/workspace/schema";

const icons = {
  "public-tester": CompassIcon,
  "customer-tester": ShoppingBagIcon,
  "organizer-tester": Building2Icon,
  "box-office-tester": TicketIcon,
};

export function LocationIcon({ role, ...props }: ComponentProps<typeof CompassIcon> & { role: AgentRole }) {
  const Icon = icons[role];
  return <Icon aria-hidden="true" strokeWidth={1.7} {...props} />;
}
