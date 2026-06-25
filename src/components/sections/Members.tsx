import { urlForImage } from "@/sanity/image";
import type { Member, MembersSection } from "@/sanity/types";

function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function Members({
  data,
  members,
}: {
  data: MembersSection;
  members: Member[];
}) {
  if (members.length === 0) return null;

  return (
    <section className="section" id="band">
      <div className="container">
        <span className="eyebrow">Members</span>
        {data.heading && <h2 className="section-heading">{data.heading}</h2>}
        {data.intro && <p className="section-intro">{data.intro}</p>}

        <div className="members-grid full-bleed">
          {members.map((m) => {
            const photo = m.photo
              ? urlForImage(m.photo).width(280).height(280).quality(82).url()
              : null;
            return (
              <article className="member" key={m._id}>
                <div className="avatar">
                  {photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={photo}
                      alt={m.photo?.alt || m.name}
                      loading="lazy"
                    />
                  ) : (
                    <span aria-hidden="true">{initials(m.name)}</span>
                  )}
                </div>
                <div>
                  <div className="member__name">{m.name}</div>
                  {m.role && <div className="member__role">{m.role}</div>}
                </div>
                {m.alsoKnownFor && (
                  <div className="member__aka">{m.alsoKnownFor}</div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
