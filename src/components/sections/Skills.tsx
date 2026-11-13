import { resume } from "@/content/resume";
import { Section } from "@/components/ui/Section";
import { TagList } from "@/components/ui/Tag";

export function Skills() {
  return (
    <Section id="skills" title="Skills">
      <div className="grid gap-10 md:grid-cols-3 md:gap-8">
        {resume.skills.map((group) => (
          <div key={group.group}>
            <h3 className="text-base font-semibold">{group.group}</h3>
            <div className="mt-4">
              <TagList items={group.items} label={group.group} />
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
