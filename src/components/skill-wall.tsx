import { skillSets } from "@/lib/portfolio-data";

export function SkillWall() {
  return (
    <div className="skill-sets">
      {skillSets.map((set) => (
        <section key={set.title} className="skill-set">
          <h3>{set.title}</h3>
          <ul>
            {set.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
