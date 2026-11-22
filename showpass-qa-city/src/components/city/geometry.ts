import { cityDimensions, locations } from "@/lib/workspace/city";
import { agentRoles, type AgentRole } from "@/lib/workspace/schema";

type Vec3 = [number, number, number];
type Block = { position: Vec3; size: Vec3; color: string };

const asphalt = "#20243b";
const pavement = "#414a68";
const laneMark = "#626b8c";
const base = "#252a45";
const glass = "#273653";

function block(x: number, y: number, z: number, width: number, height: number, depth: number, color: string): Block {
  return { position: [x, y, z], size: [width, height, depth], color };
}

function buildings(role: AgentRole): Block[] {
  const { position: [x, z], size: [width, height, depth], color } = locations[role];
  const front = z + depth / 2;
  const right = x + width / 2;
  const roof = height + 0.2;

  const structure = [
    block(x, 0.05, z, 8.7, 0.21, 6.1, pavement),
    block(x, 0.18, z, width + 0.62, 0.14, depth + 0.62, base),
    block(x, height / 2 + 0.25, z, width, height, depth, color),
    block(x, roof + 0.16, z, width + 0.25, 0.15, depth + 0.25, color),
    block(x, roof + 0.26, z, width - 0.35, 0.12, depth - 0.35, glass),
    block(x, 0.67, front + 0.02, 0.8, 0.84, 0.11, glass),
    block(x, 1.15, front + 0.25, 1.45, 0.13, 0.72, color),
    block(x, 0.21, front + 0.4, 1.65, 0.12, 0.58, glass),
  ];

  const floors = role === "organizer-tester" ? [1.55, 2.15, 2.75] : [height * 0.64 + 0.25];
  for (const y of floors) {
    for (const offset of [-0.97, 0, 0.97]) {
      structure.push(block(x + offset, y, front + 0.025, 0.63, 0.37, 0.1, glass));
    }
    for (const offset of [-0.8, 0, 0.8]) {
      structure.push(block(right + 0.025, y, z + offset, 0.1, 0.37, 0.52, glass));
    }
  }

  switch (role) {
    case "public-tester":
      structure.push(block(x - 0.45, roof + 0.5, z - 0.14, 1.7, 0.37, 1.12, color));
      break;
    case "customer-tester":
      structure.push(block(x, 1.36, front + 0.21, width + 0.12, 0.14, 0.49, "#eee1ff"));
      break;
    case "organizer-tester":
      structure.push(
        block(x + 0.75, roof + 0.53, z - 0.45, 1.27, 0.42, 1.22, color),
        block(x + 0.75, roof + 0.88, z - 0.45, 0.08, 0.4, 0.08, "#fce2f5"),
      );
      break;
    case "box-office-tester":
      structure.push(
        block(x, roof + 0.4, z, width - 0.68, 0.22, depth - 0.6, color),
        block(x, roof + 0.55, z, width - 1.02, 0.14, depth - 0.99, glass),
      );
      break;
  }

  return structure;
}

const { width, depth } = cityDimensions;
const terrain = [
  block(0, -0.39, 0, width + 0.45, 0.38, depth + 0.45, base),
  block(0, -0.13, 0, width, 0.22, depth, asphalt),
];

for (const offset of [-9.8, -8.1, -6.4, -4.7, -3, 3, 4.7, 6.4, 8.1, 9.8]) {
  terrain.push(block(offset, -0.008, 0, 0.72, 0.02, 0.055, laneMark));
}
for (const offset of [-6.8, -5.1, -3.4, 3.4, 5.1, 6.8]) {
  terrain.push(block(0, -0.008, offset, 0.055, 0.02, 0.72, laneMark));
}
for (const offset of [-0.72, -0.36, 0, 0.36, 0.72]) {
  for (const side of [-1.1, 1.1]) {
    terrain.push(
      block(side, -0.004, offset, 0.55, 0.025, 0.14, "#737e9b"),
      block(offset, -0.004, side, 0.14, 0.025, 0.55, "#737e9b"),
    );
  }
}

for (const role of agentRoles) {
  const { position: [x, z] } = locations[role];
  for (const side of [-1, 1]) {
    const treeX = x + side * 3.1;
    const treeZ = z - 1.95 * side;
    terrain.push(
      block(treeX, 0.2, treeZ, 0.83, 0.13, 0.83, base),
      block(treeX, 0.47, treeZ, 0.11, 0.56, 0.11, "#81726b"),
      block(treeX, 0.89, treeZ, 0.55, 0.6, 0.55, "#5cb79c"),
      block(treeX, 1.27, treeZ, 0.36, 0.17, 0.36, "#82d3af"),
    );
  }
}

export const cityBlocks = [...terrain, ...agentRoles.flatMap(buildings)];
