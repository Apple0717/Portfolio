import { skillSets } from "@/lib/portfolio-data";

export function SkillWall({ active, onSelect }: { active: number; onSelect: (index: number) => void }) {
  const stack = skillSets.slice(0, active + 1).reverse();

  return (
    <div className="skill-board">
      <div className="skill-tabs" role="list">
        {skillSets.map((set, index) => {
          const expanded = index === active;
          return (
            <div key={set.title} className={expanded ? "skill-tab is-open" : "skill-tab"} role="listitem">
              <button type="button" className="skill-tab-main" onClick={() => onSelect(index)}>
                {set.title}
              </button>
              <button
                type="button"
                className="skill-plus"
                aria-expanded={expanded}
                aria-label={expanded ? `${set.title} details` : `Show ${set.title}`}
                onClick={() => onSelect(index)}
              >
                <span className="skill-plus-icon" />
              </button>
              {expanded && <p className="skill-detail">{set.items.join(", ")}</p>}
            </div>
          );
        })}
      </div>

      <div className="folder-stage" aria-hidden="true">
        <div className="folder-tilt">
          {stack.map((set, depth) => (
            <article
              key={set.title}
              className={depth === 0 ? "folder-sheet is-new" : "folder-sheet"}
              style={{ ["--i" as string]: depth, ["--n" as string]: stack.length - 1 }}
            >
              <h3>{set.title}</h3>
              <img className="folder-cert" src="/certificate.png" alt="" />
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
