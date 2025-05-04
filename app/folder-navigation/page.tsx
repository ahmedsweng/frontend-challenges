"use client";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

type TNodeFile = {
  name: string;
  children?: TNodeFile[];
};

const data: TNodeFile[] = [
  {
    name: "node_modules",
    children: [
      {
        name: "react",
        children: [
          {
            name: "index.js",
          },
        ],
      },
      {
        name: "zod",
        children: [
          {
            name: "index.js",
          },
        ],
      },
    ],
  },
  {
    name: "public",
    children: [
      {
        name: "favicon.ico",
      },
      {
        name: "vercel.svg",
      },
    ],
  },
  {
    name: "src",
    children: [
      {
        name: "app",
        children: [
          {
            name: "folder",
            children: [
              {
                name: "page.tsx",
              },
            ],
          },
        ],
      },
    ],
  },
];

export default function page() {
  return (
    <div className="flex flex-col justify-center items-start w-screen h-screen">
      {data.map((node) => {
        return <NodeComponent node={node} />;
      })}
    </div>
  );
}

const NodeComponent = ({ node }: { node: TNodeFile }) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className={`${node.children ? "ml-3" : "ml-7"}`}>
      <div
        className="cursor-pointer flex flex-row items-center justify-start gap-x-2 hover:underline"
        onClick={() => setOpen(!open)}
      >
        {node.children && node.children.length ? (
          <ChevronDown
            size={15}
            className={`${open ? "-rotate-180 duration-500" : ""}`}
          />
        ) : null}
        {node.name}
      </div>
      {node.children &&
        open &&
        node.children?.length &&
        node.children.map((childNode) => {
          return <NodeComponent node={childNode} />;
        })}
    </div>
  );
};
