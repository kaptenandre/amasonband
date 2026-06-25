import {
  PortableText,
  type PortableTextComponents,
  type PortableTextBlock,
} from "@portabletext/react";

const components: PortableTextComponents = {
  marks: {
    link: ({ children, value }) => {
      const href = (value?.href as string) ?? "#";
      const external = /^https?:\/\//.test(href);
      return (
        <a
          href={href}
          {...(external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {children}
        </a>
      );
    },
  },
};

export function PortableTextBody({
  value,
  className,
}: {
  value?: PortableTextBlock[];
  className?: string;
}) {
  if (!value || value.length === 0) return null;
  return (
    <div className={className ? `rich ${className}` : "rich"}>
      <PortableText value={value} components={components} />
    </div>
  );
}
