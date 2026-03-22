export type ProjectCategory = "all" | "software" | "hardware";

export interface ProjectStack {
  name: string;
  color?: string;
}

export interface ProjectChallenge {
  title: string;
  description: string;
}

export interface WorkflowStep {
  step: number;
  title: string;
  description: string;
}

export interface CodeSnippet {
  filename: string;
  language: string;
  code: string;
}

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  type: "spotlight" | "bento";
  description: string;
  longDescription: string;
  challenge: ProjectChallenge;
  solution: ProjectChallenge;
  stack: ProjectStack[];
  codeSnippet?: CodeSnippet;
  workflowSteps?: WorkflowStep[];
  githubUrl?: string;
  liveUrl?: string;
  keyMetrics?: { label: string; value: string }[];
  features?: string[];
  gallery?: string[];
  year: string;
  role: string;
  duration: string;
}

export const projects: Project[] = [
  {
    slug: "zf-emart",
    title: "Enterprise E-Commerce Infrastructure",
    subtitle: "zf-emart & zf-foods",
    category: "software",
    type: "spotlight",
    description:
      "A production-grade, multi-tenant e-commerce platform handling complex inventory management, payment processing, and real-time order tracking across multiple storefronts.",
    longDescription:
      "Built from the ground up as a full-stack enterprise solution, this platform powers multiple storefronts under a unified backend. The architecture separates concerns cleanly — a Next.js frontend handles SSR and client interactivity while a Nest.js API layer manages business logic, authentication, and data orchestration through Prisma ORM. The system handles thousands of SKUs, multi-level category hierarchies, and real-time inventory synchronization across storefronts.",
    challenge: {
      title: "The Challenge",
      description:
        "Handling complex database schemas with deeply nested relational models, configuring production-grade environments with zero-downtime deployments, and managing authentication flows across multiple client applications.",
    },
    solution: {
      title: "The Solution",
      description:
        "Engineered a modular Nest.js backend with clean service-repository separation, leveraging Prisma for type-safe database access and migration management. Secured production access for AWS SES email delivery, managed seamless DNS configurations for custom domains, and implemented JWT-based auth with refresh token rotation.",
    },
    stack: [
      { name: "Next.js" },
      { name: "Nest.js" },
      { name: "Prisma" },
      { name: "AWS SES" },
      { name: "PostgreSQL" },
      { name: "TypeScript" },
      { name: "Docker" },
    ],
    codeSnippet: {
      filename: "prisma/schema.prisma",
      language: "prisma",
      code: `model Product {
  id          String   @id @default(cuid())
  name        String
  slug        String   @unique
  description String?  @db.Text
  price       Decimal  @db.Decimal(10, 2)
  compareAt   Decimal? @db.Decimal(10, 2)
  sku         String   @unique
  inventory   Int      @default(0)
  published   Boolean  @default(false)

  category    Category @relation(fields: [categoryId], references: [id])
  categoryId  String
  images      ProductImage[]
  variants    ProductVariant[]
  orders      OrderItem[]

  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([categoryId])
  @@index([slug])
  @@map("products")
}`,
    },
    githubUrl: "https://github.com/muztahiddurjoy",
    keyMetrics: [
      { label: "Database Models", value: "25+" },
      { label: "API Endpoints", value: "60+" },
      { label: "Uptime", value: "99.9%" },
      { label: "Response Time", value: "<200ms" },
    ],
    features: [
      "Multi-tenant storefront architecture",
      "JWT authentication with refresh token rotation",
      "Real-time inventory synchronization",
      "AWS SES email integration with custom domains",
      "Prisma ORM with type-safe migrations",
      "Docker containerized deployment pipeline",
      "Role-based access control (RBAC)",
      "Webhook-driven order status updates",
    ],
    year: "2024",
    role: "Full-Stack Engineer",
    duration: "6+ months",
  },
  {
    slug: "mongol-tori",
    title: "Autonomous Navigation & AI",
    subtitle: "BRACU Mongol-tori",
    category: "hardware",
    type: "spotlight",
    description:
      "Mars rover and autonomous systems developed for the BRACU Mongol-tori robotics team — tackling unstructured terrain navigation, sensor fusion, and real-time decision-making.",
    longDescription:
      "As part of the BRACU Mongol-tori competitive robotics team, this project encompasses the full autonomy stack for a mars rover platform. The system integrates ROS2 for inter-process communication, SLAM for real-time mapping, and custom path-planning algorithms for navigating rocky, unpredictable terrain. Sensor fusion combines LiDAR, IMU, and camera feeds to build a coherent world model that the autonomous navigation module uses for decision-making.",
    challenge: {
      title: "The Challenge",
      description:
        "Navigating unstructured, unpredictable physical environments where GPS signals are unreliable, terrain is uneven, and the system must make real-time decisions with limited computational resources onboard.",
    },
    solution: {
      title: "The Solution",
      description:
        "Implemented a ROS2-based autonomy stack with SLAM (Simultaneous Localization and Mapping) for spatial awareness, fusing LiDAR point clouds with IMU data for robust odometry. Custom C++ nodes handle path planning with obstacle avoidance, while a state machine manages mission execution and failsafe behaviors.",
    },
    stack: [
      { name: "ROS2" },
      { name: "C/C++" },
      { name: "Python" },
      { name: "Linux" },
      { name: "SLAM" },
      { name: "OpenCV" },
      { name: "LiDAR" },
    ],
    codeSnippet: {
      filename: "src/nav_node.cpp",
      language: "cpp",
      code: `#include "rclcpp/rclcpp.hpp"
#include "nav_msgs/msg/odometry.hpp"
#include "geometry_msgs/msg/twist.hpp"

class AutonomousNav : public rclcpp::Node {
public:
  AutonomousNav() : Node("autonomous_nav") {
    odom_sub_ = this->create_subscription<nav_msgs::msg::Odometry>(
      "/odom", 10,
      std::bind(&AutonomousNav::odom_callback, this, std::placeholders::_1)
    );
    cmd_pub_ = this->create_publisher<geometry_msgs::msg::Twist>(
      "/cmd_vel", 10
    );
    RCLCPP_INFO(this->get_logger(), "Navigation node initialized");
  }

private:
  void odom_callback(const nav_msgs::msg::Odometry::SharedPtr msg) {
    auto cmd = geometry_msgs::msg::Twist();
    double target_x = waypoints_[current_wp_].x;
    double dx = target_x - msg->pose.pose.position.x;
    cmd.linear.x = std::clamp(dx * 0.5, -1.0, 1.0);
    cmd_pub_->publish(cmd);
  }
};`,
    },
    githubUrl: "https://github.com/muztahiddurjoy",
    keyMetrics: [
      { label: "Sensor Inputs", value: "5+" },
      { label: "Nav Accuracy", value: "±15cm" },
      { label: "Response Rate", value: "30Hz" },
      { label: "Competition", value: "URC" },
    ],
    features: [
      "ROS2 inter-process communication framework",
      "SLAM-based real-time mapping and localization",
      "LiDAR + IMU sensor fusion pipeline",
      "Custom C++ path planning with obstacle avoidance",
      "State machine for mission execution",
      "Failsafe behavior management",
      "GPS waypoint navigation with dead-reckoning fallback",
      "Real-time telemetry dashboard",
    ],
    year: "2024",
    role: "Autonomy & Software Lead",
    duration: "Ongoing",
  },
  {
    slug: "appbaksho",
    title: "Startup Operations Platform",
    subtitle: "Appbaksho",
    category: "software",
    type: "bento",
    description:
      "Full lifecycle startup platform — from core website development to legal document generation and business operations tooling.",
    longDescription:
      "Appbaksho represents a ground-up startup build where the engineering work extended far beyond code. This project involved architecting and shipping the core platform website, building internal tools for team operations, and generating the necessary legal and compliance documents for business registration. The tech stack was chosen for rapid iteration while maintaining production quality — Next.js for the frontend, with a clean component architecture that allowed non-technical team members to update content through a headless CMS integration.",
    challenge: {
      title: "The Challenge",
      description:
        "Building a complete startup digital presence under tight timeline constraints while simultaneously handling the non-technical requirements of business formation — legal documents, compliance requirements, and operational workflows.",
    },
    solution: {
      title: "The Solution",
      description:
        "Leveraged Next.js with a modular component architecture for rapid development, integrated a headless CMS for content management, and built automated document generation pipelines that reduced legal paperwork turnaround from weeks to hours.",
    },
    stack: [
      { name: "Next.js" },
      { name: "TypeScript" },
      { name: "Tailwind CSS" },
      { name: "Headless CMS" },
    ],
    githubUrl: "https://github.com/muztahiddurjoy",
    keyMetrics: [
      { label: "Launch Time", value: "4 weeks" },
      { label: "Pages", value: "12+" },
      { label: "Documents", value: "Auto-gen" },
    ],
    features: [
      "Modular Next.js component architecture",
      "Headless CMS content management",
      "Automated legal document generation",
      "SEO-optimized landing pages",
      "Responsive design system",
    ],
    year: "2024",
    role: "Lead Developer & Co-founder",
    duration: "3 months",
  },
  {
    slug: "stm32-line-follower",
    title: "STM32 Line-Following Robot",
    subtitle: "Embedded Systems",
    category: "hardware",
    type: "bento",
    description:
      "A precision line-following robot built on the STM32 microcontroller platform using bare-metal C programming, developed for the January robotics competition.",
    longDescription:
      "This project is a deep dive into embedded systems programming — no frameworks, no abstractions, just bare-metal C on an STM32 microcontroller. The robot uses an array of IR sensors to detect and follow a line on the ground, with a PID control loop ensuring smooth, precise turns even at high speeds. The firmware handles sensor calibration, motor PWM control, and real-time decision-making on a resource-constrained platform where every clock cycle matters. Built under a tight timeline for the January competition, this project demanded both speed of development and reliability of execution.",
    challenge: {
      title: "The Challenge",
      description:
        "Developing reliable firmware under an extremely tight timeline for competition, with the additional constraint of limited computational resources on the STM32 — where every byte of memory and every clock cycle counts.",
    },
    solution: {
      title: "The Solution",
      description:
        "Wrote optimized bare-metal C with a tuned PID control loop for smooth line tracking, implemented efficient sensor calibration routines, and used interrupt-driven motor control for microsecond-precision PWM generation.",
    },
    stack: [
      { name: "C" },
      { name: "STM32" },
      { name: "Bare Metal" },
      { name: "PID Control" },
      { name: "PWM" },
    ],
    codeSnippet: {
      filename: "src/pid_controller.c",
      language: "c",
      code: `typedef struct {
  float kp, ki, kd;
  float prev_error;
  float integral;
} PID_Controller;

float pid_compute(PID_Controller *pid, float error, float dt) {
  pid->integral += error * dt;
  float derivative = (error - pid->prev_error) / dt;
  pid->prev_error = error;

  // Clamp integral to prevent windup
  if (pid->integral > MAX_INTEGRAL) pid->integral = MAX_INTEGRAL;
  if (pid->integral < -MAX_INTEGRAL) pid->integral = -MAX_INTEGRAL;

  return (pid->kp * error)
       + (pid->ki * pid->integral)
       + (pid->kd * derivative);
}`,
    },
    githubUrl: "https://github.com/muztahiddurjoy",
    keyMetrics: [
      { label: "MCU", value: "STM32F4" },
      { label: "Loop Rate", value: "1kHz" },
      { label: "Sensors", value: "8× IR" },
      { label: "Dev Time", value: "3 weeks" },
    ],
    features: [
      "Bare-metal C firmware on STM32",
      "PID control loop for smooth tracking",
      "Interrupt-driven PWM motor control",
      "IR sensor array with auto-calibration",
      "Competition-ready reliability",
    ],
    year: "2024",
    role: "Firmware Engineer",
    duration: "3 weeks",
  },
  {
    slug: "java-dsa-engine",
    title: "Java DSA Engine",
    subtitle: "Computer Science Fundamentals",
    category: "software",
    type: "bento",
    description:
      "A comprehensive data structures and algorithms library built from scratch in Java — Linked Lists, Hash Tables, Trees, and Graphs implemented from first principles to master time and space complexity.",
    longDescription:
      "This isn't a portfolio project — it's a discipline statement. Every data structure in this repository is implemented from scratch, without importing Java's Collections framework. Linked Lists (singly, doubly, circular), Hash Tables with open addressing and chaining, Binary Search Trees, AVL Trees, Heaps, Graphs (adjacency list and matrix), and their associated algorithms — all written to deeply understand the mechanics of time and space complexity. Each implementation includes comprehensive unit tests and Big-O analysis documentation.",
    challenge: {
      title: "The Challenge",
      description:
        "Moving beyond surface-level understanding of data structures to truly internalize how they work at the memory level — understanding why a Hash Table amortizes to O(1), why tree rotations maintain balance, and how graph traversals explore state spaces.",
    },
    solution: {
      title: "The Solution",
      description:
        "Built every structure from first principles with detailed documentation of design decisions, included unit tests for edge cases, and profiled actual runtime performance against Java's built-in implementations to validate understanding.",
    },
    stack: [
      { name: "Java" },
      { name: "JUnit" },
      { name: "Big-O Analysis" },
      { name: "Algorithms" },
    ],
    codeSnippet: {
      filename: "src/HashTable.java",
      language: "java",
      code: `public class HashTable<K, V> {
    private static final int INITIAL_CAPACITY = 16;
    private static final float LOAD_FACTOR = 0.75f;
    private Entry<K, V>[] buckets;
    private int size;

    @SuppressWarnings("unchecked")
    public HashTable() {
        buckets = new Entry[INITIAL_CAPACITY];
        size = 0;
    }

    public void put(K key, V value) {
        if ((float) size / buckets.length >= LOAD_FACTOR) {
            resize();
        }
        int index = hash(key);
        Entry<K, V> entry = buckets[index];
        while (entry != null) {
            if (entry.key.equals(key)) {
                entry.value = value;
                return;
            }
            entry = entry.next;
        }
        buckets[index] = new Entry<>(key, value, buckets[index]);
        size++;
    }

    private int hash(K key) {
        return (key.hashCode() & 0x7FFFFFFF) % buckets.length;
    }
}`,
    },
    githubUrl: "https://github.com/muztahiddurjoy",
    keyMetrics: [
      { label: "Structures", value: "12+" },
      { label: "Algorithms", value: "30+" },
      { label: "Test Cases", value: "200+" },
      { label: "From Scratch", value: "100%" },
    ],
    features: [
      "Linked Lists (singly, doubly, circular)",
      "Hash Table with chaining and open addressing",
      "BST, AVL Tree, and Heap implementations",
      "Graph traversals (BFS, DFS, Dijkstra)",
      "Sorting algorithms (Quick, Merge, Heap)",
      "Comprehensive JUnit test suites",
      "Big-O analysis documentation",
    ],
    year: "2024",
    role: "Academic Project",
    duration: "Ongoing",
  },
];

export const prototypingSteps: WorkflowStep[] = [
  {
    step: 1,
    title: "CAD / Modeling",
    description:
      "Design components in SolidWorks or Fusion 360 with precise tolerances, stress analysis, and assembly constraints. Every physical part starts as a 3D model validated against mechanical requirements.",
  },
  {
    step: 2,
    title: "Slicing & Optimization",
    description:
      "Export STL files and configure slice parameters — layer height (0.2mm standard, 0.12mm precision), infill patterns (gyroid for strength, grid for speed), support generation, and material-specific temperature profiles.",
  },
  {
    step: 3,
    title: "3D Printing & Assembly",
    description:
      "Print on Bambu Lab hardware with real-time monitoring. Post-processing includes support removal, surface finishing, heat-set insert installation, and final assembly with electronic components.",
  },
];
