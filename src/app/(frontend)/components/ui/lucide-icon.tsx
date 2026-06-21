import {
  Cpu,
  Code2,
  Cloud,
  Globe,
  Box,
  Rocket,
  Briefcase,
  Lightbulb,
  GraduationCap,
  ShoppingCart,
  Navigation,
  Printer,
  Database,
  Satellite,
  Bot,
  CircuitBoard,
  Layers,
  Zap,
  Terminal,
  Trophy,
  Award,
  Users,
  type LucideProps,
} from 'lucide-react'

const map = {
  Cpu,
  Code2,
  Cloud,
  Globe,
  Box,
  Rocket,
  Briefcase,
  Lightbulb,
  GraduationCap,
  ShoppingCart,
  Navigation,
  Printer,
  Database,
  Satellite,
  Bot,
  CircuitBoard,
  Layers,
  Zap,
  Terminal,
  Trophy,
  Award,
  Users,
} as const

export type IconName = keyof typeof map

export function Icon({ name, ...props }: { name: IconName } & LucideProps) {
  const Cmp = map[name] ?? Box
  return <Cmp {...props} />
}
