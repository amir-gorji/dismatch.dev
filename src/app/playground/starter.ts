export const STARTER_CODE = `import { createUnion, is, type InferUnion } from "dismatch";

const Shape = createUnion("type", {
  circle: (radius: number) => ({ radius }),
  rectangle: (width: number, height: number) => ({ width, height }),
  triangle: (base: number, height: number) => ({ base, height }),
});

type Shape = InferUnion<typeof Shape>;

const area = Shape.match({
  circle: ({ radius }) => Math.PI * radius ** 2,
  rectangle: ({ width, height }) => width * height,
  triangle: ({ base, height }) => 0.5 * base * height,
});

const shapes: Shape[] = [
  Shape.circle(5),
  Shape.rectangle(3, 4),
  Shape.triangle(6, 8),
];

for (const shape of shapes) {
  console.log(shape.type, "→ area =", area(shape).toFixed(2));
}

const triangle = shapes.find((s) => is(s, "triangle"));
console.log("first triangle:", triangle);
`;
